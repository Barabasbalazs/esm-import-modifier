import { z } from "https://deno.land/x/zod/mod.ts";
import { ConfigError } from "@/src/errors/index.ts";

const ScriptConfig = z.object({
  directory: z.string(),
  extensions: z.array(z.string()),
  patternToReplace: z.string(),
  addedString: z.string(),
  ignoreExtensionless: z.boolean(),
  relativeOnly: z.boolean(),
});

export function validateConfig(config: unknown) {
  const result = ScriptConfig.safeParse(config);
  if (result.success) {
    return { success: true };
  }
  const errorObject = result.error.format();

  const firstErrorKey = Object.keys(errorObject).filter(
    (error) => error !== "_errors"
  )?.[0] as keyof typeof errorObject;

  const errorMessages = (errorObject[firstErrorKey] as { _errors: string[] })
    ?._errors.length
    ? (errorObject[firstErrorKey] as { _errors: string[] })?._errors
    : [
        "Unknown error occurred in config validation. Please check the config file.",
      ];
  throw new ConfigError(firstErrorKey, errorMessages[0]);
}