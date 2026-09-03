# MachineOutcome — verified outcomes before agent trust

**Sarmad Tawfeek · AI systems · technical implementation · automation**  
**Status:** Building  
**Portfolio:** https://sarmadtawfeek.se/

## My role in this build

I researched the product/system problem, chose the direction, defined the high-level blueprint and quality expectations, and used specialist AI personas/agents to drive implementation and iteration.

The implementation is heavily AI-assisted. I do **not** claim that I personally hand-wrote every line of code or independently selected every low-level technical mechanism. My direct ownership is the product direction, system requirements, expert/persona orchestration, acceptance criteria and quality gates.

MachineOutcome starts from a narrower question than “how trustworthy is this agent?”

> **What actually happened after this specific agent attempted this specific task, and what evidence supports that conclusion?**

The current first task class is **software repository change** rather than a universal agent score.

## What exists today

Current private-source evidence includes:

- a concrete first task class: `software.repository_change.v1`;
- task / attempt / evidence / outcome identity;
- an initial operational utility called **Agent Change Outcome Guard**;
- append-oriented evidence and correction semantics;
- structured control/evidence records for review and same-artifact verification workflows;
- a dependency order where reliability, delegation and routing remain downstream of verified outcome evidence.

That means this repo is not presenting a future reliability score as if it already existed.

**Start with the evidence layer:** [PROOF.md](PROOF.md)

## System boundary

```text
Task
  ↓
Agent attempt
  ↓
Inspectable evidence
  ↓
VERIFIED / FAILED / UNKNOWN
  ↓
Outcome receipt / history
  ↓
Only with comparable evidence:
reliability / delegation support
```

These are current system requirements/behaviors; they are not a claim that I personally originated every low-level mechanism used to implement them.

## A failure boundary in the system

A coding agent may evaluate repositories containing prompt-like text or instructions. If that content can redefine the evaluator’s rules, the thing being measured can influence the measurement process.

The current system boundary therefore treats repository/task content as **untrusted data, not instruction authority**.

## How AI fits

AI agents/models are used heavily for implementation, system exploration, edge-case generation, review and iteration.

My role is to define the outcome-verification problem, blueprint the required system behavior, structure the expert/persona workflow, set the quality bar and require evidence/quality gates before accepting stronger claims.

More detail: [docs/HOW_I_BUILD_WITH_AI.md](docs/HOW_I_BUILD_WITH_AI.md)

## Technical context

`AI-agent workflows` · `Git / GitHub evidence` · `structured verification` · `provenance` · `deterministic outcome states`

This is implementation context, not a claim that I personally selected or authored every technical mechanism.

## Inspect the case study

- [Observable proof](PROOF.md)
- [Sanitized outcome example](examples/sanitized-outcome.json)
- [System view](docs/SYSTEM_VIEW.md)
- [System requirements & trade-offs](docs/DECISIONS.md)
- [Verification approach](docs/VERIFICATION.md)
- [Public / private boundary](PUBLIC_BOUNDARY.md)

## Not claimed

- a universal agent trust score;
- broad task coverage;
- proven commercial demand;
- product-market fit;
- completion of every planned reliability, delegation or routing layer;
- personal authorship of every implementation detail.

The case study is strongest when read as an AI-native product/system build that I direct and quality-gate, with low-level implementation performed heavily through AI-assisted workflows.

## Related engineering case studies

- [Agent Cashflow OS](https://github.com/SamCT86/agent-cashflow-os-case-study) — forecast provenance, calibration and held-out evaluation discipline.
- [ReleaseProof](https://github.com/SamCT86/releaseproof-case-study) — exact-artifact verification and reproducible evidence.
- [Billable Meetings OS](https://github.com/SamCT86/billable-meetings-os-case-study) — deterministic business-rule verification with explicit review states.
