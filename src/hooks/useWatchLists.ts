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
  where
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
    if (!user || mWatchlist.state !== 'success' || !mWatchlist.data.has('id')) {
      return;
    }

    try {
      const data: Watchlist = {
        ...mWatchlist.data.get(id)!,
        name: name
      };

      await updateDoc(doc(db, 'watchlists', id), data);

      setWishlist({ state: 'loading' });
    } catch (e) {
      console.error(e);

      setWishlist({ state: 'error', error: e as Error });
    }
  };

  const subcribe = async (id: string, symbol: string) => {
    if (!user || mWatchlist.state !== 'success' || !mWatchlist.data.has('id')) {
      return;
    }

    try {
      const watchlist = mWatchlist.data.get(id)!;
      if (watchlist.watchlist.findIndex((item) => item === symbol) >= 0) {
        setWishlist({ state: 'error', error: new Error('Already subcribed') });

        return;
      }

      const data: Watchlist = {
        ...mWatchlist.data.get(id)!,
        watchlist: [...watchlist.watchlist, symbol]
      };

      await updateDoc(doc(db, 'watchlists', id), data);

      setWishlist({ state: 'loading' });
    } catch (e) {
      console.error(e);

      setWishlist({ state: 'error', error: e as Error });
    }
  };

  const unsubcribe = async (id: string, symbol: string) => {
    if (!user || mWatchlist.state !== 'success' || !mWatchlist.data.has('id')) {
      return;
    }

    try {
      const watchlist = mWatchlist.data.get(id)!;
      const index = watchlist.watchlist.findIndex((item) => item === symbol);
      if (index === -1) {
        setWishlist({ state: 'error', error: new Error('not found') });

        return;
      }

      const data: Watchlist = {
        ...mWatchlist.data.get(id)!,
        watchlist: [...watchlist.watchlist.slice(0, index), ...watchlist.watchlist.slice(index + 1)]
      };

      await updateDoc(doc(db, 'watchlists', id), data);

      setWishlist({ state: 'loading' });
    } catch (e) {
      console.error(e);

      setWishlist({ state: 'error', error: e as Error });
    }
  };

  const removeWatchlist = async (id: string) => {
    if (!user || mWatchlist.state !== 'success' || !mWatchlist.data.has('id')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'watchlists', id));

      setWishlist({ state: 'loading' });
    } catch (e) {
      console.error(e);

      setWishlist({ state: 'error', error: e as Error });
    }
  };

  return {
    mWatchlist,
    createWatchlist,
    renameWatchlist,
    subcribe,
    unsubcribe,
    removeWatchlist
  };
};
