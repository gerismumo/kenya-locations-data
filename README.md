# KE Locations Data

A comprehensive TypeScript/JavaScript library providing structured data for all Kenyan administrative divisions including counties, constituencies, wards, localities, and areas with powerful search and lookup capabilities.

[![npm version](https://img.shields.io/npm/v/ke-locations-data.svg)](https://www.npmjs.com/package/ke-locations-data)   [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Complete Coverage**: All 47 counties, constituencies, wards, localities, and areas
- **Fast Search**: Efficient lookup by code or name
- **Hierarchical Queries**: Get all constituencies in a county, wards in a constituency, etc.
- **TypeScript Support**: Full type definitions included
- **Optimized Performance**: Map-based lookups for O(1) time complexity
- **Case Insensitive**: All searches work regardless of case
- **Referential Integrity**: Maintain relationships between administrative levels

## Installation

```bash
npm i ke-locations-data
```

## Quick Start

```typescript
import { kenyaLocations } from 'ke-locations-data';

// Search for locations
const results = kenyaLocations.search('Nairobi');

// Get county by name
const county = kenyaLocations.getCountyByName('Mombasa');

// Get all constituencies in a county
const constituencies = kenyaLocations.getConstituenciesByCounty('47');

// Get all wards in a constituency
const wards = kenyaLocations.getWardsByConstituency('290');
```

## API Reference

### Search Methods

#### `search(query: string, typeOrLimit?: SearchType | number, limit?: number): SearchResult[]`

Search across all location types or filter by specific type.

```typescript
// Search all types
const results = kenyaLocations.search('Westlands');

// Search with limit
const results = kenyaLocations.search('Nairobi', 5);

// Search specific type
const counties = kenyaLocations.search('Mombasa', 'county');

// Search specific type with limit
const wards = kenyaLocations.search('Park', 'ward', 3);
```

**Parameters:**

- `query`: Search query string
- `typeOrLimit`: Either a `SearchType` ('county' | 'constituency' | 'ward' | 'locality' | 'area') or a number for limit
- `limit`: Maximum number of results (default: 10)

**Returns:** Array of `SearchResult` objects containing type and item data

---

#### `getByType(type: SearchType): SearchResult[]`

Get all locations of a specific type.

```typescript
const allCounties = kenyaLocations.getByType('county');
const allWards = kenyaLocations.getByType('ward');
```

---

#### `getAllData(): SearchResult[]`

Get all location data combined.

```typescript
const allLocations = kenyaLocations.getAllData();
```

---

### County Methods

#### `getCountyByCode(code: string): ICounty | undefined`

Get a county by its code.

```typescript
const nairobi = kenyaLocations.getCountyByCode('47');
// Returns: { code: '47', name: 'Nairobi', type: 'county' }
```

---

#### `getCountyByName(name: string): ICounty | undefined`

Get a county by its name (case-insensitive).

```typescript
const mombasa = kenyaLocations.getCountyByName('Mombasa');
const sameMombasa = kenyaLocations.getCountyByName('MOMBASA'); // Works too!
```

---

#### `getAllCounties(): ICounty[]`

Get all 47 counties.

```typescript
const counties = kenyaLocations.getAllCounties();
console.log(counties.length); // 47
```

---

### Constituency Methods

#### `getConstituencyByCode(code: string): IConstituency | undefined`

Get a constituency by its code.

```typescript
const westlands = kenyaLocations.getConstituencyByCode('290');
```

---

#### `getConstituencyByName(name: string): IConstituency | undefined`

Get a constituency by its name (case-insensitive).

```typescript
const westlands = kenyaLocations.getConstituencyByName('Westlands');
```

---

#### `getAllConstituencies(): IConstituency[]`

Get all constituencies.

```typescript
const constituencies = kenyaLocations.getAllConstituencies();
```

---

#### `getConstituenciesByCounty(countyCode: string): IConstituency[]`

Get all constituencies within a specific county.

```typescript
// Get all constituencies in Nairobi
const nairobiConstituencies = kenyaLocations.getConstituenciesByCounty('47');
```

---

### Ward Methods

#### `getWardByCode(code: string): IWard | undefined`

Get a ward by its code.

```typescript
const ward = kenyaLocations.getWardByCode('1366');
```

---

#### `getWardByName(name: string): IWard | undefined`

Get a ward by its name (case-insensitive).

```typescript
const parklands = kenyaLocations.getWardByName('Parklands/Highridge');
```

---

#### `getAllWards(): IWard[]`

Get all wards.

```typescript
const wards = kenyaLocations.getAllWards();
```

---

#### `getWardsByConstituency(constituencyCode: string): IWard[]`

Get all wards within a specific constituency.

```typescript
// Get all wards in Westlands constituency
const westlandsWards = kenyaLocations.getWardsByConstituency('290');
```

---

#### `getWardsByCounty(countyCode: string): IWard[]`

Get all wards within a specific county.

```typescript
// Get all wards in Nairobi county
const nairobiWards = kenyaLocations.getWardsByCounty('47');
```

---

### Locality Methods

#### `getLocalityByCode(code: string): ILocality | undefined`

Get a locality by its code.

```typescript
const locality = kenyaLocations.getLocalityByCode('2853');
```

---

#### `getLocalityByName(name: string): ILocality | undefined`

Get a locality by its name (case-insensitive).

```typescript
const karen = kenyaLocations.getLocalityByName('Karen');
```

---

#### `getAllLocalities(): ILocality[]`

Get all localities.

```typescript
const localities = kenyaLocations.getAllLocalities();
```

---

#### `getLocalitiesByCounty(countyCode: string): ILocality[]`

Get all localities within a specific county.

```typescript
const nairobiLocalities = kenyaLocations.getLocalitiesByCounty('47');
```

---

### Area Methods

#### `getAreaByCode(code: string): IArea | undefined`

Get an area by its code.

```typescript
const area = kenyaLocations.getAreaByCode('3125');
```

---

#### `getAreaByName(name: string): IArea | undefined`

Get an area by its name (case-insensitive).

```typescript
const kilimani = kenyaLocations.getAreaByName('Kilimani');
```

---

#### `getAllAreas(): IArea[]`

Get all areas.

```typescript
const areas = kenyaLocations.getAllAreas();
```

---

#### `getAreasByCounty(countyCode: string): IArea[]`

Get all areas within a specific county.

```typescript
const nairobiAreas = kenyaLocations.getAreasByCounty('47');
```

---

#### `getAreasByLocality(locality: string): IArea[]`

Get all areas within a specific locality.

```typescript
const karenAreas = kenyaLocations.getAreasByLocality('Karen');
```

---

## TypeScript Types

### Interfaces

```typescript
interface ICounty {
  code: string;
  name: string;
  type: string;
}

interface IConstituency {
  code: string;
  name: string;
  county_code: string;
  county_name: string;
  type: string;
}

interface IWard {
  code: string;
  name: string;
  constituency_code: string;
  constituency_name: string;
  county_code: string;
  county_name: string;
  type: string;
}

interface ILocality {
  code: string;
  name: string;
  county_code: string;
  county_name: string;
  type: string;
}

interface IArea {
  code: string;
  name: string;
  locality: string;
  county_code: string;
  county_name: string;
  type: string;
}

type SearchType = 'county' | 'constituency' | 'ward' | 'locality' | 'area';

interface SearchResult {
  type: SearchType;
  item: ICounty | IConstituency | IWard | ILocality | IArea;
}
```

## Performance

The library uses Map-based lookups for optimal performance:

- **Lookup by Code/Name**: O(1) time complexity
- **Hierarchical Queries**: O(n) where n is the filtered subset
- **Search Operations**: Optimized with early returns
- **Memory Efficient**: Data loaded once and reused

## Browser Support

Works in all modern browsers and Node.js environments that support:

- ES6+ features
- Map/Set data structures
- TypeScript 4.0+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Data Sources

Data is compiled from official Kenyan government sources and regularly updated to ensure accuracy.

## License

MIT License - see LICENSE file for details

## Author

**Gerald Mumo**

- GitHub: [@gerismumo](https://github.com/gerismumo)

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/gerismumo/ke-locations-data).
