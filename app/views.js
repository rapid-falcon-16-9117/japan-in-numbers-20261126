// Page templates for Japan in Numbers.
//
// Each page is a function returning HTML. All figures come from data.js and
// every figure carries its source and year on the page itself. Controls on a
// page (the selectors and sort buttons) are real: main.js wires them to
// re-render the chart or table they name.

import {
  KPIS, POP_TREND, PYRAMID, AGE_SHARES, PREFECTURES, REGIONS, GDP_NOMINAL,
  GDP_PER_CAPITA, GDP_GROWTH, EXPORTS, UNEMPLOYMENT, CPI_CHANGE, CPI_GROUPS,
  LIFE_EXPECTANCY, CAUSES_OF_DEATH, PISA, ATTAINMENT, RELEASES, INDICATORS,
  FIGURE_COUNT, SITE,
} from './data.js';
import { lineChart, barChart, pyramid, esc } from './charts.js';

const source = (text) => `<p class="source">Source: ${esc(text)}</p>`;
const h = (text, sub) => `<h1>${esc(text)}</h1>${sub ? `<p class="lede">${esc(sub)}</p>` : ''}`;
const card = (label, value, change, year, src) =>
  `<div class="kpi"><div class="kpi-label">${esc(label)}</div><div class="kpi-value">${esc(value)}</div>` +
  `<div class="kpi-change">${esc(change)}</div><div class="kpi-meta">${esc(year)} · ${esc(src)}</div></div>`;

// ---------------------------------------------------------------- overview
export function overview() {
  const tiles = [
    ['population', 'Population', '123.8 million people, and falling for 14 years'],
    ['economy', 'Economy', 'A $4.03 trillion economy — the world’s 4th largest'],
    ['labour', 'Work', '2.5% unemployment and 1,607 hours a year'],
    ['prices', 'Prices', 'Inflation of 2.7% after decades near zero'],
    ['health', 'Health', '84.0 years of life expectancy, the world’s longest'],
    ['education', 'Education', 'PISA maths 536 — above the OECD average of 472'],
    ['regions', 'Regions', '47 prefectures, from Tokyo’s 14.2m to Tottori’s 0.5m'],
    ['sources', 'Sources & methods', 'Where every figure comes from'],
  ].map(([page, title, blurb]) =>
    `<a class="tile" href="#/${page}"><span class="tile-title">${esc(title)}</span><span class="tile-blurb">${esc(blurb)}</span><span class="tile-go">Open →</span></a>`).join('');
  return `
  <section class="hero"><p class="eyebrow">National statistics · ${esc(SITE.country)}</p>
  ${h('Japan in numbers', 'The population, economy, work, prices, health, education and regions of Japan — 9 pages, 14 charts and ' + FIGURE_COUNT + ' sourced figures, each with its source and year.')}
  </section>
  <section class="kpis" aria-label="Key indicators">${KPIS.map((k) => card(k.label, k.value, k.change, k.year, k.source)).join('')}</section>
  <section class="panel"><h2>Population, 1950–2024</h2>
  <p>Japan’s population peaked at 128.1 million in 2010 and has fallen every year since. The 2024 estimate is 123.8 million.</p>
  ${lineChart(POP_TREND, { unit: 'm', decimals: 1 })}
  ${source('Statistics Bureau of Japan, Population Estimates and Population Census.')}
  <p><a href="#/population">See the full population page →</a></p></section>
  <section class="panel"><h2>Find a figure</h2>
  <p><label for="q">Search ${INDICATORS.length} headline indicators by name:</label></p>
  <input id="q" type="search" placeholder="Try “unemployment”, “fertility” or “PISA”…" autocomplete="off">
  <ul id="results" class="results"></ul></section>
  <section><h2>Explore the statistics</h2><div class="tiles">${tiles}</div></section>
  <section class="panel"><h2>Latest releases</h2>
  <table class="data"><thead><tr><th>Release</th><th>Published</th><th>Publisher</th></tr></thead><tbody>
  ${RELEASES.map((r) => `<tr><td>${esc(r.release)}</td><td>${esc(r.published)}</td><td>${esc(r.source)}</td></tr>`).join('')}
  </tbody></table></section>`;
}

// -------------------------------------------------------------- population
export function population() {
  return `
  ${h('Population', '123.8 million people on 1 October 2024 — down 550,000 (−0.44%) on a year earlier, the 14th consecutive annual fall.')}
  <section class="kpis">${card('Total population', '123.8m', '−550,000 in a year', '2024', 'Statistics Bureau, Population Estimates')}
  ${card('Japanese nationals', '120.3m', '−898,000 in a year', '2024', 'Statistics Bureau, Population Estimates')}
  ${card('Foreign residents', '3.51m', '+342,000 in a year', '2024', 'Statistics Bureau, Population Estimates')}
  ${card('Births', '720,988', 'Fewest on record', '2024', 'MHLW, Vital Statistics (provisional)')}
  ${card('Total fertility rate', '1.15', 'Children per woman', '2024', 'MHLW, Vital Statistics')}
  ${card('Median age', '49.4 years', 'One of the oldest populations', '2024', 'UN World Population Prospects 2024')}</section>
  <section class="panel"><h2>Population by age, 2024</h2>
  <p>Men on the left, women on the right, in millions. The bulge at ages 70–79 is the post-war baby boom; the narrow base is the low birth rate.</p>
  ${pyramid(PYRAMID)}
  ${source('United Nations, World Population Prospects 2024, medium variant. Bands are rounded and sum to the 2024 total.')}</section>
  <section class="panel"><h2>Population, 1950–2024</h2>
  ${lineChart(POP_TREND, { unit: 'm', decimals: 1 })}
  ${source('Statistics Bureau of Japan, Population Estimates and Population Census.')}</section>
  <section class="panel"><h2>Who lives here</h2>
  ${barChart(AGE_SHARES.map((a) => ({ label: a.label, value: a.value })), { unit: '%' })}
  <ul class="notes">${AGE_SHARES.map((a) => `<li><strong>${esc(a.label)} — ${a.value}%.</strong> ${esc(a.note)}</li>`).join('')}</ul>
  ${source('Statistics Bureau of Japan, Population Estimates, 1 October 2024.')}</section>
  <section class="panel"><h2>Why it is shrinking</h2>
  <p>Deaths have outnumbered births since 2007. In 2024 there were 720,988 births and about 1.62 million deaths — a natural decrease of roughly 900,000 people, partly offset by net immigration of about 342,000. Only Tokyo and Saitama prefectures grew in 2024; the other 45 shrank.</p>
  ${source('Statistics Bureau of Japan, Population Estimates 2024; MHLW, Vital Statistics 2024 (provisional).')}</section>`;
}

// ----------------------------------------------------------------- economy
export function economy() {
  return `
  ${h('Economy', 'Nominal GDP of $4.03 trillion in 2024 — the world’s 4th largest economy, behind the United States, China and Germany.')}
  <section class="kpis">${card('Nominal GDP', '$4.03tn', '¥609.3 trillion', '2024', 'IMF, World Economic Outlook')}
  ${card('GDP per person', '$32,476', 'PPP: $51,685', '2024', 'IMF, World Economic Outlook')}
  ${card('Real GDP growth', '−0.2%', 'After +1.9% in 2023', '2024', 'World Bank, World Development Indicators')}
  ${card('Government gross debt', '236.7%', 'Of GDP — the highest among major economies', '2024', 'IMF, World Economic Outlook')}
  ${card('Exports of goods', '¥107.1tn', 'A record high in yen terms', '2024', 'Ministry of Finance, Trade Statistics')}
  ${card('Trade balance', '−¥5.3tn', 'Imports ¥112.4 trillion', '2024', 'Ministry of Finance, Trade Statistics')}</section>
  <section class="panel"><h2>Choose a measure</h2>
  <p><label for="gdpMetric">Show:</label>
  <select id="gdpMetric">
    <option value="nominal" selected>Nominal GDP, $ billions</option>
    <option value="percapita">GDP per person, US$</option>
    <option value="growth">Real GDP growth, % per year</option>
  </select></p>
  <div id="gdpChart">${lineChart(GDP_NOMINAL, { unit: '$bn' })}</div>
  <p id="gdpNote">${source('IMF, World Economic Outlook.')}</p></section>
  <section class="panel"><h2>Exports of goods, ¥ trillions</h2>
  <p>Exports reached a record ¥107.1 trillion in 2024, led by cars, machinery and electronics — but imports of ¥112.4 trillion left a trade deficit of ¥5.3 trillion, the fourth year in a row.</p>
  ${barChart(EXPORTS, { unit: '¥tn', decimals: 1 })}
  ${source('Ministry of Finance, Trade Statistics.')}</section>
  <section class="panel"><h2>What the economy is made of</h2>
  <ul class="notes">
  <li><strong>Services — about 71% of GDP.</strong> Finance, retail, health and business services dominate. (World Bank, 2023)</li>
  <li><strong>Industry — about 28% of GDP.</strong> Cars, electronics, machinery and chemicals are the export earners. (World Bank, 2023)</li>
  <li><strong>Agriculture — about 1% of GDP.</strong> Rice, vegetables and fish, on 4.3 million hectares of farmland. (World Bank, 2023)</li>
  <li><strong>Public debt — 236.7% of GDP.</strong> Almost all of it is held at home, by the Bank of Japan, banks, insurers and pension funds. (IMF, 2024)</li>
  </ul></section>`;
}

// ------------------------------------------------------------------ labour
export function labour() {
  return `
  ${h('Work', 'A labour force of 69.2 million people and an unemployment rate of 2.5% — one of the lowest in the developed world, with more job openings than applicants.')}
  <section class="kpis">${card('Labour force', '69.2m', 'Aged 15 and over', '2024', 'Statistics Bureau, Labour Force Survey')}
  ${card('Employed', '67.4m', '97.5% of the labour force', '2024', 'Statistics Bureau, Labour Force Survey')}
  ${card('Unemployed', '1.75m', 'Unemployment rate 2.5%', '2024', 'Statistics Bureau, Labour Force Survey')}
  ${card('Employment rate, 15–64', '79.5%', 'Women 76.5% (2023)', '2024', 'OECD, Employment Outlook')}
  ${card('Hours worked', '1,607', 'Per worker per year', '2023', 'OECD')}
  ${card('Minimum wage', '¥1,055', 'Per hour, national average', '2024', 'MHLW')}</section>
  <section class="panel"><h2>Unemployment rate, 2015–2024</h2>
  <p>Unemployment has stayed between 2.4% and 3.4% for a decade — low by any standard, and below 3% every year since 2017.</p>
  ${lineChart(UNEMPLOYMENT, { unit: '%', decimals: 1 })}
  ${source('Statistics Bureau of Japan, Labour Force Survey, annual averages.')}</section>
  <section class="panel"><h2>What work looks like</h2>
  <ul class="notes">
  <li><strong>1.25 job openings per applicant</strong> in 2024 — employers report shortages in construction, care, hospitality and transport. (MHLW, Employment Referrals)</li>
  <li><strong>1,607 hours a year</strong> per worker in 2023, below the OECD average of 1,742 — long hours are concentrated in a minority of jobs. (OECD)</li>
  <li><strong>Youth unemployment 3.9%</strong> in 2024, against 2.5% overall. (OECD)</li>
  <li><strong>About a third of employees work part-time or on fixed-term contracts</strong>, a share that has grown as more women and older people joined the workforce. (Statistics Bureau, Labour Force Survey)</li>
  </ul></section>`;
}

// ------------------------------------------------------------------ prices
export function prices() {
  return `
  ${h('Prices', 'Consumer prices rose 2.7% in 2024 — the third year above the Bank of Japan’s 2% target, after two decades in which prices barely moved at all.')}
  <section class="kpis">${card('CPI inflation', '+2.7%', 'Annual average', '2024', 'Statistics Bureau, Consumer Price Index')}
  ${card('CPI, all items', '108.4', '2020 = 100', '2024', 'Statistics Bureau, Consumer Price Index')}
  ${card('Food prices', '+4.0%', 'Fastest-rising group', '2024', 'Statistics Bureau, Consumer Price Index')}
  ${card('Housing prices', '+0.6%', 'Rents move slowly', '2024', 'Statistics Bureau, Consumer Price Index')}
  ${card('Bank of Japan target', '2%', 'Price stability target', '2024', 'Bank of Japan')}
  ${card('Yen, 2024 average', '¥151.4', 'Per US dollar', '2024', 'Bank of Japan')}</section>
  <section class="panel"><h2>Consumer price inflation, 2015–2024</h2>
  <p>Seven years near zero, then a sharp turn: 2.5% in 2022, 3.3% in 2023 and 2.7% in 2024, driven first by imported energy and food, then by wages.</p>
  ${lineChart(CPI_CHANGE, { unit: '%', decimals: 1 })}
  ${source('World Bank, World Development Indicators (consumer prices, annual %).')}</section>
  <section class="panel"><h2>What got more expensive in 2024</h2>
  <p><button id="cpiSort" type="button">Sort: highest first</button></p>
  <div id="cpiChart">${barChart([...CPI_GROUPS].sort((a, b) => b.value - a.value), { unit: '%', decimals: 1 })}</div>
  ${source('Statistics Bureau of Japan, Consumer Price Index, 2024 annual average by group.')}</section>`;
}

// ------------------------------------------------------------------ health
export function health() {
  return `
  ${h('Health', 'Life expectancy of 84.0 years in 2023 — the longest in the world — with universal health insurance and 12.6 hospital beds per 1,000 people.')}
  <section class="kpis">${card('Life expectancy', '84.0 yrs', 'Men 81.1 · Women 87.1', '2023', 'MHLW, Life Tables')}
  ${card('Infant mortality', '1.9', 'Per 1,000 live births', '2023', 'MHLW, Vital Statistics')}
  ${card('Hospital beds', '12.6', 'Per 1,000 people', '2022', 'OECD, Health Statistics')}
  ${card('Physicians', '2.7', 'Per 1,000 people', '2022', 'OECD, Health Statistics')}
  ${card('Health spending', '10.9%', 'Of GDP', '2022', 'OECD, Health Statistics')}
  ${card('Cancer deaths', '24.3%', 'Of all deaths', '2023', 'MHLW, Vital Statistics')}</section>
  <section class="panel"><h2>Life expectancy at birth</h2>
  <p><button class="sexbtn" data-sex="both" type="button">Both sexes</button>
  <button class="sexbtn" data-sex="men" type="button">Men</button>
  <button class="sexbtn" data-sex="women" type="button">Women</button></p>
  <div id="lifeChart">${lineChart(LIFE_EXPECTANCY.map((d) => ({ year: d.year, value: (d.men + d.women) / 2 })), { unit: ' yrs', decimals: 1 })}</div>
  ${source('Ministry of Health, Labour and Welfare, Life Tables.')}</section>
  <section class="panel"><h2>Leading causes of death, 2023</h2>
  ${barChart(CAUSES_OF_DEATH, { unit: '%', decimals: 1 })}
  ${source('Ministry of Health, Labour and Welfare, Vital Statistics 2023.')}</section>
  <section class="panel"><h2>How the system works</h2>
  <p>Everyone living in Japan is covered by public health insurance, funded by premiums and taxes. Patients typically pay 30% of the cost of care at the point of use, with a monthly cap that falls for older people and low-income households. The country has more hospital beds per person than any other OECD country — 12.6 per 1,000 in 2022 — but fewer doctors than most, at 2.7 per 1,000.</p>
  ${source('OECD, Health Statistics 2024; MHLW.')}</section>`;
}

// --------------------------------------------------------------- education
export function education() {
  return `
  ${h('Education', 'Japanese 15-year-olds scored 536 in mathematics in PISA 2022 — 64 points above the OECD average — and 65% of 25- to 34-year-olds hold a tertiary degree.')}
  <section class="kpis">${card('PISA maths', '536', 'OECD average 472', '2022', 'OECD, PISA 2022')}
  ${card('PISA reading', '516', 'OECD average 476', '2022', 'OECD, PISA 2022')}
  ${card('PISA science', '547', 'OECD average 485', '2022', 'OECD, PISA 2022')}
  ${card('Tertiary degree, 25–34', '65%', 'OECD average 47%', '2023', 'OECD, Education at a Glance 2024')}
  ${card('Upper secondary+, 25–64', '92%', 'OECD average 79%', '2023', 'OECD, Education at a Glance 2024')}
  ${card('Public education spending', '3.0%', 'Of GDP', '2021', 'OECD, Education at a Glance')}</section>
  <section class="panel"><h2>PISA 2022: Japan against the OECD average</h2>
  ${barChart(PISA.flatMap((p) => [{ label: `${p.subject} — Japan`, value: p.japan }, { label: `${p.subject} — OECD`, value: p.oecd }]), {})}
  ${source('OECD, PISA 2022 Results. Japan ranked 5th of 81 systems in mathematics.')}</section>
  <section class="panel"><h2>Who holds a degree</h2>
  ${barChart(ATTAINMENT, { unit: '%' })}
  ${source('OECD, Education at a Glance 2024.')}</section>
  <section class="panel"><h2>How the system works</h2>
  <p>School is compulsory for nine years (six of primary, three of lower secondary) and nearly everyone continues: over 98% enter upper secondary school and about 60% of each cohort enters university or a junior college. The school year starts in April. Public spending on education was 3.0% of GDP in 2021, below the OECD average of 4.5% — households pay a larger share than in most OECD countries, above all for university tuition and after-school study.</p>
  ${source('OECD, Education at a Glance 2024; MEXT, School Basic Survey.')}</section>`;
}

// ----------------------------------------------------------------- regions
export function regions() {
  return `
  ${h('Regions', '47 prefectures in 8 regions. The Kanto region around Tokyo holds 43.4 million people — 35% of the country — while Hokkaido, a fifth of the land, holds 5.1 million.')}
  <section class="panel"><h2>Population by region, 2024</h2>
  ${barChart(REGIONS.map((r) => ({ label: r.name, value: r.pop })), { unit: 'm', decimals: 1 })}
  ${source('Statistics Bureau of Japan, Population Estimates, 1 October 2024.')}</section>
  <section class="panel"><h2>Ten largest prefectures</h2>
  <p><label for="prefSort">Sort by:</label>
  <select id="prefSort">
    <option value="pop" selected>Population, largest first</option>
    <option value="density">Density, highest first</option>
    <option value="name">Name, A to Z</option>
  </select>
  <span id="prefRegion"></span></p>
  <div id="prefTable"></div>
  ${source('Statistics Bureau of Japan, Population Estimates, 1 October 2024. Densities use the Geospatial Information Authority’s area figures.')}
  <p>Land area of Japan: 377,975 km² (Geospatial Information Authority, 2024). Urban population share: 92.2% (UN World Population Prospects 2024).</p></section>
  <section class="panel"><h2>Filter by region</h2>
  <p id="regionBtns">${['All', ...new Set(PREFECTURES.map((p) => p.region))].map((r) => `<button class="regionbtn" data-region="${esc(r)}" type="button">${esc(r)}</button>`).join(' ')}</p>
  <p>Choose a region above to show only its prefectures in the table.</p></section>`;
}

// ----------------------------------------------------------------- sources
export function sources() {
  const list = [
    ['Statistics Bureau of Japan, Ministry of Internal Affairs and Communications', 'Population Estimates (1 Oct 2024); Population Census; Labour Force Survey 2024; Consumer Price Index 2024.'],
    ['Cabinet Office', 'National Accounts, calendar year 2024.'],
    ['Ministry of Health, Labour and Welfare', 'Vital Statistics 2024 (provisional); Life Tables 2023; Monthly Labour Survey; minimum wage, October 2024.'],
    ['Ministry of Finance', 'Trade Statistics, calendar year 2024.'],
    ['Bank of Japan', 'Price stability target of 2%; average yen–dollar rate 2024.'],
    ['Geospatial Information Authority of Japan', 'Land area, 2024.'],
    ['International Monetary Fund', 'World Economic Outlook — nominal GDP, GDP per capita and government debt, 2024.'],
    ['World Bank', 'World Development Indicators — real GDP growth, consumer price inflation, services share of GDP.'],
    ['OECD', 'Employment Outlook; Health Statistics 2024; Education at a Glance 2024; PISA 2022.'],
    ['United Nations', 'World Population Prospects 2024, medium variant — median age, urban share, age bands.'],
  ];
  return `
  ${h('Sources & methods', 'Every figure on this site names its source and year on the page where it appears. This page lists the publishers behind them, and the choices made in presenting them.')}
  <section class="panel"><h2>Publishers</h2>
  <table class="data"><thead><tr><th>Publisher</th><th>What it supplied</th></tr></thead><tbody>
  ${list.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}
  </tbody></table></section>
  <section class="panel"><h2>Methods & notes</h2>
  <ul class="notes">
  <li><strong>Years are the reference year of the figure</strong>, not the year it was published. Population figures are the 1 October 2024 estimates unless a census year is named.</li>
  <li><strong>GDP in dollars uses the IMF’s World Economic Outlook</strong>; the yen figure (¥609.3 trillion) comes from the Cabinet Office’s National Accounts. The two disagree slightly because of the exchange rate used.</li>
  <li><strong>Age bands in the pyramid are rounded thousands</strong> from the UN World Population Prospects 2024 medium variant; they sum to the 2024 population total.</li>
  <li><strong>Prefecture densities</strong> divide the 2024 population estimate by the Geospatial Information Authority’s land area.</li>
  <li><strong>Nothing on this site is fetched from the internet.</strong> All figures are stored in the site’s own files, so it works offline, on a desktop and on a phone.</li>
  </ul></section>
  <section class="panel"><h2>About this site</h2>
  <p>Japan in Numbers is an independent statistics site built in ${esc(SITE.built)}. It is not affiliated with the Statistics Bureau of Japan or any other publisher named here. Figures are reproduced as published; where publishers have since revised a figure, the revision is not reflected.</p></section>`;
}
