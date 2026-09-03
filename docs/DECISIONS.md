# System requirements and trade-offs

These are requirements and trade-offs represented by the current MachineOutcome system. They explain the product/system boundary without claiming that I personally originated every low-level engineering choice used to implement it.

My direct ownership is the product direction, high-level blueprint, expert/persona orchestration, constraints, acceptance criteria and quality gates. The implementation process is heavily AI-assisted.

## 1. Start with one concrete task class

The current direction begins with software repository changes instead of trying to evaluate every possible agent task.

**Trade-off:** narrower coverage produces less breadth, but makes evidence and failure modes more defensible.

## 2. Verify outcomes before scoring reliability

A generic trust score is not the foundation. The system first needs outcome evidence.

**Trade-off:** this delays broad scoring features, but reduces the risk of building confidence on weak observations.

## 3. Keep reliability task-specific

Evidence from one type of work should not silently become evidence for another.

**Trade-off:** less convenient than a single number, more honest about what the history can support.

## 4. Preserve `UNKNOWN`

When outcome evidence is incomplete or incomparable, the system should not force a binary answer.

**Trade-off:** fewer decisive-looking outputs, stronger truth discipline.

## 5. Treat evaluated content as untrusted data

Content inside a repository or task environment may be relevant evidence, but it should not be able to redefine the evaluator’s rules.

**Trade-off:** stricter isolation adds complexity, but protects the evaluation boundary.

## 6. Amend history instead of silently rewriting it

If a prior record needs correction, the change should preserve provenance rather than making the original state disappear.

**Trade-off:** history is more complex, but auditable.

## Questions this case study is intended to create

- What problem is the outcome-verification layer trying to solve?
- Why should agent self-report stay separate from verified outcome evidence?
- Why preserve `UNKNOWN`?
- What quality/evidence bar should exist before a stronger reliability claim is accepted?
- Which parts of the blueprint were requirements I set, and which low-level choices came from the AI-assisted implementation process?
