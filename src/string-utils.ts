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

export function replaceSubstringAtIndex(
  originalString: string,
  from: number,
  to: number,
  replacementString: string
) {
  return `${originalString.slice(
    0,
    from
  )}${replacementString}${originalString.slice(to, originalString.length)}`;
}
