import {
  assertEquals,
  assertInstanceOf,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import { CLIArgumentError, ParseError } from "@/src/errors/index.ts";
import { getDirectoryFilesForExtensions } from "@/src/files.ts";
import { getMatchingImports } from "@/src/parser.ts";

Deno.test("CLIArgument messageformat error", () => {
  const error = new CLIArgumentError(1, "test");
  assertEquals(error.message, `Error with argument: 1 => "test"`);
  assertInstanceOf(error, CLIArgumentError);
});

Deno.test("Throw CLIArgumentError on invalid directory", async () => {
  try {
    await getDirectoryFilesForExtensions("./invalid-dir");
  } catch (error) {
    assertEquals(
      error.message,
      `Error with argument: 1 => "Could not find this directory"`
    );
    assertInstanceOf(error, CLIArgumentError);
  }
});

Deno.test("Throw ParseError on invalid file content", async () => {
  try {
    await getMatchingImports("import { } dsafrom './mod.ts';", ".ts");
  } catch (error) {
    assertEquals(
      error.message,
      `@:1:16\nPlease check the file for invalid syntax and try again.`
    );
    assertInstanceOf(error, ParseError);
  }
});
