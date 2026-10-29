# Contributing to MachineOutcome (public reference)

Thanks for helping improve this small, MIT-licensed, public reference implementation.

## Good contributions

- A minimal synthetic reproduction of a false **VERIFIED**, **FAILED**, or **UNKNOWN** outcome.
- Tests for stale pre-state, mismatched task/attempt evidence, missing readback and unsafe retry claims.
- Documentation or accessibility improvements that make the public demo clearer.

Please open an issue first for a large behavior or API change. Keep proposed changes scoped to the files already in this public repository.

## Test locally

Requires Node.js 20 or later. No package installation or network access is needed for the reference tests.

```bash
npm test
```

Explain the expected result, observed result, and which assertion catches the regression. Do not claim real provider behavior based on synthetic tests alone.

## Privacy and scope

Do **not** add production credentials, private source code, customer details, internal configuration, raw provider evidence or private prompts. Keep examples synthetic. See [PUBLIC_BOUNDARY.md](PUBLIC_BOUNDARY.md) and [SECURITY.md](SECURITY.md).

The MIT license applies to the materials in this public repository, not to the distinct private MachineOutcome runtime or anyone's undisclosed systems. Contributions do not grant access to those systems.
