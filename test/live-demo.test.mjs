import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { verifyMutationOutcome } from "../src/reference-outcome-verifier.mjs";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

test("live demo has one primary heading, lab controls and local assets", () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  for (const token of ['id="lab"','id="lab-form"','data-run-guided','name="ack"','name="prestate"','name="readback"','name="poststate"','name="identity"','src="./app.js"','href="./styles.css"']) assert.match(html, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("browser demo imports canonical verifier and contains no network primitive", () => {
  assert.match(app, /from "\.\/src\/reference-outcome-verifier\.mjs"/);
  for (const primitive of [/\bfetch\s*\(/, /\bXMLHttpRequest\b/, /\bWebSocket\b/, /\bnavigator\.sendBeacon\b/]) assert.doesNotMatch(app, primitive);
});

test("preset selection immediately evaluates the selected scenario so stale results cannot remain visible", () => {
  assert.match(app, /button\.addEventListener\("click",[\s\S]*evaluate\(scenario\.controls\)/);
});

test("manual select changes immediately reevaluate current controls so visible outcomes never stay stale", () => {
  assert.match(app, /form\.addEventListener\("change",[\s\S]*HTMLSelectElement[\s\S]*evaluate\(readControls\(\)\)/);
});

test("guided ambiguous-success scenario is VERIFIED by the canonical verifier", () => {
  assert.deepEqual(verifyMutationOutcome({ taskId:"task:repo-change-001", evidenceTaskId:"task:repo-change-001", attemptId:"attempt:001", evidenceAttemptId:"attempt:001", expectedPreState:"repo@before", expectedPostState:"repo@after", observedPreState:"repo@before", observedPostState:"repo@after", readbackComplete:true, providerAcknowledgement:"ambiguous" }), { status:"VERIFIED", reason:"POSTSTATE_CONFIRMED", retry:"DO_NOT_RETRY" });
});

test("demo exposes failure presets and explicit proof boundaries", () => {
  for (const phrase of ["Timeout, but change happened","No readback","Timeout, state unchanged","Stale starting state","Wrong-attempt evidence","Unexpected post-state"]) assert.match(app, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(html, /not the private MachineOutcome runtime/i);
  assert.match(html, /no credentials/i);
  assert.match(html, /no network calls/i);
});

test("responsive stylesheet includes mobile and reduced-motion handling", () => {
  assert.match(css, /@media\(max-width:580px\)/);
  assert.match(css, /prefers-reduced-motion/);
});
