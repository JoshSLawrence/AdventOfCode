import fs from "node:fs/promises";

const Phase = {
  Mul: 0,
  OpenParen: 1,
  Int1: 2,
  Comma: 3,
  Int2: 4,
  CloseParen: 5,
};

// If --log is passed at the command line, the program will print out
// the symbols parsed - for debug.
const LOG_ENABLED = process.argv.slice(2).includes("--debug");
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

export function getSumOfProducts(
  line,
  enableConditionalElements = false, // Dictates if do() and don't() are considered
  doEnabled = true, // Store state of last do() don't() processed
) {
  let index = 0;
  let sum = 0;
  do {
    // Check if conditionals are to be evaluated
    // Check if do is DISABLED, meaning a don't() was recentily evaluated
    // Check if the current index + 4 is equal to do()
    // If so, re-enable, jump index ahead and continue
    // Else we are still disabled so bump index and continue
    if (
      enableConditionalElements &&
      !doEnabled &&
      line.slice(index, index + 4) === "do()"
    ) {
      doEnabled = true;
      index += 4;
      continue;
    } else if (enableConditionalElements && !doEnabled) {
      index++;
      continue;
    }

    // Check if conditionals are to be evaluated
    // Check if do is ENABLED, meaning a do() was recentily evaluated
    // Check if the current index + 7 is equal to don't()
    // If so, disable, jump index ahead and continue
    // Else we are still enabled so proceed with parsing
    if (
      enableConditionalElements &&
      doEnabled &&
      line.slice(index, index + 7) === "don't()"
    ) {
      doEnabled = false;
      index += 7;
      continue;
    }

    // NOTE: parse recursively calls itself, so we receive the right operand,
    // int 2, before the left, int 1. This doesn't really matter since we are
    // doing multiplication but just as a FYI
    let [result, endingIndex, int2, int1] = parse(line, line.length, index);
    if (result) {
      sum += int1 * int2;
      index = endingIndex + 1;
    } else {
      index = endingIndex + 1;
    }
  } while (index < line.length);

  // Return the state of doEnabled as this problem requires the state to
  // be tracked per line. i.e. If do starts ENABLED, and if at the end of
  // processing the first line do is now DISABLED, then once we start parsing
  // the next line do should STILL BE DISABLED, we shouldn't reset the state of
  // do as all lines should be evaluated as a single dataset.
  // I could've joined the lines to evaluate as a signle line, but I didn't.
  return [sum, doEnabled];
}

async function main() {
  const input = await fs.readFile("input.txt", "utf8");
  const lines = input.split("\n").filter((line) => line.trim() !== "");

  let part1Total = 0;
  let part2Total = 0;
  let enableConditionalElements = true;

  // If conditional elements are enabled, this will track the state of do() and don't()
  let doEnabled = true;

  lines.forEach((line) => {
    let [sum, _] = getSumOfProducts(line);
    part1Total += sum;
  });

  lines.forEach((line) => {
    let [sum, stillEnabled] = getSumOfProducts(
      line,
      enableConditionalElements,
      doEnabled,
    );
    doEnabled = stillEnabled;
    part2Total += sum;
  });

  console.log("Part 1 Total:", part1Total);
  console.log("Part 2 Total:", part2Total);
}

await main();
