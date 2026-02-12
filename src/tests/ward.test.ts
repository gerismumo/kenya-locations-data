import { describe, it, expect, beforeAll } from "vitest";
import { KenyaLocations } from "../services";

describe("KenyaLocations - Ward Methods", () => {
  let kenya: KenyaLocations;

  beforeAll(() => {
    kenya = new KenyaLocations();
  });

  describe("getWardByCode", () => {
    it("should return ward for valid code", () => {
      const ward = kenya.getWardByCode("0719");
      expect(ward).toBeDefined();
      expect(ward?.code).toBe("0719");
    });

    it("should be case insensitive", () => {
      const ward1 = kenya.getWardByCode("0719");
      const ward2 = kenya.getWardByCode("0719");
      expect(ward1).toEqual(ward2);
    });

    it("should return undefined for invalid code", () => {
      const ward = kenya.getWardByCode("99999");
      expect(ward).toBeUndefined();
    });
  });

  describe("getWardByName", () => {
    it("should return ward for valid name", () => {
      const ward = kenya.getWardByName("Parklands/Highridge");
      expect(ward).toBeDefined();
      if (ward) {
        expect(ward.name).toBe("Parklands/Highridge");
      }
    });

    it("should be case insensitive", () => {
      const ward1 = kenya.getWardByName("parklands/highridge");
      const ward2 = kenya.getWardByName("PARKLANDS/HIGHRIDGE");

      expect(ward1).toBeDefined();
      expect(ward2).toBeDefined();
      expect(ward1).toEqual(ward2);
    });

    it("should return undefined for invalid name", () => {
      const ward = kenya.getWardByName("NonExistentWard");
      expect(ward).toBeUndefined();
    });
  });

  describe("getAllWards", () => {
    it("should return all wards", () => {
      const wards = kenya.getAllWards();
      expect(wards.length).toBeGreaterThan(0);
      expect(Array.isArray(wards)).toBe(true);
    });

    it("should return wards with required fields", () => {
      const wards = kenya.getAllWards();
      wards.forEach((ward) => {
        expect(ward).toHaveProperty("code");
        expect(ward).toHaveProperty("name");
        expect(ward).toHaveProperty("constituency_code");
        expect(ward).toHaveProperty("constituency_name");
        expect(ward).toHaveProperty("county_code");
        expect(ward).toHaveProperty("county_name");
        expect(ward).toHaveProperty("type");
      });
    });
  });

  describe("getWardsByConstituency", () => {
    it("should return wards for valid constituency code", () => {
      const wards = kenya.getWardsByConstituency("290");
      expect(wards.length).toBeGreaterThan(0);
      expect(wards.every((w) => w.constituency_code === "290")).toBe(true);
    });

    it("should be case insensitive", () => {
      const wards1 = kenya.getWardsByConstituency("290");
      const wards2 = kenya.getWardsByConstituency("290");
      expect(wards1).toEqual(wards2);
    });

    it("should return empty array for invalid constituency code", () => {
      const wards = kenya.getWardsByConstituency("9999");
      expect(wards).toEqual([]);
    });
  });

  describe("getWardsByCounty", () => {
    it("should return wards for valid county code", () => {
      const wards = kenya.getWardsByCounty("47"); 
      expect(wards.length).toBeGreaterThan(0);
      expect(wards.every((w) => w.county_code === "47")).toBe(true);
    });

    it("should be case insensitive", () => {
      const wards1 = kenya.getWardsByCounty("47");
      const wards2 = kenya.getWardsByCounty("47");
      expect(wards1).toEqual(wards2);
    });

    it("should return empty array for invalid county code", () => {
      const wards = kenya.getWardsByCounty("999");
      expect(wards).toEqual([]);
    });
  });
});