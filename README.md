# Zeller Customers App

Simple React + TypeScript app that fetches Zeller customers from GraphQL and filters them by user type (`Admin` / `Manager`).

## What Was Implemented

- GraphQL fetch integration using the provided API config and query.
- Scalable server-state management with TanStack React Query.
- User type radio filter with `Admin` selected by default.
- Customer list filtered by selected role.
- Loading state, error state, retry action, and empty state.
- Accessibility improvements for async state announcements.
- Transition polish for role switch and list updates.
- Refactor to a standard folder structure with separated concerns.
- Unit and UI tests using Vitest + React Testing Library.

## Folder Structure

```txt
src/
  components/
    CustomerList.tsx
    UserTypeFilter.tsx
  config/
    awsConfig.ts
  hooks/
    useCustomers.ts
  lib/
    queryClient.ts
  services/
    zellerApi.ts
  types/
    customer.ts
    modules.d.ts
  utils/
    customer.ts
  __tests__/
    App.test.tsx
    customer-utils.test.ts
    zellerApi.test.ts
  test/
    setup.ts
  App.tsx
  App.css
  index.css
```

## Architecture Notes

- `config`: validates and exposes typed runtime configuration.
- `lib`: app-level shared instances (`QueryClient`).
- `services`: API and payload mapping logic.
- `hooks`: UI-facing server-state subscription via React Query.
- `components`: presentational UI blocks.
- `utils`: pure helpers for normalization and rendering.

## Scalability Choices

- React Query handles cache, stale data policy, retries, and deduping.
- Single network fetch with in-memory filtering for immediate role switches.
- `useMemo` for filtered list derivation to reduce unnecessary recompute.
- `useTransition` to keep filter interaction responsive during state updates.
- `AbortSignal` is passed into fetch via React Query query function.

## Accessibility Choices

- Proper grouped radio controls (`radiogroup`).
- Loading text uses `role="status"` + `aria-live="polite"`.
- Error state uses `role="alert"` and includes keyboard-focusable retry action.
- Reduced motion support for users with motion preferences.

## Assumptions

- API key auth is done via `x-api-key`.
- GraphQL role values can be normalized to `ADMIN`/`MANAGER`.
- Showing only `Admin` and `Manager` users is required.
- The screenshot is a visual guide, not strict pixel-perfect design tokens.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Run lint:

```bash
npm run lint
```

5. Run tests:

```bash
npm run test
```

## Test Coverage Included

- `src/__tests__/customer-utils.test.ts`
  - role normalization
  - customer mapping validation
  - initials helper
- `src/__tests__/zellerApi.test.ts`
  - success path mapping
  - HTTP failure handling
  - GraphQL error handling
  - invalid payload filtering
- `src/__tests__/App.test.tsx`
  - default Admin rendering
  - filter behavior after switching to Manager
  - loading status rendering
  - error rendering + retry button behavior
  - empty state rendering for selected role
  - busy-state rendering during background refetch
