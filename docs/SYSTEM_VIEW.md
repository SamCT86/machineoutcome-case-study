# System view

This is a deliberately public abstraction, not the private implementation architecture.

```text
┌──────────────┐
│ Task         │
└──────┬───────┘
       ↓
┌──────────────┐
│ Agent attempt│
└──────┬───────┘
       ↓
┌────────────────────┐
│ Inspectable evidence│
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ Verified outcome    │
│ record              │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ Comparable history │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ Task-specific      │
│ decision support  │
└────────────────────┘
```

## Boundary 1 — task identity

A reliability claim is only meaningful when the evaluated work is sufficiently well defined.

## Boundary 2 — evidence

A trace or self-reported success is not automatically outcome evidence. The system direction prioritizes inspectable evidence about what happened downstream.

## Boundary 3 — verified outcome

The verified outcome record is the base layer. Broader interpretation should build on it rather than replace it.

## Boundary 4 — comparability

Historical outcomes should only support reliability reasoning when the tasks and evidence are comparable enough to justify that step.

## Boundary 5 — uncertainty

`UNKNOWN` / `INSUFFICIENT_EVIDENCE` is a legitimate result when the evidence does not support a stronger conclusion.

## Why this is public

A technical reviewer can challenge the model and its trade-offs without receiving the private schemas, verifier implementation, evidence formats or product roadmap.
