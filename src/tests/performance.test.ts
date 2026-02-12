import { describe, it, expect, beforeAll } from "vitest";
import { KenyaLocations } from "../services";

describe("KenyaLocations - Performance Tests", () => {
  let kenya: KenyaLocations;

  beforeAll(() => {
    kenya = new KenyaLocations();
  });

  it("should handle multiple searches efficiently", () => {
    const startTime = performance.now();

    for (let i = 0; i < 100; i++) {
      kenya.search("Nairobi");
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log("duration: " + duration)

    // Should complete 100 searches in less than 1 second
    expect(duration).toBeLessThan(1000);
  });

  it("should handle lookups efficiently", () => {
    const startTime = performance.now();

    for (let i = 0; i < 1000; i++) {
      kenya.getCountyByCode("47");
      kenya.getCountyByName("Nairobi");
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should complete 2000 lookups in less than 100ms
    expect(duration).toBeLessThan(100);
  });

  it("should handle hierarchical queries efficiently", () => {
    const startTime = performance.now();

    for (let i = 0; i < 50; i++) {
      const county = kenya.getCountyByCode("47");
      if (county) {
        kenya.getConstituenciesByCounty(county.code);
        kenya.getWardsByCounty(county.code);
        kenya.getLocalitiesByCounty(county.code);
        kenya.getAreasByCounty(county.code);
      }
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should complete 50 hierarchical queries in less than 500ms
    expect(duration).toBeLessThan(500);
  });

  it("should handle getAllData efficiently", () => {
    const startTime = performance.now();

    for (let i = 0; i < 100; i++) {
      kenya.getAllData();
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should complete 100 getAllData calls in less than 200ms
    expect(duration).toBeLessThan(200);
  });

  it("should handle mixed operations efficiently", () => {
    const startTime = performance.now();

    for (let i = 0; i < 100; i++) {
      kenya.search("a", 5);
      kenya.getCountyByCode("47");
      kenya.getConstituenciesByCounty("47");
      kenya.getWardByName("Parklands/Highridge");
      kenya.getAreasByLocality("Karen");
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should complete 500 mixed operations in less than 1 second
    expect(duration).toBeLessThan(1000);
  });

  it("should initialize quickly", () => {
    const startTime = performance.now();

    const newInstance = new KenyaLocations();

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should initialize in less than 500ms
    expect(duration).toBeLessThan(500);
    expect(newInstance).toBeDefined();
  });

  it("should handle concurrent searches efficiently", async () => {
    const startTime = performance.now();

    const searches = Array.from({ length: 100 }, (_, i) => {
      const queries = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"];
      return kenya.search(queries[i % queries.length]);
    });

    await Promise.all(searches);

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should handle 100 concurrent searches in less than 500ms
    expect(duration).toBeLessThan(500);
  });
});