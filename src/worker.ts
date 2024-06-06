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
  console.log("imports -> ", imports);
  const newFileContent = rewriteImportStatement(
    fileContent,
    imports,
    patternToReplace,
    addedString
  );
  console.log("newFileContent -> ", newFileContent);
  //Deno.writeTextFileSync(file, newFileContent);
}

self.onmessage = async (event: MessageEvent) => {
  //await new Promise((resolve) => setTimeout(resolve, 1000));
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

  const ret = await logPromise;

  console.log("ret -> ", ret);

  self.close();
};
