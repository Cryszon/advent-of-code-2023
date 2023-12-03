import { defineCommand } from "citty";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { sumOfPowerOfSets as sumOfPowerOfSets2 } from "../day2/day2.js";

export const sumOfPowerOfSets = defineCommand({
  meta: {
    name: "sum-of-possible-game-ids",
    version: "1.0.0",
    description: "Calculate sum of power of cubes for a set of games",
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
    const result = sumOfPowerOfSets2(input);

    console.log(`Sum of power of sets is ${result}`);
  },
});
