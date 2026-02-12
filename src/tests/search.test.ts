import { describe, it, expect } from "vitest";
import { KenyaLocations } from "../services";

describe("searchLocations", () => {
  it("should return results for valid query", () => {
    const kenya = new KenyaLocations();

    const results = kenya.search("Mombasa");

    console.log("result", results);

    expect(results.length).toBeGreaterThan(0);
  });

  it("should filter by type", () => {
    const kenya = new KenyaLocations();

    const results = kenya.search("Mombasa", "county");

    expect(results.every((r) => r.type === "county")).toBe(true);
  });

  it("should respect limit", () => {
    const kenya = new KenyaLocations();

    const results = kenya.search("a", 3);

    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("should return empty array for empty query", () => {
    const kenya = new KenyaLocations();
    const results = kenya.search("");

    expect(results).toEqual([]);
  });
});
