// Region data
const REGIONS = [
	{
		id: 'scotland',
		name: 'Scotland',
		regulator: 'Regulated by the Scotch Whisky Regulations 2009 (SWR 2009)',
		bottleImage: 'assets/images/bottle-scotch.svg',
		mapImage: 'assets/images/scotch-regions.svg',
		legalFramework: [
			{ label: 'Production location', value: 'Must be entirely produced at a distillery in Scotland.' },
			{ label: 'Grain base', value: 'Made from water and malted barley for single malt, or whole grains of other cereals.' },
			{ label: 'Yeast only', value: 'Only yeast may be added to convert starches to sugars; no enzymes.' },
			{ label: 'Distillation ceiling', value: 'Must be distilled to fewer than 94.8% ABV to retain character of raw materials.' },
			{ label: 'Aging minimum', value: 'Must mature in Scotland in oak casks not exceeding 700 litres for a minimum of 3 years.' },
			{ label: 'Bottling minimum', value: 'Must be bottled at minimum 40% ABV.' },
			{ label: 'Permitted additives', value: 'Only water and plain caramel coloring (E150a) may be added. No other additives.' },
			{ label: 'Age statement', value: 'If stated, must reflect youngest whisky in the bottle.' }
		],
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
		legalFramework: [
			{ label: 'Grain base', value: 'Whisky must be produced from a fermented mash of grain.' },
			{ label: 'Distillation ceiling', value: 'Must be distilled to no more than 190° proof (95% ABV).' },
			{ label: 'Entry proof', value: 'Must enter the barrel at no more than 125° proof (62.5% ABV).' },
			{ label: 'Oak requirement', value: 'Must be aged in oak containers; type varies by category.' },
			{ label: 'Bottling minimum', value: 'Must be bottled at no less than 80° proof (40% ABV).' },
			{ label: 'Permitted additives', value: 'No colorings, flavorings, or additives permitted in straight whiskey designations. Blended categories may allow limited additions.' }
		],
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
		legalFramework: [
			{ label: 'Production location', value: 'Must be distilled and matured on the island of Ireland (Republic and Northern Ireland).' },
			{ label: 'Grain base', value: 'Produced from a mash of malted cereals, with or without whole unmalted cereal grains.' },
			{ label: 'Distillation ceiling', value: 'Distilled to less than 94.8% ABV to retain character of raw materials.' },
			{ label: 'Aging minimum', value: 'Aged minimum 3 years in wooden casks on the island of Ireland.' },
			{ label: 'Bottling minimum', value: 'Minimum 40% ABV.' },
			{ label: 'Permitted additives', value: 'Only water and caramel coloring. No other flavorings or additives.' }
		],
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
		legalFramework: [
			{ label: 'Production location', value: 'Must be saccharified, fermented, distilled, matured, and bottled in Japan.' },
			{ label: 'Water source', value: 'Must use water extracted in Japan.' },
			{ label: 'Grain base', value: 'Malted grains must be used; other grains may also be used.' },
			{ label: 'Distillation ceiling', value: 'Distilled to less than 95% ABV.' },
			{ label: 'Aging minimum', value: 'Must be aged in wooden casks of ≤700 litres for at least 3 years in Japan.' },
			{ label: 'Bottling minimum', value: 'Minimum 40% ABV.' },
			{ label: 'Permitted additives', value: 'Caramel coloring only. No flavoring additives.' },
			{ label: 'Historical context', value: 'Prior to 2021, there were no binding domestic regulations, allowing producers to import foreign whisky and bottle it as "Japanese whisky." The new standards closed this gap.' }
		],
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
		legalFramework: [
			{ label: 'Production location', value: 'Must be mashed, distilled, and aged in Canada.' },
			{ label: 'Grain base', value: 'Produced from cereal grains; no specific grain percentages mandated.' },
			{ label: 'Aging minimum', value: 'Must be aged in small wood containers for not less than 3 years.' },
			{ label: 'Bottling minimum', value: 'Minimum 40% ABV.' },
			{ label: 'Permitted additives', value: 'May contain caramel coloring, caramel flavoring, and up to 9.09% of other Canadian or foreign spirits, wine, or other flavorings; a notably liberal rule compared to other regions.' },
			{ label: 'Labeling note', value: '"Rye whisky" is legally synonymous with "Canadian whisky" regardless of actual rye content; historically produced with high rye content but this is not required today.' }
		],
		varieties: [
			{
				name: 'Canadian Whisky',
				description: 'Typically a blend of corn, rye, and barley whiskies. Aged for a minimum of 3 years in oak barrels.',
				tags: ['Blend', 'Corn Base', 'Light & Smooth']
			}
		]
	}
];
