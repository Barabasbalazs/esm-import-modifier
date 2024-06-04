import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { getMatchingImports, rewriteImportStatement } from "@/src/parser.ts";

const mockFileContent = `
import { name } from './mod.ts';

// Source phase imports:
import source_mod from './mod.wasm.js';
import cbs from "../gd/jjj.js";
import ajsdas as fff from "./noextension"

import { ref } from "vue";
import { useHook } from "react";
`;

Deno.test("It finds the correct imports", async () => {
  const matchingImports = await getMatchingImports(mockFileContent, ".ts");

  const importSources = matchingImports.map(({ n }) => n);

  assertEquals(importSources, ["./mod.ts", "./noextension"]);
});

Deno.test(
  "Ignoring the extensionless imports should return right values",
  async () => {
    const matchingImports = await getMatchingImports(
      mockFileContent,
      ".js",
      true
    );

    const importSources = matchingImports.map(({ n }) => n);

    assertEquals(importSources, ["./mod.wasm.js", "../gd/jjj.js"]);
  }
);

Deno.test(
  "It finds the correct imports with relative flag set to false",
  async () => {
    const matchingImports = await getMatchingImports(
      mockFileContent,
      ".ts",
      true,
      false
    );

    const importSources = matchingImports.map(({ n }) => n);

    assertEquals(importSources, ["vue", "react"]);

    const matchingImports2 = await getMatchingImports(
      mockFileContent,
      ".js",
      false,
      false
    );

    const importSources2 = matchingImports2.map(({ n }) => n);

    assertEquals(importSources2, ["vue", "react"]);
  }
);

Deno.test("It rewrites the import statements correctly", async () => {
  const matchingImports = await getMatchingImports(mockFileContent, ".js");

  const newFileContent = rewriteImportStatement(
    mockFileContent,
    matchingImports,
    ".js",
    ".ts"
  );

  const newMatchingImports = await getMatchingImports(
    newFileContent,
    ".ts",
    true
  );

  const importSources = newMatchingImports.map(({ n }) => n);

  assertEquals(importSources, ["./mod.ts", "./mod.wasm.ts", "../gd/jjj.ts"]);
});
