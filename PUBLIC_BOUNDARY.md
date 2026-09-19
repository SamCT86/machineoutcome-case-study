# Public disclosure boundary

This repository contains a **bounded public reference implementation** for technical evaluation. It is not a mirror or source release of the private MachineOutcome production system.

## Intentionally public

- the outcome-first verification problem;
- a small independently bounded state-verification reference;
- synthetic states, adversarial tests and public CI;
- `VERIFIED | FAILED | UNKNOWN` behavior and reconcile-before-retry doctrine;
- selected engineering trade-offs, verification philosophy and uncertainty handling;
- the AI-assisted workflow at a non-sensitive level;
- explicit non-claims.

## Intentionally private

- production provider/runtime source code and schemas;
- credentials, secrets and environment configuration;
- internal repository/provider IDs, incident details and operator authority;
- raw private evidence, fixtures and detailed evidence formats;
- proprietary evaluator, recovery, reliability, delegation and routing logic;
- internal prompts/agent instructions and private repository/document state;
- private commercial experiments and roadmap sequencing;
- implementation details that would materially reproduce the production system.

## Release rule

Public proof is selected by default-deny:

`PRIVATE SOURCE → MINIMUM PROOF → SYNTHETIC STATE → IP/SECRET REVIEW → TEST → PUBLIC`

If a technical principle can be demonstrated with a bounded state machine rather than production provider code, the bounded reference is preferred.

No license to the private implementation is granted or implied by this public reference edition.
