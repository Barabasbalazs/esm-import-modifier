import config from "@/config.json" with { type: "json"};
import { validateConfig } from "@/src/config-validation.ts";
import { getDirectoryFilesForExtensions } from "@/src/files.ts";

validateConfig(config);

const {
  directory,
  extensions,
  patternToReplace,
  addedString,
  ignoreExtensionless,
  relativeOnly,
} = config;

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
