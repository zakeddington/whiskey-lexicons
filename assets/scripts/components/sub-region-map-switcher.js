	export class SubRegionMapSwitcher {
	init(root = document) {
		const subRegionGroups = root.querySelectorAll('.sub-regions[data-map-target]');

		subRegionGroups.forEach(group => {
			const mapStack = document.getElementById(group.dataset.mapTarget);
			const mapContainer = group.closest('.map-container') || group;
			const mapBaseImage = mapStack?.querySelector('.map-base-image');
			const allHighlightImage = mapStack?.querySelector('.map-all-highlight-image');

			if (!mapStack || !mapBaseImage || !allHighlightImage) return;

			const baseSrc = mapStack.dataset.baseSrc;
			const initialHighlightSrc = mapStack.dataset.initialHighlightSrc;
			const overlays = Array.from(mapStack.querySelectorAll('.map-region-image'));
			const regionItems = Array.from(group.querySelectorAll('.sub-region[data-region-key][data-map-highlight-image]'));
			const regions = new Map();
			const imageCache = new Map();
			let isSectionHovered = false;
			let activeLayerIndex = 0;
			let activeRegionKey = '';
			let activeSource = '';
			let overlayTransitionToken = 0;
			let mapHoverToken = 0;

			const loadImage = src => {
				if (!imageCache.has(src)) {
					const image = new Image();
					const loadPromise = new Promise(resolve => {
						image.addEventListener('load', resolve, { once: true });
						image.addEventListener('error', resolve, { once: true });
					});

					image.src = src;
					imageCache.set(src, { image, ready: loadPromise });
				}

				return imageCache.get(src);
			};

			const setAllHighlightVisible = isVisible => {
				allHighlightImage.classList.toggle('is-visible', isVisible);
			};

			const clearActiveRegion = () => {
				overlayTransitionToken += 1;
				activeRegionKey = '';
				activeSource = '';
				overlays.forEach(overlay => overlay.classList.remove('is-visible'));
				regions.forEach(region => region.element.classList.remove('is-active'));
			};

			const setRegionOverlay = src => {
				if (!src) return;

				overlayTransitionToken += 1;
				const currentTransitionToken = overlayTransitionToken;

				const nextLayerIndex = activeLayerIndex === 0 ? 1 : 0;
				const nextOverlay = overlays[nextLayerIndex];
				const currentOverlay = overlays[activeLayerIndex];

				if (!nextOverlay || !currentOverlay) return;

				loadImage(src).ready.then(() => {
					if (currentTransitionToken !== overlayTransitionToken) return;

					requestAnimationFrame(() => {
						if (currentTransitionToken !== overlayTransitionToken) return;

						nextOverlay.src = src;
						nextOverlay.classList.add('is-visible');
						currentOverlay.classList.remove('is-visible');
						activeLayerIndex = nextLayerIndex;
					});
				});
			};

			const showRegion = (regionKey, source) => {
				const region = regions.get(regionKey);
				if (!region) return;
				if (activeRegionKey === regionKey && activeSource === source) return;

				activeRegionKey = regionKey;
				activeSource = source;
				setAllHighlightVisible(false);
				setRegionOverlay(region.highlightSrc);
				regions.forEach((entry, key) => {
					entry.element.classList.toggle('is-active', key === regionKey);
				});
			};

			const setSectionHovered = hovered => {
				if (isSectionHovered === hovered) return;

				isSectionHovered = hovered;
				if (hovered) {
					setAllHighlightVisible(false);
					return;
				}

				clearActiveRegion();
				setAllHighlightVisible(true);
			};

			const getPointRegionKey = (clientX, clientY) => {
				const rect = mapStack.getBoundingClientRect();
				if (!rect.width || !rect.height) return '';

				const x = (clientX - rect.left) / rect.width;
				const y = (clientY - rect.top) / rect.height;
				if (x < 0 || x > 1 || y < 0 || y > 1) return '';

				let matchedKey = '';

				regions.forEach((region, key) => {
					const hitMap = region.hitMap;
					if (!hitMap || matchedKey) return;

					const px = Math.floor(x * hitMap.width);
					const py = Math.floor(y * hitMap.height);
					if (px < 0 || py < 0 || px >= hitMap.width || py >= hitMap.height) return;

					const alpha = hitMap.alpha[(py * hitMap.width) + px];
					if (alpha > 16) {
						matchedKey = key;
					}
				});

				return matchedKey;
			};

			loadImage(baseSrc);
			loadImage(initialHighlightSrc);
			mapBaseImage.src = baseSrc;
			allHighlightImage.src = initialHighlightSrc;
			setAllHighlightVisible(true);

			regionItems.forEach(regionElement => {
				const regionKey = regionElement.dataset.regionKey;
				const highlightSrc = regionElement.dataset.mapHighlightImage;
				const imageRecord = loadImage(highlightSrc);

				regions.set(regionKey, {
					element: regionElement,
					highlightSrc,
					hitMap: null
				});

				imageRecord.ready.then(() => {
					const hitCanvas = document.createElement('canvas');
					const width = imageRecord.image.naturalWidth || 0;
					const height = imageRecord.image.naturalHeight || 0;

					if (!width || !height) return;

					hitCanvas.width = width;
					hitCanvas.height = height;
					const context = hitCanvas.getContext('2d', { willReadFrequently: true });
					if (!context) return;

					context.drawImage(imageRecord.image, 0, 0);
					const alpha = context.getImageData(0, 0, width, height).data;
					const alphaMap = new Uint8ClampedArray(width * height);
					for (let i = 0; i < alphaMap.length; i += 1) {
						alphaMap[i] = alpha[(i * 4) + 3];
					}

					const region = regions.get(regionKey);
					if (region) {
						region.hitMap = { width, height, alpha: alphaMap };
					}
				});
			});

			regionItems.forEach(regionElement => {
				const regionKey = regionElement.dataset.regionKey;

				regionElement.addEventListener('mouseenter', () => {
					setSectionHovered(true);
					showRegion(regionKey, 'text');
				});

				regionElement.addEventListener('focus', () => {
					setSectionHovered(true);
					showRegion(regionKey, 'text');
				});

				regionElement.addEventListener('mouseleave', event => {
					const nextRegion = event.relatedTarget?.closest?.('.sub-region[data-region-key]');
					if (nextRegion) return;
					if (activeSource === 'text') {
						clearActiveRegion();
					}
				});
			});

			mapContainer.addEventListener('mouseenter', () => {
				setSectionHovered(true);
			});
			mapContainer.addEventListener('mouseleave', () => {
				setSectionHovered(false);
			});

			mapStack.addEventListener('mousemove', event => {
				if (!isSectionHovered) return;

				mapHoverToken += 1;
				const currentToken = mapHoverToken;
				const regionKey = getPointRegionKey(event.clientX, event.clientY);
				if (currentToken !== mapHoverToken) return;

				if (regionKey) {
					showRegion(regionKey, 'map');
					return;
				}

				if (activeSource === 'map') {
					clearActiveRegion();
				}
			});
			mapStack.addEventListener('mouseleave', () => {
				if (activeSource === 'map') {
					clearActiveRegion();
				}
			});

			group.addEventListener('focusout', event => {
				const nextFocusTarget = event.relatedTarget;
				if (!mapContainer.contains(nextFocusTarget)) {
					setSectionHovered(false);
				}
			});
		});
	}
}
