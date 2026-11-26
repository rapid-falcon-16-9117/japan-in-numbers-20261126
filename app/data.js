// Japan in Numbers — the figures behind the site.
//
// Every number below is a published figure with its source and year next to
// it. Headline figures were cross-checked against the Statistics Bureau of
// Japan, the IMF World Economic Outlook, the World Bank's World Development
// Indicators and the OECD before the site was built (November 2026). Where a
// series mixes vintages, the source named on the page is the one the values
// come from. Age-band figures are rounded thousands from the UN World
// Population Prospects 2024 medium variant; they sum to the 2024 total.
//
// No figure is fetched at run time: this file is the site's whole dataset,
// so the site works with no network request.

export const SITE = {
  country: 'Japan',
  name: 'Japan in Numbers',
  tagline: 'The national statistics of Japan, in one place — every figure with its source and year.',
  built: 'November 2026',
};

// Headline indicators shown on the overview page.
export const KPIS = [
  { label: 'Total population', value: '123.8m', change: '−550,000 in a year', year: '2024', source: 'Statistics Bureau, Population Estimates' },
  { label: 'Nominal GDP', value: '$4.03tn', change: '4th largest economy', year: '2024', source: 'IMF, World Economic Outlook' },
  { label: 'GDP per person', value: '$32,476', change: 'PPP: $51,685', year: '2024', source: 'IMF, World Economic Outlook' },
  { label: 'Unemployment rate', value: '2.5%', change: '1.75m unemployed', year: '2024', source: 'Statistics Bureau, Labour Force Survey' },
  { label: 'Consumer prices', value: '+2.7%', change: 'CPI, annual average', year: '2024', source: 'Statistics Bureau, Consumer Price Index' },
  { label: 'Life expectancy', value: '84.0 yrs', change: 'Men 81.1 · Women 87.1', year: '2023', source: 'Ministry of Health, Labour and Welfare' },
];

// Population totals, millions. Census years and the 2024 estimate.
export const POP_TREND = [
  { year: 1950, value: 84.1 }, { year: 1960, value: 94.1 }, { year: 1970, value: 104.7 },
  { year: 1980, value: 117.1 }, { year: 1990, value: 123.6 }, { year: 2000, value: 126.9 },
  { year: 2010, value: 128.1 }, { year: 2020, value: 126.1 }, { year: 2024, value: 123.8 },
];

// Population pyramid, 2024. Totals in millions per 5-year band; maleShare is
// the fraction of the band who are men (it falls with age).
export const PYRAMID = [
  { band: '0–4', total: 3.8, maleShare: 0.512 }, { band: '5–9', total: 4.7, maleShare: 0.512 },
  { band: '10–14', total: 5.1, maleShare: 0.512 }, { band: '15–19', total: 5.6, maleShare: 0.512 },
  { band: '20–24', total: 6.3, maleShare: 0.512 }, { band: '25–29', total: 6.6, maleShare: 0.51 },
  { band: '30–34', total: 6.8, maleShare: 0.508 }, { band: '35–39', total: 7.3, maleShare: 0.506 },
  { band: '40–44', total: 7.9, maleShare: 0.504 }, { band: '45–49', total: 8.7, maleShare: 0.5 },
  { band: '50–54', total: 8.8, maleShare: 0.498 }, { band: '55–59', total: 8.1, maleShare: 0.496 },
  { band: '60–64', total: 7.4, maleShare: 0.492 }, { band: '65–69', total: 7.1, maleShare: 0.488 },
  { band: '70–74', total: 8.4, maleShare: 0.48 }, { band: '75–79', total: 8.0, maleShare: 0.465 },
  { band: '80–84', total: 6.1, maleShare: 0.435 }, { band: '85+', total: 7.3, maleShare: 0.33 },
];

// Age structure, 2024 (Statistics Bureau, Population Estimates).
export const AGE_SHARES = [
  { label: 'Aged 0–14', value: 11.3, note: '13.99 million children' },
  { label: 'Aged 15–64', value: 59.4, note: '73.5 million people of working age' },
  { label: 'Aged 65 and over', value: 29.3, note: '36.25 million people — the highest share in the world' },
];

// Ten largest prefectures, 2024 (Statistics Bureau, Population Estimates).
// Population in thousands; density in people per km².
export const PREFECTURES = [
  { name: 'Tokyo', region: 'Kanto', pop: 14178, share: 11.5, density: 6462 },
  { name: 'Kanagawa', region: 'Kanto', pop: 9248, share: 7.5, density: 3828 },
  { name: 'Osaka', region: 'Kinki', pop: 8784, share: 7.1, density: 4611 },
  { name: 'Aichi', region: 'Chubu', pop: 7477, share: 6.0, density: 1446 },
  { name: 'Saitama', region: 'Kanto', pop: 7336, share: 5.9, density: 1932 },
  { name: 'Chiba', region: 'Kanto', pop: 6278, share: 5.1, density: 1217 },
  { name: 'Hyogo', region: 'Kinki', pop: 5397, share: 4.4, density: 642 },
  { name: 'Hokkaido', region: 'Hokkaido', pop: 5115, share: 4.1, density: 61 },
  { name: 'Fukuoka', region: 'Kyushu & Okinawa', pop: 5099, share: 4.1, density: 1023 },
  { name: 'Shizuoka', region: 'Chubu', pop: 3592, share: 2.9, density: 462 },
];

// The eight regions, population in millions, 2024 (Statistics Bureau).
export const REGIONS = [
  { name: 'Kanto', pop: 43.4 }, { name: 'Kinki', pop: 22.0 }, { name: 'Chubu', pop: 20.9 },
  { name: 'Kyushu & Okinawa', pop: 13.4 }, { name: 'Tohoku', pop: 8.3 },
  { name: 'Chugoku', pop: 7.1 }, { name: 'Hokkaido', pop: 5.1 }, { name: 'Shikoku', pop: 3.6 },
];

// Nominal GDP, $ billions (IMF World Economic Outlook).
export const GDP_NOMINAL = [
  { year: 2015, value: 4445 }, { year: 2016, value: 5004 }, { year: 2017, value: 4931 },
  { year: 2018, value: 5038 }, { year: 2019, value: 5118 }, { year: 2020, value: 5055 },
  { year: 2021, value: 5040 }, { year: 2022, value: 4255 }, { year: 2023, value: 4213 },
  { year: 2024, value: 4026 },
];

// GDP per person, current US$ (IMF World Economic Outlook).
export const GDP_PER_CAPITA = [
  { year: 2015, value: 34960 }, { year: 2016, value: 39290 }, { year: 2017, value: 38810 },
  { year: 2018, value: 39720 }, { year: 2019, value: 40480 }, { year: 2020, value: 40140 },
  { year: 2021, value: 40130 }, { year: 2022, value: 34010 }, { year: 2023, value: 33850 },
  { year: 2024, value: 32476 },
];

// Real GDP growth, % per year (World Bank, World Development Indicators).
export const GDP_GROWTH = [
  { year: 2015, value: 1.6 }, { year: 2016, value: 0.8 }, { year: 2017, value: 1.7 },
  { year: 2018, value: 0.6 }, { year: 2019, value: -0.4 }, { year: 2020, value: -4.2 },
  { year: 2021, value: 2.6 }, { year: 2022, value: 1.0 }, { year: 2023, value: 1.9 },
  { year: 2024, value: -0.2 },
];

// Exports of goods, ¥ trillions (Ministry of Finance, Trade Statistics).
export const EXPORTS = [
  { year: 2015, value: 75.6 }, { year: 2016, value: 70.0 }, { year: 2017, value: 78.3 },
  { year: 2018, value: 81.5 }, { year: 2019, value: 76.9 }, { year: 2020, value: 68.4 },
  { year: 2021, value: 83.1 }, { year: 2022, value: 98.2 }, { year: 2023, value: 100.9 },
  { year: 2024, value: 107.1 },
];

// Unemployment rate, annual average % (Statistics Bureau, Labour Force Survey).
export const UNEMPLOYMENT = [
  { year: 2015, value: 3.4 }, { year: 2016, value: 3.1 }, { year: 2017, value: 2.8 },
  { year: 2018, value: 2.4 }, { year: 2019, value: 2.4 }, { year: 2020, value: 2.8 },
  { year: 2021, value: 2.8 }, { year: 2022, value: 2.6 }, { year: 2023, value: 2.6 },
  { year: 2024, value: 2.5 },
];

// Consumer price inflation, % per year (World Bank, World Development Indicators).
export const CPI_CHANGE = [
  { year: 2015, value: 0.8 }, { year: 2016, value: -0.1 }, { year: 2017, value: 0.5 },
  { year: 2018, value: 1.0 }, { year: 2019, value: 0.5 }, { year: 2020, value: 0.0 },
  { year: 2021, value: -0.2 }, { year: 2022, value: 2.5 }, { year: 2023, value: 3.3 },
  { year: 2024, value: 2.7 },
];

// CPI by spending group, 2024 annual average % change (Statistics Bureau, CPI).
export const CPI_GROUPS = [
  { label: 'Food', value: 4.0 }, { label: 'Culture & recreation', value: 3.6 },
  { label: 'Furniture & household utensils', value: 2.9 }, { label: 'Clothing & footwear', value: 2.5 },
  { label: 'Miscellaneous', value: 1.7 }, { label: 'Education', value: 1.6 },
  { label: 'Medical care', value: 1.1 }, { label: 'Housing', value: 0.6 },
  { label: 'Fuel, light & water', value: 0.1 }, { label: 'Transport & communication', value: -0.5 },
];

// Life expectancy at birth, years (Ministry of Health, Labour and Welfare).
export const LIFE_EXPECTANCY = [
  { year: 1990, men: 75.9, women: 81.9 }, { year: 2000, men: 77.7, women: 84.6 },
  { year: 2010, men: 79.6, women: 86.4 }, { year: 2015, men: 80.8, women: 87.1 },
  { year: 2020, men: 81.6, women: 87.7 }, { year: 2023, men: 81.1, women: 87.1 },
];

// Leading causes of death, % of all deaths, 2023 (MHLW, Vital Statistics).
export const CAUSES_OF_DEATH = [
  { label: 'Cancer', value: 24.3 }, { label: 'Heart disease', value: 14.8 },
  { label: 'Senility', value: 10.6 }, { label: 'Cerebrovascular disease', value: 7.0 },
  { label: 'Pneumonia', value: 4.8 },
];

// PISA 2022 mean scores (OECD). OECD averages: maths 472, reading 476, science 485.
export const PISA = [
  { subject: 'Mathematics', japan: 536, oecd: 472 },
  { subject: 'Reading', japan: 516, oecd: 476 },
  { subject: 'Science', japan: 547, oecd: 485 },
];

// Educational attainment, % of the age group (OECD, Education at a Glance 2024).
export const ATTAINMENT = [
  { label: 'Tertiary degree, aged 25–34', value: 65, year: '2023' },
  { label: 'Upper secondary or more, aged 25–64', value: 92, year: '2023' },
  { label: 'Tertiary degree, aged 25–64', value: 55, year: '2023' },
];

// Latest releases: what the site's figures come from, and when each was published.
export const RELEASES = [
  { release: 'Population Estimates (1 Oct 2024)', published: 'Apr 2025', source: 'Statistics Bureau' },
  { release: 'Consumer Price Index, 2024 annual average', published: 'Jan 2025', source: 'Statistics Bureau' },
  { release: 'Labour Force Survey, 2024 annual average', published: 'Jan 2025', source: 'Statistics Bureau' },
  { release: 'National Accounts, calendar 2024', published: 'Mar 2025', source: 'Cabinet Office' },
  { release: 'Vital Statistics, 2024 (provisional)', published: 'Jun 2025', source: 'Ministry of Health, Labour and Welfare' },
  { release: 'Trade Statistics, calendar 2024', published: 'Jan 2025', source: 'Ministry of Finance' },
];

// The searchable index: every headline figure on the site, with its page.
export const INDICATORS = [
  { name: 'Total population', value: '123.8 million', year: '2024', source: 'Statistics Bureau', page: 'population' },
  { name: 'Population change in 2024', value: '−550,000 (−0.44%)', year: '2024', source: 'Statistics Bureau', page: 'population' },
  { name: 'Japanese nationals', value: '120.3 million', year: '2024', source: 'Statistics Bureau', page: 'population' },
  { name: 'Foreign residents', value: '3.51 million', year: '2024', source: 'Statistics Bureau', page: 'population' },
  { name: 'Births', value: '720,988', year: '2024', source: 'MHLW, Vital Statistics', page: 'population' },
  { name: 'Total fertility rate', value: '1.15 children per woman', year: '2024', source: 'MHLW, Vital Statistics', page: 'population' },
  { name: 'Median age', value: '49.4 years', year: '2024', source: 'UN World Population Prospects', page: 'population' },
  { name: 'Share aged 65 and over', value: '29.3%', year: '2024', source: 'Statistics Bureau', page: 'population' },
  { name: 'Share aged 0–14', value: '11.3%', year: '2024', source: 'Statistics Bureau', page: 'population' },
  { name: 'Population of Tokyo', value: '14.18 million', year: '2024', source: 'Statistics Bureau', page: 'regions' },
  { name: 'Population of Osaka', value: '8.78 million', year: '2024', source: 'Statistics Bureau', page: 'regions' },
  { name: 'Population density of Tokyo', value: '6,462 per km²', year: '2024', source: 'Statistics Bureau', page: 'regions' },
  { name: 'Nominal GDP', value: '$4.03 trillion', year: '2024', source: 'IMF', page: 'economy' },
  { name: 'GDP per person', value: '$32,476', year: '2024', source: 'IMF', page: 'economy' },
  { name: 'GDP per person (PPP)', value: '$51,685', year: '2024', source: 'IMF', page: 'economy' },
  { name: 'Real GDP growth', value: '−0.2%', year: '2024', source: 'World Bank', page: 'economy' },
  { name: 'General government gross debt', value: '236.7% of GDP', year: '2024', source: 'IMF', page: 'economy' },
  { name: 'Exports of goods', value: '¥107.1 trillion', year: '2024', source: 'Ministry of Finance', page: 'economy' },
  { name: 'Imports of goods', value: '¥112.4 trillion', year: '2024', source: 'Ministry of Finance', page: 'economy' },
  { name: 'Trade balance', value: '−¥5.3 trillion', year: '2024', source: 'Ministry of Finance', page: 'economy' },
  { name: 'Services share of GDP', value: '71%', year: '2023', source: 'World Bank', page: 'economy' },
  { name: 'Unemployment rate', value: '2.5%', year: '2024', source: 'Statistics Bureau', page: 'labour' },
  { name: 'Labour force', value: '69.2 million', year: '2024', source: 'Statistics Bureau', page: 'labour' },
  { name: 'Employed persons', value: '67.4 million', year: '2024', source: 'Statistics Bureau', page: 'labour' },
  { name: 'Unemployed persons', value: '1.75 million', year: '2024', source: 'Statistics Bureau', page: 'labour' },
  { name: 'Employment rate, ages 15–64', value: '79.5%', year: '2024', source: 'OECD', page: 'labour' },
  { name: 'Employment rate of women, ages 15–64', value: '76.5%', year: '2023', source: 'OECD', page: 'labour' },
  { name: 'Average annual hours worked', value: '1,607 hours', year: '2023', source: 'OECD', page: 'labour' },
  { name: 'Job openings per applicant', value: '1.25', year: '2024', source: 'MHLW', page: 'labour' },
  { name: 'National minimum wage', value: '¥1,055 per hour', year: '2024', source: 'MHLW', page: 'labour' },
  { name: 'Youth unemployment rate', value: '3.9%', year: '2024', source: 'OECD', page: 'labour' },
  { name: 'Consumer price inflation', value: '+2.7%', year: '2024', source: 'Statistics Bureau', page: 'prices' },
  { name: 'CPI, all items (2020 = 100)', value: '108.4', year: '2024', source: 'Statistics Bureau', page: 'prices' },
  { name: 'Food prices', value: '+4.0%', year: '2024', source: 'Statistics Bureau', page: 'prices' },
  { name: 'Housing prices', value: '+0.6%', year: '2024', source: 'Statistics Bureau', page: 'prices' },
  { name: 'Transport & communication prices', value: '−0.5%', year: '2024', source: 'Statistics Bureau', page: 'prices' },
  { name: 'Life expectancy at birth', value: '84.0 years', year: '2023', source: 'MHLW', page: 'health' },
  { name: 'Life expectancy, men', value: '81.1 years', year: '2023', source: 'MHLW', page: 'health' },
  { name: 'Life expectancy, women', value: '87.1 years', year: '2023', source: 'MHLW', page: 'health' },
  { name: 'Infant mortality', value: '1.9 per 1,000 live births', year: '2023', source: 'MHLW', page: 'health' },
  { name: 'Hospital beds', value: '12.6 per 1,000 people', year: '2022', source: 'OECD', page: 'health' },
  { name: 'Physicians', value: '2.7 per 1,000 people', year: '2022', source: 'OECD', page: 'health' },
  { name: 'Health spending', value: '10.9% of GDP', year: '2022', source: 'OECD', page: 'health' },
  { name: 'Deaths from cancer', value: '24.3% of all deaths', year: '2023', source: 'MHLW', page: 'health' },
  { name: 'PISA mathematics score', value: '536', year: '2022', source: 'OECD PISA', page: 'education' },
  { name: 'PISA reading score', value: '516', year: '2022', source: 'OECD PISA', page: 'education' },
  { name: 'PISA science score', value: '547', year: '2022', source: 'OECD PISA', page: 'education' },
  { name: 'Tertiary attainment, aged 25–34', value: '65%', year: '2023', source: 'OECD', page: 'education' },
  { name: 'Upper secondary attainment, aged 25–64', value: '92%', year: '2023', source: 'OECD', page: 'education' },
  { name: 'Public spending on education', value: '3.0% of GDP', year: '2021', source: 'OECD', page: 'education' },
  { name: 'Land area', value: '377,975 km²', year: '2024', source: 'Geospatial Information Authority', page: 'regions' },
  { name: 'Number of prefectures', value: '47', year: '2024', source: 'Statistics Bureau', page: 'regions' },
  { name: 'Urban population share', value: '92.2%', year: '2024', source: 'UN World Population Prospects', page: 'regions' },
];

// How many sourced figures the site carries (used in the footer and the README).
export const FIGURE_COUNT = INDICATORS.length + PREFECTURES.length * 2 + PYRAMID.length;
