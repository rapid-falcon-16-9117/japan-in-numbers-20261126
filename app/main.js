// Japan in Numbers — router and page controls.
//
// Hash routes, one page per section of the site:
//   #/            overview (key indicators, search, latest releases)
//   #/population #/economy #/labour #/prices #/health #/education
//   #/regions     #/sources
// Every control on a page is wired here and really works: the search box
// filters the indicator index, the economy selector swaps the chart, the
// prices button re-sorts the bars, the health buttons switch sexes, and the
// regions controls sort and filter the prefecture table.
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import {
  INDICATORS, PREFECTURES, GDP_NOMINAL, GDP_PER_CAPITA, GDP_GROWTH,
  CPI_GROUPS, LIFE_EXPECTANCY,
} from './data.js';
import { lineChart, barChart, esc } from './charts.js';
import * as views from './views.js';

const app = document.getElementById('app');
const NAV = [
  ['/', 'Overview'], ['/population', 'Population'], ['/economy', 'Economy'],
  ['/labour', 'Work'], ['/prices', 'Prices'], ['/health', 'Health'],
  ['/education', 'Education'], ['/regions', 'Regions'], ['/sources', 'Sources'],
];

const PAGES = {
  '/': views.overview, '/population': views.population, '/economy': views.economy,
  '/labour': views.labour, '/prices': views.prices, '/health': views.health,
  '/education': views.education, '/regions': views.regions, '/sources': views.sources,
};

function nav(current) {
  return `<nav aria-label="Sections">${NAV.map(([path, label]) =>
    `<a href="#${path}"${path === current ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('')}</nav>`;
}

// --- indicator search (overview) -----------------------------------------
function wireSearch() {
  const input = document.getElementById('q');
  const out = document.getElementById('results');
  if (!input || !out) return;
  const show = (query) => {
    const q = query.trim().toLowerCase();
    const hits = q ? INDICATORS.filter((d) =>
      (d.name + ' ' + d.value + ' ' + d.source).toLowerCase().includes(q)) : [];
    out.innerHTML = q === '' ? '' : hits.length === 0
      ? '<li class="none">No indicator matches that search.</li>'
      : hits.slice(0, 12).map((d) =>
        `<li><a href="#/${d.page}"><strong>${esc(d.name)}</strong> — ${esc(d.value)}</a> ` +
        `<span class="meta">${esc(d.year)} · ${esc(d.source)}</span></li>`).join('') +
        (hits.length > 12 ? `<li class="meta">…and ${hits.length - 12} more</li>` : '');
  };
  input.addEventListener('input', () => show(input.value));
  show('');
}

// --- economy chart selector -------------------------------------------------
function wireEconomy() {
  const select = document.getElementById('gdpMetric');
  const chart = document.getElementById('gdpChart');
  const note = document.getElementById('gdpNote');
  if (!select || !chart) return;
  const CHARTS = {
    nominal: [lineChart(GDP_NOMINAL, { unit: '$bn' }), 'IMF, World Economic Outlook.'],
    percapita: [lineChart(GDP_PER_CAPITA, { unit: '$' }), 'IMF, World Economic Outlook.'],
    growth: [lineChart(GDP_GROWTH, { unit: '%', decimals: 1 }), 'World Bank, World Development Indicators.'],
  };
  select.addEventListener('change', () => {
    const [svg, src] = CHARTS[select.value];
    chart.innerHTML = svg;
    if (note) note.innerHTML = `<p class="source">Source: ${esc(src)}</p>`;
  });
}

// --- prices sort toggle ------------------------------------------------------
function wirePrices() {
  const btn = document.getElementById('cpiSort');
  const chart = document.getElementById('cpiChart');
  if (!btn || !chart) return;
  let desc = true;
  btn.addEventListener('click', () => {
    desc = !desc;
    btn.textContent = desc ? 'Sort: highest first' : 'Sort: lowest first';
    const items = [...CPI_GROUPS].sort((a, b) => desc ? b.value - a.value : a.value - b.value);
    chart.innerHTML = barChart(items, { unit: '%', decimals: 1 });
  });
}

// --- health sex toggle -------------------------------------------------------
function wireHealth() {
  const chart = document.getElementById('lifeChart');
  if (!chart) return;
  const CHARTS = {
    both: lineChart(LIFE_EXPECTANCY.map((d) => ({ year: d.year, value: (d.men + d.women) / 2 })), { unit: ' yrs', decimals: 1 }),
    men: lineChart(LIFE_EXPECTANCY.map((d) => ({ year: d.year, value: d.men })), { unit: ' yrs', decimals: 1, color: '#16324f' }),
    women: lineChart(LIFE_EXPECTANCY.map((d) => ({ year: d.year, value: d.women })), { unit: ' yrs', decimals: 1 }),
  };
  document.querySelectorAll('.sexbtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      chart.innerHTML = CHARTS[btn.dataset.sex];
      document.querySelectorAll('.sexbtn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  const first = document.querySelector('.sexbtn');
  if (first) first.classList.add('active');
}

// --- regions table: sort + region filter --------------------------------------
let regionFilter = 'All';
let prefSort = 'pop';

function prefTable() {
  const rows = PREFECTURES
    .filter((p) => regionFilter === 'All' || p.region === regionFilter)
    .sort((a, b) => prefSort === 'name' ? a.name.localeCompare(b.name)
      : prefSort === 'density' ? b.density - a.density : b.pop - a.pop);
  const host = document.getElementById('prefTable');
  if (!host) return;
  host.innerHTML = rows.length === 0
    ? '<p>No prefecture in this region is in the top ten.</p>'
    : `<table class="data"><thead><tr><th>Prefecture</th><th>Region</th><th>Population</th><th>Share</th><th>Density /km²</th></tr></thead><tbody>` +
      rows.map((p) => `<tr><td>${esc(p.name)}</td><td>${esc(p.region)}</td><td>${p.pop.toLocaleString('en-US')} thousand</td><td>${p.share}%</td><td>${p.density.toLocaleString('en-US')}</td></tr>`).join('') +
      '</tbody></table>';
  const label = document.getElementById('prefRegion');
  if (label) label.textContent = regionFilter === 'All' ? '' : ` Showing: ${regionFilter}.`;
}

function wireRegions() {
  const select = document.getElementById('prefSort');
  if (select) select.addEventListener('change', () => { prefSort = select.value; prefTable(); });
  document.querySelectorAll('.regionbtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      regionFilter = btn.dataset.region;
      document.querySelectorAll('.regionbtn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      prefTable();
    });
  });
  const first = document.querySelector('.regionbtn');
  if (first) first.classList.add('active');
  prefTable();
}

// --- render -------------------------------------------------------------------
function render() {
  window.__shotReady = false;
  const path = (location.hash.match(/^#(\/[^?]*)/) || [null, '/'])[1];
  const page = PAGES[path] || null;
  const title = NAV.find(([p]) => p === path)?.[1] ?? 'Not found';
  document.title = path === '/' ? 'Japan in Numbers — National Statistics of Japan' : `${title} | Japan in Numbers`;
  app.innerHTML = page
    ? `<header class="sitehead"><a class="brand" href="#/"><span class="dot"></span>Japan in Numbers</a>${nav(path)}</header><main>${page()}</main>`
    : `<header class="sitehead"><a class="brand" href="#/"><span class="dot"></span>Japan in Numbers</a>${nav('/')}</header><main><h1>Not found</h1><p>There is no page at this address. <a href="#/">Back to the overview</a>.</p></main>`;
  wireSearch(); wireEconomy(); wirePrices(); wireHealth(); wireRegions();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
