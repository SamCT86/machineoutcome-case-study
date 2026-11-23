import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const redirect=fs.readFileSync(new URL('../root-redirect.html',import.meta.url),'utf8');
const workflow=fs.readFileSync(new URL('../.github/workflows/pages.yml',import.meta.url),'utf8');
const lab=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('Apex landing redirects browsers to canonical WWW and has accessible fallback',()=>{
 assert.match(redirect,/http-equiv="refresh" content="0;url=https:\/\/www\.machineoutcome\.com\//);
 assert.match(redirect,/location\.replace\('https:\/\/www\.machineoutcome\.com\/'\)/);
 assert.match(redirect,/rel="canonical" href="https:\/\/www\.machineoutcome\.com\//);
 assert.match(redirect,/href="\/lab\/"/);
});
test('Build publishes the original synthetic lab separately and keeps module assets',()=>{
 assert.match(workflow,/cp root-redirect\.html _site\/index\.html/);
 assert.match(workflow,/cp index\.html app\.js styles\.css _site\/lab\//);
 assert.match(workflow,/cp src\/reference-outcome-verifier\.mjs src\/demo-model\.mjs _site\/lab\/src\//);
 assert.match(lab,/Outcome Verification Lab/);
 assert.match(lab,/src="\.\/app\.js"/);
});
