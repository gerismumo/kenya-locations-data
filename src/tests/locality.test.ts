import { describe, it, expect, beforeAll } from "vitest";
import { KenyaLocations } from "../services";

describe("KenyaLocations - Locality Methods", () => {
  let kenya: KenyaLocations;

  beforeAll(() => {
    kenya = new KenyaLocations();
  });

  describe("getLocalityByCode", () => {
    it("should return locality for valid code", () => {
      const locality = kenya.getLocalityByCode("2544");
      expect(locality).toBeDefined();
      expect(locality?.code).toBe("2544");
    });

    it("should be case insensitive", () => {
      const locality1 = kenya.getLocalityByCode("2544");
      const locality2 = kenya.getLocalityByCode("2544");
      expect(locality1).toEqual(locality2);
    });

    it("should return undefined for invalid code", () => {
      const locality = kenya.getLocalityByCode("99999");
      expect(locality).toBeUndefined();
    });
  });

  describe("getLocalityByName", () => {
    it("should return locality for valid name", () => {
      const locality = kenya.getLocalityByName("Karen");
      expect(locality).toBeDefined();
      if (locality) {
        expect(locality.name).toBe("Karen");
      }
    });

    it("should be case insensitive", () => {
      const locality1 = kenya.getLocalityByName("karen");
      const locality2 = kenya.getLocalityByName("KAREN");

      expect(locality1).toBeDefined();
      expect(locality2).toBeDefined();
      expect(locality1).toEqual(locality2);
    });

    it("should return undefined for invalid name", () => {
      const locality = kenya.getLocalityByName("NonExistentLocality");
      expect(locality).toBeUndefined();
    });
  });

  describe("getAllLocalities", () => {
    it("should return all localities", () => {
      const localities = kenya.getAllLocalities();
      expect(localities.length).toBeGreaterThan(0);
      expect(Array.isArray(localities)).toBe(true);
    });

    it("should return localities with required fields", () => {
      const localities = kenya.getAllLocalities();
      localities.forEach((locality) => {
        expect(locality).toHaveProperty("code");
        expect(locality).toHaveProperty("name");
        expect(locality).toHaveProperty("county_code");
        expect(locality).toHaveProperty("county_name");
        expect(locality).toHaveProperty("type");
      });
    });
  });

  describe("getLocalitiesByCounty", () => {
    it("should return localities for valid county code", () => {
      const localities = kenya.getLocalitiesByCounty("47"); // Nairobi
      expect(localities.length).toBeGreaterThan(0);
      expect(localities.every((l) => l.county_code === "47")).toBe(true);
    });

    it("should be case insensitive", () => {
      const localities1 = kenya.getLocalitiesByCounty("47");
      const localities2 = kenya.getLocalitiesByCounty("47");
      expect(localities1).toEqual(localities2);
    });

    it("should return empty array for invalid county code", () => {
      const localities = kenya.getLocalitiesByCounty("999");
      expect(localities).toEqual([]);
    });
  });
});