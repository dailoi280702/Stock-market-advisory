import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
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

const wishlistAtom = atom<ServerState<string[]>>({ state: 'loading' });

export const useWishList = () => {
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
          setWishlist({ state: 'success', data: user.wishlist });
        } else {
          setWishlist({ state: 'success', data: [] });
        }
      } catch (e) {
        console.error(e);

        setWishlist({ state: 'error', error: e as Error });
      }
    };

    const updateWishlist = async () => {
      if (wishlist.state === 'success') {
        try {
          console.log('wishlist updating');
          await setDoc(doc(db, 'users', user.uid), {
            wishlist: wishlist.data
          });
        } catch (e) {
          console.error(e);

          setWishlist({ state: 'error', error: e as Error });
        }
      }
    };

    switch (wishlist.state) {
      case 'loading':
        getWishlist();
        break;
      case 'success':
        updateWishlist();
        break;
    }
  }, [setWishlist, user, wishlist, wishlist.state]);

  const subcribe = (symbol: string) => {
    setWishlist((prev) => {
      if (prev.state !== 'success') {
        return prev;
      }

      if (prev.data!.findIndex((item) => item === symbol) >= 0) {
        return prev;
      }

      return {
        ...prev,
        data: [...prev.data, symbol]
      };
    });

    if (wishlist.state !== 'success') {
      return;
    }
  };

  const unsubcribe = (symbol: string) => {
    console.log('huh');
    setWishlist((prev) => {
      if (prev.state !== 'success') {
        return prev;
      }

      const index = prev.data.findIndex((item) => item === symbol);
      if (index === -1) {
        return prev;
      }

      return {
        ...prev,
        data: [...prev.data.slice(0, index), ...prev.data.slice(index + 1)]
      };
    });
  };

  return {
    wishlist,
    subcribe,
    unsubcribe
  };
};
