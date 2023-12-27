import { useEffect, useState } from 'react';
import { ServerState } from './useWishlist';

export interface RunningMean {
  [date: string]: number;
}

export interface RunningStdDev {
  [date: string]: number;
}

export interface RunningCalculations {
  [symbol: string]: {
    [date: string]: number;
  };
}

export interface ReturnsCalculations {
  MEAN: {
    RUNNING_MEAN: RunningCalculations;
  };
  'STDDEV(ANNUALIZED=TRUE)': {
    RUNNING_STDDEV: RunningCalculations;
    window_start: Record<string, string>;
    params: { annualized: true };
  };
}

export interface MetaData {
  symbols: string;
  window_size: number;
  min_dt: string;
  max_dt: string;
  ohlc: string;
  interval: string;
}

export interface RunningMeanStdDevResponse {
  meta_data: MetaData;
  payload: Payload;
}

export interface Payload {
  RETURNS_CALCULATIONS: ReturnsCalculations;
}

export interface CompareTickersData {
  metadata: MetaData;
  calculations: RunningCalculations;
}

export const useCompareTickers = (tickers: string[]): ServerState<CompareTickersData> => {
  const [serverState, setServerState] = useState<ServerState<CompareTickersData>>({
    state: 'loading'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbols = tickers.join(',');
        const apiUrl = `https://alphavantageapi.co/timeseries/running_analytics?SYMBOLS=${symbols}&RANGE=2month&INTERVAL=DAILY&OHLC=close&WINDOW_SIZE=20&CALCULATIONS=MEAN,STDDEV(annualized=True)&apikey=demo`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
          setServerState({
            state: 'success',
            data: {
              metadata: data?.meta_data || {},
              calculations: data?.payload?.RETURNS_CALCULATIONS?.MEAN?.RUNNING_MEAN || {}
            }
          });
        } else {
          console.log('error fetching analytics');
          setServerState({ state: 'error', error: new Error('Error fetching data') });
        }
      } catch (e) {
        console.log(e);

        setServerState({ state: 'error', error: e as Error });
      }
    };

    fetchData();
  }, [tickers]);

  return serverState;
};
