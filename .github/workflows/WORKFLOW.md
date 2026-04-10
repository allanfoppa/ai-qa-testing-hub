# WORFLOW

## Dev Notes

31-03-2026: Initially, I attempted to centralize all testing engines (Jest, Playwright, etc.) within a single GitHub Actions workflow and a shared configuration file, but it did not work well. I'm now trying to separate them by tool and keep the script focused.

01-04-2026: In this version I tried to apply by test tool, like : `qa-jest-suites.yaml` and `qa-playwright-suites.yaml`. And the dificult was threat the diferent environments Like NestJs, Vite and others. So I started studying how to reuse the workflow code with `Composite Action`.

08-04-2026: I'm using the `Composite Action` to create a workflow for each new app to be tested. The number of files will increase, but it will be easier to find the project actions on GitHub because they will be more focused. It's help thinking the Composite actions is a component that can be reused in different workflows. Like a title component that could be use in all the pages of a website or a utility class that convert a string in to a uppercase.

09-04-2026: Instead the AI QA Testing Hub adapts to any application, and add a lot of branches to cover almost all type of and generate a caos, the ideia now is adapt `yourself to use` and comply with the platform contract.

10-04-2026: It's works, now we can have a single responsability for each action, and the workflow is more readable and maintainable. Next step could be add new engines like `Cypress` and `Selenium`, the last one I never used so is a guess.
