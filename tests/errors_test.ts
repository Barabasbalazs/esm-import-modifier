import {
  assertEquals,
  assertInstanceOf,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import { ConfigError, ParseError } from "@/src/errors/index.ts";
import { getDirectoryFilesForExtensions } from "@/src/files.ts";
import { getMatchingImports } from "@/src/parser.ts";

Deno.test("ConfigError messageformat error", () => {
  const error = new ConfigError("1", "test");
  assertEquals(error.message, `Error with argument: 1 in the config => "test"`);
  assertInstanceOf(error, ConfigError);
});

Deno.test("Throw ConfigError on invalid directory", async () => {
  try {
    await getDirectoryFilesForExtensions("./invalid-dir", [".ts", ".js"]);
  } catch (error) {
    assertEquals(
      error.message,
      `Error with argument: directory in the config => "Could not find this directory"`
    );
    assertInstanceOf(error, ConfigError);
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
