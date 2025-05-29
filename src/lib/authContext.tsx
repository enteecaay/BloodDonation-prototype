
"use client";

import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { ReactNode} from 'react';
import { createContext, useEffect, useState } from 'react';
import type { AuthUser, Role } from '@/types';
import { auth, db } from './firebase/config';
import { useRouter } from 'next/navigation';

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  role: Role;
  logout: () => Promise<void>;
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
          // New user signed up via provider or first time after manual creation
          // Create a user profile in Firestore with default role 'member'
          const newUserProfile: AuthUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            role: 'member', // Default role
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
        setUser(null);
        setRole('guest');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setRole('guest');
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Error signing out: ", error);
      // Handle error (e.g., show toast)
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
