import { describe, test, expect } from "vitest";
import {
  solvePart1,
  solvePart2,
  Page,
  Rule,
  Ruleset,
  Update,
} from "../index.js";

describe("Day 5 Tests", () => {
  test("Advent of Code part 1 provided example", () => {
    const dataset = [
      "47|53",
      "97|13",
      "97|61",
      "97|47",
      "75|29",
      "61|13",
      "75|53",
      "29|13",
      "97|29",
      "53|29",
      "61|53",
      "97|53",
      "61|29",
      "47|13",
      "75|47",
      "97|75",
      "47|61",
      "75|61",
      "47|29",
      "75|13",
      "53|13",
      "",
      "75,47,61,53,29",
      "97,61,53,29,13",
      "75,29,13",
      "75,97,47,61,53",
      "61,13,29",
      "97,13,75,29,47",
    ];

    const updates = Update.parseUpdates(dataset);
    const ruleset = Ruleset.parseRuleset(dataset);

    updates[3].pages.forEach((page) => page.setRuleset(ruleset));

    updates.forEach((update) => update.setRuleset(ruleset));

    let result = solvePart1(updates);

    expect(result).toBe(143);
  });

  test("Advent of Code part 2 provided example", () => {
    const dataset = [
      "47|53",
      "97|13",
      "97|61",
      "97|47",
      "75|29",
      "61|13",
      "75|53",
      "29|13",
      "97|29",
      "53|29",
      "61|53",
      "97|53",
      "61|29",
      "47|13",
      "75|47",
      "97|75",
      "47|61",
      "75|61",
      "47|29",
      "75|13",
      "53|13",
      "",
      "75,47,61,53,29",
      "97,61,53,29,13",
      "75,29,13",
      "75,97,47,61,53",
      "61,13,29",
      "97,13,75,29,47",
    ];

    const updates = Update.parseUpdates(dataset);
    const ruleset = Ruleset.parseRuleset(dataset);

    updates.forEach((update) => update.setRuleset(ruleset));

    let result = solvePart2(updates);

    expect(result).toBe(123);
  });

  test("Page addForbiddenPageBefore() / After()", () => {
    const page = new Page(10);

    page.addForbiddenPageBefore(15);
    page.addForbiddenPageAfter(8);

    expect(page.forbiddenPagesBefore.includes(15)).toBe(true);
    expect(page.forbiddenPagesAfter.includes(8)).toBe(true);
  });

  test("Page check()", () => {
    const page = new Page(10);

    page.addForbiddenPageBefore(15);
    page.addForbiddenPageAfter(8);

    const result1 = page.check({ pageNumber: 8, position: "before" });
    const result2 = page.check({ pageNumber: 8, position: "after" });
    const result3 = page.check({ pageNumber: 15, position: "before" });
    const result4 = page.check({ pageNumber: 15, position: "after" });

    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(true);
  });

  test("Page setRuleset()", () => {
    const page = new Page(10);

    expect(page.check({ pageNumber: 8, position: "after" })).toBe(true);

    const rule = new Rule(8, 10);
    const ruleset = new Ruleset();

    ruleset.addRule(rule);
    page.setRuleset(ruleset);

    expect(page.check({ pageNumber: 8, position: "after" })).toBe(false);
  });

  test("Ruleset parseRuleset()", () => {
    const dataset = ["10|20", "20|30", "30|40"];
    const ruleset = Ruleset.parseRuleset(dataset);
    const rule = new Rule(10, 20);

    expect(ruleset.rules.length).toBe(3);
    expect(ruleset.rules[0]).toStrictEqual(rule);
  });

  test("Update sort()", () => {
    let pages = [];
    for (let i = 1; i <= 4; i++) {
      pages.push(new Page(i));
    }

    const rule = new Rule(2, 1);
    const ruleset = new Ruleset();
    const update = new Update(pages);

    ruleset.addRule(rule);

    update.setRuleset(ruleset);

    expect(update.isValid()).toBe(false);

    update.sort();

    expect(update.isValid()).toStrictEqual(true);
  });

  test("Update getMedian()", () => {
    let oddPages = [];
    let evenPages = [];

    for (let i = 0; i < 11; i++) {
      oddPages.push(new Page(i));
      if (i < 10) {
        evenPages.push(new Page(i));
      }
    }

    let oddUpdate = new Update(oddPages);
    let evenUpdate = new Update(evenPages);

    const oddMedian = oddUpdate.getMedian();
    const evenMedian = evenUpdate.getMedian();

    expect(oddMedian).toBe(5);
    expect(evenMedian).toBe(5);
  });

  test("Update setRuleset()", () => {
    const page = new Page(10);
    const rule1 = new Rule(10, 8);
    const rule2 = new Rule(24, 10);
    const ruleset = new Ruleset();
    const update = new Update([page]);

    ruleset.addRule(rule1);
    ruleset.addRule(rule2);

    update.setRuleset(ruleset);

    expect(update.ruleset).toStrictEqual(ruleset);
    expect(update.pages[0].forbiddenPagesBefore.includes(8)).toBe(true);
    expect(update.pages[0].forbiddenPagesAfter.includes(24)).toBe(true);
  });

  test("Update isValid()", () => {
    let pages = [];

    for (let i = 1; i <= 2; i++) {
      pages.push(new Page(i));
    }

    const update = new Update(pages);

    const goodRule = new Rule(1, 2);
    const badRule = new Rule(2, 1);

    const goodRuleset = new Ruleset();
    const badRuleset = new Ruleset();

    goodRuleset.addRule(goodRule);
    badRuleset.addRule(badRule);

    update.setRuleset(goodRuleset);

    expect(update.isValid()).toBe(true);

    update.setRuleset(badRuleset);

    expect(update.isValid()).toBe(false);
  });
});
