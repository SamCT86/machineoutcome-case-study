export function verifyMutationOutcome(input) {
  const required = ['expectedPreState', 'expectedPostState', 'observedPreState', 'readbackComplete', 'providerAcknowledgement'];
  for (const key of required) {
    if (!(key in input)) throw new TypeError(`missing ${key}`);
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
