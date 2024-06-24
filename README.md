# esm-import-modifier

A small script that rewrites ES imports written in Deno using [ES Module Lexer](https://github.com/guybedford/es-module-lexer) and [Worker modules](https://docs.deno.com/runtime/manual/runtime/workers).

## Installation

Install Deno (if not already set up) using the instructions below:

https://docs.deno.com/runtime/manual/getting_started/installation

Clone the repository

```sh
git clone https://github.com/Barabasbalazs/esm-imports-ts-to-js.git
```

## Settings

The project can be configured trough the [config.json](https://github.com/Barabasbalazs/esm-imports-ts-to-js/blob/main/config.json) file in the root directory.

```json
{
  "directory": "./tests/testing-util/example-directory",
  "extensions": [".js", ".ts"],
  "patternToReplace": ".js",
  "addedString": ".ts",
  "ignoreExtensionless": false,
  "relativeOnly": true
}
```

### directory

Provide the path of the project that needs to be modified (either by relative or absolute path)

### extensions

Only files with the provided extensions will be parsed. 

### patternToReplace

Imports containing this string will be replaced.


### addedString

The string that we'd like to add to the import statements provided in the *patterToReplace* setting.

### ignoreExtensionless

Extensionless imports can be ignored so imports from node_modules won't be affected.

### relativeOnly

Only relative imports will be rewritten. The following starting paths are used to identify these: 

```
[".", "/", "~", "@", "src"] 
```

> [!IMPORTANT]
> Since
> [`ES Module Lexer `](https://github.com/guybedford/es-module-lexer)
> only supports .js and .ts files, projects using other file extensions, can't be parsed (.vue, .tsx)

## Run

Once the configuration file is set up, try running the program with the following command:

```sh
deno task run
```

## Use case

This project was created with the goal of making it easier to refactor import statements in modern ESM based projects.
Unfortunately ESM, TS and other frameworks/libraries often times have different requirements when it comes to import syntax.\
One example for this problem would be [TSC and Node.js not playing well together](https://stackoverflow.com/questions/75807785/why-do-i-need-to-include-js-extension-in-typescript-import-for-custom-module). \
The project aims to simplify this arduous process.