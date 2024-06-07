import { BaseError } from "@/src/errors/base-error.ts";

export class ConfigError extends BaseError {
  override name = "ConfigError";
  constructor(value: string, message: string) {
    super(`Error with argument: ${value} in the config => "${message}"`);
  }
}
