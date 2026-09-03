# How I direct the AI-assisted MachineOutcome build

MachineOutcome is both an AI-related product and an AI-assisted build. My role is to define and direct the product/system, not to claim authorship of every line of code.

## What I own

- researching the agent-outcome problem and deciding what product/system direction to pursue;
- defining the high-level blueprint and required truth/evidence behavior;
- creating specialist personas/experts and assigning them responsibilities;
- setting constraints, acceptance criteria and quality gates;
- requiring explicit uncertainty and evidence before accepting stronger claims;
- sending work back for revision when it does not meet the system or quality requirements.

## What AI handles heavily

- implementation and code generation/revision;
- exploration of system/technical options;
- edge-case generation;
- integration investigation;
- technical review and documentation.

I do **not** claim that I independently selected or hand-authored every schema, evaluator mechanism, state transition or code path.

## Working loop

```text
research agent-outcome problem
        ↓
define product + blueprint + quality bar
        ↓
assign specialist AI personas / agents
        ↓
AI-assisted implementation and iteration
        ↓
evidence / tests / quality gates
        ↓
accept, reject or send back for revision
```

The blueprint requires agent self-report to remain separate from verified outcome evidence and allows uncertainty to survive when proof is incomplete. The low-level implementation used to satisfy that requirement may come from the AI-assisted implementation process unless I explicitly state otherwise.

## Interview boundary

I can explain the product problem, why outcome verification matters, the blueprint I required, how I structured the AI workflow, the quality gates I demanded and what the current proof supports.

For a low-level technical choice, I will distinguish between **a requirement I set** and **a technical choice made inside the AI-assisted implementation process**.

For concrete implementation evidence, see [../PROOF.md](../PROOF.md).
