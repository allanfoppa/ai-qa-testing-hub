# QA Hub Handshake

To hand shake with the QA Hub, the applications must have these commands in their package.json

## Package.json

Add to backend

```json
{
    // An example using NestJS
    "qa:hub:build": "nest build",
    "qa:hub:start": "node dist/main"
}
```

Add to frontend

in `qa:hub:start` use `npx serve` to serve the build output. And if it's a single page app, use the `-s` flag to enable SPA mode.

```json
{
    // An example using Vite
    "qa:hub:build": "vite build",
    // The port must match the `server.port` in the payload
    // We use `npx serve` to serve the build output in all frontend applications. NO EXCEPTION!
    "qa:hub:start": "npx serve -s dist -l 4173"
}
```

Be a frontend or backend, the commands are the same having `qa:hub:build` and `qa:hub:start`. The only difference is the `app.root` and `server.port`.

## .github/workflows/trigger-qa-hub.yaml

```yaml
name: Trigger QA Hub (App name) # Will show in the QA Hub UI Actions tab

on:
  push:
    branches: [main] # Or any other branch

jobs:
  notify-hub:
    runs-on: ubuntu-latest
    steps:
      - name: Dispatch Event to QA Hub
        env:
          GH_TOKEN: ${{ secrets.QA_HUB_PAT }}
        run: |
          set -euo pipefail

          EVENT_TYPE="run-<app-name>-tests"
          REPO="${{ github.repository }}"
          PORT="3000" # Must match the `server.port` in the payload
          APP_ROOT="app || frontend || backend" # Must match the `app.root` in the payload

          echo "🚀 Dispatching $EVENT_TYPE"

          curl -i -L -X POST \
            -H "Authorization: token $GH_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            https://api.github.com/repos/allanfoppa/ai-qa-testing-hub/dispatches \
            -d "{
              \"event_type\": \"$EVENT_TYPE\",
              \"client_payload\": {
                \"qaContract\": \"v1\",
                \"repo\": \"$REPO\",
                \"app\": {
                  \"root\": \"$APP_ROOT\"
                },
                \"server\": {
                  \"port\": $PORT,
                  \"healthcheck\": \"http://localhost:3000\"
                }
              }
            }"
```
