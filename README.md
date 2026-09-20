# MachineOutcome — reconcile reality before retry

[![verify-reference](https://github.com/SamCT86/machineoutcome-case-study/actions/workflows/verify-reference.yml/badge.svg)](https://github.com/SamCT86/machineoutcome-case-study/actions/workflows/verify-reference.yml)

**Engineering signal:** safe agent mutations, observed-state reconciliation, retry boundaries and explicit uncertainty.

MachineOutcome starts from a simple failure mode: an API call can time out after the external system already changed. If an agent treats transport ambiguity as failure and retries blindly, it can duplicate writes, deployments, payments or other irreversible actions.

This public repository makes one reliability invariant executable:

> **An attempted mutation is not a verified outcome. Read back the resulting state before success or retry is trusted.**

The production system remains private. This reference uses synthetic state only.

## Run the failure cases

```bash
git clone https://github.com/SamCT86/machineoutcome-case-study.git
cd machineoutcome-case-study
npm test
```

Primary surfaces:

- `src/reference-outcome-verifier.mjs` — bounded state-verification logic
- `test/reference-outcome-verifier.test.mjs` — adversarial retry/readback cases
- `fixtures/verified-after-ambiguous-transport.json` — synthetic provider-state example
- `PROOF.md` — broader implementation evidence
- `PUBLIC_BOUNDARY.md` — public/private boundary

## State contract

```text
expected pre-state
→ mutation attempt
→ provider/system readback
→ VERIFIED | FAILED | UNKNOWN
→ retry only when observed state makes retry safe
```

The executable reference covers six important cases:

1. stale pre-state blocks mutation authority;
2. incomplete readback preserves `UNKNOWN`;
3. ambiguous transport is not automatically failure;
4. exact post-state can verify an ambiguously acknowledged mutation;
5. ambiguous state blocks blind retry;
6. complete but incorrect post-state is `FAILED`.

The governing principle is deliberate: **observed state outranks transport optimism.**

## What this demonstrates

This is a small reference, not a framework claim. It demonstrates the engineering pattern I use when agentic systems cross a mutation boundary:

- bind the state the action is allowed to start from;
- separate attempt status from outcome status;
- reconcile ambiguous external effects;
- preserve an explicit unknown state;
- refuse unsafe replay when reality is not yet known.

That pattern is relevant to repository automation, deployment systems, payments, migrations and other external side effects.

## Private implementation boundary

The private MachineOutcome system is materially broader and includes task/attempt/evidence identity, provenance, append-oriented history, recovery, reliability work and delegation/routing controls.

Not published here:

- production provider credentials or customer data;
- internal repository IDs and incident details;
- production persistence / recovery implementation;
- proprietary evaluator and routing logic;
- unreleased reliability or delegation systems.

## Engineering accountability

AI tools are part of my implementation workflow. I remain accountable for problem framing, system boundaries, architecture constraints, debugging, acceptance criteria, tests and release decisions.

## Related engineering proof

- [Agent Forecast Foundry](https://github.com/SamCT86/agent-forecast-foundry-case-study) — bounded post-model verification, input binding, abstention and cost/latency guards.
- [Billable Meetings](https://github.com/SamCT86/billable-meetings-os-case-study) — deterministic contract + evidence → billability.
- [ReleaseProof](https://github.com/SamCT86/releaseproof-case-study) — exact-artifact identity and evidence integrity.
- [PriceBriefs](https://github.com/SamCT86/pricebriefs-case-study) — evidence eligibility before commercial action.

## Scope

This repository does not claim universal agent reliability, broad task coverage, commercial demand, product-market fit, or that this bounded reference is the production MachineOutcome runtime.
