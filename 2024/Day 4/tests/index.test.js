import { describe, test, expect } from "vitest";
import { solve } from "../index.js";

describe("solve", () => {
  test("Advent of Code provided test case #1", () => {
    const dataset = [
      "MMMSXXMASM",
      "MSAMXMSMSA",
      "AMXSXMAAMM",
      "MSAMASMSMX",
      "XMASAMXAMM",
      "XXAMMXXAMA",
      "SMSMSASXSS",
      "SAXAMASAAA",
      "MAMMMXMMMM",
      "MXMXAXMASX",
    ];
    const result = solve(dataset);
    expect(result).toBe(18);
  });

  test("Simple Case", () => {
    const dataset = [
      "X.........................",
      "M.........................",
      "A.........................",
      "S.........................",
    ];
    let solutions = solve(dataset);
    expect(solutions).toBe(1);
  });
});
