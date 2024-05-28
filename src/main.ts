//import { init, parse } from "npm:es-module-lexer@1.5.3";
import { CLIArgumentError } from "@/src/errors/index.ts";
import { getDirectoryFilesForExtensions } from "@/src/files.ts";

if (!Deno.args.length) throw new CLIArgumentError(1, "No directory provided");

const files = await getDirectoryFilesForExtensions(Deno.args?.[0]);
console.log("files", files);
