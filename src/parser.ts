import { init, parse } from "npm:es-module-lexer@1.5.3";
import { getFileExtension } from "@/src/files.ts";

//potentially have to support absolute imports like @/src/files
function isRelativeImport(importStatement: string) {
  return importStatement.startsWith(".");
}

export async function getMatchingImports(
  fileContent: string,
  extension = ".ts",
  ignoreExtensionless = false
) {
  await init;

  const [imports] = parse(fileContent);

  const relativeImportStatements = imports.filter((importStatement) => {
    //first we filter static imports since we use ESM
    if (importStatement.t !== 1) return false;
    const importSource = fileContent.slice(
      importStatement.s,
      importStatement.e
    );
    if (!isRelativeImport(importSource)) return false;
    const fileExtension = getFileExtension(importSource);
    return ignoreExtensionless
      ? fileExtension === extension
      : fileExtension === extension || fileExtension === "";
  });
  return relativeImportStatements;
}
/*
const content = await Deno.readTextFile(
  "./tests/testing-util/example-directory/tmp/whatev.ts"
);

console.log(await getMatchingImports(content));
*/
