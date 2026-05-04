// DOM elements
const searchInput = document.getElementById('search-input');
const sortAlphaBtn = document.getElementById('sort-alpha');
const categorySelect = document.getElementById('category-select');
const lexiconEntries = document.getElementById('lexicon-entries');
const regionsList = document.getElementById('regions-list');

// State
let searchQuery = '';
let sortMode = 'alphabetical';
let selectedCategory = '';

const CATEGORY_ORDER = [
	'Measurements & Labeling',
	'Ingredients & Grain',
	'Malting & Mashing',
	'Fermentation & Chemistry',
	'Distillation',
	'Maturation & Wood',
	'Styles & Regulations',
	'People & Producers',
	'Regions & Terroir',
	'Tasting & Service'
];

function escapeHtml(value) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function normalizeTermName(value) {
	return value
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, ' ')
		.trim()
		.replace(/\s+/g, ' ');
}

function getTermByName(name) {
	const normalizedName = normalizeTermName(name);
	return LEXICON_TERMS.find(term => normalizeTermName(term.name) === normalizedName);
}

function getCategoryOrder(category) {
	const index = CATEGORY_ORDER.indexOf(category);
	return index === -1 ? CATEGORY_ORDER.length : index;
}

function getCategoryId(category) {
	return `category-${normalizeTermName(category).replace(/\s+/g, '-')}`;
}

function renderSeeAlso(term) {
	if (!term.seeAlso?.length) return '';

	const links = term.seeAlso
		.map(label => {
			const linkedTerm = getTermByName(label);
			const href = linkedTerm ? `#${linkedTerm.id}` : '#lexicon-entries';
			return `<a href="${href}">${escapeHtml(label)}</a>`;
		})
		.join(', ');

	return `<p class="text-body-sm">See also: ${links}</p>`;
}

// Initialize the app
function init() {
	setupCategorySelect();
	setupEventListeners();

	if (lexiconEntries) {
		renderLexicon();
	}

	if (regionsList) {
		renderRegions();
	}
}

// Event listeners
function setupEventListeners() {
	if (searchInput) {
		searchInput.addEventListener('input', handleSearch);
	}

	if (sortAlphaBtn) {
		sortAlphaBtn.addEventListener('click', () => setSortMode('alphabetical'));
	}

	if (categorySelect) {
		categorySelect.addEventListener('change', handleCategoryChange);
	}
}

// Search functionality
function handleSearch(e) {
	searchQuery = e.target.value.toLowerCase();
	renderLexicon();
}

// Sort functionality
function setSortMode(mode) {
	sortMode = mode;
	if (mode === 'alphabetical') {
		selectedCategory = '';
		if (categorySelect) categorySelect.value = '';
	}

	sortAlphaBtn.classList.toggle('active', mode === 'alphabetical');
	renderLexicon();
}

function setupCategorySelect() {
	if (!categorySelect) return;

	categorySelect.innerHTML = `
		<option value="">Categories</option>
		${CATEGORY_ORDER.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('')}
	`;
}

function handleCategoryChange(e) {
	selectedCategory = e.target.value;
	sortMode = selectedCategory ? 'category' : 'alphabetical';
	sortAlphaBtn.classList.toggle('active', sortMode === 'alphabetical');
	renderLexicon();
}

function setupRegionAccordions() {
	const triggers = document.querySelectorAll('.region-accordion-trigger');

	triggers.forEach(trigger => {
		trigger.addEventListener('click', () => toggleRegionAccordion(trigger));
		trigger.addEventListener('keydown', event => handleRegionAccordionKeydown(event, triggers));
	});
}

function toggleRegionAccordion(trigger) {
	const section = trigger.closest('.region-section');
	const panel = document.getElementById(trigger.getAttribute('aria-controls'));
	const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

	trigger.setAttribute('aria-expanded', String(!isExpanded));
	panel.setAttribute('aria-hidden', String(isExpanded));
	section.classList.toggle('is-open', !isExpanded);
}

function handleRegionAccordionKeydown(event, triggers) {
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

// Render lexicon
function renderLexicon() {
	if (!lexiconEntries) return;

	const filteredTerms = LEXICON_TERMS.filter(term =>
		(!selectedCategory || term.category === selectedCategory) &&
		(
			term.name.toLowerCase().includes(searchQuery) ||
			term.category.toLowerCase().includes(searchQuery) ||
			term.description.toLowerCase().includes(searchQuery)
		)
	);

	const groupedTerms = {};
	filteredTerms.forEach(term => {
		const key = sortMode === 'category' ? term.category : term.letter;
		if (!groupedTerms[key]) groupedTerms[key] = [];
		groupedTerms[key].push(term);
	});

	const sortedGroups = Object.keys(groupedTerms).sort((a, b) => {
		if (sortMode !== 'category') return a.localeCompare(b);

		return getCategoryOrder(a) - getCategoryOrder(b) || a.localeCompare(b);
	});

	lexiconEntries.innerHTML = sortedGroups.map(group => {
		const terms = groupedTerms[group].sort((a, b) => a.name.localeCompare(b.name));
		const sectionId = sortMode === 'category' ? getCategoryId(group) : group;
		const headingClass = sortMode === 'category'
			? 'lexicon-section-title is-category text-heading-md grid-col-md-2'
			: 'lexicon-section-title text-display-md grid-col-md-2';

		return `
			<section class="lexicon-section grid grid-col-full" id="${sectionId}">
				<div class="${headingClass}">${escapeHtml(group)}</div>
				<div class="term-group grid grid-col-md-8">
					${terms.map(term => `
						<article class="term-item grid-col-full" id="${term.id}">
							<div class="term-heading">
								<p class="text-label">${escapeHtml(term.category)}</p>
								<h3>${escapeHtml(term.name)}</h3>
							</div>
							<p class="term-description">${escapeHtml(term.description)}</p>
							${renderSeeAlso(term)}
						</article>
					`).join('')}
				</div>
			</section>
		`;
	}).join('');

	updateAlphabetNav(sortMode === 'alphabetical' ? filteredTerms : []);
}

// Update alphabet navigation
function updateAlphabetNav(filteredTerms) {
	const activeLetters = new Set(filteredTerms.map(t => t.letter));
	const alphabetLinks = document.querySelectorAll('.alphabet-link');

	if (alphabetLinks.length) {
		alphabetLinks.forEach(link => {
			const letter = link.textContent.trim();
			link.classList.toggle('active', activeLetters.has(letter));
		});
	}
}

// Render regions
function renderRegions() {
	if (!regionsList) return;

	regionsList.innerHTML = REGIONS.map((region, index) => {
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
						<div class="region-sidebar-block theme-accent">
							<h3 class="sidebar-title text-label">
								LEGAL FRAMEWORK
							</h3>
							<ul class="list-reset text-body-sm">
								${region.legalFramework.map(rule => `
									<li><strong>${escapeHtml(rule.label)}:</strong> ${escapeHtml(rule.value)}</li>
								`).join('')}
							</ul>
						</div>
						<img alt="${escapeHtml(region.name)} Bottle" class="region-bottle" src="${region.bottleImage}" />
					</aside>

					<div class="region-main grid-col-md-9">
						<div class="region-varieties">
							<h3 class="varieties-title text-heading-md font-sans-serif tracking-wide uppercase leading-normal">${escapeHtml(region.name)} Varieties</h3>
							<div class="varieties-list">
								${region.varieties.map(variety => `
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
								`).join('')}
							</div>
						</div>

						${region.subRegions ? `
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
						` : ''}
					</div>
				</div>
			</div>
		</section>
	`;
	}).join('');

	setupRegionAccordions();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
