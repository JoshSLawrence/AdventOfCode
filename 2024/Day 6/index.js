import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export class Guard {
  constructor(character, row, column) {
    this.heading = null;
    this.setHeading(character);
    this.row = row;
    this.column = column;
    this.visitedPositions = new Map([[`${row},${column}`, true]]);
    this.counter = 0;
  }

  getPosition() {
    return [this.row, this.column];
  }

  getVisitedPositions() {
    return this.visitedPositions.size;
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
        this.visitedPositions.set(`${this.row},${this.column}`, true);
        this.counter++;
        break;
      case "EAST":
        this.column += 1;
        this.visitedPositions.set(`${this.row},${this.column}`, true);
        this.counter++;
        break;
      case "SOUTH":
        this.row += 1;
        this.visitedPositions.set(`${this.row},${this.column}`, true);
        this.counter++;
        break;
      case "WEST":
        this.column -= 1;
        this.visitedPositions.set(`${this.row},${this.column}`, true);
        this.counter++;
        break;
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

      if (
        typeof this.grid[this.guard.row + rowMod] === "undefined" ||
        typeof this.grid[this.guard.row + rowMod][
          this.guard.column + columnMod
        ] === "undefined"
      ) {
        break;
      } else if (
        this.grid[this.guard.row + rowMod][this.guard.column + columnMod] ===
        "#"
      ) {
        this.guard.collide();
      } else {
        this.guard.move();
      }
    }
  }
}

export function solvePart1(simulator) {
  simulator.run();
  return simulator.guard.getVisitedPositions();
}

async function main() {
  const grid = await readFile("input.txt", "utf-8").then((dataset) => {
    return dataset.split("\n").filter((line) => line.trim(""));
  });
  let part1Solution = solvePart1(new Simulator(grid));
  console.log("Distinct Position:", part1Solution);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // We were run as `node index.js`
  await main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
