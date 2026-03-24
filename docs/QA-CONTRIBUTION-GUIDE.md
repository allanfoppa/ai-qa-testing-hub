# 🛠️ QA Hub: Contribution & AI Workflow Guide

This document defines the standards and workflows for adding new project testing suites to the **`ai-qa-testing-hub`** repository. By following this guide, you ensure that our centralized QA remains scalable, maintainable, and highly automated through AI.

---

## 1. Project Registration

Before writing a single test, you must register the target application in the central registry.

**File:** `config/apps-registry.json`

Add a new entry following this structure:

```json
{
    "id": "project-unique-name",
    "type": "backend | frontend",
    "engine": "jest | plawright | other",
    "baseUrl": "http://localhost:PORT",
    "testFolder": "suites/project-unique-name"
}
```

## 2. File Naming & Code Standards

To maintain a clean repository, adhere to these strict naming conventions:

- **File Names:** Always use kebab-case (e.g., `user-auth.spec.ts`, `freight-calculator.spec.ts`).
- **Comments:** All code documentation and inline comments must be in English.
- **Architecture:** Use the `BaseApiClient` from `frameworks/` for all backend integration tests to ensure shared logic and error handling.

## 3. AI-Assisted Test Generation

We leverage AI to speed up the "Boilerplate" phase of testing. Use the following prompt templates for the best results.

### A. Generating Integration Tests (Backend)

**Prompt Template:**

> I am adding a new suite to my QA Hub. Target: [PASTE CONTROLLER CODE HERE]. Infrastructure: I have a BaseApiClient in ../../frameworks/api-client. Task: Generate a Jest integration suite that tests the primary CRUD operations. Requirement: Use English for all comments and ensure the file follows kebab-case naming.

### B. Discovering Edge Cases

**Prompt Template:**

> Act as a Senior QA Engineer. Analyze this business logic: [PASTE SERVICE CODE]. List 5 edge cases that could break this logic (e.g., boundary numbers, empty strings, unauthorized headers) and provide the Jest code to test them.

## 4. Automation & CI/CD

This repository is designed to be triggered remotely. To connect a new project to this hub:

1. Create a GitHub Personal Access Token (PAT) with repository access.
2. In the Target Repository, add a GitHub Action step to trigger this hub:

```yaml
- name: Trigger Centralized QA
    run: |
        curl -H "Accept: application/vnd.github.v3+json" \
                 -H "Authorization: token ${{ secrets.QA_HUB_PAT }}" \
                 --data '{"event_type": "run-qa-suite", "client_payload": {"project_id": "your-project-id"}}' \
                 https://api.github.com/repos/YOUR_USERNAME/testing-and-qa-with-ai/dispatches
```

## 5. Quality Audit Workflow

When a test fails in the CI/CD pipeline, use AI to perform a "Root Cause Analysis":

1. Copy the Error Log from the GitHub Actions console.
2. Provide the AI with the log and the recent code changes from the target project.
3. **Prompt:** My integration test in the QA Hub failed with this error: [LOG]. Here is my recent code change: [CODE]. Is the error in my application logic or does the test suite need to be updated to match a new contract?

## 6. Checklist for New Suites

- [ ] Project added to `config/apps-registry.json`
- [ ] Folder created in `suites/`
- [ ] Tests use the shared `frameworks/` utilities
- [ ] All comments are in English
- [ ] CI/CD trigger verified
