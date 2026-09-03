# AI in the MachineOutcome workflow

MachineOutcome is both an AI system and an AI-assisted build. That makes authority boundaries more important.

## Where AI helps

- exploring system shapes;
- drafting implementation candidates;
- generating edge cases;
- reasoning across integration boundaries;
- reviewing documentation and assumptions.

## What AI cannot be allowed to decide by plausibility

- what task is being evaluated;
- what evidence is authoritative;
- whether the downstream outcome actually occurred;
- whether two historical outcomes are comparable;
- whether repository content can change evaluator rules;
- when the only defensible result is `UNKNOWN`.

## Working loop

```text
task boundary
   ↓
AI-assisted implementation
   ↓
inspectable evidence
   ↓
verified / failed / unknown
   ↓
only then: history and reliability reasoning
```

A generated implementation or agent self-report is a candidate explanation. The quality gate is whether independent or inspectable evidence supports the outcome claim.

For concrete implementation evidence, see [../PROOF.md](../PROOF.md).
