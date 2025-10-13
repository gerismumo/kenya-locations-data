export interface ICounty {
  code: string;
  name: string;
  type: string;
}

export interface IConstituency {
  code: string;
  name: string;
  county_code: string;
  county_name: string;
  type: string;
}

export interface IWard {
  code: string;
  name: string;
  constituency_code: string;
  constituency_name: string;
  county_code: string;
  county_name: string;
  type: string;
}

export interface ILocality {
  code: string;
  name: string;
  county_code: string;
  county_name: string;
  type: string;
}

export interface IArea {
  code: string;
  name: string;
  locality: string;
  county_code: string;
  county_name: string;
  type: string;
}

export type SearchType =
  | "county"
  | "constituency"
  | "ward"
  | "locality"
  | "area";

export interface SearchResult {
  type: SearchType;
  item: ICounty | IConstituency | IWard | ILocality | IArea;
}

export interface KenyaDivisionsOptions {
  dataVersion?: string;
}
