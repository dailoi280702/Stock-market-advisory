import { useEffect, useState } from 'react';
import { StockSymbol, getSymbols } from '../../api/symbols';

export type ServerState =
  | {
      state: 'loading';
    }
  | {
      state: 'success';
      data: unknown;
    }
  | {
      state: 'error';
      error: Error;
    };

const SymbolsList = () => {
  const [serverState, setServerState] = useState<ServerState>({ state: 'loading' });

  useEffect(() => {
    const unsubscribe = async () => {
      setServerState({ state: 'loading' });

      try {
        const data = await getSymbols();
        setServerState({ state: 'success', data: data as StockSymbol[] });
      } catch (e) {
        console.log(e);
        setServerState({ state: 'error', error: e as Error });
      }
    };

    return () => {
      unsubscribe();
    };
  }, []);

  if (serverState.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (serverState.state === 'error') {
    return <div>Something went wrong</div>;
  }

  return <div>{JSON.stringify(serverState.data)}</div>;
};

export default SymbolsList;
