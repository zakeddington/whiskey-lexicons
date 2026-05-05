import { REGIONS } from '../data/regions.js';
import { escapeHtml } from '../utils.js';

export class Regions {
	constructor() {
		this.regions = REGIONS;
		this.regionsList = document.getElementById('regions-list');
	}

	init() {
		if (!this.regionsList) return;

		this.render();
		this.setupAccordions();
	}

	setupAccordions() {
		const triggers = document.querySelectorAll('.region-accordion-trigger');

		triggers.forEach(trigger => {
			trigger.addEventListener('click', () => this.toggleAccordion(trigger));
			trigger.addEventListener('keydown', event => this.handleAccordionKeydown(event, triggers));
		});
	}

	toggleAccordion(trigger) {
		const section = trigger.closest('.region-section');
		const panel = document.getElementById(trigger.getAttribute('aria-controls'));
		const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

		trigger.setAttribute('aria-expanded', String(!isExpanded));
		panel.setAttribute('aria-hidden', String(isExpanded));
		section.classList.toggle('is-open', !isExpanded);
	}

	handleAccordionKeydown(event, triggers) {
		const currentIndex = Array.from(triggers).indexOf(event.currentTarget);
		let nextIndex = currentIndex;

		if (event.key === 'ArrowDown') {
			nextIndex = (currentIndex + 1) % triggers.length;
		} else if (event.key === 'ArrowUp') {
			nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
		} else if (event.key === 'Home') {
			nextIndex = 0;
		} else if (event.key === 'End') {
			nextIndex = triggers.length - 1;
		} else {
			return;
		}

		event.preventDefault();
		triggers[nextIndex].focus();
	}

	render() {
		this.regionsList.innerHTML = this.regions.map(region => this.renderRegion(region)).join('');
	}

	renderRegion(region) {
		const isOpen = false;
		const triggerId = `region-trigger-${region.id}`;
		const panelId = `region-panel-${region.id}`;

		return `
			<section class="region-section${isOpen ? ' is-open' : ''}">
				<header class="region-header">
					<h2 class="region-heading">
						<button
							aria-controls="${panelId}"
							aria-expanded="${isOpen}"
							class="region-accordion-trigger"
							id="${triggerId}"
							type="button"
						>
							<span class="region-header-copy">
								<span class="region-title-text">${escapeHtml(region.name)}</span>
								<span class="region-regulator text-body-md">Regulator: ${escapeHtml(region.regulator)}</span>
							</span>
							<span class="region-accordion-icon" aria-hidden="true">▼</span>
						</button>
					</h2>
				</header>

				<div
					aria-hidden="${!isOpen}"
					aria-labelledby="${triggerId}"
					class="region-panel"
					id="${panelId}"
					role="region"
				>
					<div class="region-panel-inner grid grid-align-stretch grid-col-full">
						<aside class="region-sidebar grid-col-md-3">
							${this.renderLegalFramework(region)}
							<img alt="${escapeHtml(region.name)} Bottle" class="region-bottle" src="${region.bottleImage}" />
						</aside>

						<div class="region-main grid-col-md-9">
							${this.renderVarieties(region)}
							${region.subRegions ? this.renderSubRegions(region) : ''}
						</div>
					</div>
				</div>
			</section>
		`;
	}

	renderLegalFramework(region) {
		return `
			<div class="region-sidebar-block theme-accent">
				<h3 class="sidebar-title text-label">
					<img alt="Legal Icon" class="sidebar-title-icon" src="assets/images/icon-legal.svg" />
					LEGAL FRAMEWORK
				</h3>
				<ul class="list-reset text-body-sm">
					${region.legalFramework.map(rule => `
						<li><strong>${escapeHtml(rule.label)}:</strong> ${escapeHtml(rule.value)}</li>
					`).join('')}
				</ul>
			</div>
		`;
	}

	renderVarieties(region) {
		return `
			<div class="region-varieties">
				<h3 class="varieties-title text-heading-md font-sans-serif tracking-wide uppercase leading-normal">${escapeHtml(region.name)} Varieties</h3>
				<div class="varieties-list">
					${region.varieties.map(variety => this.renderVariety(variety)).join('')}
				</div>
			</div>
		`;
	}

	renderVariety(variety) {
		return `
			<div class="variety-item grid">
				<div class="variety-info grid-col-md-4">
					<h4 class="variety-name">${escapeHtml(variety.name)}</h4>
				</div>
				<div class="variety-description grid-col-md-8">
					<p>${escapeHtml(variety.description)}</p>
					<div class="variety-tags">
						${variety.tags.map(tag => `<span class="tag text-label">${escapeHtml(tag)}</span>`).join('')}
					</div>
				</div>
			</div>
		`;
	}

	renderSubRegions(region) {
		return `
			<div class="region-map">
				<h3 class="varieties-title text-heading-md font-sans-serif tracking-wide uppercase leading-normal">${escapeHtml(region.name)} Regions</h3>
				<div class="map-container grid grid-align-center">
					<div class="map-image grid-col-md-12 grid-col-lg-6">
						<img alt="${escapeHtml(region.name)} Regions Map" src="${region.mapImage}" />
					</div>
					<div class="sub-regions grid grid-col-md-12 grid-col-lg-6">
						${region.subRegions.map(sub => `
							<div class="sub-region grid-col-full">
								<h5>${escapeHtml(sub.name)}</h5>
								<p class="text-body-sm">${escapeHtml(sub.description)}</p>
							</div>
						`).join('')}
					</div>
				</div>
			</div>
		`;
	}
}
