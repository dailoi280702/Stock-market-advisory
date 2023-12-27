import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'src/firebase';
import { ServerState } from './useWishlist';
import { recommendSymbols } from 'src/util';
import { useAuth } from './useAuth';

const watchlistAtom = atom<ServerState<Watchlist[]>>({ state: 'loading' });

export const useRecommendTickers = (watchlist: Watchlist) => {
  const [watchlists, setWatchlists] = useAtom(watchlistAtom);
  const [recommendedTickers, setRecommendedTickers] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const getWishlist = async () => {
      try {
        let data: Watchlist[] = [];
        const q = query(collection(db, 'watchlists'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const item = doc.data() as Watchlist;
          data = [...data, item];
        });

        setWatchlists({ state: 'success', data: data });
      } catch (e) {
        console.error(e);

        setWatchlists({ state: 'error', error: e as Error });
      }
    };

    switch (watchlists.state) {
      case 'loading':
        getWishlist();
        break;
    }
  }, [setWatchlists, watchlists, watchlists.state]);

  useEffect(() => {
    if (
      !user ||
      watchlists.state != 'success' ||
      watchlists.data.length === 0 ||
      watchlist.watchlist.length === 0
    ) {
      return;
    }

    setRecommendedTickers(recommendSymbols(watchlist, watchlists.data, 10, 6));
  }, [user, watchlist, watchlists]);

  return recommendedTickers;
};
