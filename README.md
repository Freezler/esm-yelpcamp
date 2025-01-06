# WDB final project: YelpCamp

## CJS or ESM ??

The difference between require() and import in Node.js is their origins, syntax, and the context in which they are used.

---

### Module System

- require():
  Part of the CommonJS (CJS) module system.
- Used in older Node.js projects and environments.
- import: Part of the ES Modules (ESM) system.
- Introduced in ECMAScript 2015 (ES6) and is the modern standard for JavaScript.

### Syntax

- require()
  - Function syntax:

```javascript
const module = require('module-name')
```

- import:
  - Declarative syntax:

```javascript
import module from 'module-name'
```

### File Extensions

- `require()`: Automatically resolves `.js` `.json`, or `.node` extensions.
- `import`: Needs extensions in some cases, especially when using ESM (e.g.,`import module from './module.js';`).

### Async Loading

- `require()`: Synchronous. Modules are loaded and executed at runtime.
- `import`: Support asynchronous loading natively in ESM environments.

### Use Case and Compatibility

- `require()`:
  - Works in Node.js without additional configuration.
  - Not natively supported in browsers.
- `import`
  - Used in modern JS and browsers.
  - Needs `javascript "type": "module"` in the package.json for Node ESM support.

### Static vs. Dynamic Nature

- `require():` Can be used dynamically within functions or blocks:

```javascript
if (condition) {
  const module = require('module-name')
}
```

- `import`:
  is static and must be declared at the top of the file. Dynamic imports are supported via `import()`:

```javascript
if (condition) {
  const module = await import('module-name')
}
```

### Default Exports

`require()`: Handles default exports directly.

```javascript
const module = require('./module')
```

- `import`: Explicit handling of default and named exports:

```javascript
import defaultExport from './module.js'
import { namedExport } from './module.js'
```

#### Conclusion

Use require() for legacy projects or when working in CommonJS environments.
Use import for new and modern projects that leverage ES Modules for better compatibility with browsers and modern tooling.

---

## Using `__dirname` in Node.js

In this section, we looked at how to use `__dirname` in Node.js, even with ES modules in the newer versions (14 and later).

---

### What is `__dirname`?

`__dirname` is a built-in global variable in Node.js that represents the directory name of the current module.

### Defining `__dirname` in ES Modules

In newer versions of Node.js, `__dirname` is not automatically defined when using ES modules. To define it, you can use the following code:

```javascript
const __dirname = dirname(fileURLToPath(import.meta.url))
```

### Alternative Approach

Alternatively, you can use the `path.dirname()` function with the `import.meta.url` property to get the current directory:

```javascript
import path from 'path'
import { fileURLToPath } from 'url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
```

### Comparison

Both approaches achieve the same result, but the first approach using **dirname is generally considered cleaner and more readable. Additionally, the `**dirname` syntax is more concise and easier to write than the alternative approach.

---

### in Summary

In summary, when using ES modules in Node.js, you need to define \_\_dirname manually or use an alternative approach to get the current directory. The choice between the two approaches depends on your personal preference and the specific requirements of your project. And this is it.

---

## `package.json` Explained

This file defines the metadata, dependencies, and scripts for the project.

### General Information

- **`name`**: `"yelpcamp"`

  - The name of the project or package.

- **`version`**: `"1.0.0"`

  - The current version of the project.

- **`type`**: `"module"`

  - Specifies that the project uses ES modules (i.e., `import`/`export` syntax instead of `require`/`module.exports`).

- **`main`**: `"src/app.ts"`

  - The entry point of the application, usually the file where the app starts running. In this case, it’s the `app.ts` file located in the `src` folder.

- **`scripts`**: Defines custom commands to run in the terminal.

  - **`dev`**: `"tsx --env-file=.env app.ts"`
    - Runs the application in development mode using the `tsx` tool. The `--env-file=.env` option loads environment variables from a `.env` file.
  - **`start`**: `"tsx --env-file=.env app.ts"`
    - Runs the application in a similar way to `dev`. Typically, `start` is used for production, but in this case, it runs the app in the same manner as `dev`.
  - **`test`**: `"echo \"Error: no test specified\" && exit 1"`
    - A placeholder for running tests. Currently, it just prints an error message and exits with a status of `1`, indicating no tests are defined.

- **`keywords`**: `[]`

  - An empty array, typically used to define search terms for npm or other package management tools.

- **`author`**: `""`

  - The author of the project. This is left empty here.

- **`license`**: `"ISC"`

  - The license type for the project. `ISC` is a permissive open-source license.

- **`description`**: `""`
  - A short description of the project. This is empty here.

### Dependencies

These are the packages required for the project to run in production.

- **`ejs`**: `^3.1.10`

  - A templating engine for rendering HTML pages. Commonly used in Express apps for server-side rendering of views.

- **`express`**: `^4.21.2`

  - A minimal and flexible Node.js web application framework. It simplifies the creation of web servers and APIs.

- **`method-override`**: `^3.0.0`

  - Middleware for overriding HTTP methods like `PUT` and `DELETE` in environments that don't support them natively (like HTML forms).

- **`mongoose`**: `^8.8.4`

  - An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward way to interact with MongoDB from JavaScript.

- **`morgan`**: `^1.10.0`
  - A HTTP request logger middleware for Node.js, commonly used for logging request details in development and production environments.

### DevDependencies

These are the packages required only for development (e.g., testing, build tools, type definitions).

- **`@types/express`**: `^5.0.0`

  - TypeScript definitions for the `express` module, enabling type-checking and IntelliSense in TypeScript projects.

- **`@types/method-override`**: `^3.0.0`

  - TypeScript definitions for the `method-override` module.

- **`@types/morgan`**: `^1.9.9`

  - TypeScript definitions for the `morgan` module.

- **`@types/node`**: `^22.10.1`

  - TypeScript definitions for Node.js, which includes types for Node's built-in modules like `fs`, `path`, and `http`.

- **`tsx`**: `^4.19.2`
  - A tool that enables running TypeScript files directly without compiling them first. It's commonly used for running TypeScript code in a development environment.

---

### in short

This `package.json` sets up a TypeScript-based project using `express`, `mongoose`, `morgan`, and other dependencies. It includes a `dev` script to start the project in development mode using `tsx` and an empty `test` script placeholder. The dependencies are divided into regular dependencies (required in production) and devDependencies (required only for development purposes).

_For future reference, if you're working with TypeScript, `@types/` packages are essential for enabling type-checking and autocompletion for JavaScript libraries._

---

### project structure

```text
YelpCamp/
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── partials/
│   │   └── navbar.ejs
│   ├── home.ejs
│   └── index.ejs
├── utils/
│   ├── ExpressError.ts
│   └── catchAsync.ts
├── app.ts
└── README.md
```

### Tech Stack

- Node.js with TypeScript (ESM modules, TSX)
- Express.js web framework
- MongoDB with Mongoose
- EJS templating engine
- JOI for data validation
- Method Override for RESTful routes (PUT, DELETE)
- Morgan for request logging
- Dotenv for environment variables
- TSX watch handles:
  - TypeScript compilation
  - File watching
  - Environment variables
  - Auto-restart on changes
