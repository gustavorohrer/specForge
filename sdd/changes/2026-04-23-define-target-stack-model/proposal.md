# Proposal — define target stack model

- **Change ID:** `2026-04-23-define-target-stack-model`
- **Status:** Closed
- **Type:** `sdd-system` — architecture and product design; no application code changes
- **Author:** Gustavo Rohrer
- **Date:** 2026-04-23

---

## 1. Problem statement

SpecForge is built with Node.js and TypeScript. Its purpose, however, is to bootstrap and adapt **any** project regardless of its technology stack. The current state creates a structural risk:

- SpecForge has **no formal model** of what a "target stack" is. Without one, any implementation that generates files, folder structures, or conventions risks defaulting to Node.js and TypeScript artifacts — because that is what the tool itself uses.
- The open decisions in `sdd/project.md` (template strategy, `init` wizard vs non-interactive, `adapt` detection) all depend implicitly on the concept of a target stack, but that concept has never been named or constrained.
- Future changes implementing `specforge init` or `specforge adapt` have no normative guidance on how to avoid this bias. The risk of leaking implementation-stack assumptions into generated output is real and will compound as more commands are built.

**The implementation stack and the target stack are different things.** Confusing them produces incorrect output for users — a Go project receiving a `package.json`, a Python project receiving a `tsconfig.json`. This change makes that distinction explicit and binding.

---

## 2. Objectives

1. Formally separate SpecForge's implementation stack from the target stack it operates on.
2. Define the vocabulary and conceptual model for "target stack" so all future changes share a common language.
3. Establish a minimal, extensible strategy for how SpecForge identifies and handles target stacks.
4. Establish the rule that SpecForge must never assume its own stack as the target stack.
5. Keep the MVP simple: no plugin system, no dynamic loading, no complex detection engine.

---

## 3. Core concept — Target Stack

A **target stack** is the set of technologies that define the project being bootstrapped or adapted:

| Dimension | Description |
|---|---|
| Language(s) | The programming language(s) used in the project (e.g. Go, Python, TypeScript) |
| Runtime(s) | The execution environment (e.g. Node.js, CPython, JVM, native binary) |
| Package / build system | How dependencies and builds are managed (e.g. `go mod`, `pip` + `pyproject.toml`, Maven, `pnpm`) |
| Project structure conventions | Directory layout and file naming expected by the ecosystem |

The target stack is a property of the **user's project**, not of SpecForge.

### Named stacks (initial set)

These are the stacks SpecForge will recognize in MVP and near-term iterations:

| Stack ID | Language | Runtime | Package / build system |
|---|---|---|---|
| `node-typescript` | TypeScript | Node.js | pnpm / npm / yarn |
| `go` | Go | Go toolchain | `go mod` |
| `python` | Python | CPython | `pip` + `pyproject.toml` / `poetry` |
| `java` | Java | JVM | Maven / Gradle |
| `generic` | Any or unknown | Any | Any |

`generic` is the safe default when no stack is identified. It produces only stack-agnostic SDD structure (Markdown files, directory conventions) and makes no assumptions about tooling.

---

## 4. Key design decision — Separation of concerns

Two distinct concepts must never be conflated:

| Concept | Definition | Owner |
|---|---|---|
| **Implementation stack** | The languages, runtime, and tools used to build SpecForge itself | Internal — invisible to target projects |
| **Target stack** | The languages, runtime, and tools used by the project being bootstrapped or adapted | External — declared by the user or detected from the project |

**Rule (binding on all future changes):**

> SpecForge must never assume its own stack is the target stack. No file, template, convention, or generated artifact may embed Node.js, TypeScript, or pnpm assumptions unless the target stack is explicitly identified as `node-typescript`.

This rule applies to:

- All template files under a future `presets/` or `templates/` directory.
- All `specforge init` and `specforge adapt` behaviors.
- All SDD artifacts (CLAUDE.md equivalents, AGENTS.md equivalents, workflow stubs).
- Any file SpecForge writes into the user's repository.

---

## 5. Stack identification strategy (MVP)

SpecForge must know the target stack before generating any output. The MVP defines two identification paths, applied in order:

### 5.1 Explicit input (preferred)

The user declares the stack via a CLI flag:

```
specforge init --stack go
specforge adapt --stack python
```

This is the authoritative path. When `--stack` is provided, no detection is performed.

### 5.2 Heuristic detection (fallback for `adapt`)

When operating on an **existing** repository without an explicit `--stack`, SpecForge may run a lightweight detection pass using well-known sentinel files:

| Sentinel file | Inferred stack |
|---|---|
| `package.json` | `node-typescript` (or `node-javascript` — TBD) |
| `go.mod` | `go` |
| `pyproject.toml` or `setup.py` | `python` |
| `pom.xml` or `build.gradle` | `java` |
| None matched | `generic` |

Detection is **best-effort**. If multiple sentinels are found (e.g. a monorepo), SpecForge must ask the user to be explicit rather than guessing.

### 5.3 Fallback

If neither explicit input nor detection yields a clear result, SpecForge defaults to the `generic` preset and logs a notice informing the user how to override with `--stack`.

### Design constraints on identification

- Detection must never require executing any code from the target project.
- Detection must be file-system only (read sentinel files; do not install, compile, or run).
- The result of identification must be a single, named stack ID (from the list in §3) before any output is generated.

---

## 6. Stack handling model — Presets

Each target stack is handled by a **preset**: a self-contained unit that defines what SpecForge produces for that stack.

A preset defines:

- **SDD folder setup** — which directories and files to create (e.g. `sdd/`, `docs/`, AGENTS.md).
- **Conventions** — stack-specific naming, file extension, or layout guidance to embed in generated docs.
- **Templates** — the Markdown (and optionally other) files to scaffold.
- **Tooling assumptions** — what the preset assumes about the stack's toolchain (declared, not enforced).

Presets are stack-specific and isolated from each other. A preset for `go` must not reference Node.js concepts.

### Conceptual directory layout

```
presets/
  generic/          # stack-agnostic default
  node-typescript/  # reference implementation (mirrors SpecForge's own stack)
  go/
  python/
  java/
```

Each preset is a directory of templates and a small metadata file declaring its stack ID and tooling assumptions. The exact format of that metadata is deferred to the implementation change.

**This change does not implement any preset.** It defines the model only.

---

## 7. MVP strategy

To avoid premature generalization, the MVP scopes implementation strictly:

### What ships in MVP

- `generic` preset — stack-agnostic SDD scaffold; the safe default.
- `node-typescript` preset — as a reference implementation and the stack SpecForge itself uses; useful for dogfooding.
- `--stack` flag on `specforge init` — explicit declaration, no detection required.

### What is deferred

- `go`, `python`, `java` presets — deferred to follow-up changes scoped per stack.
- Heuristic detection — useful for `adapt`, but not required for `init`.
- A plugin or adapter-loading system — explicitly out of scope. Presets are co-located in the SpecForge source tree for now.
- Any configuration format for presets — deferred; internal layout is an implementation detail.

### What is excluded

- Dynamic adapter loading or runtime plugin resolution.
- A registry or marketplace of community presets.
- Any form of code execution against the target project during detection.

---

## 8. Interaction with the SDD system

### Effect on `specforge init`

The `init` command must:
1. Resolve the target stack (via `--stack` flag or, in future, detection).
2. Load the corresponding preset.
3. Generate only the artifacts that preset defines.

`init` must not generate any file that is not explicitly declared by the resolved preset. Default behavior (no `--stack`) uses `generic`.

### Effect on `specforge adapt`

The `adapt` command uses the same preset model but adds the detection path (§5.2). The resolved stack determines which conventions and templates are injected into the existing project.

### Effect on future SDD changes

- Changes that add a new stack (e.g. `add-go-preset`) are scoped to a single preset directory and its metadata. They do not modify any other preset or the core CLI.
- Changes that modify cross-stack behavior (e.g. changing the AGENTS.md template shared by all stacks) must be scoped to the `generic` preset or the shared template layer — not buried in a stack-specific preset.
- SDD artifacts (AGENTS.md, workflow stubs) may vary by stack. Each preset owns its own versions of these files.

---

## 9. Non-goals

- **No implementation of presets** — this change produces no `presets/` directory, no templates, no code.
- **No CLI flags implemented** — `--stack` is defined conceptually here; it is implemented by the change that adds `specforge init`.
- **No detection engine** — the detection logic in §5.2 is a specification, not an implementation.
- **No changes to current application code** — `src/`, `test/`, `dist/` are untouched.
- **No runtime behavior changes** — SpecForge's current behavior (none, as CLI is not yet implemented) is unaffected.

---

## 10. Impact

| Dimension | Expected outcome |
|---|---|
| Correctness | Future commands cannot accidentally generate Node.js artifacts for Go or Python projects |
| Clarity | All contributors share a vocabulary: "target stack", "preset", "stack ID" |
| Extensibility | Adding a new stack requires only a new preset directory and a follow-up change |
| MVP simplicity | Two presets, one flag, no dynamic loading |
| Agent behavior | Agents implementing future commands have a normative model to follow |

---

## 11. Risks and trade-offs

| Risk | Likelihood | Mitigation |
|---|---|---|
| Premature abstraction — preset model turns out to be wrong | Low | MVP scope is minimal; the model is a conceptual constraint, not a rigid API. Changing the preset layout later is a low-cost refactor. |
| Detection false positives in polyglot repos | Medium | Detection is a fallback only; `--stack` is preferred. Multi-sentinel repos fall back to requiring explicit input. |
| `generic` preset produces too little value for specialized stacks | Low | `generic` is the safe floor, not the ceiling. Stack-specific presets add value; they don't replace `generic`. |
| Node.js bias re-introduced by agents unfamiliar with this rule | Medium | The binding rule in §4 is explicit and short. Agents that read `AGENTS.md` and this proposal before implementing will have the constraint. |

---

## See also

- [`sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md`](../2026-04-22-define-node-typescript-cli-foundation/proposal.md) — defines SpecForge's implementation stack (the thing this change separates from target stacks)
- [`sdd/changes/2026-04-23-strengthen-tooling-change-workflows/proposal.md`](../2026-04-23-strengthen-tooling-change-workflows/proposal.md) — stricter rules for tooling changes; applies to future preset-implementation changes
- [`sdd/project.md`](../../project.md) — open decisions that depend on this model (template strategy, `init` wizard, `adapt` detection)
