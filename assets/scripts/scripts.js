async function initApp() {
	if (document.getElementById('lexicon-entries')) {
		const { Lexicon } = await import('./components/lexicon.js');

		new Lexicon().init();
	}

	if (document.getElementById('regions-list')) {
		const { Regions } = await import('./components/regions.js');

		new Regions().init();
	}

	if (document.getElementById('catalog-list')) {
		const { Catalog } = await import('./components/catalog.js');

		new Catalog().init();
	}
}

document.addEventListener('DOMContentLoaded', initApp);
