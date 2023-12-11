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

const csvUrl = 'src/data/symbols.csv';

export const getSymbols = async () => {
  const response = await fetch(csvUrl);
  const csvData = await response.text();

  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  const data: StockSymbol[] = [];

  for (let i = 1; i < lines.length; i++) {
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

    data.push(entry);
  }

  return data;
};
