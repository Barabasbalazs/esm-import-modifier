import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { replaceSubstringAtIndex } from "@/src/string-utils.ts";

Deno.test("It replaces the substring at given index with given string", () => {
  const textToModify = "adsad asdsad asdasd4552 d";

  const resultText = replaceSubstringAtIndex(textToModify, 2, 4, "REPLACED");

  assertEquals(resultText, "adREPLACEDd asdsad asdasd4552 d");
});
