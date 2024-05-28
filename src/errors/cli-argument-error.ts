import { BaseError } from "./base-error.ts";

export class CLIArgumentError extends BaseError {
  override name = "CLIArgumentError";
  constructor(indexOfArgument: number, message: string) {
    super(`Error with argument: ${indexOfArgument} -> "${message}"`);
  }
}
