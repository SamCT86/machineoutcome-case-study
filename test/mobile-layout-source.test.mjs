import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
test('narrow-screen live-result grids have bounded minimum track size', () => {
  assert.match(css, /@media\(max-width:920px\)\{\s*\.lab-grid\{grid-template-columns:minmax\(0,1fr\)\}/);
  assert.match(css, /\.controls,\.result,\.result-head,\.trace,\.comparison,\.trace-step\{min-width:0\}/);
  assert.match(css, /\.trace-step>\*\{min-width:0;overflow-wrap:anywhere\}/);
  assert.match(css, /\.badge\{max-width:100%;white-space:normal\}/);
});
