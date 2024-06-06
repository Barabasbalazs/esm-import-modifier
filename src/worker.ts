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
  const logPromise = new Promise((resolve, _) => {
    const { id, fileName, patternToReplace, addedString, ignoreExtensionless } =
      event.data;
    parseFile(
      fileName,
      patternToReplace,
      addedString,
      ignoreExtensionless
    ).then(() => resolve(id));
  });

  await logPromise;

  self.postMessage(`Finished processing file: ${event.data.fileName}`);

  self.close();
};
