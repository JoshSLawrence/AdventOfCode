import { describe, test, expect } from "vitest";
import { getSumOfProducts, parse } from "../script.js";

describe("parse", () => {
  test("Good Case, 1 digit operands", () => {
    const testString = "mul(1,1)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(true);
  });

  test("Good Case, 2 digit operands", () => {
    const testString = "mul(10,10)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(true);
  });

  test("Good Case, 3 digit operands", () => {
    const testString = "mul(100,100)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(true);
  });

  test("Bad Case, > 3 digit left operand", () => {
    const testString = "mul(1000,1)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("Bad Case, > 3 digit right operand", () => {
    const testString = "mul(1,1000)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("Bad Case, invalid char in 'Mul' place", () => {
    const testString = "!(10,10)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("Bad Case, invalid char in 'OpenParen' place", () => {
    const testString = "mul(*";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("Bad Case, invalid char in 'Int1' place", () => {
    const testString = "mul(*,10)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("Bad Case, invalid char in 'Comma' place", () => {
    const testString = "mul(10*10)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("Bad Case, invalid char in 'Int2' place", () => {
    const testString = "mul(10,*)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("Bad Case, invalid char in 'CloseParen' place", () => {
    const testString = "mul(10,10*";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });
});

describe("getSumOfProducts", () => {
  test("Complex string, Sum of products should equal 1100", () => {
    const testString = "mul(10,10)adf3#34mul(23ad!(100,10)ladf))mul(100,10)";
    const [result, _] = getSumOfProducts(testString, true);
    expect(result).toBe(1100);
  });

  test("don't() should disable future products to sum", () => {
    const testString = "mul(10,10)don't()mul(100,10)";
    const [result, _] = getSumOfProducts(testString, true);
    expect(result).toBe(100);
  });

  test("do() should re-enable future products to sum", () => {
    const testString = "mul(10,10)don't()mul(100,10)do()mul(1,2)";
    const [result, _] = getSumOfProducts(testString, true);
    expect(result).toBe(102);
  });

  test("Advent of Code provided test case #1", () => {
    const testString =
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
    const [result, _] = getSumOfProducts(testString, true);
    expect(result).toBe(161);
  });

  test("Advent of Code provided test case #2", () => {
    const testString =
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5)";
    const [result, _] = getSumOfProducts(testString, true);
    expect(result).toBe(48);
  });
});
