import fs from "node:fs/promises";

async function checkReport(dataset) {
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

async function dampener(dataset) {
  // First we run the regular check as normal
  let initalResult = await checkReport(dataset);

  if (initalResult === true) {
    return true;
  }

  // At this point the regular check failed, now we test removing
  // datapoints in each position of the dataset, run the new dataset
  // against the check, until we either pass, or run out of datapoints
  for (let i = 0; i < dataset.length; i++) {
    let tempDataset = dataset.filter((_, index) => index !== i);

    let tempResult = await checkReport(tempDataset);

    if (tempResult === true) {
      return true;
    }
  }

  return false;
}

async function main() {
  const reports = (await fs.readFile("input.txt", "utf8"))
    .split("\n")
    .filter((line) => line.trim() !== "");

  let totalSafeReports = 0;
  let totalSafeReportsWithDampener = 0;

  for (let i = 0; i < reports.length; i++) {
    let dataset = reports[i].split(" ");

    let result = await checkReport(dataset);
    let resultWithDampener = await dampener(dataset);

    if (result) {
      totalSafeReports++;
    }

    if (resultWithDampener) {
      totalSafeReportsWithDampener++;
    }
  }

  console.log("\n[WITHOUT DAMPENER]");
  console.log(`Total safe reports: ${totalSafeReports}`);
  console.log(
    `Total failed reports: ${Math.abs(totalSafeReports - reports.length)}`,
  );
  console.log(`Total reports: ${reports.length}`);

  console.log("\n[WITH DAMPENER]");
  console.log(`Total safe reports: ${totalSafeReportsWithDampener}`);
  console.log(
    `Total failed reports: ${Math.abs(totalSafeReportsWithDampener - reports.length)}`,
  );
  console.log(`Total reports: ${reports.length}\n`);
}

console.time("Runtime");
await main();
console.timeEnd("Runtime");
