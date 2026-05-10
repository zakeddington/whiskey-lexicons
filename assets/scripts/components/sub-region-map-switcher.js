export class SubRegionMapSwitcher {
	constructor() {
		this.root = document;
		this.alphaThreshold = 16;
		this.imageCache = new Map();
		this.groupContexts = [];
	}

	init(root = document) {
		this.root = root;
		this.groupContexts = [];

		const subRegionGroups = this.root.querySelectorAll('.sub-regions[data-map-target]');
		subRegionGroups.forEach(group => {
			const context = this.createGroupContext(group);

			if (!context) return;
			this.groupContexts.push(context);

			this.primeGroupContext(context);
			this.registerRegionData(context);
			this.bindRegionItemEvents(context);
			this.bindContainerEvents(context);
			this.bindMapHoverEvents(context);
			this.bindFocusEvents(context);
		});
	}

	createGroupContext(group) {
		const mapStack = document.getElementById(group.dataset.mapTarget);
		const mapContainer = group.closest('.map-container') || group;
		const mapBaseImage = mapStack?.querySelector('.map-base-image');
		const allHighlightImage = mapStack?.querySelector('.map-all-highlight-image');

		if (!mapStack || !mapBaseImage || !allHighlightImage) return null;

		return {
			group,
			mapStack,
			mapContainer,
			mapBaseImage,
			allHighlightImage,
			baseSrc: mapStack.dataset.baseSrc,
			initialHighlightSrc: mapStack.dataset.initialHighlightSrc,
			overlays: Array.from(mapStack.querySelectorAll('.map-region-image')),
			regionItems: Array.from(group.querySelectorAll('.sub-region[data-region-key][data-map-highlight-image]')),
			regions: new Map(),
			isSectionHovered: false,
			activeLayerIndex: 0,
			activeRegionKey: '',
			activeSource: '',
			overlayTransitionToken: 0,
			mapHoverToken: 0
		};
	}

	primeGroupContext(context) {
		this.loadImage(context.baseSrc);
		this.loadImage(context.initialHighlightSrc);
		context.mapBaseImage.src = context.baseSrc;
		context.allHighlightImage.src = context.initialHighlightSrc;
		this.setAllHighlightVisible(context, true);
	}

	registerRegionData(context) {
		context.regionItems.forEach(regionElement => {
			const regionKey = regionElement.dataset.regionKey;
			const highlightSrc = regionElement.dataset.mapHighlightImage;
			const imageRecord = this.loadImage(highlightSrc);

			context.regions.set(regionKey, {
				element: regionElement,
				highlightSrc,
				hitMap: null
			});

			imageRecord.ready.then(() => {
				const region = context.regions.get(regionKey);
				if (!region) return;

				region.hitMap = this.createHitMap(imageRecord.image);
			});
		});
	}

	createHitMap(image) {
		const width = image.naturalWidth || 0;
		const height = image.naturalHeight || 0;
		if (!width || !height) return null;

		const hitCanvas = document.createElement('canvas');
		hitCanvas.width = width;
		hitCanvas.height = height;
		const context = hitCanvas.getContext('2d', { willReadFrequently: true });
		if (!context) return null;

		context.drawImage(image, 0, 0);
		const alpha = context.getImageData(0, 0, width, height).data;
		const alphaMap = new Uint8ClampedArray(width * height);
		for (let i = 0; i < alphaMap.length; i += 1) {
			alphaMap[i] = alpha[(i * 4) + 3];
		}

		return { width, height, alpha: alphaMap };
	}

	loadImage(src) {
		if (!this.imageCache.has(src)) {
			const image = new Image();
			const loadPromise = new Promise(resolve => {
				image.addEventListener('load', resolve, { once: true });
				image.addEventListener('error', resolve, { once: true });
			});

			image.src = src;
			this.imageCache.set(src, { image, ready: loadPromise });
		}

		return this.imageCache.get(src);
	}

	setAllHighlightVisible(context, isVisible) {
		context.allHighlightImage.classList.toggle('is-visible', isVisible);
	}

	clearActiveRegion(context) {
		context.overlayTransitionToken += 1;
		context.activeRegionKey = '';
		context.activeSource = '';
		context.overlays.forEach(overlay => overlay.classList.remove('is-visible'));
		context.regions.forEach(region => region.element.classList.remove('is-active'));
	}

	setRegionOverlay(context, src) {
		if (!src) return;

		context.overlayTransitionToken += 1;
		const currentTransitionToken = context.overlayTransitionToken;

		const nextLayerIndex = context.activeLayerIndex === 0 ? 1 : 0;
		const nextOverlay = context.overlays[nextLayerIndex];
		const currentOverlay = context.overlays[context.activeLayerIndex];
		if (!nextOverlay || !currentOverlay) return;

		this.loadImage(src).ready.then(() => {
			if (currentTransitionToken !== context.overlayTransitionToken) return;

			requestAnimationFrame(() => {
				if (currentTransitionToken !== context.overlayTransitionToken) return;

				nextOverlay.src = src;
				nextOverlay.classList.add('is-visible');
				currentOverlay.classList.remove('is-visible');
				context.activeLayerIndex = nextLayerIndex;
			});
		});
	}

	showRegion(context, regionKey, source) {
		const region = context.regions.get(regionKey);
		if (!region) return;
		if (context.activeRegionKey === regionKey && context.activeSource === source) return;

		context.activeRegionKey = regionKey;
		context.activeSource = source;
		this.setAllHighlightVisible(context, false);
		this.setRegionOverlay(context, region.highlightSrc);
		context.regions.forEach((entry, key) => {
			entry.element.classList.toggle('is-active', key === regionKey);
		});
	}

	setSectionHovered(context, hovered) {
		if (context.isSectionHovered === hovered) return;

		context.isSectionHovered = hovered;
		if (hovered) {
			this.setAllHighlightVisible(context, false);
			return;
		}

		this.clearActiveRegion(context);
		this.setAllHighlightVisible(context, true);
	}

	getPointRegionKey(context, clientX, clientY) {
		const rect = context.mapStack.getBoundingClientRect();
		if (!rect.width || !rect.height) return '';

		const x = (clientX - rect.left) / rect.width;
		const y = (clientY - rect.top) / rect.height;
		if (x < 0 || x > 1 || y < 0 || y > 1) return '';

		let matchedKey = '';
		context.regions.forEach((region, key) => {
			const hitMap = region.hitMap;
			if (!hitMap || matchedKey) return;

			const px = Math.floor(x * hitMap.width);
			const py = Math.floor(y * hitMap.height);
			if (px < 0 || py < 0 || px >= hitMap.width || py >= hitMap.height) return;

			const alpha = hitMap.alpha[(py * hitMap.width) + px];
			if (alpha > this.alphaThreshold) {
				matchedKey = key;
			}
		});

		return matchedKey;
	}

	bindRegionItemEvents(context) {
		context.regionItems.forEach(regionElement => {
			const regionKey = regionElement.dataset.regionKey;

			regionElement.addEventListener('mouseenter', () => {
				this.setSectionHovered(context, true);
				this.showRegion(context, regionKey, 'text');
			});

			regionElement.addEventListener('focus', () => {
				this.setSectionHovered(context, true);
				this.showRegion(context, regionKey, 'text');
			});

			regionElement.addEventListener('mouseleave', event => {
				const nextRegion = event.relatedTarget?.closest?.('.sub-region[data-region-key]');
				if (nextRegion) return;
				if (context.activeSource === 'text') {
					this.clearActiveRegion(context);
				}
			});
		});
	}

	bindContainerEvents(context) {
		context.mapContainer.addEventListener('mouseenter', () => {
			this.setSectionHovered(context, true);
		});

		context.mapContainer.addEventListener('mouseleave', () => {
			this.setSectionHovered(context, false);
		});
	}

	bindMapHoverEvents(context) {
		context.mapStack.addEventListener('mousemove', event => {
			if (!context.isSectionHovered) return;

			context.mapHoverToken += 1;
			const currentToken = context.mapHoverToken;
			const regionKey = this.getPointRegionKey(context, event.clientX, event.clientY);
			if (currentToken !== context.mapHoverToken) return;

			if (regionKey) {
				this.showRegion(context, regionKey, 'map');
				return;
			}

			if (context.activeSource === 'map') {
				this.clearActiveRegion(context);
			}
		});

		context.mapStack.addEventListener('mouseleave', () => {
			if (context.activeSource === 'map') {
				this.clearActiveRegion(context);
			}
		});
	}

	bindFocusEvents(context) {
		context.group.addEventListener('focusout', event => {
			const nextFocusTarget = event.relatedTarget;
			if (!context.mapContainer.contains(nextFocusTarget)) {
				this.setSectionHovered(context, false);
			}
		});
	}
}
