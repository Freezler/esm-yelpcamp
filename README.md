# WDB final project: YelpCamp

## CJS or ESM ??

The difference between require() and import in Node.js is their origins, syntax, and the context in which they are used.

-----------------

### Module System

- require():
Part of the CommonJS (CJS) module system.
- Used in older Node.js projects and environments.
- import: Part of the ES Modules (ESM) system.
- Introduced in ECMAScript 2015 (ES6) and is the modern standard for JavaScript.

### Syntax

- require()
  - Function syntax:

``` javascript
const module = require('module-name');
```

- import:
  - Declarative syntax:

``` javascript
import module from 'module-name';
```

### File Extensions

- ```require()```: Automatically resolves ```.js``` ```.json```, or ```.node``` extensions.
- ```import```: Needs extensions in some cases, especially when using ESM (e.g.,```import module from './module.js';```).

### Async Loading

- ```require()```: Synchronous. Modules are loaded and executed at runtime.
- ```import```: Support asynchronous loading natively in ESM environments.

### Use Case and Compatibility

- ```require()```:
  - Works in Node.js without additional configuration.
  - Not natively supported in browsers.
- ```import```
  - Used in modern JS and browsers.
  - Needs ```javascript "type": "module"``` in the package.json for Node ESM support.

### Static vs. Dynamic Nature

- ```require():``` Can be used dynamically within functions or blocks:

``` javascript
if (condition) {
    const module = require('module-name');
}
```

- ```import```:
is static and must be declared at the top of the file. Dynamic imports are supported via ```import()```:

``` javascript
if (condition) {
    const module = await import('module-name');
}
```

### Default Exports

```require()```: Handles default exports directly.

``` javascript
const module = require('./module');
```

- ```import```: Explicit handling of default and named exports:

``` javascript
import defaultExport from './module.js';
import { namedExport } from './module.js';
```

#### Summary

Use require() for legacy projects or when working in CommonJS environments.
Use import for modern projects that leverage ES Modules for better compatibility with browsers and modern tooling.

-----------------

## Using `__dirname` in Node.js

In this section, we looked at how to use `__dirname` in Node.js, even with ES modules in the newer versions (14 and later).

-----------------

### What is `__dirname`?

`__dirname` is a built-in global variable in Node.js that represents the directory name of the current module.

### Defining `__dirname` in ES Modules

In newer versions of Node.js, `__dirname` is not automatically defined when using ES modules. To define it, you can use the following code:

```javascript
const __dirname = dirname(fileURLToPath(import.meta.url));
```

### Alternative Approach

Alternatively, you can use the `path.dirname()` function with the `import.meta.url` property to get the current directory:

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
```

### Comparison

Both approaches achieve the same result, but the first approach using __dirname is generally considered cleaner and more readable. Additionally, the `__dirname` syntax is more concise and easier to write than the alternative approach.

-----------------

### Conclusion

In summary, when using ES modules in Node.js, you need to define __dirname manually or use an alternative approach to get the current directory. The choice between the two approaches depends on your personal preference and the specific requirements of your project. And this is it.
