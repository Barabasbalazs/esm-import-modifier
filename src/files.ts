import { ConfigError } from "@/src/errors/index.ts";
import { getFileExtension } from "@/src/string-utils.ts";

export async function getDirectoryFilesForExtensions(
  directory: string,
  extensions: string[]
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
        throw new ConfigError("directory", "Could not find this directory");
    }
  }

  await traverseDirectory(directory);

  return files;
}
