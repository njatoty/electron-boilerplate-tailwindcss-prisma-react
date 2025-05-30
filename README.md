```markdown
# Prisma Electron Integration Example

Integrate Prisma in a secure and scalable manner.

Based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate).  
All initial work was done by [Ayron Wohletz](https://dev.to/awohletz/an-electron-app-architecture-32hi) — I highly recommend his articles.

---

## Install

Install project dependencies:

```bash
npm install
```

Run initial Prisma migration and client generation:

```bash
npm run prisma:init
```

Then run:

```bash
npm install
```

again to trigger the postinstall script, or run the postinstall script directly.

---

## Build

Understand the **double `package.json` structure** used by the boilerplate.  
Native modules go into `release/app/package.json`. So `prisma` and `@prisma/client` are added **there**, although the Prisma CLI will also install in the root `package.json`.

The output of the Prisma client generated from `prisma/schema.prisma` must be copied to:

```
../release/app/node_modules/@prisma/client
```

This is required for native binaries to work correctly in production.

Inside `prisma/schema.prisma`, you can specify target binaries depending on your build platform:

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "windows"]
}
```

Electron Builder config ensures these files are included outside the ASAR archive:

```json
{
  "files": [
    "dist",
    "node_modules",
    "package.json",
    "prisma/**/*",
    "resources/**/*",
    "!**/node_modules/@prisma/engines/introspection-engine*",
    "!**/node_modules/@prisma/engines/migration-engine*",
    "!**/node_modules/@prisma/engines/prisma-fmt*",
    "!**/node_modules/@prisma/engines/query_engine-*",
    "!**/node_modules/@prisma/engines/libquery_engine*",
    "!**/node_modules/prisma/query_engine*",
    "!**/node_modules/prisma/libquery_engine*",
    "!**/node_modules/prisma/**/*.mjs"
  ],
  "extraResources": [
    "./assets/**",
    "prisma/**/*",
    "node_modules/@prisma/engines/migration-engine*",
    "node_modules/@prisma/engines/query*",
    "node_modules/@prisma/engines/libquery*"
  ]
}
```

---

## Electron Integration / IPC

Prisma is exposed via `contextBridge` to the renderer. In the main process, bootstrap the DB and set IPC handlers to get the binary paths.

**`src/main/preload.js`:**

```js
const { contextBridge, ipcRenderer } = require('electron');
const { PrismaClient } = require('@prisma/client');

const dbPath = ipcRenderer.sendSync('config:get-prisma-db-path');
const qePath = ipcRenderer.sendSync('config:get-prisma-qe-path');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`,
    },
  },
  __internal: {
    engine: {
      // @ts-expect-error internal prop
      binaryPath: qePath,
    },
  },
});

contextBridge.exposeInMainWorld('api', {
  getUsers: async () => prisma.user.findMany(),
  // add more exposed functions here
});
```

---

## Prisma Startup Times

A postinstall script at `chore/post-install.js` helps fix the cold start problem.  
More info: https://github.com/prisma/prisma/issues/8484

---

## DB Setup

If no DB exists in the packaged app, the default DB from `prisma/dev.db` is copied to the app's user data folder.

---

## TODO

- Migrations/updates handling in production environments

---

## Resources

- [Ayron Wohletz - Electron App Architecture](https://dev.to/awohletz/an-electron-app-architecture-32hi)
- [TasinIshmam/prisma-electron-test](https://github.com/TasinIshmam/prisma-electron-test)
- [Prisma GitHub Discussion 5200](https://github.com/prisma/prisma/discussions/5200)
- [Prisma GitHub Issue 9613](https://github.com/prisma/prisma/issues/9613)
```
