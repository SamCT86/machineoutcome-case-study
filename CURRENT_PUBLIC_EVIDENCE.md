# Current public evidence snapshot — 2026-09-19

This page is a deliberately bounded public snapshot of the current MachineOutcome implementation direction. It does not expose private source code, internal repository paths, credentials, provider identifiers, or proprietary evaluator details.

## Stable system boundary

The first task class remains:

`software.repository_change.v1`

The first permanent operational utility remains:

**MachineOutcome Agent Change Outcome Guard**

The core sequencing rule remains:

```text
Task
→ agent attempt
→ inspectable evidence
→ VERIFIED | FAILED | UNKNOWN
→ outcome receipt / history
→ only then: reliability / delegation support
```

## What the current implementation work establishes

The private implementation is no longer only a conceptual outcome schema. Current engineering work is concentrated on the evidence and verification substrate needed to make repository-change outcomes trustworthy under failure and retry conditions, including:

- provider-derived evidence ingestion and qualification;
- explicit task / attempt / evidence / outcome identity;
- append-oriented evidence and correction lineage;
- fail-closed handling for ambiguous or stale state;
- bounded retry / replay / recovery behavior;
- read-before-write and provider/system readback around consequential mutations;
- protections against repository content becoming evaluator instruction authority.

This is engineering evidence for the verification substrate. It is **not** evidence of universal agent reliability, broad task coverage, commercial demand, or product-market fit.

## Five-minute evaluator path

1. Read [`README.md`](README.md) for the product/system boundary.
2. Read [`PROOF.md`](PROOF.md) for the observable implementation evidence and non-claims.
3. Inspect [`examples/sanitized-outcome.json`](examples/sanitized-outcome.json) for the public outcome shape.
4. Read [`docs/SYSTEM_VIEW.md`](docs/SYSTEM_VIEW.md) for dependency ordering.
5. Read [`docs/VERIFICATION.md`](docs/VERIFICATION.md) for verification philosophy.
6. Read [`PUBLIC_BOUNDARY.md`](PUBLIC_BOUNDARY.md) for what intentionally remains private.

## What would invalidate a stronger claim

A reliability or delegation claim should remain blocked if outcomes are not representative and comparable, if provider evidence cannot be bound to the correct task/attempt identity, if retries can silently duplicate or rewrite history, or if untrusted repository content can influence evaluator authority.

`UNKNOWN` / insufficient evidence remains a valid outcome when the evidence cannot support a stronger conclusion.
