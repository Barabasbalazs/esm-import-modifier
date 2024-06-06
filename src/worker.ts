import { getMatchingImports, rewriteImportStatement } from "@/src/parser.ts";

async function parseFile(
  file: string,
  patternToReplace: string,
  addedString: string,
  ignoreExtensionless: boolean
) {
  const fileContent = Deno.readTextFileSync(file);
  const imports = await getMatchingImports(
    fileContent,
    patternToReplace,
    ignoreExtensionless
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
  const { fileName, patternToReplace, addedString, ignoreExtensionless } =
    event.data;

  await parseFile(fileName, patternToReplace, addedString, ignoreExtensionless);

  self.postMessage(`Finished processing file: ${event.data.fileName}`);

  self.close();
};
