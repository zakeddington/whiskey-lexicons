// Data constants
const LEXICON_TERMS = [
	{
		id: 'abv',
		name: 'Abv',
		category: 'Measurement',
		letter: 'A',
		description: 'Alcohol by Volume. A standard measure of how much alcohol (ethanol) is contained in a given volume of an alcoholic beverage. Whiskey typically ranges from 40% to cask strength levels above 60%.'
	},
	{
		id: 'angels-share',
		name: "Angel's Share",
		category: 'Phenomenon',
		letter: 'A',
		description: 'The portion of whiskey that evaporates from the barrel into the atmosphere during the aging process. In humid climates like Scotland, more alcohol evaporates, while in drier climates like Kentucky, more water evaporates.'
	},
	{
		id: 'annihilation',
		name: 'Annihilation',
		category: 'Tasting',
		letter: 'A',
		description: 'A colloquial tasting term referring to the complete masking of subtle nuances by a dominant note, often heavy peat or overly aggressive oak influence.'
	},
	{
		id: 'ballast',
		name: 'Ballast',
		category: 'Physics',
		letter: 'B',
		description: "The structural weight of a spirit's body, often derived from non-volatile components such as oils and esters that provide mouthfeel and viscosity."
	},
	{
		id: 'bung',
		name: 'Bung',
		category: 'Component',
		letter: 'B',
		description: 'The stopper used to seal the bung-hole in a barrel. Traditionally made of poplar or cork, modern bungs may be nylon or silicone. The bung-hole is always located in the widest part of the barrel (the bilge).'
	},
	{
		id: 'cask-strength',
		name: 'Cask Strength',
		category: 'Classification',
		letter: 'C',
		description: 'A whiskey bottled exactly as it comes out of the barrel, without the addition of water to lower the ABV. These spirits are prized for their purity and intensity of flavor.'
	},
	{
		id: 'charring',
		name: 'Charring',
		category: 'Process',
		letter: 'C',
		description: 'The process of burning the interior of a barrel. This creates a layer of carbon that acts as a filter and breaks down hemicellulose into sugars, providing vanilla and caramel notes to the whiskey.'
	}
];

const REGIONS = [
	{
		id: 'scotland',
		name: 'Scotland',
		regulator: 'Scotch Whisky Association (SWA) & HMRC',
		protectedIndication: 'Protected Indication',
		bottleImage: 'assets/images/bottle-scotch.svg',
		mapImage: 'assets/images/scotch-regions.svg',
		legalFramework: {
			location: 'Scotland.',
			ingredients: 'Water, yeast, malted barley.',
			aging: 'Min. 3 years.',
			bottling: 'Min. 40% ABV.'
		},
		varieties: [
			{
				name: 'Single Malt',
				description: '100% malted barley, batch distilled in copper pot stills at a single distillery. Aged for a minimum of 3 years in oak casks not exceeding 700L.',
				tags: ['100% Malted Barley', 'Pot Still', 'Single Distillery']
			},
			{
				name: 'Blended Scotch',
				description: 'A combination of one or more single malt Scotch whiskies with one or more single grain Scotch whiskies. The largest category by volume globally.',
				tags: ['Multi-Distillery', 'Malt & Grain']
			}
		],
		subRegions: [
			{ name: 'Speyside', description: "Home to over half of Scotland's distilleries. Known for elegant, complex, and fruit-forward malts." },
			{ name: 'Islay', description: 'Famous for pungent, peaty whiskies with notes of smoke, brine, and medicinal seaweed.' },
			{ name: 'Highlands', description: 'The largest region by area, offering a vast range of styles from light and floral to rich and peated.' },
			{ name: 'Lowlands', description: 'Traditionally known for lighter, grassier, unpeated whiskies, often triple-distilled.' },
			{ name: 'Campbeltown', description: "Once the 'Whisky Capital of the World', now a small but distinct region with robust, oily characters." }
		]
	},
	{
		id: 'usa',
		name: 'United States',
		regulator: 'TTB (Alcohol and Tobacco Tax and Trade Bureau)',
		protectedIndication: 'Title 27 CFR',
		bottleImage: 'assets/images/bottle-bourbon.svg',
		legalFramework: {
			grain: 'Fermented cereal grain.',
			aging: 'New charred oak containers.',
			bottling: 'Min. 80° proof.',
			special: { label: '"Straight"', value: 'Min. 2 years.' }
		},
		varieties: [
			{
				name: 'Bourbon',
				description: 'Produced from at least 51% corn. Must be aged in new charred oak containers. Distilled to no more than 160° proof.',
				tags: ['≥51% Corn', 'New Charred Oak', 'USA Only']
			}
		]
	},
	{
		id: 'ireland',
		name: 'Ireland',
		regulator: 'Dept. of Agriculture, Food and the Marine',
		protectedIndication: 'Technical File (2014)',
		bottleImage: 'assets/images/bottle-irish.svg',
		legalFramework: {
			location: 'Island of Ireland.',
			grain: 'Malted cereals.',
			aging: 'Min. 3 years wood.',
			bottling: 'Min. 40% ABV.'
		},
		varieties: [
			{
				name: 'Single Pot Still',
				description: 'Mix of malted (min 30%) and unmalted barley (min 30%). Distilled in pot stills at a single distillery.',
				tags: ['Malted & Unmalted Barley', 'Pot Still']
			}
		]
	},
	{
		id: 'japan',
		name: 'Japan',
		regulator: 'Japan Spirits & Liqueurs Makers Association',
		protectedIndication: 'Voluntary Standards',
		bottleImage: 'assets/images/bottle-japanese.svg',
		legalFramework: {
			location: 'Japan only.',
			ingredients: 'Water: Japanese source.',
			aging: 'Min. 3 years wood.',
			bottling: 'Japan, min 40% ABV.'
		},
		varieties: [
			{
				name: 'Single Malt',
				description: '100% malted barley, distilled in pot stills at a single distillery. Aged for a minimum of 3 years in oak casks.',
				tags: ['100% Malted Barley', 'Pot Still', 'Single Distillery']
			}
		]
	},
	{
		id: 'canada',
		name: 'Canada',
		regulator: 'Canadian Food Inspection Agency',
		protectedIndication: 'Voluntary Standards',
		bottleImage: 'assets/images/bottle-canadian.svg',
		legalFramework: {
			location: 'Canada.',
			grain: 'Fermented cereal grain.',
			aging: 'Min. 3 years wood.',
			bottling: 'Min. 40% ABV.'
		},
		varieties: [
			{
				name: 'Canadian Whisky',
				description: 'Typically a blend of corn, rye, and barley whiskies. Aged for a minimum of 3 years in oak barrels.',
				tags: ['Blend', 'Corn Base', 'Light & Smooth']
			}
		]
	}
];

// DOM elements
const searchInput = document.getElementById('search-input');
const sortAlphaBtn = document.getElementById('sort-alpha');
const sortCategoryBtn = document.getElementById('sort-category');
const lexiconEntries = document.getElementById('lexicon-entries');
const regionsList = document.getElementById('regions-list');

// State
let searchQuery = '';
let sortMode = 'alphabetical';

// Initialize the app
function init() {
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

	if (sortCategoryBtn) {
		sortCategoryBtn.addEventListener('click', () => setSortMode('category'));
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
	sortAlphaBtn.classList.toggle('active', mode === 'alphabetical');
	sortCategoryBtn.classList.toggle('active', mode === 'category');
	renderLexicon();
}

// Render lexicon
function renderLexicon() {
	if (!lexiconEntries) return;

	const filteredTerms = LEXICON_TERMS.filter(term =>
		term.name.toLowerCase().includes(searchQuery) ||
		term.category.toLowerCase().includes(searchQuery)
	);

	const groupedTerms = {};
	filteredTerms.forEach(term => {
		const key = term.letter;
		if (!groupedTerms[key]) groupedTerms[key] = [];
		groupedTerms[key].push(term);
	});

	const sortedLetters = Object.keys(groupedTerms).sort();

	lexiconEntries.innerHTML = sortedLetters.map(letter => {
		const terms = groupedTerms[letter];
		return `
			<section class="lexicon-section grid grid-col-full" id="${letter}">
				<div class="lexicon-letter text-display-md grid-col-md-2">${letter}</div>
				<div class="term-group grid grid-col-md-8">
					${terms.map(term => `
						<article class="term-item grid-col-full">
							<div class="term-heading">
								<span class="term-category text-label-sm tracking-wider">${term.category}</span>
								<h3>${term.name}</h3>
							</div>
							<p class="term-description">${term.description}</p>
						</article>
					`).join('')}
				</div>
			</section>
		`;
	}).join('');

	updateAlphabetNav(filteredTerms);
}

// Update alphabet navigation
function updateAlphabetNav(filteredTerms) {
	const activeLetters = new Set(filteredTerms.map(t => t.letter));
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	const alphabetLinks = document.querySelectorAll('.alphabet-link');

	if (alphabetLinks.length) {
		alphabetLinks.forEach(link => {
			const letter = link.textContent;
			if (activeLetters.has(letter)) {
				link.classList.remove('is-disabled');
			} else {
				link.classList.add('is-disabled');
			}
		});
	}
}

// Render regions
function renderRegions() {
	if (!regionsList) return;

	regionsList.innerHTML = REGIONS.map(region => `
		<section class="region-section grid grid-align-stretch grid-col-full">
			<aside class="region-sidebar grid-col-md-3">
				<div class="legal-framework">
					<h3 class="sidebar-title text-label-sm">
						LEGAL FRAMEWORK
					</h3>
					<ul class="legal-list text-body-sm">
						${region.legalFramework.location ? `<li><strong>Location:</strong> ${region.legalFramework.location}</li>` : ''}
						${region.legalFramework.ingredients ? `<li><strong>Ingredients:</strong> ${region.legalFramework.ingredients}</li>` : ''}
						${region.legalFramework.grain ? `<li><strong>Grain:</strong> ${region.legalFramework.grain}</li>` : ''}
						<li><strong>Aging:</strong> ${region.legalFramework.aging}</li>
						<li><strong>Bottling:</strong> ${region.legalFramework.bottling}</li>
						${region.legalFramework.special ? `<li><strong>${region.legalFramework.special.label}:</strong> ${region.legalFramework.special.value}</li>` : ''}
					</ul>
				</div>
				<img alt="${region.name} Bottle" class="region-bottle" src="${region.bottleImage}" />
			</aside>

			<div class="region-main grid-col-md-9">
				<div class="region-header">
					<span class="region-indicator text-label-sm">${region.protectedIndication}</span>
					<h2>${region.name}</h2>
					<p class="region-regulator">Regulator: ${region.regulator}</p>
				</div>

				<div class="region-varieties">
					<h3 class="varieties-title text-heading-md font-sans-serif tracking-wide uppercase leading-normal">${region.name} Varieties</h3>
					<div class="varieties-list">
						${region.varieties.map(variety => `
							<div class="variety-item grid">
								<div class="variety-info grid-col-md-3">
									<h4 class="variety-name">${variety.name}</h4>
								</div>
								<div class="variety-description grid-col-md-9">
									<p>${variety.description}</p>
									<div class="variety-tags">
										${variety.tags.map(tag => `<span class="tag text-label-sm">${tag}</span>`).join('')}
									</div>
								</div>
							</div>
						`).join('')}
					</div>
				</div>

				${region.subRegions ? `
					<div class="region-map">
						<h3 class="varieties-title text-heading-md font-sans-serif tracking-wide uppercase leading-normal">${region.name} Regions</h3>
						<div class="map-container grid grid-align-start">
							<div class="map-image grid-col-md-6">
								<img alt="${region.name} Regions Map" src="${region.mapImage}" />
							</div>
							<div class="sub-regions grid grid-col-md-6">
								${region.subRegions.map(sub => `
									<div class="sub-region grid-col-full">
										<h5>${sub.name}</h5>
										<p>${sub.description}</p>
									</div>
								`).join('')}
							</div>
						</div>
					</div>
				` : ''}
			</div>
		</section>
	`).join('');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
