export const BASE = Object.freeze({
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

export const SCENARIOS = Object.freeze({
  ambiguousVerified: {
    title: "Timeout, but change happened",
    hint: "In this fictional example the claimed post-state matches; no provider is contacted.",
    controls: { ack: "ambiguous", prestate: "match", readback: "complete", poststate: "expected", identity: "exact" },
  },
  readbackMissing: {
    title: "No readback",
    hint: "This synthetic case has no supplied readback, so the example recommends holding.",
    controls: { ack: "ambiguous", prestate: "match", readback: "incomplete", poststate: "expected", identity: "exact" },
  },
  unchanged: {
    title: "Timeout, state unchanged",
    hint: "The fictional readback is unchanged; actual provider reachability is not tested.",
    controls: { ack: "ambiguous", prestate: "match", readback: "complete", poststate: "unchanged", identity: "exact" },
  },
  stalePrestate: {
    title: "Stale starting state",
    hint: "The action was prepared against an outdated state.",
    controls: { ack: "accepted", prestate: "stale", readback: "complete", poststate: "expected", identity: "exact" },
  },
  wrongAttempt: {
    title: "Wrong-attempt evidence",
    hint: "The claimed state looks right, but the fictional evidence carries another attempt ID.",
    controls: { ack: "accepted", prestate: "match", readback: "complete", poststate: "expected", identity: "wrong-attempt" },
  },
  wrongPost: {
    title: "Unexpected post-state",
    hint: "The fictional fields claim a complete readback with an unexpected post-state.",
    controls: { ack: "accepted", prestate: "match", readback: "complete", poststate: "unexpected", identity: "exact" },
  },
});

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function toVerifierInput(c) {
  const input = { ...BASE };
  input.providerAcknowledgement = c.ack;
  input.observedPreState = c.prestate === "match" ? BASE.expectedPreState : "repo@stale";
  input.readbackComplete = c.readback === "complete";
  input.observedPostState =
    c.poststate === "expected" ? BASE.expectedPostState :
    c.poststate === "unchanged" ? input.observedPreState :
    "repo@unexpected";
  if (!input.readbackComplete) input.observedPostState = null;
  if (c.identity === "wrong-attempt") input.evidenceAttemptId = "attempt:other";
  if (c.identity === "wrong-task") input.evidenceTaskId = "task:other";
  return input;
}

export function explanation(out) {
  const table = {
    POSTSTATE_CONFIRMED: ["The caller-selected fields match locally; real external effect remains UNKNOWN.", "Do not infer permission to retry; reconcile independent provider evidence."],
    PRESTATE_MISMATCH: ["The fictional pre-state differs from the expected pre-state.", "Do not infer mutation authority from this scenario."],
    READBACK_INCOMPLETE: ["The fictional readback is incomplete; external reality is not established.", "Reconcile independent provider state before any retry decision."],
    AMBIGUOUS_MUTATION_STATE: ["The simulated acknowledgement is ambiguous and the claimed post-state unchanged.", "Keep external effect UNKNOWN and reconcile before any retry."],
    EVIDENCE_ATTEMPT_MISMATCH: ["The synthetic readback claims another attempt ID.", "Reject this claim and do not infer retry permission."],
    EVIDENCE_TASK_MISMATCH: ["The synthetic readback claims another task ID.", "Reject this claim and do not infer retry permission."],
    POSTSTATE_MISMATCH: ["The claimed post-state differs from the expected value in the local example.", "Do not treat this as proof of real failure or authorization to replay."],
  };
  return table[out.reason] ?? ["The verifier refused to infer a safe outcome.", out.retry.replaceAll("_", " ").toLowerCase() + "."];
}

export function displayVerdict(out) {
  // Never surface the reference verifier's raw VERIFIED as an external-effect claim.
  return out.status === "VERIFIED" ? "LOCAL_MATCH_UNATTESTED" :
    out.status === "FAILED" ? "SIMULATED_MISMATCH" : "SIMULATED_UNRESOLVED";
}

export function naiveReaction(input) {
  return input.providerAcknowledgement === "ambiguous"
    ? "Treat the timeout as failure and immediately repeat the external action."
    : "Trust the transport response without proving the downstream state.";
}

export function traceRows(input, out) {
  return [
    ["1", "IDENTITY", input.evidenceTaskId === input.taskId && input.evidenceAttemptId === input.attemptId ? "claimed" : "mismatch", input.evidenceTaskId + " / " + input.evidenceAttemptId],
    ["2", "PRE-STATE", input.observedPreState === input.expectedPreState ? "match" : "mismatch", "expected " + input.expectedPreState + " · caller supplied " + input.observedPreState],
    ["3", "ATTEMPT", "attempted", "caller-selected acknowledgement: " + input.providerAcknowledgement],
    ["4", "READBACK", input.readbackComplete ? "claimed" : "incomplete", input.readbackComplete ? "caller supplied " + input.observedPostState : "provider state not established"],
    ["5", "LOCAL CHECK", "simulated", displayVerdict(out) + " · " + out.reason],
    ["6", "RETRY", out.retry === "DO_NOT_RETRY" || out.retry === "DO_NOT_MUTATE" ? "blocked" : "hold", "simulation: " + out.retry.replaceAll("_", " ")],
  ];
}

export function renderResultMarkup(input, out) {
  const [why, safe] = explanation(out);
  const tone = "unknown"; // Neutral amber, not green "VERIFIED" semantics for user-controlled fixtures.
  const verdict = displayVerdict(out);
  const trace = traceRows(input, out)
    .map(([n, stage, state, detail]) => '<div class="trace-step"><span>' + n + '</span><b>' + stage + '</b><em class="' + escapeHtml(state) + '">' + escapeHtml(state) + '</em><p>' + escapeHtml(detail) + '</p></div>')
    .join("");
  return [
    '<div class="result-head"><div><div class="decision-label">LOCAL SYNTHETIC COMPARISON</div><h3 class="decision ' + tone + '">' + escapeHtml(verdict) + '</h3><p>' + escapeHtml(why) + '</p><p><strong>External effect: UNKNOWN.</strong> These fields are caller-controlled and NOT provider-authenticated proof.</p></div><span class="badge ' + tone + '">' + escapeHtml(out.reason) + '</span></div>',
    '<div class="safe-action"><b>Illustrative next step — NOT authorization to execute or retry</b><span>' + escapeHtml(safe) + '</span></div>',
    '<div class="comparison"><article><h4>Hypothetical naive reaction</h4><p>' + escapeHtml(naiveReaction(input)) + '</p></article><article class="guarded"><h4>Local reference recommendation only</h4><p>' + escapeHtml(out.retry.replaceAll("_", " ")) + ' — not a real-effect verdict or retry grant</p></article></div>',
    '<div class="trace">' + trace + '</div>',
    '<details><summary>Inspect exact verifier input and output</summary><pre>' + escapeHtml(JSON.stringify({ input, output: out }, null, 2)) + '</pre></details>',
  ].join("");
}

export function evaluateControls(controls, verifier) {
  const input = toVerifierInput(controls);
  const output = verifier(input);
  return { input, output, markup: renderResultMarkup(input, output) };
}
