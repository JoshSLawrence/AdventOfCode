import { describe, test, expect } from "vitest";
import { Guard, Simulator, solvePart1 } from "../index.js";

describe("Advent of Code 2024 Day 6", () => {
  test("Advent of Code provided test case #1", () => {
    const grid = [
      "....#.....",
      ".........#",
      "..........",
      "..#.......",
      ".......#..",
      "..........",
      ".#..^.....",
      "........#.",
      "#.........",
      "......#...",
    ];
    const simulator = new Simulator(grid);
    let result = solvePart1(simulator);
    expect(result).toBe(41);
  });

  test("Guard getPosition()", () => {
    const guard = new Guard("^", 4, 6);
    expect(guard.getPosition()).toStrictEqual([4, 6]);
  });

  test("Guard setHeading())", () => {
    const guard = new Guard("^", 4, 6);
    expect(guard.heading).toStrictEqual("NORTH");

    guard.setHeading("v");
    expect(guard.heading).toStrictEqual("SOUTH");

    guard.setHeading(">");
    expect(guard.heading).toStrictEqual("EAST");

    guard.setHeading("<");
    expect(guard.heading).toStrictEqual("WEST");
  });

  test("Guard collide()", () => {
    const guard = new Guard("^", 4, 6);

    expect(guard.heading).toBe("NORTH");

    guard.collide();
    expect(guard.heading).toBe("EAST");

    guard.collide();
    expect(guard.heading).toBe("SOUTH");

    guard.collide();
    expect(guard.heading).toBe("WEST");

    guard.collide();
    expect(guard.heading).toBe("NORTH");
  });

  test("Guard move()", () => {
    const guard = new Guard("^", 4, 6);

    guard.move();
    expect(guard.getPosition()).toStrictEqual([3, 6]);

    guard.setHeading(">");
    guard.move();
    expect(guard.getPosition()).toStrictEqual([3, 7]);

    guard.setHeading("v");
    guard.move();
    expect(guard.getPosition()).toStrictEqual([4, 7]);

    guard.setHeading("<");
    guard.move();
    expect(guard.getPosition()).toStrictEqual([4, 6]);
  });

  test("Simulator run()", () => {
    const grid = [
      "....#.....",
      ".........#",
      "..........",
      "..#.......",
      ".......#..",
      "..........",
      ".#..^.....",
      "........#.",
      "#.........",
      "......#...",
    ];

    const simulator = new Simulator(grid);

    simulator.run();

    expect(
      simulator.guard.row === simulator.grid.length - 1 ||
        simulator.guard.column === simulator.grid[0].length - 1,
    ).toBe(true);
  });
});
