import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

export class Page {
  constructor(pageNumber) {
    this.pageNumber = parseInt(pageNumber);
    this.forbiddenPagesBefore = [];
    this.forbiddenPagesAfter = [];
  }

  addForbiddenPageBefore(pageNumber) {
    this.forbiddenPagesBefore.push(parseInt(pageNumber));
  }

  addForbiddenPageAfter(pageNumber) {
    this.forbiddenPagesAfter.push(parseInt(pageNumber));
  }

  check({ pageNumber, position }) {
    if (position === "before") {
      return !this.forbiddenPagesBefore.includes(pageNumber);
    }

    if (position === "after") {
      return !this.forbiddenPagesAfter.includes(pageNumber);
    }
  }

  setRuleset(ruleset) {
    this.forbiddenPagesBefore = [];
    this.forbiddenPagesAfter = [];

    ruleset.rules.forEach((rule) => {
      if (
        rule.pageRequiredBefore === this.pageNumber ||
        rule.pageRequiredAfter === this.pageNumber
      ) {
        if (rule.pageRequiredBefore === this.pageNumber) {
          this.forbiddenPagesBefore.push(rule.pageRequiredAfter);
        } else {
          this.forbiddenPagesAfter.push(rule.pageRequiredBefore);
        }
      }
    });
  }

  static parsePages(line) {
    let pages = [];

    const pageNumbers = line.split(",");

    if (line.split(",").length === 1) {
      return;
    }

    pageNumbers.forEach((page) => {
      pages.push(new Page(page));
    });

    return pages;
  }
}

export class Rule {
  constructor(pageRequiredBefore, pageRequiredAfter) {
    this.pageRequiredBefore = parseInt(pageRequiredBefore);
    this.pageRequiredAfter = parseInt(pageRequiredAfter);
  }
}

export class Ruleset {
  constructor() {
    this.rules = [];
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  static parseRuleset(dataset) {
    const ruleset = new Ruleset();

    dataset.forEach((line) => {
      if (line.split("|").length === 1) {
        return;
      }
      const [firstPage, secondPage] = line.split("|");
      ruleset.rules.push(new Rule(firstPage, secondPage));
    });

    return ruleset;
  }
}

export class Update {
  static pages = new Map();

  constructor(pages) {
    this.pages = pages;
    this.ruleset = [];
  }

  sort() {
    for (let i = 0; i < this.pages.length; i++) {
      for (let j = 0; j < this.pages.length; j++) {
        if (
          this.pages[i].check({
            pageNumber: this.pages[j].pageNumber,
            position: "after",
          })
        ) {
          [this.pages[i], this.pages[j]] = [this.pages[j], this.pages[i]];
        }
      }
    }
  }

  getMedian() {
    const medianIndex = Math.floor(this.pages.length / 2);
    return this.pages[medianIndex].pageNumber;
  }

  setRuleset(ruleset) {
    this.ruleset = ruleset;
    this.pages.forEach((page) => {
      page.setRuleset(ruleset);
    });
  }

  isValid() {
    let result = true;

    outer: for (let i = 0; i < this.pages.length; i++) {
      const page = this.pages[i];
      const pagesBeforeCurrentPage = this.pages.slice(0, i + 1);
      const pagesAfterCurrentPage = this.pages.slice(i, this.pages.length);

      for (let j = 0; j < pagesBeforeCurrentPage.length; j++) {
        result = page.check({
          pageNumber: pagesBeforeCurrentPage[j].pageNumber,
          position: "before",
        });
        if (result === false) {
          break outer;
        }
      }

      for (let j = 0; j < pagesAfterCurrentPage.length; j++) {
        result = page.check({
          pageNumber: pagesAfterCurrentPage[j].pageNumber,
          position: "after",
        });
        if (result === false) {
          break outer;
        }
      }
    }

    return result;
  }

  static parseUpdates(dataset) {
    let updates = [];

    dataset.forEach((line) => {
      if (line.split(",").length === 1) {
        return;
      }
      const pages = Page.parsePages(line);
      updates.push(new Update(pages));
    });

    return updates;
  }
}

export function solvePart1(updates) {
  let validPages = 0;
  let sumOfPageMiddleNumbers = 0;

  updates.forEach((update, index) => {
    if (update.isValid()) {
      sumOfPageMiddleNumbers += update.getMedian();
      validPages++;
    }
  });

  console.log("Valid pages:", validPages);
  console.log("Valid middle sum:", sumOfPageMiddleNumbers);

  return sumOfPageMiddleNumbers;
}

export function solvePart2(updates) {
  let invalidPages = 0;
  let sumOfPageMiddleNumbers = 0;

  updates.forEach((update) => {
    if (!update.isValid()) {
      update.sort();
      sumOfPageMiddleNumbers += update.getMedian();
      invalidPages++;
    }
  });

  console.log("Invalid pages:", invalidPages);
  console.log("Corrected middle sum:", sumOfPageMiddleNumbers);

  return sumOfPageMiddleNumbers;
}

async function main() {
  const dataset = await readFile("input.txt", "utf-8").then((dataset) => {
    return dataset.split("\n").filter((line) => line.trim(""));
  });

  const updates = Update.parseUpdates(dataset);
  const ruleset = Ruleset.parseRuleset(dataset);

  updates.forEach((update) => update.setRuleset(ruleset));

  solvePart1(updates);
  solvePart2(updates);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // We were run as `node index.js`
  await main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
