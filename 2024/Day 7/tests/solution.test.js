import { describe, test, expect } from "vitest";
import { solvePart1, Test } from "../index.js";

describe("Day 7 - Solution Tests", () => {
  test("Test parseTests())", async () => {
    const tests = [
      new Test({ testValue: 190, operands: [10, 19] }),
      new Test({ testValue: 3267, operands: [81, 40, 27] }),
      new Test({ testValue: 83, operands: [17, 5] }),
      new Test({ testValue: 156, operands: [15, 6] }),
      new Test({ testValue: 7290, operands: [6, 8, 6, 15] }),
      new Test({ testValue: 161011, operands: [16, 10, 13] }),
      new Test({ testValue: 192, operands: [17, 8, 14] }),
      new Test({ testValue: 21037, operands: [9, 7, 18, 13] }),
      new Test({ testValue: 292, operands: [11, 6, 16, 20] }),
    ];
    const parsedTests = await Test.parseTests("tests/simpleinput.txt");
    expect(parsedTests).toStrictEqual(tests);
  });

  test("Test solve()", () => {
    const passingTestEasy = new Test({ testValue: 190, operands: [10, 19] });
    const passingTestHard = new Test({
      testValue: 292,
      operands: [11, 6, 16, 20],
    });
    const failingTest = new Test({ testValue: 83, operands: [17, 5] });
    expect(passingTestEasy.solve()).toBe(true);
    expect(failingTest.solve()).toBe(false);
    expect(passingTestHard.solve()).toBe(true);
  });

  test("Advent of Code provided test case #1", async () => {
    let result = await solvePart1("tests/simpleinput.txt");
    expect(result).toBe(3749);
  });
});
