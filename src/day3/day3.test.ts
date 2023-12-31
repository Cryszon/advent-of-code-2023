import { expect, it, test, describe } from "vitest";
import { sumOfPartNumbersInEngineSchematic } from "./day3.js";
import consola from "consola";

describe("sumOfPartNumbersInEngineSchematic", () => {
  it("should sum numbers adjacent to symbols", () => {
    const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

    expect(sumOfPartNumbersInEngineSchematic(input)).toBe(4361);
  });

  it("should break numbers at the end of a row", () => {
    const input = `
..........
..........
..........
.......#10
..........
.....+..78
85.....+..
..........
..........
..........
`;

    expect(sumOfPartNumbersInEngineSchematic(input)).toBe(88);
  });
});
