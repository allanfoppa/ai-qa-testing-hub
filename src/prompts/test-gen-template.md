# AI Test Generation Prompt

Act as a Senior QA Engineer. Generate a test suite for the following project:
- **Project ID:** {{project_id}}
- **Engine:** {{jest | playwright}}
- **Code to Test:** [PASTE CONTROLLER OR COMPONENT CODE HERE]

**Constraints:**
1. Use the `BaseApiClient` located in `../../frameworks/api-client`.
2. All code comments and documentation must be in English.
3. File names must be kebab-case.
4. Include 3 happy-path tests and 2 edge-case tests.
