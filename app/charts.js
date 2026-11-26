// SVG charts for Japan in Numbers.
//
// Every chart is drawn from the fixed data in data.js, with fixed colours,
// fixed fonts and no animation, so a render of the same page always produces
// the same pixels. Charts are plain inline SVG: no library, no network.

// Escape text that goes into an SVG or HTML string.
export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const fmt = (n, decimals = 0) =>
  Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// A line chart with a value axis, year labels and a dot on every point.
// series: [{year, value}], width/height in px, unit: label for the axis.
export function lineChart(series, { width = 640, height = 260, unit = '', decimals = 0, color = '#c0392b' } = {}) {
  const padL = 68, padR = 14, padT = 18, padB = 30;
  const w = width - padL - padR, h = height - padT - padB;
  const values = series.map((p) => p.value);
  let lo = Math.min(...values, 0), hi = Math.max(...values);
  if (lo === hi) { lo -= 1; hi += 1; }
  const span = hi - lo;
  lo -= span * 0.08; const hi2 = hi + span * 0.08;
  const x = (i) => padL + (i / (series.length - 1)) * w;
  const y = (v) => padT + (1 - (v - lo) / (hi2 - lo)) * h;
  const ticks = 4;
  let grid = '';
  for (let t = 0; t <= ticks; t++) {
    const v = lo + ((hi2 - lo) * t) / ticks;
    const yy = y(v);
    grid += `<line x1="${padL}" y1="${yy.toFixed(1)}" x2="${width - padR}" y2="${yy.toFixed(1)}" stroke="#e3ddd2" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${(yy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#6b6455">${esc(fmt(v, decimals))}</text>`;
  }
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const dots = series.map((p, i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="3.2" fill="${color}"/>` +
    `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 9).toFixed(1)}" text-anchor="middle" font-size="10.5" fill="#3d3a33">${esc(fmt(p.value, decimals))}</text>`).join('');
  const labels = series.map((p, i) =>
    `<text x="${x(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#6b6455">${p.year}</text>`).join('');
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Line chart">${grid}` +
    `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>${dots}${labels}</svg>`;
}

// A horizontal bar chart. items: [{label, value}], sorted by the caller.
// Negative values grow left from the zero line.
export function barChart(items, { width = 640, unit = '', decimals = 0, color = '#16324f', barH = 24, gap = 10 } = {}) {
  const labelW = 210, padR = 64, padT = 6;
  const height = padT + items.length * (barH + gap) + 8;
  const maxAbs = Math.max(...items.map((d) => Math.abs(d.value)), 1);
  const zeroX = items.some((d) => d.value < 0) ? labelW + (width - labelW - padR) * 0.35 : labelW;
  const scale = (width - labelW - padR - (items.some((d) => d.value < 0) ? (width - labelW - padR) * 0.35 : 0)) / maxAbs;
  let rows = '';
  items.forEach((d, i) => {
    const y = padT + i * (barH + gap);
    const bw = Math.abs(d.value) * scale;
    const bx = d.value < 0 ? zeroX - bw : zeroX;
    const fill = d.value < 0 ? '#8a7a5f' : color;
    rows += `<text x="${labelW - 10}" y="${y + barH / 2 + 4}" text-anchor="end" font-size="12.5" fill="#2e2b25">${esc(d.label)}</text>` +
      `<rect x="${bx.toFixed(1)}" y="${y}" width="${Math.max(bw, 1.5).toFixed(1)}" height="${barH}" rx="2" fill="${fill}"/>` +
      `<text x="${(d.value < 0 ? bx - 6 : bx + bw + 6).toFixed(1)}" y="${y + barH / 2 + 4}" text-anchor="${d.value < 0 ? 'end' : 'start'}" font-size="12" font-weight="600" fill="#2e2b25">${esc(fmt(d.value, decimals))}${unit ? ' ' + esc(unit) : ''}</text>`;
  });
  if (items.some((d) => d.value < 0)) {
    rows += `<line x1="${zeroX}" y1="${padT - 2}" x2="${zeroX}" y2="${height - 6}" stroke="#b8b0a0" stroke-width="1"/>`;
  }
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Bar chart">${rows}</svg>`;
}

// A population pyramid: men to the left, women to the right, one row per band.
// bands: [{band, total (millions), maleShare}].
export function pyramid(bands, { width = 640 } = {}) {
  const rowH = 20, padT = 26, padB = 8, labelW = 44;
  const height = padT + bands.length * rowH + padB;
  const half = (width - labelW * 2) / 2;
  const maxHalf = Math.max(...bands.map((b) => Math.max(b.total * b.maleShare, b.total * (1 - b.maleShare))));
  const scale = half / (maxHalf * 1.08);
  const midX = labelW + half;
  let rows = `<text x="${midX - 8}" y="16" text-anchor="end" font-size="11.5" font-weight="700" fill="#16324f">Men</text>` +
    `<text x="${midX + 8}" y="16" font-size="11.5" font-weight="700" fill="#8a2f23">Women</text>`;
  bands.forEach((b, i) => {
    const y = padT + i * rowH;
    const men = b.total * b.maleShare, women = b.total * (1 - b.maleShare);
    const mw = men * scale, ww = women * scale;
    rows += `<text x="${midX}" y="${y + 14}" text-anchor="middle" font-size="10.5" fill="#6b6455">${esc(b.band)}</text>` +
      `<rect x="${(midX - mw).toFixed(1)}" y="${y + 2}" width="${mw.toFixed(1)}" height="16" fill="#16324f"/>` +
      `<rect x="${midX.toFixed(1)}" y="${y + 2}" width="${ww.toFixed(1)}" height="16" fill="#c0392b"/>`;
  });
  rows += `<line x1="${midX}" y1="${padT - 4}" x2="${midX}" y2="${height - padB}" stroke="#b8b0a0" stroke-width="1"/>`;
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Population pyramid">${rows}</svg>`;
}
