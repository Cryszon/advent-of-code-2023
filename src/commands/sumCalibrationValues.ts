import { defineCommand } from "citty";
import { readFile } from "fs/promises";
import { findCalibractionValue } from "../day1/day1.js";
import { resolve } from "path";

export const sumCalibrationValues = defineCommand({
  meta: {
    name: "sum-calibration-values",
    version: "1.0.0",
    description:
      "Finds a sum of calibration values from a calibration document.",
  },
  args: {
    document: {
      type: "positional",
      description: "Path to calibration document",
      required: true,
    },
  },
  async run({ args }) {
    const input = (await readFile(resolve(args.document))).toString();
    const result = findCalibractionValue(input);

    console.log(`Calibration value sum is ${result}`);
  },
});
