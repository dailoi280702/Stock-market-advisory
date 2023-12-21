import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from 'src/firebase';

export type ServerState<T> =
  | {
      state: 'loading';
    }
  | {
      state: 'success';
      data: T;
    }
  | {
      state: 'error';
      error: Error;
    };

const wishlistAtom = atom<string[]>([]);

export const useWishList = () => {
  const [serverState, setServerState] = useState<ServerState<string[]>>({ state: 'loading' });
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }

    const getWishlist = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const user = docSnap.data() as User;
          setWishlist(user.wishlist);
        } else {
          setWishlist([]);
        }
      } catch (e) {
        console.error(e);

        setServerState({ state: 'error', error: e as Error });
      }
    };

    getWishlist();
  }, [setWishlist, user]);

  useEffect(() => {
    if (!user || serverState.state === 'loading') {
      return;
    }

    const updateWishlist = async () => {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          wishlist: wishlist
        });

        setServerState({ state: 'success', data: wishlist });
      } catch (e) {
        console.error(e);

        setServerState({ state: 'error', error: e as Error });
      }
    };

    updateWishlist();
  }, [wishlist, serverState, user]);

  const subcribe = (symbol: string) => {
    if (wishlist.findIndex((item) => item === symbol) < 0) {
      return;
    }

    setWishlist((prevWishlist) => [...prevWishlist, symbol]);
  };

  const unsubcribe = (symbol: string) => {
    const index = wishlist.findIndex((item) => item === symbol);
    if (index === -1) {
      return;
    }

    setWishlist((prevWishlist) => [
      ...prevWishlist.slice(0, index),
      ...prevWishlist.slice(index + 1)
    ]);
  };

  return {
    serverState,
    subcribe,
    unsubcribe
  };
};
