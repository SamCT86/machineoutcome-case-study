# MachineOutcome - verify what actually happened before retrying

[![verify-reference](https://github.com/SamCT86/machineoutcome-case-study/actions/workflows/verify-reference.yml/badge.svg)](https://github.com/SamCT86/machineoutcome-case-study/actions/workflows/verify-reference.yml)

MachineOutcome is about a simple but important failure mode in automation: an API call can time out even though the external system already changed.

If an agent treats that timeout as a clean failure and retries immediately, it can create duplicate writes, deployments, payments, or other side effects. I built this public reference to make the safer pattern executable and easy to inspect.

> **An attempted action is not the same as a verified outcome. Read back the real state before success or retry is trusted.**

The production system remains private. This repository uses synthetic state only.

## Try it

```bash
git clone https://github.com/SamCT86/machineoutcome-case-study.git
cd machineoutcome-case-study
npm test
```

## How it works

```text
task + attempt identity
-> expected starting state
-> mutation attempt
-> provider/system readback bound to the same task + attempt
-> VERIFIED | FAILED | UNKNOWN
-> retry only when the observed state makes retry safe
```

The reference covers the core state cases plus adversarial identity/contract checks:

1. stale starting state blocks the action;
2. incomplete readback stays `UNKNOWN`;
3. ambiguous transport is not automatically treated as failure;
4. an exact post-state can verify an action even when its acknowledgement was ambiguous;
5. ambiguous state blocks blind retry;
6. a complete but incorrect post-state becomes `FAILED`;
7. evidence from the wrong attempt fails closed even if the post-state matches;
8. evidence from the wrong task fails closed even if the post-state matches;
9. missing expected/observed post-state cannot collapse into a false `VERIFIED`;
10. non-boolean readback completeness cannot masquerade as verified evidence.

The rule behind all of them is simple: **observed state matters more than transport optimism.**

## What to inspect

- `src/reference-outcome-verifier.mjs` - the state-verification logic.
- `test/reference-outcome-verifier.test.mjs` - retry and readback failure cases.
- `fixtures/verified-after-ambiguous-transport.json` - synthetic provider-state example.
- `PROOF.md` - broader implementation evidence.
- `PUBLIC_BOUNDARY.md` - what is public and what stays private.

## What this demonstrates

This is intentionally a small reference, not a claim to be a complete agent framework. It shows the pattern I use when software crosses an external mutation boundary:

- bind evidence to the task and attempt it is supposed to prove;
- bind the state an action is allowed to start from;
- separate attempt status from outcome status;
- read back external state when the result is ambiguous;
- keep an explicit unknown state instead of inventing certainty;
- refuse unsafe replay when reality is not yet known.

The same pattern is useful for repository automation, deployment systems, payments, migrations, and other external side effects.

## Public and private boundary

The private MachineOutcome system goes further with task and attempt identity, evidence, append-oriented history, recovery, reliability controls, and delegation/routing.

Not published here:

- production credentials or customer data;
- internal repository IDs and incident details;
- production persistence and recovery implementation;
- proprietary evaluator and routing logic;
- unreleased reliability or delegation systems.

## What I am claiming here

The claim is deliberately narrow: when a mutation has an ambiguous outcome, the transport result alone is not enough to decide whether success or retry is safe. The code and tests in this repository are meant to make that boundary reviewable.

I am **not** claiming universal agent reliability, broad task coverage, commercial demand, or that this public slice is the production MachineOutcome runtime.

I use AI tools during implementation, but the system boundary, failure cases, tests, debugging, and release decision are mine to own.

For the broader Applied AI work, start with [Agent Forecast Foundry](https://github.com/SamCT86/agent-forecast-foundry-case-study).
