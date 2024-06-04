import { ImportSpecifier, init, parse } from "npm:es-module-lexer@1.5.3";
import { getFileExtension, isRelativeImport } from "@/src/string-utils.ts";
import { ParseError } from "@/src/errors/index.ts";

export async function getMatchingImports(
  fileContent: string,
  extension: string,
  ignoreExtensionless = false,
  relativeOnly = true
): Promise<ImportSpecifier[]> {
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

export function rewriteImportStatement(
  fileContent: string,
  imports: ImportSpecifier[],
  patternToReplace: string,
  addedString: string
) {
  let newFileContent = fileContent;

  imports.forEach((importStatement) => {
    const importToModify = importStatement.n as string;
    const replacement = patternToReplace
      ? importToModify.replace(patternToReplace, addedString)
      : `${importToModify}${addedString}`;
    newFileContent = newFileContent.replace(importToModify, replacement);
  });

  return newFileContent;
}

/*
const fileContent = await Deno.readTextFile(
  "./tests/testing-util/example-directory/trails-controller.ts"
);

const imports = await getMatchingImports(fileContent, ".js", false, false);

const firstImport = fileContent.slice(imports[0].s, imports[0].e);

console.log("imports -> ", fileContent.replace(firstImport, "whatapp"));

const newFileContent = rewriteImportStatement(
  fileContent,
  imports,
  "",
  "/vapor"
);

console.log("newFileContent -> ", newFileContent);
*/
