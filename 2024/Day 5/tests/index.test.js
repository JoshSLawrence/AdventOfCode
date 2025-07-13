import { describe, test, expect } from "vitest";
import { solvePart1, Page, Rule, Update } from "../index.js";

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

    const pages = Page.parsePages(dataset);
    const ruleset = Rule.parseRuleset(dataset);
    const updates = Update.parseUpdates(dataset);

    Update.setPages(pages);
    Page.loadRuleset(pages, ruleset);

    let result = solvePart1(updates);

    expect(result).toBe(143);
  });
});
