import {
  assertEquals,
  assertInstanceOf,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import { validateConfig } from "@/src/config-validation.ts";
import { ConfigError } from "@/src/errors/index.ts";

Deno.test("Validation returns success on correct config", () => {
  const config = {
    directory: "./tests/testing-util/example-directory",
    extensions: [".js", ".ts"],
    patternToReplace: ".js",
    addedString: ".ts",
    ignoreExtensionless: false,
    relativeOnly: true,
  };

  const result = validateConfig(config);

  assertEquals(result.success, true);
});

Deno.test(
  "Validation throws a ConfigError on incorrect config, with key mentioned and message displayed",
  () => {
    const config = {
      directory: "./tests/testing-util/example-directory",
      extensions: [".js", ".ts"],
      patternToReplace: ".js",
      addedString: 1,
      ignoreExtensionless: true,
      relativeOnly: true,
    };

    try {
      validateConfig(config);
    } catch (error) {
      assertEquals(
        error.message,
        `Error with argument: addedString in the config => "Expected string, received number"`
      );
      assertInstanceOf(error, ConfigError);
    }
  }
);

Deno.test("Validation throws error on missing parameter", () => {
  const config = {
    directory: "./tests/testing-util/example-directory",
    extensions: [".js", ".ts"],
    patternToReplace: ".js",
    addedString: ".ts",
    ignoreExtensionless: false,
  };

  try {
    validateConfig(config);
  } catch (error) {
    assertEquals(
      error.message,
      `Error with argument: relativeOnly in the config => "Required"`
    );
    assertInstanceOf(error, ConfigError);
  }
});

Deno.test("Validation throws error on first invalid parameter", () => {
  const config = {};

  try {
    validateConfig(config);
  } catch (error) {
    assertEquals(
      error.message,
      `Error with argument: directory in the config => "Required"`
    );
    assertInstanceOf(error, ConfigError);
  }
});
