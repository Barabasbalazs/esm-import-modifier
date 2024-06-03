import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { getMatchingImports } from "@/src/parser.ts";

const mockFileContent = `
import { name } from './mod.ts';

// Source phase imports:
import source_mod from './mod.wasm.js';
import cbs from "../gd/jjj.js";
import ajsdas as fff from "./noextension"

import { ref } from "vue";
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
