import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export async function solvePart1(input) {
  const tests = await Test.parseTests(input);

  let sum = 0;

  tests.forEach((test) => {
    let result = test.solve();
    if (result) {
      sum += test.testValue;
    }
  });
  return sum;
}

export class Test {
  #testValue;
  #operands;

  constructor({ testValue, operands = [] } = {}) {
    this.#testValue = parseInt(testValue);
    this.#operands = operands.map((operand) => {
      return parseInt(operand, 10);
    });
  }

  get testValue() {
    return this.#testValue;
  }

  get operands() {
    return this.#operands;
  }

  solve() {
    let container = [this.#operands[0]];

    for (let i = 1; i < this.#operands.length; i++) {
      let newContainer = [];
      container.forEach((number) => {
        newContainer.push(number * this.#operands[i]);
        newContainer.push(number + this.#operands[i]);
      });
      container = newContainer;
    }

    if (container.includes(this.#testValue)) {
      return true;
    } else {
      return false;
    }
  }

  static async parseTests(filePath) {
    try {
      const data = await readFile(filePath, "utf-8").then((file) => {
        return file.split("\n").filter((line) => line.trim() !== "");
      });

      const tests = data.map((line) => {
        let [testValue, operands] = line.split(":");

        operands = operands
          .split(" ")
          .filter((operand) => operand.trim() !== "");

        return new Test({ testValue, operands });
      });

      return tests;
    } catch (err) {
      if (err.code === "ENOENT") {
        throw new Error(`File not found: ${filePath}`);
      } else {
        throw new Error(err);
      }
    }
  }
}

async function main() {
  let part1Answer = await solvePart1("input.txt");
  console.log("Part 1 sum of test values:", part1Answer);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // We were run as `node index.js`
  await main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
