//import { init, parse } from "npm:es-module-lexer@1.5.3";
import { CLIArgumentError } from "./errors/index.ts";
import { getDirectoryFiles } from "./directory-management/directory-files.ts";

if (!Deno.args.length) throw new CLIArgumentError("No directory provided");

const files = await getDirectoryFiles(Deno.args?.[0]);
console.log("files", files);
