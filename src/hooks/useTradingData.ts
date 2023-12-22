import { useEffect, useState } from 'react';
import { ServerState } from './useWishlist';

export type AdjustedData = {
  [date: string]: {
    '1. open': number;
    '2. high': number;
    '3. low': number;
    '4. close': number;
    '5. adjusted close': number;
    '6. volume': number;
    '7. dividend amount': number;
  };
};

export type TradingPeriod = 'daily' | 'weekly' | 'monthly';

export const useTradingData = (symbol: string) => {
  const [period, setPeriod] = useState<TradingPeriod>('daily');
  const [tradingData, setTradingData] = useState<ServerState<AdjustedData>>({
    state: 'loading'
  });

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

        // Extract data based on the selected period
        const timeSeriesKey = `${
          apiFunction === 'TIME_SERIES_DAILY_ADJUSTED'
            ? 'Time Series (Daily)'
            : apiFunction === 'TIME_SERIES_WEEKLY_ADJUSTED'
            ? 'Weekly Adjusted Time Series'
            : 'Monthly Adjusted Time Series'
        }`;

        const rawData = data[timeSeriesKey];

        // Convert string values to floats
        const extractedData: AdjustedData = Object.entries(rawData).reduce(
          (result, [date, values]) => {
            result[date] = {
              '1. open': parseFloat((values as Record<string, string>)['1. open']),
              '2. high': parseFloat((values as Record<string, string>)['2. high']),
              '3. low': parseFloat((values as Record<string, string>)['3. low']),
              '4. close': parseFloat((values as Record<string, string>)['4. close']),
              '5. adjusted close': parseFloat(
                (values as Record<string, string>)['5. adjusted close']
              ),
              '6. volume': parseFloat((values as Record<string, string>)['6. volume']),
              '7. dividend amount': parseFloat(
                (values as Record<string, string>)['7. dividend amount']
              )
            };
            return result;
          },
          {} as AdjustedData
        );

        setTradingData({ state: 'success', data: extractedData });
      } catch (e) {
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
