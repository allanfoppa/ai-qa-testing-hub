# QA Hub Handshake

To hand shake with the QA Hub, the applications must have these commands in their package.json

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
