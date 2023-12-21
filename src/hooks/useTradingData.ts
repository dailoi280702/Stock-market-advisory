import { useEffect, useState } from 'react';
import { ServerState } from './useWishlist';

export type AdjustedData = {
  [date: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. adjusted close': string;
    '6. volume': string;
    '7. dividend amount': string;
  };
};

export const useTradingData = (symbol: string) => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [tradingData, setTradingData] = useState<ServerState<AdjustedData>>({ state: 'loading' });

  useEffect(() => {
    const fetchTradingData = async () => {
      let apiFunction = '';
      switch (period) {
        case 'daily':
          apiFunction = 'TIME_SERIES_DAILY_ADJUSTED';
          break;
        case 'weekly':
          apiFunction = 'TIME_SERIES_WEEKLY_ADJUSTED';
          break;
        case 'monthly':
          apiFunction = 'TIME_SERIES_MONTHLY_ADJUSTED';
          break;
      }

      const apiUrl = `https://www.alphavantage.co/query?function=${apiFunction}&symbol=${symbol}&apikey=demo`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const timeSeriesKey = `${
          apiFunction === 'TIME_SERIES_DAILY_ADJUSTED'
            ? 'Time Series (Daily)'
            : apiFunction === 'TIME_SERIES_WEEKLY_ADJUSTED'
            ? 'Weekly Adjusted Time Series'
            : 'Monthly Adjusted Time Series'
        }`;

        const extractedData: AdjustedData = data[timeSeriesKey];

        setTradingData({ state: 'success', data: extractedData });
      } catch (e) {
        console.log(e);

        setTradingData({ state: 'error', error: e as Error });
      }
    };

    fetchTradingData();
  }, [period, symbol]);

  return {
    period,
    setPeriod,
    tradingData
  };
};
