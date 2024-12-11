const fs = require("fs");
const readline = require("readline");

var leftSide = [];
var rightSide = [];

async function solution() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    splitLine = line.split(" ");
    leftSide.push(splitLine[0]);
    rightSide.push(splitLine[3]);
  }

  leftSide.sort();
  rightSide.sort();

  var totalPart1 = 0;
  for (let i = 0; i < 1000; i++) {
    var distance = Math.abs(leftSide[i] - rightSide[i]);
    totalPart1 = totalPart1 + distance;
  }

  var dict = {};
  // Forgive me for my sins
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      if (leftSide[i] === rightSide[j]) {
        if (dict[leftSide[i]]) {
          dict[leftSide[i]] = dict[leftSide[i]] + 1;
        } else {
          dict[leftSide[i]] = 1;
        }
      }
    }
  }

  var totalPart2 = 0;
  for (const key of Object.keys(dict)) {
    var product = key * dict[key];
    totalPart2 = totalPart2 + product;
  }

  console.log(`Part 1 Answer: ${totalPart1}`);
  console.log(`Part 2 Answer: ${totalPart2}`);
}

solution();
