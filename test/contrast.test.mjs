import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../styles.css', import.meta.url),'utf8');
function lum(hex) {
  const s = hex.replace('#','');
  const c = [0,2,4].map(i => parseInt(s.slice(i,i+2),16)/255)
    .map(n => n <= 0.04045 ? n / 12.92 : ((n+0.055)/1.055)**2.4);
  return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2];
}
function contrast(a,b) { const [hi,lo]=[lum(a),lum(b)].sort((a,b)=>b-a); return (hi+.05)/(lo+.05); }
function color(selector) {
  const escaped=selector.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const rule=css.match(new RegExp(escaped+'\\{[^}]*?color:(#[0-9a-f]{6})','i'));
  assert.ok(rule,'must find color rule for '+selector);
  return rule[1].toLowerCase();
}
test('small preview step numbering meets WCAG AA normal text 4.5 contrast on dark panel',()=>{
  assert.ok(contrast(color('.preview li span'),'#111827')>=4.5);
});
test('small trace step numbering meets WCAG AA normal text 4.5 contrast on paper',()=>{
  assert.ok(contrast(color('.trace-step>span'),'#fffdf8')>=4.5);
});
