import { defineCommand } from "citty";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { sumOfPossibleGameIds as sumOfPossibleGameIds2 } from "../day2/day2.js";

export const sumOfPossibleGameIds = defineCommand({
  meta: {
    name: "sum-of-possible-game-ids",
    version: "1.0.0",
    description:
      "Finds a sum of possible game IDs for the Elf's colored cube games.",
  },
  args: {
    document: {
      type: "positional",
      description: "Path to a document with a record of games played",
      required: true,
    },
  },
  async run({ args }) {
    const input = (await readFile(resolve(args.document))).toString();
    const result = sumOfPossibleGameIds2(input);

    console.log(`Sum of possible game IDs is ${result}`);
  },
});
