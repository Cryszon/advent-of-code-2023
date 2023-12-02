import { defineCommand, runMain } from "citty";
import { commands } from "./commands/index.js";

export const main = defineCommand({
  meta: {
    name: "pnpm main",
    version: "1.0.0",
    description: "CLI for running Cryszon's Advent of Code 2023 solutions",
  },
  subCommands: commands,
});

runMain(main);
