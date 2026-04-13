# Composite Actions

- payload-validator: Validates the payload received from the target application.
- setup-hub: Automatically triggers a scoped pnpm install for the testing hub workspace.
- clone-target: Encapsulates logic for injecting the GitHub token and cloning the external target app.
- prepare-app: A safe action to cd into the app path, fix legacy openssl environments, install dependencies, and optionally run custom build scripts.
- install-playwright: Installs Playwright browsers for frontend suites. Skipped for backend.
- test-runner: Directly invokes start-server-and-test with clear mapping of start commands and wait conditions.
