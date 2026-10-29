# MachineOutcome

**Check what happened before you retry.**

Software can time out even when an action succeeded. Retrying blindly may create duplicate messages, payments or deployments. MachineOutcome's public reference shows an alternative: check the state that actually exists, bind evidence to the exact task and attempt, and preserve **UNKNOWN** when the outcome cannot be established.

**[Try the browser demo](https://samct86.github.io/machineoutcome-case-study/)** · [Inspect the public reference code](https://github.com/SamCT86/machineoutcome-case-study) · **[MIT license](LICENSE)** · [Contribute](CONTRIBUTING.md)

## What this is

A runnable **MIT-licensed open-source engineering reference**, with synthetic data, small verifier code and adversarial tests. No real payments, customer records, provider credentials or production transactions are involved. The public reference is free to use, modify and redistribute under MIT; see [LICENSE](LICENSE).

**Not a commercial product or paid service offering.** MachineOutcome is not being offered here for sale, and there are no paid engagements offered through this repository. The separate full private runtime is **not** published or licensed here.

## The failure this reference demonstrates

```text
A system starts a task
  → the external action may succeed
  → the transport request times out
  → the system cannot assume "failed"
  → read back provider state for the same task and attempt
  → VERIFIED | FAILED | UNKNOWN
  → retry only when the observed state makes it safe
```

Try **Timeout, but change happened**, then compare **No readback** and **Wrong-attempt evidence** in the [interactive demo](https://samct86.github.io/machineoutcome-case-study/).

## Run the reference locally

```bash
git clone https://github.com/SamCT86/machineoutcome-case-study.git
cd machineoutcome-case-study
npm test
```

The tests cover normal and adversarial readback cases, including stale starting state, ambiguous transport, incomplete evidence, incorrect post-state, and mismatched task/attempt identifiers. These are tests of **this reference**, not evidence of generalized production readiness.

## What to inspect

- `src/reference-outcome-verifier.mjs` — bounded state-verification logic.
- `test/reference-outcome-verifier.test.mjs` — modeled retry and readback failures.
- `fixtures/verified-after-ambiguous-transport.json` — synthetic provider-state example.
- [`PROOF.md`](PROOF.md) — reproducible test and implementation evidence.
- [`PUBLIC_BOUNDARY.md`](PUBLIC_BOUNDARY.md) — what MIT does and does not license.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to improve this public reference.

This is an engineering pattern, not a complete platform: **observed state matters more than transport optimism.**

## Public/private boundary

**Public and MIT-licensed:** the code and documentation in this repository, including the reference state machine, demo, synthetic examples and tests.

**Not published or licensed:** private production source, provider credentials, real events, customer data, internal policy, recovery, routing and delegation systems. A public demo does not imply a deployment of the private MachineOutcome runtime.

## What is and is not proven

| Demonstrated here | Not established here |
| --- | --- |
| Synthetic failure behavior and reference tests | Production reliability across providers |
| Task/attempt-bound proof concept | Independent commercial adoption or retention |
| UNKNOWN / hold instead of blind retry | An authenticated external outcome attestation |
| Public, inspectable implementation slice | License rights to the separate private runtime |

The reference is AI-assisted. The engineering work combines problem framing, decisions, acceptance criteria, generated implementation, adversarial review and tests; authorship of every line is not claimed.

## Feedback and contributions

If the reference misses a failure case, [open a GitHub issue](https://github.com/SamCT86/machineoutcome-case-study/issues). Share a minimal synthetic reproduction, not passwords or private customer data. See [CONTRIBUTING.md](CONTRIBUTING.md).

**No sales offer, paid contract or real-money workflow is made by this repository.**
