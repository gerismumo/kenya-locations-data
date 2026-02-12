import { describe, it, expect, beforeAll } from "vitest";
import { KenyaLocations } from "../services";

describe("KenyaLocations - County Methods", () => {
  let kenya: KenyaLocations;

  beforeAll(() => {
    kenya = new KenyaLocations();
  });

  describe("getCountyByCode", () => {
    it("should return county for valid code", () => {
      const county = kenya.getCountyByCode("001");
      expect(county).toBeDefined();
      expect(county?.code).toBe("001");
    });

    it("should be case insensitive", () => {
      const county1 = kenya.getCountyByCode("001");
      const county2 = kenya.getCountyByCode("001");
      expect(county1).toEqual(county2);
    });

    it("should return undefined for invalid code", () => {
      const county = kenya.getCountyByCode("999");
      expect(county).toBeUndefined();
    });

    it("should handle empty string", () => {
      const county = kenya.getCountyByCode("");
      expect(county).toBeUndefined();
    });
  });

  describe("getCountyByName", () => {
    it("should return county for valid name", () => {
      const county = kenya.getCountyByName("Mombasa");
      expect(county).toBeDefined();
      expect(county?.name).toBe("Mombasa");
    });

    it("should be case insensitive", () => {
      const county1 = kenya.getCountyByName("mombasa");
      const county2 = kenya.getCountyByName("MOMBASA");
      const county3 = kenya.getCountyByName("MoMbAsA");

      expect(county1).toBeDefined();
      expect(county2).toBeDefined();
      expect(county3).toBeDefined();
      expect(county1).toEqual(county2);
      expect(county2).toEqual(county3);
    });

    it("should return undefined for invalid name", () => {
      const county = kenya.getCountyByName("NonExistentCounty");
      expect(county).toBeUndefined();
    });

    it("should handle whitespace", () => {
      const county = kenya.getCountyByName("   ");
      expect(county).toBeUndefined();
    });
  });

  describe("getAllCounties", () => {
    it("should return all counties", () => {
      const counties = kenya.getAllCounties();
      expect(counties.length).toBeGreaterThan(0);
      expect(Array.isArray(counties)).toBe(true);
    });

    it("should return counties with required fields", () => {
      const counties = kenya.getAllCounties();
      counties.forEach((county) => {
        expect(county).toHaveProperty("code");
        expect(county).toHaveProperty("name");
        expect(county).toHaveProperty("type");
      });
    });

    it("Kenya should have 47 counties", () => {
      const counties = kenya.getAllCounties();
      expect(counties.length).toBe(47);
    });
  });
});