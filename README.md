# Touseef Ahmed — JS Modules Employee App

Practice for the Bloomrix internship task FE02: JavaScript Modules, Imports, Exports, and Project Structure. No framework is used.

## What This Project Does

A modular JavaScript application that manages employees. It runs in Node.js as a terminal program. The application demonstrates how a real-world JavaScript project is split into separate modules, each responsible for one concern, and how those modules are connected through imports and exports.

The program creates employees, updates and deletes them, searches by name and department, and generates a summary report. The report module is loaded with a dynamic import to demonstrate lazy loading.

## Requirements

Node.js v24.12.0 was used. `package.json` has `"engines": ">=22.12.0"`.

## Folder Structure

```
touseef_ahmed_js_modules_employee_app/
├── main.js                      Entry point
├── package.json
├── eslint.config.js
├── .prettierrc
├── .gitignore
└── src/
    ├── index.js                 Central barrel file — re-exports everything
    ├── modules/
    │   ├── employees.js         Create, update, delete, list
    │   ├── departments.js       Department list and helpers
    │   ├── validation.js        Reusable input validators
    │   ├── search.js            Search by name and department
    │   └── reports.js           Optional report module (loaded dynamically)
    └── utils/
        ├── index.js             Barrel file for utils
        ├── dateUtils.js         Date formatting functions
        └── formatter.js        Employee info and list formatting
```

## Scripts

Run every command from inside the project folder.

| Command | Does |
|---|---|
| `npm install` | Installs dev dependencies (ESLint, Prettier) |
| `npm start` | Runs `main.js` with Node.js |
| `npm run lint` | Checks all files for linting errors |
| `npm run lint:fix` | Fixes linting errors automatically |
| `npm run format` | Formats all files with Prettier |

## How to Run

```
cd "e:\bloomrix internship\tasks+assignments\assessment-fe02\touseef_ahmed_js_modules_employee_app"
node main.js
```

Or use the npm script:

```
npm start
```

## Packages

**devDependencies** — used during development only, not part of the running program:

- `eslint` (`^9.28.0`): checks the code for errors and enforces rules.
- `@eslint/js` (`^9.28.0`): ESLint's recommended rule set for JavaScript.
- `prettier` (`^3.5.3`): formats the code automatically.

Version ranges with a caret such as `^9.28.0` allow new minor and patch versions but not a new major version. `package-lock.json` records the exact versions that were installed, and it is committed so that `npm install` gives the same result every time.

## Modules

### `src/modules/employees.js`

The main data module. Holds the employee list in memory and exports four named functions:

- `createEmployee(name, email, department, salary, joiningDate)` — validates all fields and adds a new employee. Returns the created employee object or `null` if validation fails.
- `updateEmployee(id, updates)` — updates one or more fields of an existing employee by ID. Each field is validated before it is applied.
- `deleteEmployee(id)` — removes an employee by ID. Returns `true` on success and `false` if the ID is not found.
- `listEmployees()` — returns a copy of the full employee array.

### `src/modules/departments.js`

Holds the list of valid departments. Uses both a named export and a default export.

- `DEPARTMENTS` — named export. The array of valid department strings: Engineering, Marketing, Human Resources, Finance, Sales, Design.
- `getDepartmentNames()` — named export. Returns the departments array.
- `departmentExists(department)` — named export. Returns `true` if the department is in the list.
- `default` — default export of the same `DEPARTMENTS` array, demonstrating how one value can be exported both ways.

### `src/modules/validation.js`

Reusable validation functions. Each function returns an object with a `valid` boolean and a `message` string so the caller always knows what went wrong.

- `validateName(name)` — name must be a string of at least 2 characters.
- `validateEmail(email)` — email must match the standard pattern.
- `validateSalary(salary)` — salary must be a positive number.
- `validateDepartment(department)` — department must be one of the values in `DEPARTMENTS`.

### `src/modules/search.js`

- `searchByName(name)` — filters employees whose name contains the search keyword. Case-insensitive.
- `searchByDepartment(department)` — filters employees whose department contains the search keyword. Case-insensitive.

### `src/modules/reports.js`

An optional module that is loaded with a dynamic `import()` in `main.js`. This means it is not loaded at startup — it is only fetched when that line of code runs, demonstrating lazy loading.

- `generateReport()` — returns a formatted string with the total number of employees, total salary, average salary, a count per department, and the full employee list.

### `src/utils/dateUtils.js`

- `formatDate(dateString)` — formats a date as `DD/MM/YYYY`.
- `formatJoiningDate(dateString)` — formats a date as a readable string such as `March 15, 2023`.

### `src/utils/formatter.js`

Uses both a named export and a default export to demonstrate that a single module can mix both styles.

- `formatEmployeeInfo(employee)` — named export. Returns a single-line string with all fields of one employee.
- `formatEmployeeList(employees)` — default export. Returns a numbered list of employees as a string, or `No employees found.` if the array is empty.

## Barrel Files

### `src/index.js`

The central export file. All modules re-export through this file, so `main.js` only needs one import path instead of one per module. This is the barrel file pattern.

### `src/utils/index.js`

A barrel file for the utils folder. Re-exports everything from `dateUtils.js` and `formatter.js`, including the default export of `formatter.js` as a named export.

## Named Exports and Default Exports

| Module | Named exports | Default export |
|---|---|---|
| `employees.js` | `createEmployee`, `updateEmployee`, `deleteEmployee`, `listEmployees` | none |
| `departments.js` | `DEPARTMENTS`, `getDepartmentNames`, `departmentExists` | `DEPARTMENTS` |
| `validation.js` | `validateName`, `validateEmail`, `validateSalary`, `validateDepartment` | none |
| `search.js` | `searchByName`, `searchByDepartment` | none |
| `reports.js` | `generateReport` | none |
| `dateUtils.js` | `formatDate`, `formatJoiningDate` | none |
| `formatter.js` | `formatEmployeeInfo` | `formatEmployeeList` |

## Dynamic Import

`main.js` loads `reports.js` with a dynamic `import()`:

```js
import('./src/modules/reports.js').then((module) => {
  const report = module.generateReport();
  console.log(report);
});
```

This is different from a static import at the top of the file. The module is only loaded when that line runs, which is the basis for lazy loading in larger applications.

## ESLint Configuration

`eslint.config.js` uses the flat config format required by ESLint 9. It extends `@eslint/js` recommended rules and adds:

| Rule | Setting | Effect |
|---|---|---|
| `no-unused-vars` | `warn` | Warns about variables that are declared but never used |
| `no-console` | `off` | Allows `console.log` (needed for terminal output) |
| `eqeqeq` | `error` | Requires `===` instead of `==` |
| `curly` | `error` | Requires braces on all `if` / `for` / `while` blocks |
| `prefer-const` | `error` | Requires `const` when a variable is never reassigned |
| `no-var` | `error` | Disallows `var` — use `let` or `const` instead |

`console` and `process` are declared as globals so ESLint does not flag them as undefined in a Node.js environment.

Run `npm run lint` to check for errors. Run `npm run lint:fix` to fix them automatically where possible.

## Prettier Configuration

`.prettierrc` sets:

| Option | Value | Effect |
|---|---|---|
| `semi` | `true` | Adds semicolons at the end of statements |
| `singleQuote` | `true` | Uses single quotes instead of double quotes |
| `tabWidth` | `2` | Indents with 2 spaces |
| `trailingComma` | `es5` | Adds trailing commas where valid in ES5 |
| `printWidth` | `80` | Wraps lines longer than 80 characters |

Run `npm run format` to format all files at once.

## What Git Ignores

`node_modules` and `package-lock.json` aside, `.gitignore` excludes:

- `node_modules/` — the installed packages. Recreated with `npm install`.

## Module Scope and Strict Mode

Because `package.json` sets `"type": "module"`, every `.js` file in this project is treated as an ES module. ES modules run in strict mode automatically. Variables declared in one module are not accessible in another unless explicitly exported.

## What is Ignored by Git

`node_modules` can be recreated at any time with `npm install`, so it is not committed. This keeps the repository small and avoids committing files that differ between operating systems or Node.js versions.

## Author

Touseef Ahmed — Bloomrix internship, FE02 task
