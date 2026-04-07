# Creating a New Test Suite

This guide explains how to create a new suite inside the **AI QA Testing Hub**.

---

## Purpose

A **suite** represents a system under test

Each suite follows the **Three Pillars Testing Architecture**:

- Correctness
- Contracts
- Behavior

---

## Quick Start

Run the CLI:

```bash
pnpm generate:suite
```

Interactive Flow explained:

You will be prompted:

```bash
? Enter suite name: my-app
? Select suite types:
 ◉ frontend
 ◉ backend
```

---

Generated Structure:

```bash
# Frontend
src/suites/my-app/frontend/
 ├── correctness/
 │    └── example.correctness.spec.ts
 ├── contracts/
 │    └── example.contracts.spec.ts
 ├── behavior/
 │    └── example.behavior.spec.ts
 └── package.json
```

```bash
# Backend
src/suites/my-app/backend/
 ├── correctness/
 │    └── example.correctness.spec.ts
 ├── contracts/
 │    └── example.contracts.spec.ts
 └── package.json
```
