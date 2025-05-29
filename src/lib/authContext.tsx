
"use client";

import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { ReactNode} from 'react';
import { createContext, useEffect, useState, useCallback } from 'react';
import type { AuthUser, Role } from '@/types';
import { auth, db } from './firebase/config';
import { useRouter } from 'next/navigation';

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  role: Role;
  logout: () => Promise<void>;
  loginWithDumpUser: (userToLogin: AuthUser) => void; // New function
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role>('guest');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // If a Firebase user is detected, prioritize Firebase auth.
        // This means if a dump user was logged in, Firebase will override it.
        // For true decentralized testing, one might want to disable this listener or add a flag.
        setLoading(true); // Ensure loading is true while fetching Firebase user data
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as Omit<AuthUser, 'uid'>;
          const authUserInstance: AuthUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || userData.displayName,
            role: userData.role || 'member',
            photoURL: firebaseUser.photoURL || userData.photoURL,
          };
          setUser(authUserInstance);
          setRole(authUserInstance.role);
        } else {
          const newUserProfile: AuthUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            role: 'member', 
            photoURL: firebaseUser.photoURL
          };
          await setDoc(userDocRef, {
            email: newUserProfile.email,
            displayName: newUserProfile.displayName,
            role: newUserProfile.role,
            photoURL: newUserProfile.photoURL,
            createdAt: new Date().toISOString(),
          });
          setUser(newUserProfile);
          setRole(newUserProfile.role);
        }
      } else {
        // Only set to guest if no Firebase user and no dump user is already set
        if (!user) { 
            setRole('guest');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]); // Added user to dependency array to re-evaluate if user changes from dump login

  const loginWithDumpUser = useCallback((userToLogin: AuthUser) => {
    setUser(userToLogin);
    setRole(userToLogin.role);
    setLoading(false);
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      // If the user was logged in via Firebase, sign them out from Firebase.
      // This check helps if you mix Firebase and dump logins.
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (error) {
      console.error("Error signing out from Firebase (if applicable): ", error);
    } finally {
      // Always reset local state for both Firebase and dump users
      setUser(null);
      setRole('guest');
      setLoading(false);
      router.push('/'); 
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, role, logout, loginWithDumpUser }}>
      {children}
    </AuthContext.Provider>
  );
};
