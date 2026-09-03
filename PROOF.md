# Observable proof

This file distinguishes the **implemented engineering substrate** from the longer-term MachineOutcome direction.

It is based on a fresh read of the private implementation repositories. No private schemas, verifier code, credentials, raw evidence or internal control files are copied here.

## What the private implementation establishes

### A concrete first task class

The current canonical implementation starts with:

```text
software.repository_change.v1
```

That is a deliberate constraint. Outcome verification is easier to reason about when the task class is explicit enough to define what evidence could actually prove success or failure.

### A first operational utility

The private project identifies **MachineOutcome Agent Change Outcome Guard** as the first permanent operational utility.

The public claim stays narrow: the system direction begins by guarding/verifying repository-change outcomes before attempting broad agent reliability or routing claims.

### Structured evidence/control artifacts

The private repository contains structured JSON records used for control and evidence workflows, including staged-review and same-artifact verification/promotion checks.

The useful public signal is not the internal filenames. It is that evidence and state transitions are represented as structured artifacts rather than only prose or agent self-report.

### Append-oriented history

Corrections are intended to preserve prior evidence through amendments instead of silently rewriting history.

That matters because an outcome system becomes less trustworthy if a later correction erases what the system previously believed.

## Failure boundary: evaluated content is untrusted

A repository can contain text that looks like an instruction to an AI system.

MachineOutcome’s truth boundary is:

```text
repository content = evaluated data
repository content ≠ evaluator authority
```

This protects the evaluator from letting the subject of the evaluation redefine the rules used to judge it.

## Sanitized outcome shape

See [examples/sanitized-outcome.json](examples/sanitized-outcome.json).

The example is synthetic/redacted. It shows the public semantics only: task identity, attempt identity, evidence state, outcome state and reason for uncertainty.

## Implemented / established vs downstream

| Area | Public evidence state |
|---|---|
| Concrete repository-change task class | Established in canonical implementation |
| Task / attempt / evidence / outcome separation | Core current design |
| Agent Change Outcome Guard | First operational utility in current implementation direction |
| Structured control/evidence records | Present in private repository |
| Append-oriented correction semantics | Explicit truth lock |
| Universal reliability score | Explicitly rejected |
| Broad task coverage | Not claimed |
| Delegation / routing system completion | Downstream; not claimed complete |
| Proven commercial demand / PMF | Not claimed |

## What I can defend in an interview

- why a trace is weaker evidence than a verified downstream outcome;
- why task identity must be explicit before reliability can mean anything;
- what makes two historical outcomes comparable enough to support a reliability conclusion;
- why `UNKNOWN` / `INSUFFICIENT_EVIDENCE` is a useful system state;
- why evaluated repository content must not become instruction authority;
- why corrections should amend history rather than rewrite it;
- where AI helps implementation and where independent evidence must overrule agent self-report.
