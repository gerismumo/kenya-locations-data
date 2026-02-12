import { describe, it, expect, beforeAll } from "vitest";
import { KenyaLocations } from "../services";

describe("KenyaLocations - Integration Tests", () => {
  let kenya: KenyaLocations;

  beforeAll(() => {
    kenya = new KenyaLocations();
  });

  it("should maintain data consistency between search and direct access", () => {
    const searchResults = kenya.search("Mombasa", "county");
    const directAccess = kenya.getCountyByName("Mombasa");

    if (searchResults.length > 0 && directAccess) {
      expect(searchResults[0].item).toEqual(directAccess);
    }
  });

  it("should handle hierarchical queries correctly", () => {
    // Get a county
    const county = kenya.getCountyByName("Nairobi");
    expect(county).toBeDefined();

    if (county) {
      // Get constituencies in that county
      const constituencies = kenya.getConstituenciesByCounty(county.code);
      expect(constituencies.length).toBeGreaterThan(0);

      // Get wards in that county
      const wards = kenya.getWardsByCounty(county.code);
      expect(wards.length).toBeGreaterThan(0);

      // Verify all wards belong to constituencies in the county
      wards.forEach((ward) => {
        expect(ward.county_code).toBe(county.code);
      });
    }
  });

  it("should handle complete location hierarchy", () => {
    // County -> Constituency -> Ward flow
    const county = kenya.getCountyByCode("47"); // Nairobi
    expect(county).toBeDefined();

    if (county) {
      const constituencies = kenya.getConstituenciesByCounty(county.code);
      expect(constituencies.length).toBeGreaterThan(0);

      const firstConstituency = constituencies[0];
      const wards = kenya.getWardsByConstituency(firstConstituency.code);
      expect(wards.length).toBeGreaterThan(0);

      // Verify ward belongs to both constituency and county
      const firstWard = wards[0];
      expect(firstWard.constituency_code).toBe(firstConstituency.code);
      expect(firstWard.county_code).toBe(county.code);
    }
  });

  it("should handle locality to area relationship", () => {
    const locality = kenya.getLocalityByName("Karen");

    if (locality) {
      const areas = kenya.getAreasByLocality(locality.name);
      expect(areas.length).toBeGreaterThan(0);

      // Verify all areas belong to the same county as locality
      areas.forEach((area) => {
        expect(area.county_code).toBe(locality.county_code);
      });
    }
  });

  it("should maintain referential integrity across all levels", () => {
    // Get all data types
    const counties = kenya.getAllCounties();
    const constituencies = kenya.getAllConstituencies();
    const wards = kenya.getAllWards();
    const localities = kenya.getAllLocalities();
    const areas = kenya.getAllAreas();

    // Verify all constituencies have valid counties
    constituencies.forEach((constituency) => {
      const county = counties.find((c) => c.code === constituency.county_code);
      expect(county).toBeDefined();
      expect(county?.name).toBe(constituency.county_name);
    });

    // Verify all wards have valid constituencies and counties
    wards.forEach((ward) => {
      const constituency = constituencies.find(
        (c) => c.code === ward.constituency_code,
      );
      const county = counties.find((c) => c.code === ward.county_code);

      expect(constituency).toBeDefined();
      expect(county).toBeDefined();
      expect(constituency?.name).toBe(ward.constituency_name);
      expect(county?.name).toBe(ward.county_name);
    });

    // Verify all localities have valid counties
    localities.forEach((locality) => {
      const county = counties.find((c) => c.code === locality.county_code);
      expect(county).toBeDefined();
      expect(county?.name).toBe(locality.county_name);
    });

    // Verify all areas have valid counties
    areas.forEach((area) => {
      const county = counties.find((c) => c.code === area.county_code);
      expect(county).toBeDefined();
      expect(county?.name).toBe(area.county_name);
    });
  });

  it("should allow traversing from county to all child entities", () => {
    const county = kenya.getCountyByName("Nairobi");

    if (county) {
      const constituencies = kenya.getConstituenciesByCounty(county.code);
      const wards = kenya.getWardsByCounty(county.code);
      const localities = kenya.getLocalitiesByCounty(county.code);
      const areas = kenya.getAreasByCounty(county.code);

      expect(constituencies.length).toBeGreaterThan(0);
      expect(wards.length).toBeGreaterThan(0);
      expect(localities.length).toBeGreaterThan(0);
      expect(areas.length).toBeGreaterThan(0);

      // Verify all belong to Nairobi
      expect(constituencies.every((c) => c.county_code === county.code)).toBe(
        true,
      );
      expect(wards.every((w) => w.county_code === county.code)).toBe(true);
      expect(localities.every((l) => l.county_code === county.code)).toBe(true);
      expect(areas.every((a) => a.county_code === county.code)).toBe(true);
    }
  });
});