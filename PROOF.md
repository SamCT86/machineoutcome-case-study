# Observable proof

This file distinguishes the **implemented engineering substrate** from the longer-term MachineOutcome direction.

It is based on a fresh read of the private implementation repositories. No private schemas, verifier code, credentials, raw evidence or internal control files are copied here.

**Ownership note:** the implementation evidence below is not a claim that I personally hand-authored or independently selected every low-level technical mechanism. My direct role is product research/direction, system blueprint and requirements, expert/persona orchestration, acceptance criteria and quality gates; AI is used heavily in implementation.

## What the private implementation establishes

### A concrete first task class

The current canonical implementation starts with:

```text
software.repository_change.v1
```

That is a deliberate constraint in the current system. Outcome verification is easier to reason about when the task class is explicit enough to define what evidence could prove success or failure.

### A first operational utility

The private project identifies **MachineOutcome Agent Change Outcome Guard** as the first permanent operational utility.

The public claim stays narrow: the system direction begins by guarding/verifying repository-change outcomes before attempting broad agent reliability or routing claims.

### Structured evidence/control artifacts

The private repository contains structured JSON records used for control and evidence workflows, including staged-review and same-artifact verification/promotion checks.

### Append-oriented history

Corrections are intended to preserve prior evidence through amendments instead of silently rewriting history.

## Failure boundary: evaluated content is untrusted

A repository can contain text that looks like an instruction to an AI system.

The current truth boundary is:

```text
repository content = evaluated data
repository content ≠ evaluator authority
```

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

## What I personally own and can explain

- why I pursued the problem of separating agent self-report from actual downstream outcome;
- the high-level blueprint and system behavior I required;
- how I structured specialist AI personas/agents to research, build, critique and revise the system;
- the quality gates I required around evidence, uncertainty and stronger claims;
- what the current implementation evidence establishes and what remains downstream or unproven;
- how I direct further iteration when AI-generated work does not meet the required system or quality bar.

For a specific schema, evaluator mechanism, state-transition implementation or code path, I distinguish between **implementation evidence** and **a decision I personally made**.
