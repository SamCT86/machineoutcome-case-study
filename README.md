# MachineOutcome — verified outcomes before agent trust

**Sarmad Tawfeek · AI systems · technical implementation · automation**  
**Status:** Building  
**Portfolio:** https://sarmadtawfeek.se/

MachineOutcome starts from a narrower question than “how trustworthy is this agent?”

> **What actually happened after this specific agent attempted this specific task, and what evidence supports that conclusion?**

The current first task class is **software repository change** rather than a universal agent score.

## What exists today

The private engineering implementation is separate from the public website and is organized around:

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

## A failure case that changes the architecture

A coding agent evaluates repositories that may themselves contain prompt-like text or instructions.

If that content can redefine the evaluator’s rules, the evaluator is no longer independent of the thing being measured.

MachineOutcome therefore treats repository/task content as **untrusted data, not instruction authority**. That is a security and truth boundary, not just a prompt-engineering preference.

## Where AI fits

AI helps me explore implementation paths, reason across components, generate implementation candidates and surface edge cases. The evaluator still needs explicit authority rules, task identity and evidence requirements.

A model-generated “success” statement is not outcome proof.

More detail: [docs/HOW_I_BUILD_WITH_AI.md](docs/HOW_I_BUILD_WITH_AI.md)

## Technical context

`AI-agent workflows` · `Git / GitHub evidence` · `structured verification` · `provenance` · `deterministic outcome states`

I intentionally avoid publishing a broader stack claim here unless it is directly tied to the current MachineOutcome implementation evidence.

## Inspect the proof

- [Observable proof](PROOF.md)
- [Sanitized outcome example](examples/sanitized-outcome.json)
- [System view](docs/SYSTEM_VIEW.md)
- [Engineering decisions](docs/DECISIONS.md)
- [Verification approach](docs/VERIFICATION.md)
- [Public / private boundary](PUBLIC_BOUNDARY.md)

## Not claimed

- a universal agent trust score;
- broad task coverage;
- proven commercial demand;
- product-market fit;
- completion of every planned reliability, delegation or routing layer.

The case study is strongest when read as **outcome-verification engineering**, not as a claim that the full long-term system is already finished.
