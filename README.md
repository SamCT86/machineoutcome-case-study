# MachineOutcome — verified outcomes before agent trust

A public, executable engineering reference for one MachineOutcome principle: **do not infer success from an attempted mutation; verify the exact resulting state.** The production system remains private.

## Five-minute technical evaluation

```bash
git clone https://github.com/SamCT86/machineoutcome-case-study.git
cd machineoutcome-case-study
npm test
```

Then inspect:

- `src/reference-outcome-verifier.mjs` — bounded state-verification reference;
- `test/reference-outcome-verifier.test.mjs` — adversarial retry/readback tests;
- `fixtures/verified-after-ambiguous-transport.json` — synthetic provider-state example;
- `PROOF.md` — broader implementation evidence;
- `PUBLIC_BOUNDARY.md` — what intentionally stays private.

## What this proves

The public reference encodes a narrow operational contract:

```text
expected pre-state
→ mutation attempt
→ provider/system readback
→ VERIFIED | FAILED | UNKNOWN
→ retry only when the observed state makes retry safe
```

It demonstrates that:

- stale pre-state blocks mutation authority;
- incomplete readback preserves `UNKNOWN`;
- an ambiguous transport response is not automatically a failure;
- exact post-state readback can verify an ambiguously acknowledged mutation;
- ambiguous state blocks blind retry;
- a complete but incorrect post-state is `FAILED`.

The reference deliberately treats **observed state as stronger evidence than transport optimism**.

## Why this matters for AI agents

Agent systems fail in a dangerous way when “the call returned strangely” becomes “retry it” without reconciling what actually happened. A duplicated repository write, deployment, payment, migration or external action can be worse than an explicit failure.

The production MachineOutcome system is materially broader than this sample and includes task/attempt/evidence identity, provenance, append-oriented history, recovery and downstream reliability/delegation work. That private implementation is not published here.

This repository is a **reference edition**, not a source release of the production runtime.

## How I build

I use AI agents heavily for implementation, investigation, testing and adversarial review. My ownership is the product problem, evidence doctrine, architecture constraints, acceptance gates, falsifiers and the decision to accept or reject the resulting system.

I do not claim to have hand-written every line. The intended engineering signal is the ability to direct AI-native implementation toward explicit state, falsifiable claims, deterministic verification and safe recovery boundaries.

## Public/private boundary

Public here:

- a bounded state-verification reference;
- synthetic states;
- executable tests;
- CI;
- non-proprietary system/evidence documentation.

Private:

- production providers and credentials;
- internal repository IDs, incident details and operator authority;
- production schemas, storage and recovery implementation;
- proprietary evaluator/runtime logic;
- unreleased reliability, delegation and routing systems.

## Not claimed

This repository does not claim universal agent reliability, broad task coverage, commercial demand, product-market fit, or that this small reference implementation is the production MachineOutcome runtime.
