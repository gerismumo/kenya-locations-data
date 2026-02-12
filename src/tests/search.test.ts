import { describe, it, expect } from "vitest";
import { searchLocations } from "../services";

describe("searchLocations", () => {
  it("should return results for valid query", () => {
    const results = searchLocations("Mombasa");

    expect(results.length).toBeGreaterThan(0);
  });

  it("should filter by type", () => {
    const results = searchLocations("Mombasa", "county");

    expect(results.every((r) => r.type === "county")).toBe(true);
  });

  it("should respect limit", () => {
    const results = searchLocations("a", 3);

    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("should return empty array for empty query", () => {
    const results = searchLocations("");

    expect(results).toEqual([]);
  });
});
