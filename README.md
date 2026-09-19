# MachineOutcome — verified outcomes before agent trust

[![verify-reference](https://github.com/SamCT86/machineoutcome-case-study/actions/workflows/verify-reference.yml/badge.svg)](https://github.com/SamCT86/machineoutcome-case-study/actions/workflows/verify-reference.yml)

A small executable reference for one MachineOutcome invariant: **an attempted mutation is not a verified outcome.** The resulting provider/system state must be read back before success or retry is trusted. The production system remains private.

**Portfolio:** https://sarmadtawfeek.se

## Run locally

```bash
git clone https://github.com/SamCT86/machineoutcome-case-study.git
cd machineoutcome-case-study
npm test
```

Key files:

- `src/reference-outcome-verifier.mjs` — bounded state-verification logic;
- `test/reference-outcome-verifier.test.mjs` — adversarial retry/readback tests;
- `fixtures/verified-after-ambiguous-transport.json` — synthetic provider-state example;
- `PROOF.md` — broader implementation evidence;
- `PUBLIC_BOUNDARY.md` — public/private boundary.

## Verification contract

```text
expected pre-state
→ mutation attempt
→ provider/system readback
→ VERIFIED | FAILED | UNKNOWN
→ retry only when observed state makes retry safe
```

The reference demonstrates that:

- stale pre-state blocks mutation authority;
- incomplete readback preserves `UNKNOWN`;
- ambiguous transport is not automatically a failure;
- exact post-state can verify an ambiguously acknowledged mutation;
- ambiguous state blocks blind retry;
- complete but incorrect post-state is `FAILED`.

Observed state outranks transport optimism.

## Why this matters

Agent systems become dangerous when an unclear response becomes “retry it” without reconciling what actually happened. Duplicate repository writes, deployments, payments, migrations or other external actions can be worse than an explicit failure.

## Production boundary

The private MachineOutcome implementation is materially broader: task/attempt/evidence identity, provenance, append-oriented history, recovery, reliability and delegation/routing work. That implementation is not published here.

Public here:

- bounded state-verification logic;
- synthetic states;
- executable tests and CI;
- non-proprietary system/evidence documentation.

Private:

- production providers and credentials;
- internal repository IDs, incident details and operator authority;
- production schemas, storage and recovery implementation;
- proprietary evaluator/runtime logic;
- unreleased reliability, delegation and routing systems.

## Engineering process

AI tools are part of the implementation workflow. I remain accountable for system boundaries, architecture constraints, code review, debugging, acceptance criteria, tests and release decisions.

## Related references

- [Billable Meetings](https://github.com/SamCT86/billable-meetings-os-case-study) — deterministic contract + evidence → billability.
- [ReleaseProof](https://github.com/SamCT86/releaseproof-case-study) — exact-artifact identity and evidence integrity.
- [PriceBriefs](https://github.com/SamCT86/pricebriefs-case-study) — evidence refusal before commercial action.

## Scope

This repository does not claim universal agent reliability, broad task coverage, commercial demand, product-market fit, or that this bounded reference is the production MachineOutcome runtime.
