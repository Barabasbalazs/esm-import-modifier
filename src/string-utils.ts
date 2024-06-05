//potentially have to support absolute imports like @/src/files
export function isRelativeImport(
  importStatement: string,
  startingSymbols = [".", "/", "~", "@", "src"]
) {
  return startingSymbols.some((symbol) => importStatement.startsWith(symbol));
}

export function getFileExtension(fileName: string) {
  return fileName.match(/\.[0-9a-z]+$/i)?.[0] || "";
}
