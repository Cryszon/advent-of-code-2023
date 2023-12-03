import { defineCommand } from "citty";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { sumOfPartNumbersInEngineSchematic as sumOfPartNumbersInEngineSchematic2 } from "../day3/day3.js";

export const sumOfPartNumbersInEngineSchematic = defineCommand({
  meta: {
    name: "sum-of-part-numbers-in-engine-schematic",
    version: "1.0.0",
    description:
      "Sums up all numbers from engine schematic that are adjacent to a symbol.",
  },
  args: {
    document: {
      type: "positional",
      description: "Path to engine schematic",
      required: true,
    },
  },
  async run({ args }) {
    const input = (await readFile(resolve(args.document))).toString();
    const result = sumOfPartNumbersInEngineSchematic2(input);

    console.log(`Sum of numbers is ${result}`);
  },
});
