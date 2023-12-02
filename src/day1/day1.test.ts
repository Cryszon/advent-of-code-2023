import { expect, it, test, describe } from "vitest";
import { findCalibractionValue, textOrNumberToNumber } from "./day1.js";

describe("findCalibractionValue", () => {
  it("should find the correct calibration value sum", () => {
    const input = `two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen`;

    expect(findCalibractionValue(input)).toBe(281);
  });
});

describe("textOrNumberToNumber", () => {
  it("should retain actual numbers as-is", () => {
    expect(textOrNumberToNumber("3")).toBe(3);
    expect(textOrNumberToNumber("5")).toBe(5);
  });

  it("should convert textual numbers to actual numbers", () => {
    const numbers = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const fixtures = numbers.map((x, i) => ({ input: x, expected: i }));
    fixtures.forEach((fixture) => {
      expect(textOrNumberToNumber(fixture.input)).toBe(fixture.expected);
    });
  });
});
