import { getMatchingImports, rewriteImportStatement } from "@/src/parser.ts";

async function parseFile(
  file: string,
  patternToReplace: string,
  addedString: string,
  ignoreExtensionless: boolean,
  relativeOnly: boolean
) {
  const fileContent = Deno.readTextFileSync(file);
  const imports = await getMatchingImports(
    fileContent,
    patternToReplace,
    ignoreExtensionless,
    relativeOnly
  );
  const newFileContent = rewriteImportStatement(
    fileContent,
    imports,
    patternToReplace,
    addedString
  );
  Deno.writeTextFileSync(file, newFileContent);
}

self.onmessage = async (event: MessageEvent) => {
  const {
    fileName,
    patternToReplace,
    addedString,
    ignoreExtensionless,
    relativeOnly,
  } = event.data;

  await parseFile(
    fileName,
    patternToReplace,
    addedString,
    ignoreExtensionless,
    relativeOnly
  );

  self.postMessage(`Finished processing file: ${event.data.fileName}`);

  self.close();
};
