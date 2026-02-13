import {
  SearchResult,
  SearchType,
  ICounty,
  IConstituency,
  IWard,
  ILocality,
  IArea,
} from "../types";
import { areas, constituencies, counties, localities, wards } from "../data";

class LookupService<T extends { code: string; name: string }> {
  private readonly byCode: Map<string, T>;
  private readonly byName: Map<string, T>;
  private readonly byPrefix: Map<string, T[]>;
  private readonly data: T[];

  constructor(data: T[]) {
    this.data = data;
    this.byCode = new Map();
    this.byName = new Map();
    this.byPrefix = new Map();
    this.initializeMaps();
  }

  private initializeMaps(): void {
    this.data.forEach((item) => {
      const lowerName = item.name.toLowerCase();

      this.byCode.set(item.code.toLowerCase(), item);
      this.byName.set(lowerName, item);

      for (let i = 1; i <= lowerName.length; i++) {
        const prefix = lowerName.substring(0, i);

        if (!this.byPrefix.has(prefix)) {
          this.byPrefix.set(prefix, []);
        }

        this.byPrefix.get(prefix)!.push(item);
      }
    });
  }

  public getByCode(code: string): T | undefined {
    return this.byCode.get(code.toLowerCase());
  }

  public getByName(name: string): T | undefined {
    return this.byName.get(name.toLowerCase());
  }

  public getByNameMany(name: string): T[] {
    const normalized = name.toLowerCase().trim();
    if (!normalized) return [];

    return this.byPrefix.get(normalized) ?? [];
  }

  public getAll(): T[] {
    return this.data;
  }

  public filter(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }
}

//  Search service using Fuse.js
class SearchService {
  private readonly combinedData: SearchResult[];

  constructor(combinedData: SearchResult[]) {
    this.combinedData = combinedData;
  }

  public getByType(type: SearchType): SearchResult[] {
    return this.combinedData.filter((d) => d.type === type);
  }

  public getAllData(): SearchResult[] {
    return [...this.combinedData];
  }
}

// Data aggregator for combining location data

class DataAggregator {
  public static combineLocationData(): SearchResult[] {
    return [
      ...counties.map((c) => ({ type: "county" as const, item: c })),
      ...constituencies.map((c) => ({
        type: "constituency" as const,
        item: c,
      })),
      ...wards.map((w) => ({ type: "ward" as const, item: w })),
      ...localities.map((l) => ({ type: "locality" as const, item: l })),
      ...areas.map((a) => ({ type: "area" as const, item: a })),
    ];
  }
}

// Main service for accessing Kenya location data
export class KenyaLocations {
  private readonly countyService: LookupService<ICounty>;
  private readonly constituencyService: LookupService<IConstituency>;
  private readonly wardService: LookupService<IWard>;
  private readonly localityService: LookupService<ILocality>;
  private readonly areaService: LookupService<IArea>;
  private readonly searchService: SearchService;

  constructor() {
    // Initialize lookup services
    this.countyService = new LookupService(counties);
    this.constituencyService = new LookupService(constituencies);
    this.wardService = new LookupService(wards);
    this.localityService = new LookupService(localities);
    this.areaService = new LookupService(areas);

    // Initialize search service
    const combinedData = DataAggregator.combineLocationData();
    this.searchService = new SearchService(combinedData);
  }

  // search methods for locations

  /**
   * Search across all location types or filter by specific type
   * @param query - Search query string
   * @param typeOrLimit - Either a SearchType to filter by or a number for limit
   * @param limit - Maximum number of results (default: 10)
   */
  public search(
    query: string,
    typeOrLimit?: SearchType | number,
    limit = 10,
  ): SearchResult[] {
    let type: SearchType | undefined;

    if (typeof typeOrLimit === "number") {
      limit = typeOrLimit;
    } else if (typeof typeOrLimit === "string") {
      type = typeOrLimit;
    }
    const normalizedQuery = query.toLowerCase();

    const exactMatch = this.getExactMatch(normalizedQuery, type);
    return exactMatch.slice(0, limit);
  }

  private getExactMatch(query: string, type?: SearchType): SearchResult[] {
    const results: SearchResult[] = [];

    const pushIfFound = (
      item: IArea | ICounty | IConstituency | IWard | ILocality | undefined,
      itemType: SearchType,
    ) => {
      if (item) {
        results.push({ type: itemType, item });
      }
    };

    const pushManyIfFound = (
      items: (IArea | ICounty | IConstituency | IWard | ILocality)[],
      itemType: SearchType,
    ) => {
      items.forEach((item) => {
        results.push({ type: itemType, item });
      });
    };

    if (!type || type === "county") {
      pushIfFound(this.countyService.getByCode(query), "county");
      pushManyIfFound(this.countyService.getByNameMany(query), "county");
    }

    if (!type || type === "constituency") {
      pushIfFound(this.constituencyService.getByCode(query), "constituency");
      pushManyIfFound(
        this.constituencyService.getByNameMany(query),
        "constituency",
      );
    }

    if (!type || type === "ward") {
      pushIfFound(this.wardService.getByCode(query), "ward");
      pushManyIfFound(this.wardService.getByNameMany(query), "ward");
    }

    if (!type || type === "locality") {
      pushIfFound(this.localityService.getByCode(query), "locality");
      pushManyIfFound(this.localityService.getByNameMany(query), "locality");
    }

    if (!type || type === "area") {
      pushIfFound(this.areaService.getByCode(query), "area");
      pushManyIfFound(this.areaService.getByNameMany(query), "area");
    }

    return results;
  }

  public getByType(type: SearchType): SearchResult[] {
    return this.searchService.getByType(type);
  }

  public getAllData(): SearchResult[] {
    return this.searchService.getAllData();
  }

  // county

  public getCountyByCode(code: string): ICounty | undefined {
    return this.countyService.getByCode(code);
  }

  public getCountyByName(name: string): ICounty | undefined {
    return this.countyService.getByName(name);
  }

  public getAllCounties(): ICounty[] {
    return this.countyService.getAll();
  }

  // Constituency Methods

  public getConstituencyByCode(code: string): IConstituency | undefined {
    return this.constituencyService.getByCode(code);
  }

  public getConstituencyByName(name: string): IConstituency | undefined {
    return this.constituencyService.getByName(name);
  }

  public getAllConstituencies(): IConstituency[] {
    return this.constituencyService.getAll();
  }

  public getConstituenciesByCounty(countyCode: string): IConstituency[] {
    return this.constituencyService.filter(
      (c) => c.county_code.toLowerCase() === countyCode.toLowerCase(),
    );
  }

  //ward

  public getWardByCode(code: string): IWard | undefined {
    return this.wardService.getByCode(code);
  }

  public getWardByName(name: string): IWard | undefined {
    return this.wardService.getByName(name);
  }

  public getAllWards(): IWard[] {
    return this.wardService.getAll();
  }

  public getWardsByConstituency(constituencyCode: string): IWard[] {
    return this.wardService.filter(
      (w) =>
        w.constituency_code.toLowerCase() === constituencyCode.toLowerCase(),
    );
  }

  public getWardsByCounty(countyCode: string): IWard[] {
    return this.wardService.filter(
      (w) => w.county_code.toLowerCase() === countyCode.toLowerCase(),
    );
  }

  // Locality

  public getLocalityByCode(code: string): ILocality | undefined {
    return this.localityService.getByCode(code);
  }

  public getLocalityByName(name: string): ILocality | undefined {
    return this.localityService.getByName(name);
  }

  public getAllLocalities(): ILocality[] {
    return this.localityService.getAll();
  }

  public getLocalitiesByCounty(countyCode: string): ILocality[] {
    return this.localityService.filter(
      (l) => l.county_code.toLowerCase() === countyCode.toLowerCase(),
    );
  }

  //area
  public getAreaByCode(code: string): IArea | undefined {
    return this.areaService.getByCode(code);
  }

  public getAreaByName(name: string): IArea | undefined {
    return this.areaService.getByName(name);
  }

  public getAllAreas(): IArea[] {
    return this.areaService.getAll();
  }

  public getAreasByCounty(countyCode: string): IArea[] {
    return this.areaService.filter(
      (a) => a.county_code.toLowerCase() === countyCode.toLowerCase(),
    );
  }

  public getAreasByLocality(locality: string): IArea[] {
    return this.areaService.filter(
      (a) => a.locality.toLowerCase() === locality.toLowerCase(),
    );
  }
}

export const kenyaLocations = new KenyaLocations();
