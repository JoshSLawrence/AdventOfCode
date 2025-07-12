import fs from "node:fs/promises";

const Phase = {
  Mul: 0,
  OpenParen: 1,
  Int1: 2,
  Comma: 3,
  Int2: 4,
  CloseParen: 5,
};

const LOG_ENABLED = process.argv.slice(2).includes("--log");

function log(...message) {
  if (LOG_ENABLED) {
    console.log(...message);
  }
}

export function parse(line, length, index = 0, phase = Phase.Mul) {
  // If caller try to parse out of range, just return false
  if (index >= length) {
    return false;
  }

  // If on the inital phase Mul check if the next 3 chars in sequence
  // are equal to 'mul'
  if (phase === Phase.Mul && line.slice(index, index + 3) === "mul") {
    log("Mul: ", line.slice(index, index + 3));
    return parse(line, length, index + 3, Phase.OpenParen);
  }

  // If on phase OpenParen, check that the char at the provided index
  // is indeed a open parenthesis
  if (phase === Phase.OpenParen && line[index] === "(") {
    log("OpenParen: ", line[index]);
    return parse(line, length, index + 1, Phase.Int1);
  }

  // If on phase CloseParen, check that the char at the provided index
  // is indeed a closed parenthesis, given this is the final phase
  // return true if the check passes
  if (phase === Phase.CloseParen && line[index] === ")") {
    log("CloseParen: ", line[index]);
    return [true, index];
  }

  // If on phase Comma, check that the char at the provided index
  // is indeed a comma, then proceed to the next phase
  if (phase === Phase.Comma && line[index] === ",") {
    log("Comma: ", line[index]);
    return parse(line, length, index + 1, Phase.Int2);
  }

  // If on phase Int1, check the next 3 chars for the first occurance
  // of a char that is not a whole number, proceed to the next phase
  // as long as the first char is a whole number.
  if (phase === Phase.Int1) {
    let commaIndex = 0;

    for (let i = 0; i <= 3; i++) {
      if (!isFinite(line[index + i])) {
        commaIndex = index + i;
        break;
      }
    }

    if (commaIndex !== 0) {
      const int1 = line.slice(index, commaIndex);
      log("Int1: ", int1);
      return [...parse(line, length, commaIndex, Phase.Comma), int1];
    }
  }

  // If on phase Int2, check the next 3 chars for the first occurance
  // of a char that is not a whole number, proceed to the next phase
  // as long as the first char is a whole number.
  if (phase === Phase.Int2) {
    let closeParenIndex = 0;

    for (let i = 0; i <= 3; i++) {
      if (!isFinite(line[index + i])) {
        closeParenIndex = index + i;
        break;
      }
    }

    if (closeParenIndex !== 0) {
      const int2 = line.slice(index, closeParenIndex);
      log("Int2: ", int2);
      return [...parse(line, length, closeParenIndex, Phase.CloseParen), int2];
    }
  }

  // If no cases evaluate successfully, fail the passed line as it
  // violates the mul(int, int) schema.
  return [false, index];
}

export function getSumOfProducts(line) {
  let index = 0;
  let sum = 0;
  do {
    let [result, endingIndex, int2, int1] = parse(line, line.length, index);
    if (result) {
      sum += int1 * int2;
      index = endingIndex + 1;
    } else {
      index = endingIndex + 1;
    }
  } while (index < line.length);
  return sum;
}

async function main() {
  const input = await fs.readFile("input.txt", "utf8");

  const lines = input.split("\n").filter((line) => line.trim() !== "");

  let total = 0;

  lines.forEach((line) => {
    total += getSumOfProducts(line);
  });

  console.log("Total:", total);
}

await main();
