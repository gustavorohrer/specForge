# Feature — CLI foundation

## Summary

The technical foundation of the SpecForge CLI: the runtime, language, tooling, on-disk layout, and entrypoint conventions that every future command builds on. This feature is **designed** only — no code, dependencies, or config files exist yet.

## Motivation

Defined by [`sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md`](../../../sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md). Freezing the foundation as a single coherent decision record prevents ad-hoc tooling accretion across later implementation changes and gives `specforge init` / `specforge adapt` a stable skeleton to target.

## User-facing behavior

High-level expectations once this feature is installed:

- **Invocation:** users run `specforge` from the terminal after installation via pnpm/npm.
- **Process:** a shebang-launched Node.js process loaded from `dist/cli.js`.
- **Runtime:** ESM, Node.js 20.10+.
- **Behavior without arguments:** prints help and exits with a non-zero code.
- **Exit codes:** conventional — `0` on success, non-zero on handled errors.

No specific commands exist yet; command semantics are defined in future features.

## Non-goals

This feature intentionally does **not**:

- Provide any CLI command (`init`, `adapt`, …).
- Include any adapter, template, or generator.
- Include bootstrap or repository-analysis logic.
- Create `package.json`, `tsconfig.json`, `biome.json`, `tsup.config.ts`, or `vitest.config.ts`.
- Install any dependency.
- Configure CI or release automation.

## Dependencies

None yet — the foundation is designed but not installed. Installation is tracked by `sdd/changes/2026-04-22-install-cli-foundation/`.

## Status

- [x] Designed
- [ ] Planned
- [ ] Implemented
- [ ] Documented
- [ ] Released

## Layout

The foundation prescribes this on-disk layout:

```
specForge/
├── src/
│   ├── cli.ts                # shebang + commander wiring; thin entrypoint
│   ├── commands/             # one file per top-level command (future)
│   └── lib/                  # pure logic, testable in isolation (future)
├── test/                     # vitest specs; mirrors src/ structure
├── dist/                     # build output (gitignored)
├── package.json              # deferred
├── tsconfig.json             # deferred
├── biome.json                # deferred
├── tsup.config.ts            # deferred
└── vitest.config.ts          # deferred
```

Rules:

- `src/cli.ts` is the only entrypoint; it parses args and delegates.
- No business logic in `src/cli.ts` — it wires and exits.
- `src/commands/` holds command handlers; each exports a function consumed by `src/cli.ts`.
- `src/lib/` holds pure functions (filesystem abstracted behind a thin adapter) so unit tests do not touch the real disk.
- `test/` mirrors `src/` 1:1.

## See also

- Entrypoint convention: [`docs/conventions/cli-entrypoint.md`](../../conventions/cli-entrypoint.md)
- Originating change: [`sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md`](../../../sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md)
- Installation (follow-up): [`sdd/changes/2026-04-22-install-cli-foundation/proposal.md`](../../../sdd/changes/2026-04-22-install-cli-foundation/proposal.md)
