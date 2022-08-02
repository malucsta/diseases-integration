export interface DiseaseResponse {
  readonly updated: number;
  readonly country: string;
  readonly countryInfo: countryInfo;
  readonly cases: number;
  readonly todayCases: number;
  readonly deaths: number;
  readonly todayDeaths: number;
  readonly recovered: number;
  readonly todayRecovered: number;
  readonly active: number;
  readonly critical: number;
  readonly casesPerOneMillion: number;
  readonly deathsPerOneMillion: number;
  readonly tests: number;
  readonly testsPerOneMillion: number;
  readonly population: number;
  readonly continent: string;
  readonly oneCasePerPeople: number;
  readonly oneDeathPerPeople: number;
  readonly oneTestPerPeople: number;
  readonly activePerOneMillion: number;
  readonly recoveredPerOneMillion: number;
  readonly criticalPerOneMillion: number;
}

interface countryInfo {
  readonly _id: number;
  readonly iso2: string;
  readonly iso3: string;
  readonly lat: number;
  readonly long: number;
  readonly flag: string;
}

export interface DiseaseInfo {
  country: string;
  todayCases: number;
  todayDeaths: number;
  date: string;
  active: number;
  critical: number;
}
