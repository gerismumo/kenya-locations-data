import { describe, it, expect, beforeAll } from "vitest";
import { KenyaLocations } from "../services";

describe("KenyaLocations - Area Methods", () => {
  let kenya: KenyaLocations;

  beforeAll(() => {
    kenya = new KenyaLocations();
  });

  describe("getAreaByCode", () => {
    it("should return area for valid code", () => {
      const area = kenya.getAreaByCode("4315");
      expect(area).toBeDefined();
      expect(area?.code).toBe("4315");
    });

    it("should be case insensitive", () => {
      const area1 = kenya.getAreaByCode("4315");
      const area2 = kenya.getAreaByCode("4315");
      expect(area1).toEqual(area2);
    });

    it("should return undefined for invalid code", () => {
      const area = kenya.getAreaByCode("99999");
      expect(area).toBeUndefined();
    });
  });

  describe("getAreaByName", () => {
    it("should return area for valid name", () => {
      const area = kenya.getAreaByName("Sikhendu");
      expect(area).toBeDefined();
      if (area) {
        expect(area.name).toBe("Sikhendu");
      }
    });

    it("should be case insensitive", () => {
      const area1 = kenya.getAreaByName("Sikhendu");
      const area2 = kenya.getAreaByName("Sikhendu");

      expect(area1).toBeDefined();
      expect(area2).toBeDefined();
      expect(area1).toEqual(area2);
    });

    it("should return undefined for invalid name", () => {
      const area = kenya.getAreaByName("NonExistentArea");
      expect(area).toBeUndefined();
    });
  });

  describe("getAllAreas", () => {
    it("should return all areas", () => {
      const areas = kenya.getAllAreas();
      expect(areas.length).toBeGreaterThan(0);
      expect(Array.isArray(areas)).toBe(true);
    });

    it("should return areas with required fields", () => {
      const areas = kenya.getAllAreas();
      areas.forEach((area) => {
        expect(area).toHaveProperty("code");
        expect(area).toHaveProperty("name");
        expect(area).toHaveProperty("locality");
        expect(area).toHaveProperty("county_code");
        expect(area).toHaveProperty("county_name");
        expect(area).toHaveProperty("type");
      });
    });
  });

  describe("getAreasByCounty", () => {
    it("should return areas for valid county code", () => {
      const areas = kenya.getAreasByCounty("47"); // Nairobi
      expect(areas.length).toBeGreaterThan(0);
      expect(areas.every((a) => a.county_code === "47")).toBe(true);
    });

    it("should be case insensitive", () => {
      const areas1 = kenya.getAreasByCounty("047");
      const areas2 = kenya.getAreasByCounty("047");
      expect(areas1).toEqual(areas2);
    });

    it("should return empty array for invalid county code", () => {
      const areas = kenya.getAreasByCounty("999");
      expect(areas).toEqual([]);
    });
  });

  describe("getAreasByLocality", () => {
    it("should return areas for valid locality", () => {
      const areas = kenya.getAreasByLocality("Karen");
      expect(areas.length).toBeGreaterThan(0);
      expect(areas.every((a) => a.locality.toLowerCase() === "karen")).toBe(
        true,
      );
    });

    it("should be case insensitive", () => {
      const areas1 = kenya.getAreasByLocality("karen");
      const areas2 = kenya.getAreasByLocality("KAREN");

      expect(areas1.length).toBeGreaterThan(0);
      expect(areas2.length).toBeGreaterThan(0);
      expect(areas1).toEqual(areas2);
    });

    it("should return empty array for invalid locality", () => {
      const areas = kenya.getAreasByLocality("NonExistentLocality");
      expect(areas).toEqual([]);
    });
  });
});