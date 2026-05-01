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
				name: 'Single Malt Scotch Whisky',
				description: 'Single Malt Scotch is made from 100% malted barley at one distillery, batch distilled in copper pot stills, and matured in Scotland for at least 3 years in oak casks no larger than 700 litres. It contains no grain whisky from other distilleries, so each distillery\'s make remains distinct.',
				tags: ['100% Malted Barley', 'Batch Pot Stills', 'Single Distillery', '3+ Years in Scotland', 'Oak Casks ≤700L', 'No Grain Whisky', 'Distinct Distillery Make']
			},
			{
				name: 'Single Grain Scotch',
				description: 'Single Grain Scotch is produced at one distillery from cereals other than, or in addition to, malted barley and is typically distilled in column stills. It tends to be lighter and more neutral than malt whisky, with major producers including Cameronbridge and Girvan.',
				tags: ['Single Distillery', 'Other Cereals Allowed', 'Column Distilled', 'Lighter Character', 'Cameronbridge & Girvan']
			},
			{
				name: 'Blended Malt Scotch',
				description: 'Blended Malt Scotch combines single malts from two or more Scottish distilleries without adding grain whisky. Formerly known as vatted malt or pure malt, it must still meet all Scotch regulations.',
				tags: ['Multiple Single Malts', 'Two or More Distilleries', 'No Grain Whisky', 'Formerly Vatted Malt', 'SWR 2009 Terms']
			},
			{
				name: 'Blended Grain Scotch',
				description: 'Blended Grain Scotch combines single grain whiskies from two or more distilleries without adding malt whisky. It is a relatively uncommon Scotch category.',
				tags: ['Multiple Single Grains', 'Two or More Distilleries', 'No Malt Whisky', 'Uncommon Category']
			},
			{
				name: 'Blended Scotch Whisky',
				description: 'Blended Scotch Whisky combines one or more single malts with one or more single grains and is the largest Scotch category by volume. Any age statement reflects the youngest component, major examples include Johnnie Walker and Chivas Regal, and Diageo and Pernod Ricard dominate the category.',
				tags: ['Malt & Grain', 'Largest Scotch Category', 'Youngest Age Statement', 'Johnnie Walker & Chivas', 'Diageo/Pernod Ricard']
			},
			{
				name: 'Peated Scotch',
				description: 'Peated Scotch is a non-legally defined style made with malted barley dried over peat fires, which adds phenolic smoky character measured in ppm. Islay is the most famous source, though peat is used across Scotch regions.',
				tags: ['Non-Legal Style', 'Peat-Dried Malt', 'Phenolic Smoke', 'Measured in PPM', 'Islay Famous', 'Used Across Regions']
			},
			{
				name: 'Cask Finish Scotch',
				description: 'Cask Finish Scotch is a non-legally defined style in which mature whisky is transferred from its primary cask into another cask type, such as sherry, port, wine, or rum, for additional maturation. The finishing duration varies by producer.',
				tags: ['Non-Legal Term', 'Secondary Cask', 'Sherry/Port/Wine/Rum', 'Additional Maturation', 'Producer-Defined Duration']
			},
			{
				name: 'NAS (No Age Statement)',
				description: 'NAS Scotch omits an age statement while still meeting the 3-year minimum for Scotch whisky. It gives producers flexibility to vat whiskies of different ages while maintaining a consistent flavor profile.',
				tags: ['No Age Stated', 'Still 3+ Years', 'Flexible Vatting', 'Consistent Flavor']
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
				description: 'Bourbon is the flagship American whiskey, made anywhere in the United States from a mash bill of at least 51% corn, aged in new charred oak, distilled to no more than 160° proof, entered into barrel at no more than 125° proof, and bottled at no less than 80° proof. It has no general age minimum, can qualify as straight after 2 years, needs no age statement once aged 4 years or more, and does not allow additives.',
				tags: ['≥51% Corn', 'New Charred Oak', 'Distilled ≤160°', 'Barreled ≤125°', 'Bottled ≥80°', 'No Age Minimum', 'Straight at 2+yr', 'No Age Statement ≥4yr', 'No Additives', 'USA-Wide']
			},
			{
				name: 'Straight Bourbon',
				description: 'Straight Bourbon follows all bourbon rules and adds a minimum 2-year aging requirement. If it is younger than 4 years, the age must be stated, and it cannot be blended with other spirits or contain additives.',
				tags: ['All Bourbon Rules', '2+ Years Aging', 'Age Stated <4yr', 'No Other Spirits', 'No Additives']
			},
			{
				name: 'Kentucky Straight Bourbon',
				description: 'Kentucky Straight Bourbon meets bourbon and straight bourbon requirements, then adds Kentucky distillation and at least 1 year of aging in Kentucky. It accounts for roughly 95% of global bourbon production.',
				tags: ['Bourbon Rules', 'Straight Bourbon Rules', 'Distilled in Kentucky', 'Aged in Kentucky', '1+ Year in Kentucky', '~95% of Bourbon']
			},
			{
				name: 'Tennessee Whiskey',
				description: 'Tennessee Whiskey meets bourbon criteria, must be produced in Tennessee, and must use the Lincoln County Process, which filters spirit through sugar maple charcoal before or during aging. Benjamin Prichard\'s is a notable exemption, while Jack Daniel\'s and George Dickel are primary examples.',
				tags: ['Bourbon Criteria', 'Made in Tennessee', 'Lincoln County Process', 'Maple Charcoal Filtering', 'Prichard\'s Exemption', 'Jack Daniel\'s & George Dickel']
			},
			{
				name: 'Rye Whiskey',
				description: 'Rye Whiskey uses a mash bill of at least 51% rye, matures in new charred oak, is distilled to no more than 160° proof, enters barrel at no more than 125° proof, and is bottled at no less than 80° proof.',
				tags: ['≥51% Rye', 'New Charred Oak', 'Distilled ≤160°', 'Barreled ≤125°', 'Bottled ≥80°']
			},
			{
				name: 'Straight Rye Whiskey',
				description: 'Straight Rye Whiskey follows rye whiskey rules with at least 2 years of aging, an age statement if under 4 years, no blending with other whisky types, and no additives. It is generally spicier and drier than bourbon, with lighter Maryland and heavier Pennsylvania or Monongahela traditions.',
				tags: ['Rye Rules', '2+ Years Aging', 'Age Stated <4yr', 'No Other Whisky Types', 'No Additives', 'Spicier/Drier', 'Maryland & Monongahela Styles']
			},
			{
				name: 'High-Rye Bourbon',
				description: 'High-Rye Bourbon is a non-legal designation for bourbon with elevated rye content, typically 20–35%, in the secondary grain bill. The added rye gives a spicier character, with Bulleit and Four Roses Single Barrel as common examples.',
				tags: ['Non-Legal Designation', '20–35% Rye', 'Secondary Grain', 'Spicier Character', 'Bulleit & Four Roses']
			},
			{
				name: 'Wheated Bourbon',
				description: 'Wheated Bourbon is a non-legal designation for bourbon that uses wheat as the dominant secondary grain instead of rye. The style is usually softer and sweeter, with W.L. Weller, Pappy Van Winkle, and Maker\'s Mark as familiar examples.',
				tags: ['Non-Legal Designation', 'Wheat Secondary Grain', 'No Rye Secondary', 'Softer Profile', 'Sweeter Profile', 'Weller/Pappy/Maker\'s']
			},
			{
				name: 'Wheat Whiskey',
				description: 'Wheat Whiskey uses a mash bill of at least 51% wheat, matures in new charred oak, follows the same proof limits as bourbon, and needs at least 2 years of aging for the straight designation.',
				tags: ['≥51% Wheat', 'New Charred Oak', 'Bourbon Proof Limits', 'Straight Requires 2+ Years']
			},
			{
				name: 'Malt Whiskey',
				description: 'American Malt Whiskey uses at least 51% malted barley, matures in new charred oak, and follows the same proof limits as bourbon. It is not required to use pot stills, and the straight designation requires at least 2 years of aging.',
				tags: ['≥51% Malted Barley', 'New Charred Oak', 'Bourbon Proof Limits', 'Pot Still Not Required', 'Straight Requires 2+ Years']
			},
			{
				name: 'Corn Whiskey',
				description: 'Corn Whiskey uses a mash bill of at least 80% corn, is distilled to no more than 160° proof, and does not require aging. If aged, it must use used or uncharred new oak, making it the major U.S. whiskey style not requiring new charred oak; it is often unaged as white dog and tied to moonshine tradition.',
				tags: ['≥80% Corn', 'Distilled ≤160°', 'No Aging Required', 'Used or Uncharred Oak', 'No New Charred Oak', 'Often White Dog', 'Moonshine Tradition']
			},
			{
				name: 'Bottled-in-Bond Bourbon',
				description: 'Bottled-in-Bond Bourbon must be the product of one distillation season, one distiller, and one distillery, then aged at least 4 years in a federally bonded warehouse and bottled at exactly 100° proof. The label must identify the distillery, making it a government-backed authenticity guarantee from the 1897 Bottled-in-Bond Act.',
				tags: ['One Season', 'One Distiller', 'One Distillery', '4+ Years Bonded', 'Exactly 100° Proof', 'Distillery on Label', '1897 Guarantee']
			},
			{
				name: 'Blended Whiskey',
				description: 'Blended Whiskey must contain at least 20% straight whiskey, while the remainder may be unaged neutral grain spirit or light whiskey. It may contain coloring or flavoring and must be labeled as blended.',
				tags: ['≥20% Straight Whiskey', 'Neutral/Light Whiskey Allowed', 'Coloring/Flavoring Allowed', 'Blended Label Required']
			},
			{
				name: 'Light Whiskey',
				description: 'Light Whiskey is distilled between 161° and 189° proof, aged in used or uncharred new oak, and designed for a lighter, more neutral flavor profile.',
				tags: ['161°–189° Proof', 'Used or Uncharred Oak', 'Light Character', 'Neutral Profile']
			},
			{
				name: 'Single Barrel Bourbon',
				description: 'Single Barrel Bourbon is a non-legal designation indicating that the bottling comes from one specific barrel rather than a blend of barrels. Each barrel differs, and premium examples often include age and barrel identification on the label.',
				tags: ['Non-Legal Designation', 'One Specific Barrel', 'Not Barrel-Blended', 'Each Barrel Differs', 'Age/Barrel ID Premium']
			},
			{
				name: 'Small Batch Bourbon',
				description: 'Small Batch Bourbon is an undefined marketing term suggesting a limited number of barrels blended together, often around 10–200 barrels, though no legal minimum or maximum exists.',
				tags: ['No Legal Definition', 'Limited Barrel Blend', 'Typically 10–200 Barrels', 'No Set Minimum/Maximum']
			},
			{
				name: 'Cask Strength / Barrel Proof',
				description: 'Cask Strength or Barrel Proof Bourbon is a non-legal designation for bourbon bottled directly from the barrel without dilution or with minimal dilution. It typically falls around 110–140° proof and must still meet all bourbon requirements.',
				tags: ['Non-Legal Designation', 'No or Minimal Dilution', 'Bottled from Barrel', 'Typically 110–140°', 'Bourbon Rules Still Apply']
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
				name: 'Irish Single Malt',
				description: 'Irish Single Malt is made from 100% malted barley at a single Irish distillery, distilled in pot stills, and aged at least 3 years. It is typically unpeated, with Connemara as a notable peated exception, and is often triple-distilled for smoothness.',
				tags: ['100% Malted Barley', 'Pot Still Distillation', 'Single Irish Distillery', '3+ Years Aging', 'Typically Unpeated', 'Connemara Exception', 'Often Triple-Distilled']
			},
			{
				name: 'Single Pot Still Irish',
				description: 'Single Pot Still Irish is Ireland\'s most distinctive whiskey category, made at one distillery from a mix of malted and unmalted barley with at least 30% of each. It is distilled only in pot stills, giving a creamy texture, green or grassy notes, spicy character, and characteristic oiliness, and it was historically dominant before Prohibition damaged export markets.',
				tags: ['Distinctively Irish', '≥30% Malted Barley', '≥30% Unmalted Barley', 'Pot Still Only', 'Single Distillery', 'Creamy Texture', 'Green/Grassy Notes', 'Spicy/Oily Character', 'Historically Dominant']
			},
			{
				name: 'Single Grain Irish',
				description: 'Single Grain Irish comes from one distillery and may use cereals other than, or in addition to, malted barley. It is typically column-distilled, producing a lighter and sweeter character.',
				tags: ['Single Distillery', 'Other Cereals Allowed', 'Column Distilled', 'Lighter Character', 'Sweeter Character']
			},
			{
				name: 'Blended Irish Whiskey',
				description: 'Blended Irish Whiskey combines two or more Irish whiskey categories and is the most widely sold Irish style. Familiar examples include Jameson, Bushmills Black Bush, and Tullamore D.E.W.',
				tags: ['Two or More Categories', 'Most Widely Sold', 'Jameson', 'Bushmills Black Bush', 'Tullamore D.E.W.']
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
				name: 'Japanese Single Malt',
				description: 'Japanese Single Malt is made from 100% malted barley at a single Japanese distillery, distilled in pot stills, and aged at least 3 years in Japan. Producers often use diverse cask types, including Mizunara oak, ex-sherry, and ex-bourbon, and Japanese distilleries commonly run multiple still shapes to create blending diversity in-house.',
				tags: ['100% Malted Barley', 'Pot Still', 'Single Japanese Distillery', '3+ Years in Japan', 'Mizunara/Ex-Sherry/Ex-Bourbon', 'Multiple Still Shapes', 'Internal Blending Diversity']
			},
			{
				name: 'Blended Japanese Whisky',
				description: 'Blended Japanese Whisky combines malt and grain whiskies, and under the 2021 standards all components must be produced and aged in Japan, though historically some blends included imported spirit. Suntory and Nikka dominate the category, and cross-company barrel exchange is rare compared with Scotland.',
				tags: ['Malt & Grain Whisky', 'All Japanese Components', '2021 Standards', 'Historically Imported Spirit', 'Suntory & Nikka', 'Rare Barrel Exchanges']
			},
			{
				name: 'Grain Whisky (Japanese)',
				description: 'Japanese Grain Whisky is made from grains other than, or in addition to, malted barley and is typically column-distilled. It is generally lighter and cleaner in character and is often used as a blending component.',
				tags: ['Other Grains Allowed', 'Includes Malted Barley Option', 'Column Distilled', 'Blending Component', 'Lighter/Cleaner Character']
			},
			{
				name: 'Mizunara Expression',
				description: 'A Mizunara Expression is a non-legal designation for whisky matured in Mizunara, the porous and difficult-to-cooper Japanese oak Quercus mongolica. It can add sandalwood, incense, and coconut notes, and is rare and expensive.',
				tags: ['Non-Legal Designation', 'Mizunara Oak', 'Quercus Mongolica', 'Porous & Difficult', 'Sandalwood/Incense/Coconut', 'Rare & Expensive']
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
				name: 'Canadian Whisky / Rye',
				description: 'Canadian Whisky, legally synonymous with rye whisky in Canada, is the primary national designation. It has no mash bill restrictions, comes from a blending-focused tradition, is often light and smooth, and includes examples such as Crown Royal and Canadian Club.',
				tags: ['Primary Designation', 'Rye Synonym', 'No Mash Bill Restrictions', 'Blending Tradition', 'Light & Smooth', 'Crown Royal', 'Canadian Club']
			},
			{
				name: 'Single Malt Canadian',
				description: 'Single Malt Canadian is an emerging category made from 100% malted barley at one distillery. It follows general Canadian aging rules and is increasingly associated with craft distilleries.',
				tags: ['Emerging Category', '100% Malted Barley', 'Single Distillery', 'Canadian Aging Rules', 'Craft Distillery Trend']
			},
			{
				name: 'Single Barrel Canadian',
				description: 'Single Barrel Canadian is a non-legally defined marketing designation indicating whisky from one specific barrel. There is no regulatory standard, so transparency depends on the producer.',
				tags: ['Non-Legal Marketing', 'One Specific Barrel', 'No Regulatory Standard', 'Producer Transparency']
			}
		]
	}
];
