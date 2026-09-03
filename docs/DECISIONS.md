# Selected engineering decisions

## 1. Start with one concrete task class

The current direction begins with software repository changes instead of trying to evaluate every possible agent task.

**Trade-off:** narrower coverage produces less impressive breadth, but makes the evidence and failure modes more defensible.

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

**Trade-off:** stricter isolation adds complexity, but is important for AI systems that read potentially adversarial content.

## 6. Amend history instead of silently rewriting it

If a prior record needs correction, the change should preserve provenance rather than making the original state disappear.

**Trade-off:** history is more complex, but auditable.

## Interview questions this should create

- What counts as a verified outcome for a repository change?
- How would you decide whether two tasks are comparable?
- What evidence is independent enough to trust?
- How do you protect an evaluator from prompt-like content in the evaluated repository?
- When would you refuse to calculate a reliability signal?
