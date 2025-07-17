import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export class Guard {
  constructor(character, row, column) {
    this.heading = null;
    this.setHeading(character);
    this.initalHeading = this.heading;
    this.row = row;
    this.initalPosition = [row, column];
    this.column = column;
    this.visitedPositions = new Map([
      [`${row},${column}${this.heading}`, true],
    ]);
    this.visitedPositionsNoHeading = new Map([[`${row},${column}`, true]]);
  }

  getPosition() {
    return [this.row, this.column];
  }

  getVisitedPositions() {
    return this.visitedPositions.size;
  }

  getVisitedPositionsNoHeading() {
    return this.visitedPositionsNoHeading.size;
  }

  setHeading(character) {
    switch (character) {
      case "^":
        this.heading = "NORTH";
        break;
      case "v":
        this.heading = "SOUTH";
        break;
      case ">":
        this.heading = "EAST";
        break;
      case "<":
        this.heading = "WEST";
        break;
      default:
        throw new Error("Invalid character for heading");
    }
  }

  collide() {
    switch (this.heading) {
      case "NORTH":
        this.heading = "EAST";
        break;
      case "EAST":
        this.heading = "SOUTH";
        break;
      case "SOUTH":
        this.heading = "WEST";
        break;
      case "WEST":
        this.heading = "NORTH";
        break;
    }
  }

  move() {
    switch (this.heading) {
      case "NORTH":
        this.row -= 1;
        this.visitedPositions.set(
          `${this.row},${this.column}${this.heading}`,
          true,
        );
        this.visitedPositionsNoHeading.set(`${this.row},${this.column}`, true);
        break;
      case "EAST":
        this.column += 1;
        this.visitedPositions.set(
          `${this.row},${this.column}${this.heading}`,
          true,
        );
        this.visitedPositionsNoHeading.set(`${this.row},${this.column}`, true);
        break;
      case "SOUTH":
        this.row += 1;
        this.visitedPositions.set(
          `${this.row},${this.column}${this.heading}`,
          true,
        );
        this.visitedPositionsNoHeading.set(`${this.row},${this.column}`, true);
        break;
      case "WEST":
        this.column -= 1;
        this.visitedPositions.set(
          `${this.row},${this.column}${this.heading}`,
          true,
        );
        this.visitedPositionsNoHeading.set(`${this.row},${this.column}`, true);
        break;
    }
  }

  resetPosition() {
    this.row = this.initalPosition[0];
    this.column = this.initalPosition[1];
    this.heading = this.initalHeading;
    this.visitedPositions.clear();
  }

  isNewPosition(rowsToMove, columnsToMove, grid) {
    if (
      this.visitedPositions.has(
        `${this.row + rowsToMove},${this.column + columnsToMove}${this.heading}`,
      )
    ) {
      return false;
    } else {
      return true;
    }
  }

  canMove(rowsToMove, columnsToMove, grid) {
    if (
      typeof grid[this.row + rowsToMove] === "undefined" ||
      typeof grid[this.row + rowsToMove][this.column + columnsToMove] ===
        "undefined"
    ) {
      return false;
    } else {
      return true;
    }
  }
}

export class Simulator {
  constructor(grid) {
    this.grid = grid;

    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[0].length; column++) {
        let char = grid[row][column];
        if (char === "^" || char === ">" || char === "v" || char === "<") {
          this.guard = new Guard(char, row, column);
        }
      }
    }
  }

  run() {
    let result = true;

    while (true) {
      let rowMod = 0;
      let columnMod = 0;

      switch (this.guard.heading) {
        case "NORTH":
          rowMod = -1;
          break;
        case "EAST":
          columnMod = 1;
          break;
        case "SOUTH":
          rowMod = 1;
          break;
        case "WEST":
          columnMod = -1;
          break;
      }

      if (!this.guard.canMove(rowMod, columnMod, this.grid)) {
        result = true;
        break;
      }

      if (!this.guard.isNewPosition(rowMod, columnMod, this.grid)) {
        result = false; // return false if guard loops
        break;
      }

      if (
        this.grid[this.guard.row + rowMod][this.guard.column + columnMod] ===
        "#"
      ) {
        this.guard.collide();
      } else if (
        this.grid[this.guard.row + rowMod][this.guard.column + columnMod] ===
        "O"
      ) {
        this.guard.collide();
      } else {
        this.guard.move();
      }
    }

    return result;
  }
}

export function solvePart1(simulator) {
  simulator.run();
  return simulator.guard.getVisitedPositionsNoHeading();
}

export function solvePart2(simulator) {
  let obstaclePositions = 0;

  for (let row = 0; row < simulator.grid.length; row++) {
    for (let column = 0; column < simulator.grid[0].length; column++) {
      if (
        simulator.guard.initalPosition[0] === row &&
        simulator.guard.initalPosition[1] === column
      ) {
        continue;
      }

      if (simulator.grid[row][column] === "#") {
        continue;
      }

      let originalRow = simulator.grid[row];

      let tempRow =
        simulator.grid[row].slice(0, column) +
        "O" +
        simulator.grid[row].slice(column + 1, simulator.grid[row].length);

      simulator.grid[row] = tempRow;
      let result = simulator.run(true, row, column);
      simulator.grid[row] = originalRow;

      simulator.guard.resetPosition();

      if (!result) {
        obstaclePositions++;
      }
    }
  }

  return obstaclePositions;
}

async function main() {
  const grid = await readFile("input.txt", "utf-8").then((dataset) => {
    return dataset.split("\n").filter((line) => line.trim(""));
  });

  let part1Solution = solvePart1(new Simulator(grid));
  console.log("Part 1 Distinct Positions:", part1Solution);

  console.log("Solving for part 2, may take a minute...");
  let part2Solution = solvePart2(new Simulator(grid));
  console.log("Part 2 Loop Obstacle Position:", part2Solution);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // We were run as `node index.js`
  await main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
