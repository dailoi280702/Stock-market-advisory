import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore';
import { db } from 'src/firebase';
import { ServerState } from './useWishlist';

const wishlistAtom = atom<ServerState<Map<string, Watchlist>>>({ state: 'loading' });

export const useWatchlists = () => {
  const [mWatchlist, setWishlist] = useAtom(wishlistAtom);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }

    const getWishlist = async () => {
      try {
        const data: Map<string, Watchlist> = new Map();
        const q = query(collection(db, 'watchlists'), where('user_id', '==', user.uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const item = doc.data() as Watchlist;
          data.set(doc.id, item);
        });

        setWishlist({ state: 'success', data: data });
        console.log('watchlists fetched');
      } catch (e) {
        console.error(e);

        setWishlist({ state: 'error', error: e as Error });
      }
    };

    switch (mWatchlist.state) {
      case 'loading':
        getWishlist();
        break;
    }
  }, [setWishlist, user, mWatchlist, mWatchlist.state]);

  const createWatchlist = async (name: string) => {
    if (!user) {
      return;
    }

    try {
      const data: Watchlist = {
        name: name,
        user_id: user.uid,
        watchlist: []
      };

      await addDoc(collection(db, 'watchlists'), data);

      setWishlist({ state: 'loading' });
    } catch (e) {
      console.error(e);

      setWishlist({ state: 'error', error: e as Error });
    }
  };

  const renameWatchlist = async (id: string, name: string) => {
    if (!user || mWatchlist.state !== 'success' || !mWatchlist.data.has(id)) {
      return;
    }

    try {
      const data: Watchlist = {
        ...mWatchlist.data.get(id)!,
        name: name
      };

      await updateDoc(doc(db, 'watchlists', id), data);

      setWishlist((prev) => {
        if (!user || prev.state !== 'success' || !prev.data.has(id)) {
          return prev;
        }

        const newWatchlist = new Map(prev.data);
        newWatchlist.set(id, data);

        return {
          ...prev,
          newWatchlist
        };
      });

      console.log('watchlist renamed');
    } catch (e) {
      console.error(e);

      setWishlist({ state: 'error', error: e as Error });
    }
  };

  const subcribe = async (id: string, symbol: string) => {
    updateWatchlistsInBatches(symbol, new Map([[id, true]]));
  };

  const unsubcribe = async (id: string, symbol: string) => {
    updateWatchlistsInBatches(symbol, new Map([[id, false]]));
  };

  const removeWatchlist = async (id: string) => {
    if (!user || mWatchlist.state !== 'success' || !mWatchlist.data.has(id)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'watchlists', id));
      console.log('watchlist removed');

      setWishlist({ state: 'loading' });
    } catch (e) {
      console.error(e);

      setWishlist({ state: 'error', error: e as Error });
    }
  };

  const updateWatchlistsInBatches = async (symbol: string, mChecks: Map<string, boolean>) => {
    if (!user || mWatchlist.state !== 'success') {
      return;
    }

    const updatedData: Map<string, string[]> = new Map();

    mChecks.forEach((checked: boolean, id: string) => {
      if (checked) {
        if (mWatchlist.data.has(id)) {
          const watchlist = mWatchlist.data.get(id)!.watchlist;
          if (!watchlist.includes(symbol)) {
            updatedData.set(id, [...watchlist, symbol]);
          }
        } else {
          updatedData.set(id, [symbol]);
        }
      } else {
        if (mWatchlist.data.has(id)) {
          const watchlist = mWatchlist.data.get(id)!.watchlist;
          const index = watchlist.findIndex((item) => item === symbol);
          if (index >= 0) {
            updatedData.set(id, [...watchlist.slice(0, index), ...watchlist.slice(index + 1)]);
          }
        }
      }
    });

    try {
      const batch = writeBatch(db);
      updatedData.forEach((data, id) => {
        batch.update(doc(db, 'watchlists', id), { watchlist: data });
      });
      await batch.commit();

      console.log('watchlists updated');

      setWishlist((prev) => {
        if (!user || prev.state !== 'success') {
          return prev;
        }

        const newWatchlist = new Map(prev.data);

        updatedData.forEach((data, id) => {
          if (newWatchlist.has(id)) {
            newWatchlist.set(id, {
              ...newWatchlist.get(id)!,
              watchlist: data
            });
          }
        });

        return {
          ...prev,
          data: newWatchlist
        };
      });
    } catch (e) {
      console.log(e);

      setWishlist({ state: 'error', error: e as Error });
    }
  };

  return {
    mWatchlist,
    createWatchlist,
    renameWatchlist,
    subcribe,
    unsubcribe,
    removeWatchlist,
    updateWatchlistsInBatches
  };
};
