import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { getDirectoryFiles } from "../src/directory-management/directory-files.ts";

Deno.test(
  "Testing the directory crawler",
  { permissions: { read: "inherit", run: "inherit" } },
  async () => {
    const files = await getDirectoryFiles(
      "./tests/testing-util/example-directory"
    );
    assertEquals(files, [
      "./tests/testing-util/example-directory/trails-controller.ts",
      "./tests/testing-util/example-directory/tmp/whatev.ts",
    ]);
  }
);
