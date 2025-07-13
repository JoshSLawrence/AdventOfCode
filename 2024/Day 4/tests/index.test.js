import { describe, test, expect } from "vitest";
import { solve, solvePart1, solvePart2 } from "../index.js";

describe("Part1", () => {
  test("Advent of Code part 1 provided test case", () => {
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
    const result = solvePart1(dataset);
    expect(result).toBe(18);
  });

  test("Simple Case", () => {
    const dataset = [
      "X.........................",
      "M.........................",
      "A.........................",
      "S.........................",
    ];
    let solutions = solvePart1(dataset);
    expect(solutions).toBe(1);
  });
});

describe("Part2", () => {
  test("Advent of Code part 2 provided test case", () => {
    const dataset = [
      ".M.S......",
      "..A..MSMS.",
      ".M.S.MAA..",
      "..A.ASMSM.",
      ".M.S.M....",
      "..........",
      "S.S.S.S.S.",
      ".A.A.A.A..",
      "M.M.M.M.M.",
      "..........",
    ];
    const result = solvePart2(dataset);
    expect(result).toBe(9);
  });
});
