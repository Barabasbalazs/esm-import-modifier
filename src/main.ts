import config from "@/config.json" with { type: "json"};
import { ConfigError } from "@/src/errors/index.ts";
import { getDirectoryFilesForExtensions } from "@/src/files.ts";

const {
  directory,
  extensions,
  patternToReplace,
  addedString,
  ignoreExtensionless,
  relativeOnly,
} = config;

if (!directory) throw new ConfigError("directory", "No directory provided");

const files = await getDirectoryFilesForExtensions(directory, extensions);

files.forEach((fileName, index) => {
  const worker = new Worker(import.meta.resolve("@/src/worker.ts"), {
    type: "module",
  });
  worker.postMessage({
    fileName,
    patternToReplace,
    addedString,
    ignoreExtensionless,
    relativeOnly,
    id: index,
  });
  worker.onmessage = ({ data }) => console.log(data);
});
