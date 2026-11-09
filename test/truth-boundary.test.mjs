import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { verifyMutationOutcome } from '../src/reference-outcome-verifier.mjs';
import { SCENARIOS, displayVerdict, evaluateControls, renderResultMarkup, traceRows } from '../src/demo-model.mjs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');

test('no public hero, preview or synthetic panel claim a proven real outcome', () => {
  assert.doesNotMatch(html, /outcome certainty:\s*<strong>verified/i);
  assert.doesNotMatch(html, /<b>OUTCOME<\/b><em[^>]*>verified/i);
  assert.match(html, /real effect:\s*<strong>UNKNOWN/);
  assert.match(html, /fictional, user-controlled fields/);
  assert.match(html, /local match/);
  assert.match(html, /no credentials/i);
  assert.match(html, /no network calls/i);
});

test('all six user-selectable scenarios show a synthetic label, never raw VERIFIED as prominent outcome', () => {
  for (const sc of Object.values(SCENARIOS)) {
    const { input, output, markup } = evaluateControls(sc.controls, verifyMutationOutcome);
    assert.match(markup, /LOCAL SYNTHETIC COMPARISON/);
    assert.match(markup, /External effect: UNKNOWN/);
    assert.match(markup, /NOT authorization to execute or retry/);
    assert.match(markup, /not a real-effect verdict or retry grant/);
    assert.doesNotMatch(markup, /<h3 class="decision verified">/);
    assert.doesNotMatch(markup, /<h3[^>]*>VERIFIED<\/h3>/);
    assert.match(markup, new RegExp(displayVerdict(output)));
    assert.ok(input.taskId);
  }
});

test('canonical verifier raw code is still unchanged and the exact output remains inspectable', () => {
  const { output, markup } = evaluateControls(SCENARIOS.ambiguousVerified.controls, verifyMutationOutcome);
  assert.equal(output.status, 'VERIFIED');
  assert.match(markup, /LOCAL_MATCH_UNATTESTED/);
  assert.match(markup, /&quot;status&quot;: &quot;VERIFIED&quot;/);
  assert.match(markup, /Inspect exact verifier input and output/);
  assert.match(markup, /caller-selected fields match locally/);
});

test('all raw status mappings remain explicitly simulated even for FAILED and UNKNOWN', () => {
  for (const [status, wanted] of [['VERIFIED','LOCAL_MATCH_UNATTESTED'], ['FAILED','SIMULATED_MISMATCH'], ['UNKNOWN','SIMULATED_UNRESOLVED']]) {
    assert.equal(displayVerdict({status}), wanted);
  }
});

test('trace labels never call a caller-supplied input an observed provider effect', () => {
  const { input, output } = evaluateControls(SCENARIOS.ambiguousVerified.controls, verifyMutationOutcome);
  const text = JSON.stringify(traceRows(input,output));
  assert.match(text, /LOCAL CHECK/);
  assert.match(text, /caller supplied/);
  assert.match(text, /caller-selected acknowledgement/);
  assert.doesNotMatch(text, /"OUTCOME","verified"/);
});

test('XSS-injected task values cannot break out of the HTML source-code disclosure', () => {
  const input = {
    taskId:'<img src=x onerror="alert(1)">', evidenceTaskId:'<img src=x onerror="alert(1)">',
    attemptId:'a', evidenceAttemptId:'a', expectedPreState:'before', observedPreState:'before',
    expectedPostState:'after', observedPostState:'after', readbackComplete:true, providerAcknowledgement:'accepted'
  };
  const markup = renderResultMarkup(input,verifyMutationOutcome(input));
  assert.doesNotMatch(markup, /<img\s/i);
  assert.match(markup, /&lt;img/);
});

test('static browser entrypoint cannot make provider HTTP calls', () => {
  for(const primitive of [/\bfetch\s*\(/, /\bXMLHttpRequest\b/, /\bWebSocket\b/, /\bnavigator\.sendBeacon\b/]) assert.doesNotMatch(app,primitive);
});

test('source labels user selection as a claim and offers no write action', () => {
  assert.match(html, /Claimed readback/);
  assert.match(html, /Claimed post-state/);
  assert.match(html, /Compare synthetic fields/);
  assert.doesNotMatch(html, /<button[^>]+>Run real mutation<\/button>/);
});

 test('long untrusted status labels wrap on mobile layouts', () => {
  const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.decision\{overflow-wrap:anywhere\}/);
});
