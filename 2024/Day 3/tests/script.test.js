import { describe, test, expect } from "vitest";
import { getSumOfProducts, parse } from "../script.js";

describe("parse", () => {
  test("mul(1, 1)", () => {
    const testString = "mul(1,1)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(true);
  });

  test("mul(10, 1)", () => {
    const testString = "mul(10,1)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(true);
  });

  test("mul(100, 1)", () => {
    const testString = "mul(100,1)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(true);
  });

  test("mul(1, 10)", () => {
    const testString = "mul(1,10)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(true);
  });

  test("mul(1, 100)", () => {
    const testString = "mul(1,100)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(true);
  });

  test("mul(10, 10)", () => {
    const testString = "mul(10,10)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(true);
  });

  test("mul(100, 100)", () => {
    const testString = "mul(100,100)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(true);
  });

  test("mul(1000, 1)", () => {
    const testString = "mul(1000,1)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("mul(1, 1000)", () => {
    const testString = "mul(1,1000)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("!(10,10)", () => {
    const testString = "!(10,10)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("mul*", () => {
    const testString = "mul(*";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("mul(10,10*", () => {
    const testString = "mul(*";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });

  test("mul(100100)", () => {
    const testString = "mul(100100)";
    const [result, endingIndex] = parse(testString, testString.length, 0);
    expect(result).toBe(false);
  });
});

describe("getSumOfProducts", () => {
  test("mul(10,10)adf3#34mul(23ad!(100,10)ladf))mul(100,10)", () => {
    const testString = "mul(10,10)adf3#34mul(23ad!(100,10)ladf))mul(100,10)";
    const result = getSumOfProducts(testString);
    expect(result).toBe(1100);
  });
});
