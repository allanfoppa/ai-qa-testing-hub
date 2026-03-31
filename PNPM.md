# PNPM Commands

1. The Core Isolation Command
   Run this from the Root of the Hub. Replace @hub/summarizer-backend with the name defined in that project's package.json.

```bash
## Installs only the Hub root dependencies AND the specific project dependencies
pnpm install --filter . --filter "@hub/summarizer-backend"
```

--filter .: Ensures the Hub's root tools (like typescript or jq if they are in the root) are installed.

--filter "@hub/summarizer-backend": Only looks at the package.json inside that specific suite folder.

2. Running a Command in Isolation

If you want to run the tests for just one project without triggering the others:

```bash
pnpm --filter "@hub/summarizer-backend" test
```

3. Adding a Dependency to a Specific Project
   If you are sitting in the Hub root and want to add axios only to the Summarizer Backend:

```bash
pnpm add axios --filter "@hub/summarizer-backend"
```
