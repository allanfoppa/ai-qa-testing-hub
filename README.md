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
│ ├── ai/ # Explorer & Analyzer & Generate
│ ├── jest/ # Correctness & Contracts engine
│ ├── playwright/ # Behavior engine
│
├── suites/
│ ├── ai-text-summarizer-app/
│ │ ├── backend/
│ │ │ ├── correctness/
│ │ │ └── contracts/
│ │ └── frontend/
│ │ │ ├── correctness/
│ │ │ ├── contracts/
│ │ │ └── behavior/
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

## Test Strategy

Focus in a black-box QA system, testing external apps.

## Future Improvements:

- Unified reporting dashboard
- Multi-environment testing (dev / staging / prod)
- Test generators / CLI - OK
- Shared test DSL (domain-specific helpers)
