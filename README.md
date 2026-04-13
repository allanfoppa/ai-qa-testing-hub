# AI QA Testing Hub 🚀

A modular, multi-engine testing platform designed to centralize tests for external applications — with a strong focus on **AI-assisted QA** and **Black-Box validation**.

---

## 🎯 Purpose

This project is a **QA hub** that validates external applications through:
- **API testing (Black-box)**: Stressing the system without knowing the internals.
- **User Behavior Simulation**: Real-world end-to-end user flows.
- **AI Output Validation**: Using LLMs to ensure quality and relevance in AI-driven features.

---

## 🏛️ The Three testing Pillars

The Hub is built around three fundamental testing strategies. For a deep dive, read [Testing Pillars](./docs/TESTING_PILLARS.MD).

1.  **Correctness** (“Is the system doing the right thing?”): Validates business logic and output quality.
2.  **Contracts** (“Is the agreement respected?”): Ensures API stability, type safety, and interface consistency.
3.  **Behavior** (“Does it work in real life?”): Validates end-to-end user flows and system orchestration.

---

## 🏗️ Architecture & Engines

The project follows a modular structure where tests are organized by "Suites" (applications under test) and powered by specialized "Engines".

### Directory Structure
```text
src/
├── engines/
│   ├── ai/          # Explorer, Analyzer & Generator
│   ├── jest/        # Correctness & Contracts engine
│   └── playwright/  # Behavior engine
└── suites/
    ├── <app-name>/
    │   ├── backend/
    │   │   ├── correctness/
    │   │   └── contracts/
    │   └── frontend/
    │       ├── correctness/
    │       ├── contracts/
    │       └── behavior/
```

### Engines used
- **Jest**: Powers Correctness and Contracts tests (API level).
- **Playwright**: Powers Behavior tests (E2E/Browser level).
- **AI Engine**: Uses LLMs for intelligent test case generation and exploratory testing.

---

## 🚀 Getting Started

### Prerequisites
- [PNPM](https://pnpm.io/) (Recommended)
- [Ollama](./docs/OLLAMA.md) (For AI features)

### Working with PNPM
The Hub uses PNPM filters to manage isolation between the root tools and specific suites. 
Detailed commands can be found in [PNPM Guide](./docs/PNPM.md).

```bash
# Install root dependencies and a specific project
pnpm install --filter . --filter "@hub/your-app"

# Run tests for a specific project
pnpm --filter "@hub/your-app" test
```

---

## 🛠️ Creating a New Suite

We provide a CLI to automate the creation of new test suites with the standard structure.

```bash
pnpm generate:suite
```
*Follow the interactive prompt to define your suite name and select test types (frontend/backend).*
Refer to [NEW_SUITE_CLI.md](./docs/NEW_SUITE_CLI.md) for more details.

---

## 🤝 The QA Hub Handshake

To integrate an external application with the Hub, the target app must implement specific scripts and a GitHub Action trigger. 
Full guide: [QA Hub Handshake](./docs/QA%20Hub%20Handshake.md).

### 1. Required Scripts
Target apps must include:
- `qa:hub:build`: Command to build the production version of the app.
- `qa:hub:start`: Command to serve the application (using `npx serve` for frontends).

### 2. Triggering Tests
Applications trigger the Hub via Repository Dispatch events in GitHub Actions.

---

## 🤖 AI Features (Ollama)

The Hub integrates with **Ollama** to run local LLMs. Currently used for:
- `ai:explore`: Automated exploratory testing.
- Test case generation (Experimental).

See [Ollama Setup](./docs/OLLAMA.md) for installation and usage.

---

## 🔮 Future Roadmap

- [ ] Unified reporting dashboard for all suites.
- [ ] Multi-environment testing support (Dev/Staging/Prod).
- [ ] Advanced AI-driven code analysis for automatic test generation.
