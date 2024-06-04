import { init, parse } from "npm:es-module-lexer@1.5.3";
import { getFileExtension, isRelativeImport } from "@/src/string-utils.ts";
import { ParseError } from "@/src/errors/index.ts";

export async function getMatchingImports(
  fileContent: string,
  extension: string,
  ignoreExtensionless = false,
  relativeOnly = true
) {
  await init;

  try {
    const [imports] = parse(fileContent);

    const filteredImportStatements = imports.filter((importStatement) => {
      //first we filter static imports since we use ESM
      if (importStatement.t !== 1) return false;

      const extensionToCheck = relativeOnly ? extension : "";

      const importSource = fileContent.slice(
        importStatement.s,
        importStatement.e
      );
      if (relativeOnly && !isRelativeImport(importSource)) return false;
      if (!relativeOnly && isRelativeImport(importSource)) return false;
      const fileExtension = getFileExtension(importSource);
      return ignoreExtensionless
        ? fileExtension === extensionToCheck
        : fileExtension === extensionToCheck || fileExtension === "";
    });
    return filteredImportStatements;
  } catch (error) {
    throw new ParseError(error.message);
  }
}
