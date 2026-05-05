# Proposal — strengthen tooling change workflows

- **Change ID:** `2026-04-23-strengthen-tooling-change-workflows`
- **Status:** Closed
- **Type:** `sdd-system`

---

## 1. Problem statement

Execution of `install-cli-foundation` surfaced issues that the spec should have prevented:

- **Compatibility assumptions were absent.** The proposal did not declare assumptions about how TypeScript, Node, or Biome would behave at the pinned versions. Conflicts (e.g. `@types/node` version mismatch, Biome config API changes) were discovered during execution rather than anticipated.
- **Version non-determinism.** Using `latest` or recently released patch versions caused unexpected behavior: tools changed APIs, defaults shifted, and the agent had to adapt mid-task without spec authority.
- **Cross-cutting concerns lacked a single owner.** The shebang line was specified in both the proposal description and `tsup.config.ts`, creating ambiguity about which was authoritative. The agent resolved this at runtime instead of the spec resolving it at planning time.
- **No validation probes were required.** Tasks assumed tools would behave as documented without any early-validation step. Failures appeared late in the execution sequence.
- **Change type was not classified.** The spec treated tooling/foundation changes the same as feature changes. They require stricter constraints.

These are **source-of-truth deficiencies**, not implementation errors. The system handled failures correctly; the system failed to prevent them.

---

## 2. Objectives

1. Require classification of changes so tooling/foundation changes trigger stricter requirements.
2. Prohibit `latest` and require pinned versions for all tooling changes.
3. Require proposals to declare compatibility assumptions and cross-cutting ownership explicitly.
4. Require validation probes for risky assumptions before bulk execution.
5. Formalize how spec-reality mismatches are treated (source-of-truth, not implementation bugs).
6. Keep the system minimal — no automation, no new tooling, no new layers.

---

## 3. Scope

### A. Workflow improvements

- **`docs/workflows/start-plan.md`** — add a tooling/foundation checklist section that enforces the new requirements when the change is classified as tooling or foundation.
- **`docs/workflows/implement-task.md`** — add a probe-first rule: when a task makes a risky tooling assumption, require a validation step before the bulk of the task executes.

### B. Convention improvements

- **`docs/conventions/documentation.md`** — add a rule formalizing how spec-reality mismatches are treated.
- **`docs/conventions/tooling-changes.md`** — new file; the canonical reference for all requirements specific to tooling and foundation changes.

### C. No changes to

- Application code (`src/`, `test/`, `dist/`)
- CLI behavior, commands, flags, output
- Existing SDD change files (other than this one)
- `AGENTS.md`, `CLAUDE.md`, `README.md`, `sdd/project.md`

---

## 4. Key improvements

### 4.1 Change classification

Every change proposal must declare its type in the header:

- `feature` — adds or modifies user-facing behavior.
- `tooling/foundation` — installs, upgrades, or reconfigures dev tools, build tools, runtimes, or package manager.
- `sdd-system` — modifies workflows, conventions, or SDD structure (no application code).
- `fix` — corrects a defect in an existing feature or configuration.

Classification determines which requirements apply. A `tooling/foundation` change triggers the full checklist in `docs/conventions/tooling-changes.md`.

### 4.2 Versioning policy

In any `tooling/foundation` change:

- All package versions must be **pinned exactly** (e.g. `"14.0.3"`, not `"^14"`, not `"latest"`, not `"*"`).
- Version selection must be justified: the proposal must name the version and state why it was chosen (e.g. "latest stable as of YYYY-MM-DD", "last version before breaking API change").
- The pinned version set must be verified against each other for known incompatibilities before the proposal is approved.

### 4.3 Compatibility assumptions

Any `tooling/foundation` proposal must include an explicit `## Compatibility assumptions` section that declares:

- The minimum runtime version required and why (e.g. "Node 20.10+ — stable ESM, native `fetch`").
- Known constraints between tools at the pinned versions (e.g. "`@types/node` 20.x required for TypeScript 5.5 to resolve `node:` imports correctly").
- Any known API changes or deprecations in the pinned versions that affect this change.
- Anything that was verified against the tool's changelog or release notes.

If an assumption cannot be verified before approval, it must be listed as a **risk** in the proposal.

### 4.4 Cross-cutting concern ownership

Any artifact or behavior that could be produced by more than one tool or file must have a **single declared owner**:

- The owner is named explicitly in the proposal (e.g. "`tsup.config.ts` owns the shebang — `src/cli.ts` must not contain one").
- All tasks referencing that artifact must defer to the declared owner.
- If ownership is ambiguous at planning time, resolve it in the proposal before approving tasks.

### 4.5 Validation probes

Any task that depends on a tooling assumption that has not been empirically verified must begin with a **validation probe**: a minimal, isolated check that confirms the assumption before the task's main body executes.

Examples:
- Before configuring `biome.json`, run `biome --version` and confirm the expected version is installed.
- Before writing TypeScript config, verify `tsc --version` matches the pinned version.
- Before injecting a shebang via `tsup`, build a trivial entrypoint and confirm the output contains the shebang.

If a probe fails, execution must stop. The task is not retried — the spec is revised first.

### 4.6 Spec-reality mismatch rule

Formalized rule, added to `docs/conventions/documentation.md`:

> If execution reveals a mismatch between what the spec prescribes and how a tool actually behaves, treat it as a **source-of-truth issue**, not an implementation bug. Stop execution. Do not adapt around the mismatch at the implementation layer. Revise the spec first, get it approved, then resume.

This rule prevents silent divergence between the spec and reality, and prevents agents from accumulating undocumented workarounds.

---

## 5. Non-goals

- No automation (no scripts that enforce these rules at CI time).
- No new product features or CLI commands.
- No major restructuring of the SDD change directory layout.
- No changes to how feature changes or fix changes are planned (they are unaffected by these additions).
- No retroactive updates to completed change files.

---

## 6. Impact

| Dimension | Expected outcome |
|---|---|
| Planning quality | Proposals for tooling changes are more complete before execution begins |
| Execution failures | Fewer mid-task failures caused by version drift or unverified assumptions |
| Agent behavior | Agents stop at spec issues instead of adapting silently |
| Reproducibility | Pinned versions + declared assumptions make re-execution predictable |
| System complexity | Minimal — three file edits, one new file |

---

## See also

- [`sdd/changes/2026-04-22-install-cli-foundation/proposal.md`](../2026-04-22-install-cli-foundation/proposal.md) — the execution that motivated this change
- [`docs/workflows/start-plan.md`](../../../docs/workflows/start-plan.md) — will be updated by this change
- [`docs/workflows/implement-task.md`](../../../docs/workflows/implement-task.md) — will be updated by this change
- [`docs/conventions/documentation.md`](../../../docs/conventions/documentation.md) — will be updated by this change
