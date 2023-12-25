import { useEffect, useState } from 'react';
import { getSymbols, getSymbolsResponse } from 'api/symbols';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import SymbolsTables from './SymbolsTable';

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

const SymbolsList: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = () => {
  const [serverState, setServerState] = useState<ServerState>({ state: 'loading' });
  const [search, setSearch] = useState({ page: 1, text: '' });
  const [text, setText] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getSymbols(50, search.page, search.text);
        setServerState({ state: 'success', data });
      } catch (e) {
        console.log(e);
        setServerState({ state: 'error', error: e as Error });
      }
    };

    getData();
  }, [search]);

  if (serverState.state === 'loading') {
    return <></>;
  }

  if (serverState.state === 'error') {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <p className="text-lg font-bold px-4 w-full max-w-screen-lg mx-auto leading-none">Stocks</p>

      <div className="flex items-center max-w-screen-lg mx-auto p-4 w-screen">
        <input
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearch((s) => ({ ...s, text }));
            }
          }}
          className="border p-3 rounded-lg h-12 placeholder:text-neutral-700"
          placeholder="symbol or name"
          value={text}
        />

        <span className="flex-1" />

        <p className="text-sm mx-2">
          Page {search.page} of {Math.ceil((serverState.data as getSymbolsResponse).total / 50)}
        </p>
        <button
          className="h-10 w-10 border border-neutral-300 text-neutral-600 rounded-lg hover:bg-neutral-600/10 transition-colors"
          onClick={() => setSearch((s) => ({ ...s, page: s.page - 1 }))}
          disabled={search.page === 1}
        >
          <ChevronLeftIcon className="h-6 w-6 m-auto stroke-2" />
        </button>
        <span className="px-1" />
        <button
          className="h-10 w-10 border border-neutral-300 text-neutral-600 rounded-lg hover:bg-neutral-900/10 transition-colors"
          onClick={() => setSearch((s) => ({ ...s, page: s.page + 1 }))}
          disabled={search.page === Math.ceil((serverState.data as getSymbolsResponse).total / 50)}
        >
          <ChevronRightIcon className="h-6 w-6 m-auto stroke-2" />
        </button>
      </div>
      <SymbolsTables symbols={(serverState.data as getSymbolsResponse).data} />
    </>
  );
};

export default SymbolsList;
