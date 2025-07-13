import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

export class Page {
  constructor(pageNumber) {
    this.pageNumber = pageNumber;
    this.requiredPagesBefore = [];
    this.requiredPagesAfter = [];
  }

  addPageBefore(pageNumber) {
    this.requiredPagesBefore.push(pageNumber);
  }

  addPageAfter(pageNumber) {
    this.requiredPagesAfter.push(pageNumber);
  }

  loadOrderingRules(ruleset) {
    ruleset.forEach((rule) => {
      if (
        rule.firstPage === this.pageNumber ||
        rule.secondPage === this.pageNumber
      ) {
        rule.firstPage === this.pageNumber
          ? this.requiredPagesAfter.push(rule.secondPage)
          : this.requiredPagesBefore.push(rule.firstPage);
      }
    });
  }

  static parsePages(dataset) {
    let pages = new Map();

    dataset.forEach((line) => {
      if (line.split(",").length === 1) {
        return;
      }
      const number = line.split(",");
      number.forEach((number) => pages.set(number, new Page(number)));
    });

    return pages;
  }

  static loadRuleset(pages, ruleset) {
    pages.forEach((page) => {
      page.loadOrderingRules(ruleset);
    });
  }
}

export class Rule {
  constructor(firstPage, secondPage) {
    this.firstPage = firstPage;
    this.secondPage = secondPage;
  }

  static parseRuleset(dataset) {
    let ruleset = [];

    dataset.forEach((line) => {
      if (line.split("|").length === 1) {
        return;
      }
      const [firstPage, secondPage] = line.split("|");
      ruleset.push(new Rule(firstPage, secondPage));
    });

    return ruleset;
  }
}

export class Update {
  static pages = new Map();

  constructor(pageOrder) {
    this.pageOrder = pageOrder;
  }

  isValid() {
    const middleIndex = Math.floor(this.pageOrder.length / 2);
    const middleNumber = parseInt(this.pageOrder[middleIndex], 10);

    let result = true;

    this.pageOrder.forEach((page, index) => {
      const leftWindow = this.pageOrder.slice(0, index + 1);
      const rightWindow = this.pageOrder.slice(index, this.pageOrder.length);

      const p = Update.pages.get(page);

      console.log("\n---------------------------------");
      console.log(`Page ${page} at index ${index}`);
      console.log("---------------------------------");
      console.log("Before:", leftWindow);
      console.log("Illegal:", p.requiredPagesAfter);
      console.log("After:", rightWindow);
      console.log("Illegal:", p.requiredPagesBefore);

      for (let i = 0; i < leftWindow.length; i++) {
        if (p.requiredPagesAfter.includes(leftWindow[i])) {
          console.log("----------- [FAILED] ------------\n");
          result = false;
          return;
        }
      }

      for (let i = 0; i < rightWindow.length; i++) {
        if (p.requiredPagesBefore.includes(rightWindow[i])) {
          console.log("----------- [FAILED] ------------\n");
          result = false;
          return;
        }
      }
    });

    return [result, middleNumber];
  }

  static setPages(pages) {
    this.pages = pages;
  }

  static parseUpdates(dataset) {
    let updates = [];

    dataset.forEach((line) => {
      if (line.split(",").length === 1) {
        return;
      }
      updates.push(new Update(line.split(",")));
    });

    return updates;
  }
}

export function solvePart1(updates) {
  let validPages = 0;
  let sumOfPageMiddleNumbers = 0;

  updates.forEach((update, index) => {
    console.log(`\nProcessing update: ${index + 1}\n`);
    const [result, middleNumber] = update.isValid();
    if (result === true) {
      console.log(`Update: ${index + 1} is valid\n`);
      sumOfPageMiddleNumbers += parseInt(middleNumber, 10);
      validPages++;
    }
  });

  console.log("Valid pages:", validPages);
  console.log("Valid middle sum:", sumOfPageMiddleNumbers);

  return sumOfPageMiddleNumbers;
}

async function main() {
  const dataset = await readFile("input.txt", "utf-8").then((dataset) => {
    return dataset.split("\n").filter((line) => line.trim(""));
  });

  const pages = Page.parsePages(dataset);
  const ruleset = Rule.parseRuleset(dataset);
  const updates = Update.parseUpdates(dataset);

  Update.setPages(pages);
  Page.loadRuleset(pages, ruleset);

  solvePart1(updates);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // We were run as `node index.js`
  await main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
