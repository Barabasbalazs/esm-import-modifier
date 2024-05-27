import { BaseError } from "./base-error.ts";

export class CLIArgumentError extends BaseError {
  override name = "CLIArgumentError";
  constructor(message: string) {
    super(message);
  }
}
