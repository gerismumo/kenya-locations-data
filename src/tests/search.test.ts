import { describe, it, expect, beforeAll } from "vitest";
import { KenyaLocations } from "../services";

describe("KenyaLocations - Search Methods", () => {
  let kenya: KenyaLocations;

  beforeAll(() => {
    kenya = new KenyaLocations();
  });

  describe("search", () => {
    it("should return results for valid query", () => {
      const results = kenya.search("kis");
      expect(results.length).toBeGreaterThan(0);
    });

    it("should filter by type", () => {
      const results = kenya.search("Mombasa", "county");
      expect(results.every((r) => r.type === "county")).toBe(true);
    });

    it("should respect limit when passed as second parameter", () => {
      const results = kenya.search("a", 3);
      expect(results.length).toBeLessThanOrEqual(3);
    });

    it("should respect limit when passed as third parameter with type", () => {
      const results = kenya.search("Nairobi", "ward", 5);
      expect(results.length).toBeLessThanOrEqual(5);
    });

    it("should return empty array for empty query", () => {
      const results = kenya.search("");
      expect(results).toEqual([]);
    });

    it("should return empty array for whitespace query", () => {
      const results = kenya.search("   ");
      expect(results).toEqual([]);
    });

    it("should be case insensitive", () => {
      const lowerResults = kenya.search("nairobi");
      const upperResults = kenya.search("NAIROBI");
      const mixedResults = kenya.search("NaIrObI");

      expect(lowerResults.length).toBeGreaterThan(0);
      expect(upperResults.length).toBeGreaterThan(0);
      expect(mixedResults.length).toBeGreaterThan(0);
    });

    it("should search by code", () => {
      const results = kenya.search("1");
      expect(results.length).toBeGreaterThan(0);
    });

    it("should return results for each search type", () => {
      const countyResults = kenya.search("Nairobi", "county");
      const constituencyResults = kenya.search("Westlands", "constituency");
      const wardResults = kenya.search("Parklands", "ward");
      const localityResults = kenya.search("Karen", "locality");
      const areaResults = kenya.search("Kilimani", "area");

      expect(countyResults.every((r) => r.type === "county")).toBe(true);
      expect(constituencyResults.every((r) => r.type === "constituency")).toBe(
        true,
      );
      expect(wardResults.every((r) => r.type === "ward")).toBe(true);
      expect(localityResults.every((r) => r.type === "locality")).toBe(true);
      expect(areaResults.every((r) => r.type === "area")).toBe(true);
    });
  });

  describe("getByType", () => {
    it("should return all counties", () => {
      const results = kenya.getByType("county");
      expect(results.every((r) => r.type === "county")).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });

    it("should return all constituencies", () => {
      const results = kenya.getByType("constituency");
      expect(results.every((r) => r.type === "constituency")).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });

    it("should return all wards", () => {
      const results = kenya.getByType("ward");
      expect(results.every((r) => r.type === "ward")).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });

    it("should return all localities", () => {
      const results = kenya.getByType("locality");
      expect(results.every((r) => r.type === "locality")).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });

    it("should return all areas", () => {
      const results = kenya.getByType("area");
      expect(results.every((r) => r.type === "area")).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("getAllData", () => {
    it("should return all combined data", () => {
      const results = kenya.getAllData();
      expect(results.length).toBeGreaterThan(0);
    });

    it("should include all types", () => {
      const results = kenya.getAllData();
      const types = new Set(results.map((r) => r.type));

      expect(types.has("county")).toBe(true);
      expect(types.has("constituency")).toBe(true);
      expect(types.has("ward")).toBe(true);
      expect(types.has("locality")).toBe(true);
      expect(types.has("area")).toBe(true);
    });

    it("should return a copy of the data", () => {
      const results1 = kenya.getAllData();
      const results2 = kenya.getAllData();

      expect(results1).not.toBe(results2);
      expect(results1).toEqual(results2);
    });
  });
});