import Fuse from "fuse.js";
import {
  ICounty,
  IConstituency,
  IWard,
  ILocality,
  IArea,
  SearchResult,
  SearchType,
} from "../types";

import { areas, constituencies, counties, localities, wards } from "../data";

const combinedData: SearchResult[] = [
  ...counties.map((c: ICounty) => ({ type: "county" as const, item: c })),
  ...constituencies.map((c: IConstituency) => ({
    type: "constituency" as const,
    item: c,
  })),
  ...wards.map((w: IWard) => ({ type: "ward" as const, item: w })),
  ...localities.map((l: ILocality) => ({ type: "locality" as const, item: l })),
  ...areas.map((a: IArea) => ({ type: "area" as const, item: a })),
];

export function searchLocations(
  query: string,
  typeOrLimit?:
    | "county"
    | "constituency"
    | "ward"
    | "locality"
    | "area"
    | number,
  limit: number = 10
): SearchResult[] {
  if (!query) return [];

  let type:
    | "county"
    | "constituency"
    | "ward"
    | "locality"
    | "area"
    | undefined;

  if (typeof typeOrLimit === "number") {
    limit = typeOrLimit;
  } else if (typeof typeOrLimit === "string") {
    type = typeOrLimit;
  }

  const dataToSearch = type
    ? combinedData.filter((d) => d.type === type)
    : combinedData;

  const fuse = new Fuse(dataToSearch, {
    keys: ["item.name", "item.code"],
    includeScore: true,
    threshold: 0.2,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  const results = fuse.search(query, { limit });
  return results.map((r) => r.item);
}
