# Target stack conventions

## Two distinct concepts

| Concept | Definition | Scope |
|---|---|---|
| **Implementation stack** | The languages, runtime, and tools used to build SpecForge itself | Internal — invisible to target projects |
| **Target stack** | The languages, runtime, and tools used by the project being bootstrapped or adapted | External — declared by the user or detected from the project |

These two concepts must never be conflated.

## Binding rule

> SpecForge must never assume its own stack is the target stack. No file, template, convention, or generated artifact may embed Node.js, TypeScript, or pnpm assumptions unless the target stack is explicitly identified as `node-typescript`.

This rule applies to:

- All template files under `presets/` or `templates/`.
- All `specforge init` and `specforge adapt` behaviors.
- All SDD artifacts written into user projects (AGENTS.md equivalents, workflow stubs, etc.).
- Any file SpecForge writes into a user's repository.

## Named stack IDs

| Stack ID | Language | Runtime | Package / build system |
|---|---|---|---|
| `node-typescript` | TypeScript | Node.js | pnpm / npm / yarn |
| `go` | Go | Go toolchain | `go mod` |
| `python` | Python | CPython | `pip` + `pyproject.toml` / `poetry` |
| `java` | Java | JVM | Maven / Gradle |
| `generic` | Any or unknown | Any | Any |

`generic` is the safe default. Use it when no stack is identified. It produces only stack-agnostic SDD structure and makes no tooling assumptions.

## Stack identification

Apply in order:

1. **Explicit flag** — `--stack <id>` provided by the user. Authoritative; skip detection.
2. **Heuristic detection** — for `adapt` on existing repos without `--stack`:

| Sentinel file | Inferred stack ID |
|---|---|
| `package.json` | `node-typescript` |
| `go.mod` | `go` |
| `pyproject.toml` or `setup.py` | `python` |
| `pom.xml` or `build.gradle` | `java` |
| None matched | `generic` |

Detection is file-system only. Never execute code from the target project during detection. If multiple sentinels are found, require explicit `--stack` rather than guessing.

3. **Fallback** — `generic`, with a notice to the user.

## Preset model

Each target stack is handled by a **preset**: a self-contained unit that defines what SpecForge produces for that stack. A preset declares:

- SDD folder setup (which directories and files to create).
- Conventions (stack-specific naming, extensions, layout guidance).
- Templates (the files to scaffold).
- Tooling assumptions (declared, not enforced).

Presets are isolated from each other. A `go` preset must not reference Node.js concepts.

Conceptual layout:

```
presets/
  generic/          # stack-agnostic default
  node-typescript/  # reference implementation
  go/
  python/
  java/
```

MVP ships only `generic` and `node-typescript`. Additional presets are added by dedicated follow-up changes, one per stack.

## See also

- [`sdd/changes/2026-04-23-define-target-stack-model/proposal.md`](../../sdd/changes/2026-04-23-define-target-stack-model/proposal.md) — full specification and rationale
- [`sdd/project.md`](../../sdd/project.md) — confirmed decisions that depend on this model
