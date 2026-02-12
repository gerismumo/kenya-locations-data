import { describe, it, expect, beforeAll } from "vitest";
import { KenyaLocations } from "../services";

describe("KenyaLocations - Constituency Methods", () => {
  let kenya: KenyaLocations;

  beforeAll(() => {
    kenya = new KenyaLocations();
  });

  describe("getConstituencyByCode", () => {
    it("should return constituency for valid code", () => {
      const constituency = kenya.getConstituencyByCode("001");
      expect(constituency).toBeDefined();
      expect(constituency?.code).toBe("001");
    });

    it("should be case insensitive", () => {
      const constituency1 = kenya.getConstituencyByCode("001");
      const constituency2 = kenya.getConstituencyByCode("001");
      expect(constituency1).toEqual(constituency2);
    });

    it("should return undefined for invalid code", () => {
      const constituency = kenya.getConstituencyByCode("9999");
      expect(constituency).toBeUndefined();
    });
  });

  describe("getConstituencyByName", () => {
    it("should return constituency for valid name", () => {
      const constituency = kenya.getConstituencyByName("Westlands");
      expect(constituency).toBeDefined();
      expect(constituency?.name).toBe("Westlands");
    });

    it("should be case insensitive", () => {
      const constituency1 = kenya.getConstituencyByName("westlands");
      const constituency2 = kenya.getConstituencyByName("WESTLANDS");

      expect(constituency1).toBeDefined();
      expect(constituency2).toBeDefined();
      expect(constituency1).toEqual(constituency2);
    });

    it("should return undefined for invalid name", () => {
      const constituency = kenya.getConstituencyByName(
        "NonExistentConstituency",
      );
      expect(constituency).toBeUndefined();
    });
  });

  describe("getAllConstituencies", () => {
    it("should return all constituencies", () => {
      const constituencies = kenya.getAllConstituencies();
      expect(constituencies.length).toBeGreaterThan(0);
      expect(Array.isArray(constituencies)).toBe(true);
    });

    it("should return constituencies with required fields", () => {
      const constituencies = kenya.getAllConstituencies();
      constituencies.forEach((constituency) => {
        expect(constituency).toHaveProperty("code");
        expect(constituency).toHaveProperty("name");
        expect(constituency).toHaveProperty("county_code");
        expect(constituency).toHaveProperty("county_name");
        expect(constituency).toHaveProperty("type");
      });
    });
  });

  describe("getConstituenciesByCounty", () => {
    it("should return constituencies for valid county code", () => {
      const constituencies = kenya.getConstituenciesByCounty("047"); // Nairobi
      expect(constituencies.length).toBeGreaterThan(0);
      expect(constituencies.every((c) => c.county_code === "047")).toBe(true);
    });

    it("should be case insensitive", () => {
      const constituencies1 = kenya.getConstituenciesByCounty("047");
      const constituencies2 = kenya.getConstituenciesByCounty("047");
      expect(constituencies1).toEqual(constituencies2);
    });

    it("should return empty array for invalid county code", () => {
      const constituencies = kenya.getConstituenciesByCounty("999");
      expect(constituencies).toEqual([]);
    });

    it("should return empty array for empty string", () => {
      const constituencies = kenya.getConstituenciesByCounty("");
      expect(constituencies).toEqual([]);
    });
  });
});