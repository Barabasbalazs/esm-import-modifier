import { CLIArgumentError } from "@/src/errors/index.ts";
import { getDirectoryFilesForExtensions } from "@/src/files.ts";

if (!Deno.args.length) throw new CLIArgumentError(1, "No directory provided");

const files = await getDirectoryFilesForExtensions(Deno.args?.[0], [
  ".js",
  ".ts",
]);
console.log("files", files);

files.forEach((fileName, index) => {
  const worker = new Worker(import.meta.resolve("@/src/worker.ts"), {
    type: "module",
  });
  worker.postMessage({
    fileName,
    patternToReplace: ".js",
    addedString: ".ts",
    ignoreExtensionless: false,
    id: index,
  });
});
