const fs = require("fs");
const readline = require("readline");

var leftSide = [];
var rightSide = [];

async function processLineByLine() {
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

  var total = 0;
  for (let index = 0; index < 1000; index++) {
    var distance = Math.abs(leftSide[index] - rightSide[index]);
    total = total + distance;
  }

  console.log(total);
}

processLineByLine();
