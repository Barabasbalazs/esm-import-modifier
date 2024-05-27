//for getting the file extensions
//function isValidTSFile(fileName: string) {}

export async function getDirectoryFiles(directory: string) {
  const files = [] as string[];

  async function traverseDirectory(dir: string) {
    for await (const contentOfDir of Deno.readDir(dir)) {
      contentOfDir.isDirectory
        ? await traverseDirectory(`${dir}/${contentOfDir.name}`)
        : files.push(`${dir}/${contentOfDir.name}`);
    }
  }

  await traverseDirectory(directory);

  return files;
}

