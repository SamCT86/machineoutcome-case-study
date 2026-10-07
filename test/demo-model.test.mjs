import test from "node:test";
import assert from "node:assert/strict";
import { verifyMutationOutcome } from "../src/reference-outcome-verifier.mjs";
import { SCENARIOS, evaluateControls, escapeHtml, toVerifierInput } from "../src/demo-model.mjs";

const EXPECTED = {
  ambiguousVerified: { status: "VERIFIED", reason: "POSTSTATE_CONFIRMED", retry: "DO_NOT_RETRY" },
  readbackMissing: { status: "UNKNOWN", reason: "READBACK_INCOMPLETE", retry: "RECONCILE_BEFORE_RETRY" },
  unchanged: { status: "UNKNOWN", reason: "AMBIGUOUS_MUTATION_STATE", retry: "RECONCILE_BEFORE_RETRY" },
  stalePrestate: { status: "FAILED", reason: "PRESTATE_MISMATCH", retry: "DO_NOT_MUTATE" },
  wrongAttempt: { status: "FAILED", reason: "EVIDENCE_ATTEMPT_MISMATCH", retry: "DO_NOT_RETRY" },
  wrongPost: { status: "FAILED", reason: "POSTSTATE_MISMATCH", retry: "DO_NOT_RETRY" },
};

for (const [name, scenario] of Object.entries(SCENARIOS)) {
  test("scenario " + name + " executes through canonical verifier and renders the exact outcome", () => {
    const { input, output, markup } = evaluateControls(scenario.controls, verifyMutationOutcome);
    assert.deepEqual(output, EXPECTED[name]);
    assert.match(markup, new RegExp(">" + output.status + "<"));
    assert.match(markup, new RegExp(output.reason));
    assert.match(markup, new RegExp(output.retry.replaceAll("_", " ")));
    assert.match(markup, /Safe next action/);
    assert.match(markup, /Inspect exact verifier input and output/);
    assert.equal(input.taskId, "task:repo-change-001");
  });
}

test("wrong-task manual control is executable and fails closed", () => {
  const input = toVerifierInput({ ack:"accepted", prestate:"match", readback:"complete", poststate:"expected", identity:"wrong-task" });
  assert.deepEqual(verifyMutationOutcome(input), {
    status: "FAILED",
    reason: "EVIDENCE_TASK_MISMATCH",
    retry: "DO_NOT_RETRY",
  });
});

test("rendered synthetic values are escaped before HTML insertion", () => {
  assert.equal(escapeHtml('<img src=x onerror="alert(1)">'), "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
});
