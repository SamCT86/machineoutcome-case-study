# Verification approach

MachineOutcome is built around a sequence: **task → attempt → evidence → outcome**. Reliability reasoning comes later.

## Verification layers

### 1. Task boundary
The system needs a sufficiently explicit description of the work being evaluated.

### 2. Attempt identity
The outcome must belong to the correct agent attempt rather than a nearby run or unrelated state.

### 3. Evidence
The evaluator should use inspectable evidence about the downstream result rather than relying only on the agent’s own success claim.

### 4. Outcome state
The result must preserve uncertainty when the evidence cannot support a stronger conclusion.

### 5. History
Historical outcomes can become useful only when provenance is preserved and comparisons remain defensible.

### 6. Reliability / delegation
Broader decision support should be downstream of comparable high-integrity outcome evidence, not a substitute for it.

## What AI-assisted implementation must survive

- Is the task identity correct?
- Is the evidence attached to the correct attempt?
- Did the downstream state actually satisfy the outcome rule?
- Is any relevant evidence missing or contradictory?
- Is the content being evaluated being treated as data rather than instruction authority?
- Is the conclusion narrower than or equal to the evidence strength?

## Public limit

The private implementation contains more detailed contracts, evidence structures and verifier behavior. This case study exposes the verification model without publishing a reproducible evaluator.
