// import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { ServerState } from './useWishlist';
import { StockSymbol, getMapBySymbols } from 'api/symbols';

// const symbolsAtom = atom<ServerState<Map<string, StockSymbol>>>({ state: 'loading' });

export const useWatchlist = (symbolIds: string[]) => {
  // const [mSymbols, setMSymbols] = useAtom(symbolsAtom);
  const [mSymbols, setMSymbols] = useState<ServerState<Map<string, StockSymbol>>>({
    state: 'loading'
  });
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }

    const getWishlist = async () => {
      try {
        const resp = await getMapBySymbols(symbolIds);
        const data = resp as Map<string, StockSymbol>;
        setMSymbols({ state: 'success', data: data });
      } catch (e) {
        console.error(e);

        setMSymbols({ state: 'error', error: e as Error });
      }
    };

    getWishlist();
  }, [mSymbols.state, setMSymbols, symbolIds, user]);

  return {
    mSymbols
  };
};
