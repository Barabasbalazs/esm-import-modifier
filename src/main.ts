//import { init, parse } from "npm:es-module-lexer@1.5.3";
import { getDirectoryFiles } from "./file-listings/files.ts";

//error handling
if (!Deno.args.length) {
  throw new Error("Please provide the directory path as an argument");
}

const files = await getDirectoryFiles(Deno.args?.[0]);

console.log(files);
