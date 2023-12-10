import {
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { atom, useAtom } from 'jotai';
import { auth } from '../firebase';
import { useEffect } from 'react';
import { sendEmailVerification } from 'firebase/auth/cordova';

export const userAtom = atom<User | null | undefined>(undefined);

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);

  const createUser = async (email: string, password: string) => {
    // return createUserWithEmailAndPassword(auth, email, password);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return sendEmailVerification(userCredential.user);
  };

  const signIn = async (email: string, password: string) => {
    await setPersistence(auth, browserLocalPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const sendPasswordResetMail = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser?.emailVerified);
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
    logOut,
    sendPasswordResetMail
  };
};
