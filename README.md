# MachineOutcome — Public Engineering Case Study

**Status:** Building  
**Focus:** Evidence-backed AI-agent outcomes and task-specific reliability  
**Portfolio:** https://sarmadtawfeek.se/

> This repository is a public case study of the problem, system boundary and engineering decisions. The implementation source remains private by design.

## The problem

Agent traces, benchmark scores and generic “trust” language do not automatically tell an operator what actually happened after an agent attempted a task.

MachineOutcome explores a stronger boundary:

**Verify the downstream outcome first. Only reason about history, reliability or delegation when comparable evidence is strong enough.**

The current engineering direction starts with software repository changes as a concrete task class rather than attempting a universal score for every kind of agent.

## System at a glance

```text
Task
  ↓
Agent attempt
  ↓
Inspectable evidence
  ↓
Verified outcome record
  ↓
Comparable history
  ↓
Task-specific decision support
```

## What I want a technical reviewer to inspect

- **Outcomes over impressions.** A plausible trace is not equivalent to a verified downstream result.
- **Task-specific evidence.** Reliability should not become a universal score detached from comparable work.
- **`UNKNOWN` is useful.** Insufficient evidence should remain insufficient.
- **History should not silently rewrite itself.** Corrections should preserve what changed rather than erasing prior evidence.
- **External content is data, not instruction authority.** A repository being evaluated should not be able to redefine the evaluator’s rules.

## AI-native build approach

This is an AI system built with an AI-assisted workflow. That makes the verification boundary more important, not less.

AI helps me explore implementation paths, reason across system components, generate implementation candidates and surface edge cases. I still treat the problem definition, evidence authority, acceptance criteria, uncertainty and final system behavior as explicit responsibilities.

```text
Operational question
      ↓
Task + evidence boundary
      ↓
AI-assisted exploration / implementation
      ↓
Outcome evidence ingestion
      ↓
Explicit verification state
      ↓
Only then: history / reliability reasoning
```

More detail: [docs/HOW_I_BUILD_WITH_AI.md](docs/HOW_I_BUILD_WITH_AI.md)

## Technical context

The current build direction includes AI-agent workflows, Git/GitHub evidence, structured verification/evaluation and deterministic decision boundaries. Exact private implementation details are intentionally not reproduced here.

## Verification mindset

MachineOutcome treats the outcome record as the foundation. Broader reliability or delegation claims should never outrun the quality and comparability of the underlying evidence.

See [docs/VERIFICATION.md](docs/VERIFICATION.md).

## Current truth boundary

This repository does **not** claim:

- a universal agent trust score;
- broad task coverage;
- proven commercial demand;
- product-market fit;
- that every longer-term reliability or routing layer is already implemented.

## Public / private boundary

Private source code, internal contracts, verifier logic, schemas, raw evidence, governance material and implementation details that would materially reproduce the product remain private.

See [PUBLIC_BOUNDARY.md](PUBLIC_BOUNDARY.md).
