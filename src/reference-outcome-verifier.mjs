function nonEmptyString(value, key) {
  if (typeof value !== 'string' || value.trim() === '') throw new TypeError(`invalid ${key}`);
}

export function verifyMutationOutcome(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('invalid input');
  const required = ['taskId', 'evidenceTaskId', 'attemptId', 'evidenceAttemptId', 'expectedPreState', 'expectedPostState', 'observedPreState', 'readbackComplete', 'providerAcknowledgement'];
  for (const key of required) {
    if (!(key in input)) throw new TypeError(`missing ${key}`);
  }
  for (const key of ['taskId', 'evidenceTaskId', 'attemptId', 'evidenceAttemptId', 'expectedPreState', 'expectedPostState', 'observedPreState', 'providerAcknowledgement']) {
    nonEmptyString(input[key], key);
  }
  if (typeof input.readbackComplete !== 'boolean') throw new TypeError('invalid readbackComplete');
  if (input.readbackComplete) nonEmptyString(input.observedPostState, 'observedPostState');

  if (input.evidenceTaskId !== input.taskId) {
    return { status: 'FAILED', reason: 'EVIDENCE_TASK_MISMATCH', retry: 'DO_NOT_RETRY' };
  }

  if (input.evidenceAttemptId !== input.attemptId) {
    return { status: 'FAILED', reason: 'EVIDENCE_ATTEMPT_MISMATCH', retry: 'DO_NOT_RETRY' };
  }

  if (input.observedPreState !== input.expectedPreState) {
    return { status: 'FAILED', reason: 'PRESTATE_MISMATCH', retry: 'DO_NOT_MUTATE' };
  }

  if (!input.readbackComplete) {
    return { status: 'UNKNOWN', reason: 'READBACK_INCOMPLETE', retry: 'RECONCILE_BEFORE_RETRY' };
  }

  if (input.observedPostState === input.expectedPostState) {
    return { status: 'VERIFIED', reason: 'POSTSTATE_CONFIRMED', retry: 'DO_NOT_RETRY' };
  }

  if (input.providerAcknowledgement === 'ambiguous' && input.observedPostState === input.observedPreState) {
    return { status: 'UNKNOWN', reason: 'AMBIGUOUS_MUTATION_STATE', retry: 'RECONCILE_BEFORE_RETRY' };
  }

  return { status: 'FAILED', reason: 'POSTSTATE_MISMATCH', retry: 'DO_NOT_RETRY' };
}
