import { expect, test } from "vitest";
import { findCalibractionValue } from "./day1.js";

test("find calibration value example", () => {
  const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

  expect(findCalibractionValue(input)).toBe(142);
});
