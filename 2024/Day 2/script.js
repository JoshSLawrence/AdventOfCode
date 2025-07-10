import fs from "node:fs/promises";

async function checkReport(report) {
  // Split all numbers in the current line into an array
  let dataset = report.split(" ");

  // previous and initalDirection are used for positional
  // comparison to determine if the report's dataset is
  // consistently increasing or decreasing
  // true == increasing
  // false == decreasing
  let previous = 0;
  let initialDirection = true;

  for (let i = 0; i < dataset.length; i++) {
    let datapoint = parseInt(dataset[i], 10);

    // If we are on the first datapoint in the report
    // we have nothing to compare to, so store and continue
    if (i === 0) {
      previous = datapoint;
      continue;
    }

    // Per Day 2 requirement, if the datapoint does not
    // increment, fail the report
    if (datapoint === previous) {
      return false;
    }

    // Per Day 2 requirement, if the datapoint shifts more
    // than 3 whole numbers in any direction, fail the report
    if (Math.abs(datapoint - previous) > 3) {
      return false;
    }

    // If we are on the second datapoint in the report's
    // dataset, set the inital direction and continue as
    // we cannot compare direction shifts yet
    if (i === 1) {
      initialDirection = datapoint - previous < 0;
      previous = datapoint;
      continue;
    }

    // The remainder of code should only be hit
    // on indexes 2 +
    let direction = datapoint - previous < 0;

    // Per Day 2 requirement, if the dataset when read
    // from left to right does not consistently increase
    // or decrease, fail the report
    if (direction != initialDirection) {
      return false;
    }

    previous = datapoint;
  }

  // All failure cases result in early returns
  // so if we even make it here, pass the report
  return true;
}

async function main() {
  const reports = (await fs.readFile("input.txt", "utf8"))
    .split("\n")
    .filter((line) => line.trim() !== "");

  let totalSafeReports = 0;

  for (let i = 0; i < reports.length; i++) {
    let result = await checkReport(reports[i]);

    if (result) {
      totalSafeReports++;
    }
  }

  console.log(`Total safe reports: ${totalSafeReports}`);
  console.log(
    `Total failed reports: ${Math.abs(totalSafeReports - reports.length)}`,
  );
  console.log(`Total reports: ${reports.length}`);
}

console.time("script");
await main();
console.timeEnd("script");
