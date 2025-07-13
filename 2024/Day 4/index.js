import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const Direction = {
  North: [0, 1],
  South: [0, -1],
  East: [1, 0],
  West: [-1, 0],
  NorthEast: [1, 1],
  NorthWest: [-1, 1],
  SouthEast: [1, -1],
  SouthWest: [-1, -1],
};

class PuzzleLetter {
  static spellings = ["XMAS", "SAMX"];

  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.solutions = 0;
  }

  calcSolutionsPart1(dataset) {
    this.calcDirection(Direction.North, dataset);
    this.calcDirection(Direction.South, dataset);
    this.calcDirection(Direction.East, dataset);
    this.calcDirection(Direction.West, dataset);
    this.calcDirection(Direction.NorthEast, dataset);
    this.calcDirection(Direction.NorthWest, dataset);
    this.calcDirection(Direction.SouthEast, dataset);
    this.calcDirection(Direction.SouthWest, dataset);
  }

  calcDirection(direction, dataset) {
    const [x, y] = direction;

    // NOTE: A row is actually a y coordinate despite being first. The
    // const 'Direction' defined above is in proper (x, y) order. If our
    // direction is 'North' we want to evaluate the single letter string
    // (not a char in JS) at index [this.row][this.column], and 3 positions
    // above - without changing the x coordinate, which in this case is
    // this.column. 'Direction.North' is defined as [0, 1] and if apply is as
    // multiplication on the y (row) coordinate, and the x coordinate (column),
    // we will ensure the code below will keep the x position in place. Now if
    // we want to check 'South', all we have to do is change [0, 1] to [0, -1]
    // and we can reuse the exact same code below. With that in mind, we can
    // tweak [0, 1] to account for all 8 directions in a 2 by 2 grid.
    for (let i = 0; i < 4; i++) {
      if (
        typeof dataset[this.row + i * y] === "undefined" ||
        typeof dataset[this.row + i * y][this.column + i * x] === "undefined"
      ) {
        return false;
      }
    }

    const word =
      dataset[this.row][this.column] +
      dataset[this.row + 1 * y][this.column + 1 * x] +
      dataset[this.row + 2 * y][this.column + 2 * x] +
      dataset[this.row + 3 * y][this.column + 3 * x];

    if (PuzzleLetter.spellings.includes(word)) {
      this.solutions += 1;
      return true;
    } else {
      return false;
    }
  }

  calcSolutionsPart2(dataset) {
    // NOTE: We do not check every direction relative to the current
    // position like we did in part 1. Its redundant, by nature of going
    // through each position, even if evaluting one direction, we will
    // naturally find every solution exactly once.

    // Simlar to part 1, we ensure there is a valid X pattern relative
    // to the current position.
    for (let i = 0; i < 3; i++) {
      if (
        typeof dataset[this.row + i] === "undefined" ||
        typeof dataset[this.row + i][this.column + i] === "undefined" ||
        typeof dataset[this.row + i][this.column - i + 2] === "undefined"
      ) {
        return false;
      }
    }

    // Next, we build an psuedo 3x3 grid relative to the current position.
    const currentPosition = [
      dataset[this.row][this.column] + "." + dataset[this.row][this.column + 2],
      "." + dataset[this.row + 1][this.column + 1] + ".",
      dataset[this.row + 2][this.column] +
        "." +
        dataset[this.row + 2][this.column + 2],
    ];

    // There are only 4 possible solution patterns
    // the structure of this array of string matches currentPosition
    // so all we need to do is check 4 cases.
    const solution1 = ["M.S", ".A.", "M.S"];
    const solution2 = ["S.M", ".A.", "S.M"];
    const solution3 = ["M.M", ".A.", "S.S"];
    const solution4 = ["S.S", ".A.", "M.M"];

    if (
      currentPosition[0] === solution1[0] &&
      currentPosition[1] === solution1[1] &&
      currentPosition[2] === solution1[2]
    ) {
      this.solutions += 1;
    } else if (
      currentPosition[0] === solution2[0] &&
      currentPosition[1] === solution2[1] &&
      currentPosition[2] === solution2[2]
    ) {
      this.solutions += 1;
    } else if (
      currentPosition[0] === solution3[0] &&
      currentPosition[1] === solution3[1] &&
      currentPosition[2] === solution3[2]
    ) {
      this.solutions += 1;
    } else if (
      currentPosition[0] === solution4[0] &&
      currentPosition[1] === solution4[1] &&
      currentPosition[2] === solution4[2]
    ) {
      this.solutions += 1;
    }
  }
}

export function solvePart1(dataset) {
  let solutions = 0;

  for (let row = 0; row < dataset.length; row++) {
    for (let column = 0; column < dataset[row].length; column++) {
      const letter = new PuzzleLetter(row, column);
      letter.calcSolutionsPart1(dataset);
      solutions += letter.solutions;
    }
  }

  // If index [0][0], [1][0], [2][0], [3][0] is equal to 'XMAS' when we get to
  // index [3][0] later, we will see the same solution but in reverse:
  // [3][0], [2][0], [1][0], [0][0]. This means we always count each solution
  // twice, so, divide the total by 2
  return solutions / 2;
}

export function solvePart2(dataset) {
  let solutions = 0;

  for (let row = 0; row < dataset.length; row++) {
    for (let column = 0; column < dataset[row].length; column++) {
      const letter = new PuzzleLetter(row, column);
      letter.calcSolutionsPart2(dataset);
      solutions += letter.solutions;
    }
  }

  return solutions;
}

async function main() {
  const data = await readFile("input.txt", "utf-8");
  let dataset = data.split("\n").filter((line) => line.trim() !== "");

  console.log("XMAS appears:", solvePart1(dataset), "times.");
  console.log("X-MAS appears:", solvePart2(dataset), "times.");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // We were run as `node index.js`
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
