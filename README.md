# AI QA Testing Hub

A modular, multi-engine testing platform designed to centralize tests for external applications — with a strong focus on **AI-assisted QA**.

---

## Purpose

This project is not a traditional test suite.

It is a **QA hub** that validates external applications through:

- API testing (black-box)
- User behavior simulation
- AI output validation

---

## Core Philosophy

Instead of focusing on code coverage (white-box), this project validates **real system behavior** through three pillars:

---

## The Three Testing Pillars

Read [TESTING_PILLARS.MD](./docs/TESTING_PILLARS.MD)

## Architecture

```text
src/
├── engines/
│ ├── jest/ # Correctness & Contracts engine
│ ├── playwright/ # Behavior engine
│
├── suites/
│ ├── ai-text-summarizer-app/
│ │ ├── backend/
│ │ │ ├── correctness/
│ │ │ └── contracts/
│ │ │
│ │ └── frontend/
│ │ ├── correctness/
│ │ ├── contracts/
│ │ └── behavior/
│ │
│ └── rick-and-morty-graphs-and-stuff/
│ └── ...
```

---

## Engines

Read [ENGINES](./docs/ENGINES.md)

---

## Running Tests

### Run a specific suite

```bash
pnpm run test:summarizer:back
pnpm run test:summarizer:front
pnpm run test:rick
```

### Create a new suite

Read [NEW_SUITE_CLI.md](./docs/NEW_SUITE_CLI.md)

## Reports

Reports are generated per:

suite
version

Example:

```text
engines/playwright/playwright-report/
 └── ai-text-summarizer-app-frontend/
      └── 1.0.0/
```

## Test Strategy

This project intentionally:

❌ Does NOT collect coverage
✅ Focuses on real-world validation

Why?

Because this is a black-box QA system, testing external apps.

Coverage is a white-box metric and does not apply here.

## AI Testing Considerations

AI systems introduce unique challenges:

Non-deterministic outputs
Frequent changes (model updates)
Semantic correctness vs exact matching

Approach:

- Validate intent, not exact output
- Modular (per suite)
- Engine-based (Jest / Playwright)
- Pillar-driven testing strategy
- Black-box validation
- Scalable architecture
- Current Status

This project is currently focused on:

- Defining architecture
- Establishing testing patterns
- Creating reusable structures

Future Improvements:

- Unified reporting dashboard
- Multi-environment testing (dev / staging / prod)
- Test generators / CLI - OK
- Shared test DSL (domain-specific helpers)

This project does not test code — it tests systems in reality.
