import { describe, it, expect } from "vitest";
import { areas, constituencies, counties, localities, wards } from "../data";

function checkUniqueCodes(items: { code: string }[]) {
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.code)) {
      throw new Error(`Duplicate code found: ${item.code}`);
    }
    seen.add(item.code);
  }

  expect(true).toBe(true);
}


describe("Code Uniqueness Tests", () => {
  it("counties should have unique codes", () => {
    checkUniqueCodes(counties);
  });

  it("constituencies should have unique codes", () => {
    checkUniqueCodes(constituencies);
  });

  it("wards should have unique codes", () => {
    checkUniqueCodes(wards);
  });

  it("localities should have unique codes", () => {
    checkUniqueCodes(localities);
  });

  it("areas should have unique codes", () => {
    checkUniqueCodes(areas);
  });
});
