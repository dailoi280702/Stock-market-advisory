import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { atom, useAtom } from 'jotai';
import { auth } from '../firebase';
import { useEffect } from 'react';

export const userAtom = atom<User | null>(null);

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, [setUser]);

  return {
    user,
    createUser,
    signIn,
    logOut
  };
};
