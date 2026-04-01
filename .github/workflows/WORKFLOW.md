# WORFLOW

## Dev Notes:

31-03-2026: Initially, I attempted to centralize all testing engines (Jest, Playwright, etc.) within a single GitHub Actions workflow and a shared configuration file, but it did not work well. I'm now trying to separate them by tool and keep the script focused.

01-04-2026: In this version I tried to apply by test tool, like : `qa-jest-suites.yaml` and `qa-playwright-suites.yaml`. And the dificult was threat the diferent environments Like NestJs, Vite and others. So I started studying how to reuse the workflow code with `Composite Action`. Now, I will create a workflow for each new app to be tested. The number of files will increase, but it will be easier to find the project actions on GitHub because they will be more focused.
