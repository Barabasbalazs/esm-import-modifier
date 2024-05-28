import {
  assertEquals,
  assertInstanceOf,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import { CLIArgumentError } from "../src/errors/index.ts";

Deno.test("Testing errors", () => {
  const error = new CLIArgumentError(1, "test");
  assertEquals(error.message, `Error with argument: ${1} -> "test"`);
  assertInstanceOf(error, CLIArgumentError);
});
