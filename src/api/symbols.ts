interface SymbolObject {
  symbol: string;
  name: string;
  last_sale: string;
  net_change: string;
  percent_change: string;
  market_cap: number;
  country: string;
  ipo_year: number;
  volume: number;
  sector: string;
  industry: string;
}

interface SymbolIndex {
  [key: string]: unknown;
}

export type StockSymbol = SymbolObject & SymbolIndex;
export type getSymbolsResponse = { total: number; data: StockSymbol[] };

const csvUrl = 'src/data/symbols.csv';

export const getSymbols = async (limit: number, page: number = 1, search: string = '') => {
  const startTime = performance.now();

  const response = await fetch(csvUrl);
  const csvData = await response.text();

  const lines = csvData.split('\n');
  const headers = lines[0].split(',');

  const pageOffset = (page - 1) * limit;
  const data: StockSymbol[] = [];
  let total = 0;

  for (let i = 1; i < lines.length; i++) {
    try {
      const values = lines[i].split(',');
      const entry: StockSymbol = {
        symbol: '',
        name: '',
        last_sale: '',
        net_change: '',
        percent_change: '',
        market_cap: 0,
        country: '',
        ipo_year: 0,
        volume: 0,
        sector: '',
        industry: ''
      };

      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }

      if (
        search.trim() != '' &&
        !(entry.symbol && entry.symbol.toUpperCase().includes(search.toUpperCase().trim())) &&
        !(entry.name && entry.name.toUpperCase().includes(search.toUpperCase().trim()))
      ) {
        continue;
      }

      if (i >= pageOffset && data.length < limit) {
        data.push(entry);
      }

      total++;
    } catch (e) {
      console.log(e);
    }
  }

  const endTime = performance.now();

  console.log(`Call to get ${data.length} symbols took ${endTime - startTime} milliseconds`);

  return new Promise((resolve) => {
    resolve({
      data: data,
      total: total
    } as getSymbolsResponse);
  });
};

export const getMapBySymbols = async (ids: string[]) => {
  const startTime = performance.now();

  const response = await fetch(csvUrl);
  const csvData = await response.text();

  const lines = csvData.split('\n');
  const headers = lines[0].split(',');

  const data: Map<string, StockSymbol> = new Map();

  for (let i = 1; i < lines.length; i++) {
    try {
      const values = lines[i].split(',');
      const entry: StockSymbol = {
        symbol: '',
        name: '',
        last_sale: '',
        net_change: '',
        percent_change: '',
        market_cap: 0,
        country: '',
        ipo_year: 0,
        volume: 0,
        sector: '',
        industry: ''
      };

      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }

      if (ids.includes(entry.symbol)) {
        data.set(entry.symbol, entry);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const endTime = performance.now();

  console.log(`Call to get ${data.size} symbols took ${endTime - startTime} milliseconds`);

  return new Promise((resolve) => {
    resolve(data);
  });
};
