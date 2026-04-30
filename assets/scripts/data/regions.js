// Region data
const REGIONS = [
	{
		id: 'scotland',
		name: 'Scotland',
		regulator: 'Regulated by the Scotch Whisky Regulations 2009 (SWR 2009)',
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
		regulator: 'Regulated by TTB (Alcohol and Tobacco Tax and Trade Bureau)',
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
		regulator: 'Regulated by Irish Whiskey Technical File (2014) & EU Geographic Indication',
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
		regulator: 'Regulated by Japan Spirits & Liqueurs Makers Association Standards (2021)',
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
		regulator: `Regulated by Canada's Food and Drug Regulations (Division 2, B.02.020)`,
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

