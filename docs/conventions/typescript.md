# TypeScript conventions

Defines TypeScript coding rules that apply across all source files in this project, beyond what `tsconfig.json` enforces automatically.

The `tsconfig.json` settings (`strict: true`, `noUncheckedIndexedAccess: true`) are fixed. These rules govern coding discipline within the type system.

## No `any`

`any` is disallowed by default.

- Use `unknown` with explicit type narrowing instead.
- Use a named interface or type alias when the shape is known.
- `any` is allowed only when all of the following are true:
  1. The type is genuinely unknowable at the use site (e.g., interfacing with an untyped external API).
  2. The use is isolated: `any` does not leak across module boundaries or into function signatures.
  3. The rationale is documented in a comment at the use site.

Never use `any` as a shortcut to avoid writing a type. Never let `any` appear in an exported function signature.

## Explicit return types

All exported functions must have explicit return type annotations.

All functions in `src/commands/` and `src/lib/` must have explicit return type annotations, regardless of whether they are exported.

Inference may be used for internal helper functions within a file, but explicit annotations are preferred even there.

## Error types

Errors must be thrown as instances of a class that extends `Error`.

- Never throw a string, number, or plain object.
- Define error classes in `src/lib/` so they can be imported by both `src/commands/` and the error boundary module.
- See [`docs/conventions/errors.md`](./errors.md) for the `UserError` contract.

## No barrel files

Do not create `index.ts` files that re-export from other modules. Import directly from the source file.

```ts
// Correct
import { resolveTarget } from '../lib/resolve.js'

// Incorrect
import { resolveTarget } from '../lib/index.js'
```

Rationale: barrel files obscure where symbols live, create circular-import risk, and produce larger bundles.

## Exhaustiveness in switch statements

When switching over a union type, always include an exhaustiveness check:

```ts
function handle(kind: 'init' | 'adapt'): void {
  switch (kind) {
    case 'init': return doInit()
    case 'adapt': return doAdapt()
    default: {
      const _never: never = kind
      throw new Error(`Unhandled kind: ${_never}`)
    }
  }
}
```

This ensures the compiler catches unhandled cases when the union is extended.

## No speculative generics

Introduce generic type parameters only when the abstraction pays off immediately in the current implementation. Do not design generic APIs for hypothetical future callers.

## Dependency injection over direct side-effectful imports

Functions in `src/lib/` and `src/commands/` that need filesystem, process, or network access must receive those capabilities as parameters, not import them at module scope.

This is both a TypeScript rule and an architecture rule — it enables dependency injection without module-level mocking. See [`docs/conventions/architecture.md`](./architecture.md).

## ESM imports

All imports use the `.js` extension on the module specifier (TypeScript resolves to `.ts` at compile time):

```ts
import { foo } from './foo.js'
```

Omitting the extension is not valid with `"moduleResolution": "NodeNext"`.

## See also

- [`docs/conventions/architecture.md`](./architecture.md) — layer model the DI rule supports
- [`docs/conventions/errors.md`](./errors.md) — error class contract
- [`docs/conventions/testing.md`](./testing.md) — explicit return types and DI improve testability
