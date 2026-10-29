# Public disclosure boundary

This repository contains a **bounded MIT-licensed public reference implementation** for inspecting and running one engineering invariant. It is not a mirror or source release of the private MachineOutcome production system.

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

## Licensing boundary

The [MIT license](LICENSE) grants rights only to the software and documentation actually published in **this repository**. It does **not** license, disclose or transfer rights to the separate private implementation, private provider integrations or private operational data. The public reference does not claim production equivalence.
