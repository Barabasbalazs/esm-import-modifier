import { BaseError } from "@/src/errors/base-error.ts";

export class ParseError extends BaseError {
  override name = "ParseError";
  constructor(message: string) {
    const locationOfError = message.substring(
      message.indexOf("@"),
      message.length
    );
    super(
      `${locationOfError}\nPlease check the file for invalid syntax and try again.`
    );
  }
}
