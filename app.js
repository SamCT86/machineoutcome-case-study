import { verifyMutationOutcome } from "./src/reference-outcome-verifier.mjs";

const BASE = Object.freeze({
  taskId: "task:repo-change-001",
  evidenceTaskId: "task:repo-change-001",
  attemptId: "attempt:001",
  evidenceAttemptId: "attempt:001",
  expectedPreState: "repo@before",
  expectedPostState: "repo@after",
  observedPreState: "repo@before",
  observedPostState: "repo@after",
  readbackComplete: true,
  providerAcknowledgement: "accepted",
});

const SCENARIOS = Object.freeze({
  ambiguousVerified: { title: "Timeout, but change happened", hint: "The acknowledgement disappears, but readback proves the expected state.", controls: { ack: "ambiguous", prestate: "match", readback: "complete", poststate: "expected", identity: "exact" } },
  readbackMissing: { title: "No readback", hint: "Reality is unavailable, so retry remains blocked.", controls: { ack: "ambiguous", prestate: "match", readback: "incomplete", poststate: "expected", identity: "exact" } },
  unchanged: { title: "Timeout, state unchanged", hint: "The provider is reachable, but the state still looks unchanged.", controls: { ack: "ambiguous", prestate: "match", readback: "complete", poststate: "unchanged", identity: "exact" } },
  stalePrestate: { title: "Stale starting state", hint: "The action was prepared against an outdated state.", controls: { ack: "accepted", prestate: "stale", readback: "complete", poststate: "expected", identity: "exact" } },
  wrongAttempt: { title: "Wrong-attempt evidence", hint: "The state looks right, but the evidence belongs to another attempt.", controls: { ack: "accepted", prestate: "match", readback: "complete", poststate: "expected", identity: "wrong-attempt" } },
  wrongPost: { title: "Unexpected post-state", hint: "Readback is complete, but reality is not what the action was supposed to produce.", controls: { ack: "accepted", prestate: "match", readback: "complete", poststate: "unexpected", identity: "exact" } },
});

const form = document.querySelector("#lab-form");
const presets = document.querySelector("#presets");
const result = document.querySelector("#result");
const validation = document.querySelector("#validation");
const resetButton = document.querySelector("[data-reset]");
const guidedButton = document.querySelector("[data-run-guided]");
let selected = "ambiguousVerified";

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
function setControls(values) { for (const [key, value] of Object.entries(values)) form.elements[key].value = value; }
function readControls() { return Object.fromEntries(["ack", "prestate", "readback", "poststate", "identity"].map((key) => [key, form.elements[key].value])); }
function toVerifierInput(c) {
  const input = { ...BASE };
  input.providerAcknowledgement = c.ack;
  input.observedPreState = c.prestate === "match" ? BASE.expectedPreState : "repo@stale";
  input.readbackComplete = c.readback === "complete";
  input.observedPostState = c.poststate === "expected" ? BASE.expectedPostState : c.poststate === "unchanged" ? input.observedPreState : "repo@unexpected";
  if (!input.readbackComplete) input.observedPostState = null;
  if (c.identity === "wrong-attempt") input.evidenceAttemptId = "attempt:other";
  if (c.identity === "wrong-task") input.evidenceTaskId = "task:other";
  return input;
}
function renderPresets() {
  presets.innerHTML = "";
  for (const [key, scenario] of Object.entries(SCENARIOS)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preset";
    button.dataset.scenario = key;
    button.setAttribute("aria-pressed", String(key === selected));
    button.innerHTML = `<b>${escapeHtml(scenario.title)}</b><span>${escapeHtml(scenario.hint)}</span>`;
    button.addEventListener("click", () => { selected = key; setControls(scenario.controls); validation.textContent = ""; renderPresets(); evaluate(scenario.controls); });
    presets.append(button);
  }
}
function explanation(out) {
  const table = {
    POSTSTATE_CONFIRMED: ["Observed state matches the expected result.", "Do not retry the mutation."],
    PRESTATE_MISMATCH: ["The starting state changed before the action could be trusted.", "Do not mutate from this stale pre-state."],
    READBACK_INCOMPLETE: ["The external reality is not established yet.", "Reconcile state before retrying."],
    AMBIGUOUS_MUTATION_STATE: ["The acknowledgement was ambiguous and the observed state is still unchanged.", "Keep the outcome UNKNOWN and reconcile before retrying."],
    EVIDENCE_ATTEMPT_MISMATCH: ["The readback belongs to a different attempt.", "Reject the evidence and do not retry from it."],
    EVIDENCE_TASK_MISMATCH: ["The readback belongs to a different task.", "Reject the evidence and do not retry from it."],
    POSTSTATE_MISMATCH: ["Readback is complete, but reality does not match the expected result.", "Treat the outcome as failed; do not blindly replay the mutation."],
  };
  return table[out.reason] ?? ["The verifier refused to infer a safe outcome.", out.retry.replaceAll("_", " ").toLowerCase() + "."];
}
function traceRows(input, out) {
  const rows = [
    ["1", "IDENTITY", input.evidenceTaskId === input.taskId && input.evidenceAttemptId === input.attemptId ? "bound" : "mismatch", `${input.evidenceTaskId} / ${input.evidenceAttemptId}`],
    ["2", "PRE-STATE", input.observedPreState === input.expectedPreState ? "match" : "mismatch", `expected ${input.expectedPreState} · observed ${input.observedPreState}`],
    ["3", "ATTEMPT", "attempted", `provider acknowledgement: ${input.providerAcknowledgement}`],
    ["4", "READBACK", input.readbackComplete ? "complete" : "incomplete", input.readbackComplete ? `observed ${input.observedPostState}` : "provider state not established"],
    ["5", "OUTCOME", out.status.toLowerCase(), `${out.status} · ${out.reason}`],
    ["6", "RETRY", out.retry === "DO_NOT_RETRY" || out.retry === "DO_NOT_MUTATE" ? "blocked" : "hold", out.retry.replaceAll("_", " ")],
  ];
  return rows.map(([n, stage, state, detail]) => `<div class="trace-step"><span>${n}</span><b>${stage}</b><em class="${escapeHtml(state)}">${escapeHtml(state)}</em><p>${escapeHtml(detail)}</p></div>`).join("");
}
function naiveReaction(input) { return input.providerAcknowledgement === "ambiguous" ? "Treat the timeout as failure and immediately repeat the external action." : "Trust the transport response without proving the downstream state."; }
function renderResult(input, out) {
  const [why, safe] = explanation(out);
  const tone = out.status.toLowerCase();
  result.innerHTML = `
    <div class="result-head"><div><div class="decision-label">OUTCOME</div><h3 class="decision ${tone}">${escapeHtml(out.status)}</h3><p>${escapeHtml(why)}</p></div><span class="badge ${tone}">${escapeHtml(out.reason)}</span></div>
    <div class="safe-action"><b>Safe next action</b><span>${escapeHtml(safe)}</span></div>
    <div class="comparison"><article><h4>Naive reaction</h4><p>${escapeHtml(naiveReaction(input))}</p></article><article class="guarded"><h4>MachineOutcome reaction</h4><p>${escapeHtml(out.retry.replaceAll("_", " "))}</p></article></div>
    <div class="trace">${traceRows(input, out)}</div>
    <details><summary>Inspect exact verifier input and output</summary><pre>${escapeHtml(JSON.stringify({ input, output: out }, null, 2))}</pre></details>`;
}
function evaluate(controls) {
  validation.textContent = "";
  try { const input = toVerifierInput(controls); const out = verifyMutationOutcome(input); renderResult(input, out); return out; }
  catch (error) { validation.textContent = `VERIFIER_REFUSED_INPUT: ${error instanceof Error ? error.message : String(error)}`; result.innerHTML = `<div class="empty-state"><p class="eyebrow">FAIL CLOSED</p><h3>Invalid evidence contract.</h3><p>The public verifier rejected the input instead of guessing.</p></div>`; return null; }
}
form.addEventListener("change", (event) => {
  if (!(event.target instanceof HTMLSelectElement)) return;
  selected = "custom";
  renderPresets();
  evaluate(readControls());
});
form.addEventListener("submit", (event) => { event.preventDefault(); selected = "custom"; renderPresets(); evaluate(readControls()); });
resetButton.addEventListener("click", () => { selected = "ambiguousVerified"; setControls(SCENARIOS.ambiguousVerified.controls); renderPresets(); validation.textContent = ""; result.innerHTML = `<div class="empty-state"><p class="eyebrow">READY</p><h3>Run an ambiguous action.</h3><p>You will get an outcome status, reason, safe retry decision, evidence trace and the exact verifier input/output.</p></div>`; });
guidedButton.addEventListener("click", () => { selected = "ambiguousVerified"; setControls(SCENARIOS.ambiguousVerified.controls); renderPresets(); evaluate(SCENARIOS.ambiguousVerified.controls); document.querySelector("#lab").scrollIntoView({ behavior: "smooth", block: "start" }); });
setControls(SCENARIOS.ambiguousVerified.controls);
renderPresets();
