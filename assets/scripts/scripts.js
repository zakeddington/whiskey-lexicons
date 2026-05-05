async function initApp() {
	if (document.getElementById('lexicon-entries')) {
		const { Lexicon } = await import('./components/lexicon.js');

		new Lexicon().init();
	}

	if (document.getElementById('regions-list')) {
		const { Regions } = await import('./components/regions.js');

		new Regions().init();
	}
}

document.addEventListener('DOMContentLoaded', initApp);
