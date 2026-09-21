import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyMutationOutcome } from '../src/reference-outcome-verifier.mjs';

function base(overrides = {}) {
  return {
    taskId: 'task:1',
    evidenceTaskId: 'task:1',
    attemptId: 'attempt:1',
    evidenceAttemptId: 'attempt:1',
    expectedPreState: 'sha:pre',
    expectedPostState: 'sha:post',
    observedPreState: 'sha:pre',
    observedPostState: 'sha:post',
    readbackComplete: true,
    providerAcknowledgement: 'accepted',
    ...overrides,
  };
}

test('exact precondition plus exact provider readback is VERIFIED', () => {
  assert.deepEqual(verifyMutationOutcome(base()), {
    status: 'VERIFIED', reason: 'POSTSTATE_CONFIRMED', retry: 'DO_NOT_RETRY'
  });
});

test('stale pre-state fails before mutation authority', () => {
  assert.deepEqual(verifyMutationOutcome(base({ observedPreState: 'sha:other' })), {
    status: 'FAILED', reason: 'PRESTATE_MISMATCH', retry: 'DO_NOT_MUTATE'
  });
});

test('missing provider readback preserves UNKNOWN and blocks retry', () => {
  assert.deepEqual(verifyMutationOutcome(base({ readbackComplete: false, observedPostState: null })), {
    status: 'UNKNOWN', reason: 'READBACK_INCOMPLETE', retry: 'RECONCILE_BEFORE_RETRY'
  });
});

test('ambiguous transport response can still verify through exact readback', () => {
  assert.equal(verifyMutationOutcome(base({ providerAcknowledgement: 'ambiguous' })).status, 'VERIFIED');
});

test('ambiguous transport plus unchanged state remains UNKNOWN', () => {
  assert.deepEqual(verifyMutationOutcome(base({ providerAcknowledgement: 'ambiguous', observedPostState: 'sha:pre' })), {
    status: 'UNKNOWN', reason: 'AMBIGUOUS_MUTATION_STATE', retry: 'RECONCILE_BEFORE_RETRY'
  });
});

test('complete readback of a wrong post-state is FAILED', () => {
  assert.deepEqual(verifyMutationOutcome(base({ observedPostState: 'sha:unexpected' })), {
    status: 'FAILED', reason: 'POSTSTATE_MISMATCH', retry: 'DO_NOT_RETRY'
  });
});

test('matching post-state from the wrong attempt fails closed', () => {
  assert.deepEqual(verifyMutationOutcome(base({
    taskId: 'task:repo-change-1',
    attemptId: 'attempt:expected',
    evidenceTaskId: 'task:repo-change-1',
    evidenceAttemptId: 'attempt:other',
  })), {
    status: 'FAILED', reason: 'EVIDENCE_ATTEMPT_MISMATCH', retry: 'DO_NOT_RETRY'
  });
});

test('matching post-state from the wrong task fails closed', () => {
  assert.deepEqual(verifyMutationOutcome(base({
    taskId: 'task:expected',
    evidenceTaskId: 'task:other',
  })), {
    status: 'FAILED', reason: 'EVIDENCE_TASK_MISMATCH', retry: 'DO_NOT_RETRY'
  });
});

test('missing expected and observed post-state cannot collapse into VERIFIED', () => {
  assert.throws(
    () => verifyMutationOutcome(base({ expectedPostState: undefined, observedPostState: undefined })),
    /invalid expectedPostState/
  );
});

test('string false cannot masquerade as a complete readback', () => {
  assert.throws(
    () => verifyMutationOutcome(base({ readbackComplete: 'false' })),
    /invalid readbackComplete/
  );
});
