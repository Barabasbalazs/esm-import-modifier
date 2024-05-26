//for getting the file extensions

function isValidTSFile(fileName: string) {}

async function getDirectoryFiles(directory: string) {
  const files = [] as string[];

  async function traverseDirectory(dir: string) {
    for await (const conentOfDir of Deno.readDir(dir)) {
      conentOfDir.isDirectory
        ? await traverseDirectory(`${dir}/${conentOfDir.name}`)
        : files.push(`${dir}/${conentOfDir.name}`);
    }
  }

  await traverseDirectory(directory);

  return files;
}

export { getDirectoryFiles, isValidTSFile };
