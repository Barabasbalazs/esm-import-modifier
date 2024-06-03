import { CLIArgumentError } from "@/src/errors/cli-argument-error.ts";

export function getFileExtension(fileName: string) {
  return fileName.match(/\.[0-9a-z]+$/i)?.[0] || "";
}

export async function getDirectoryFilesForExtensions(
  directory: string,
  extensions = [".js", ".ts"]
) {
  const files = [] as string[];

  async function traverseDirectory(dir: string) {
    try {
      for await (const contentOfDir of Deno.readDir(dir)) {
        if (contentOfDir.isDirectory && contentOfDir.name !== "node_modules")
          await traverseDirectory(`${dir}/${contentOfDir.name}`);
        else if (extensions.includes(getFileExtension(contentOfDir.name)))
          files.push(`${dir}/${contentOfDir.name}`);
      }
    } catch (error) {
      if (error instanceof Deno.errors.NotFound)
        throw new CLIArgumentError(1, "Could not find this directory");
    }
  }

  await traverseDirectory(directory);

  return files;
}
