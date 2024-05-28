import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  getDirectoryFilesForExtensions,
  getFileExtension,
} from "@/src/files.ts";

Deno.test(
  "Testing the directory crawler",
  { permissions: { read: "inherit", run: "inherit" } },
  async () => {
    const files = await getDirectoryFilesForExtensions(
      "./tests/testing-util/example-directory"
    );
    assertEquals(
      files.sort(),
      [
        "./tests/testing-util/example-directory/trails-controller.ts",
        "./tests/testing-util/example-directory/tmp/whatev.ts",
        "./tests/testing-util/example-directory/tmp/jstest.js",
      ].sort()
    );
  }
);

Deno.test("File extension test", () => {
  const fileNames = [
    ".DS_Store",
    "idk",
    "testyr.js",
    "tmp2.ts",
    "test.spec.ts",
    "test.test.ts",
    "deno_test.ts",
    "App.vue",
    "ReacComp.test.tsx",
  ];

  const extensions = fileNames.map((f) => getFileExtension(f));

  assertEquals(extensions, [
    "",
    "",
    ".js",
    ".ts",
    ".ts",
    ".ts",
    ".ts",
    ".vue",
    ".tsx",
  ]);
});
