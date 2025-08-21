import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, set, get, onValue, off } from 'firebase/database';
import { auth, db } from '@/lib/firebase';
import type { User, Portfolio } from '@shared/schema';

interface AuthContextType {
  user: FirebaseUser | null;
  userData: User | null;
  portfolio: Portfolio | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<User>) => Promise<void>;
  updatePortfolio: (data: Partial<Portfolio>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  const generateDepositAddress = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'bc1q';
    for (let i = 0; i < 39; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateAuthCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const login = async (email: string, password: string) => {
    if (!auth) {
      throw new Error('Authentication service is not available. Please check Firebase configuration.');
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Provide user-friendly error messages
      if (error.code === 'auth/configuration-not-found') {
        throw new Error('Firebase Authentication is not properly configured. Please enable Authentication in your Firebase project.');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email address.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('This account has been disabled.');
      }
      
      throw error;
    }
  };

  const register = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    currency: string;
    password: string;
  }) => {
    if (!auth) {
      throw new Error('Authentication service is not available. Please check Firebase configuration.');
    }

    if (!db) {
      throw new Error('Database service is not available. Please check Firebase configuration.');
    }

    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      const newUser: User = {
        id: firebaseUser.uid,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        country: formData.country,
        currency: formData.currency,
        tier: 'bronze',
        isVerified: false,
        depositAddress: generateDepositAddress(),
        authCode: generateAuthCode(),
        createdAt: Date.now(),
      };

      const newPortfolio: Portfolio = {
        userId: firebaseUser.uid,
        invested: 0,
        profit: 0,
        bonus: 0,
        balance: 0,
        btcEquivalent: 0,
        updatedAt: Date.now(),
      };

      await set(ref(db, `users/${firebaseUser.uid}`), newUser);
      await set(ref(db, `portfolios/${firebaseUser.uid}`), newPortfolio);
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Provide user-friendly error messages
      if (error.code === 'auth/configuration-not-found') {
        throw new Error('Firebase Authentication is not properly configured. Please enable Authentication in your Firebase project.');
      } else if (error.code === 'auth/email-already-in-use') {
        throw new Error('An account with this email already exists.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters long.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      }
      
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateUserData = async (data: Partial<User>) => {
    if (!user) return;
    
    try {
      await set(ref(db, `users/${user.uid}`), { ...userData, ...data });
    } catch (error) {
      console.error('Update user data error:', error);
      throw error;
    }
  };

  const updatePortfolio = async (data: Partial<Portfolio>) => {
    if (!user) return;
    
    try {
      await set(ref(db, `portfolios/${user.uid}`), { 
        ...portfolio, 
        ...data, 
        updatedAt: Date.now() 
      });
    } catch (error) {
      console.error('Update portfolio error:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!auth) {
      // Auth not available - set to demo mode
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser && db) {
        // Listen to user data changes
        const userRef = ref(db, `users/${firebaseUser.uid}`);
        const portfolioRef = ref(db, `portfolios/${firebaseUser.uid}`);

        const handleUserData = (snapshot: any) => {
          const data = snapshot.val();
          if (data) {
            setUserData(data);
          }
        };

        const handlePortfolioData = (snapshot: any) => {
          const data = snapshot.val();
          if (data) {
            setPortfolio(data);
          }
        };

        onValue(userRef, handleUserData);
        onValue(portfolioRef, handlePortfolioData);

        // Cleanup listeners
        return () => {
          off(userRef, 'value', handleUserData);
          off(portfolioRef, 'value', handlePortfolioData);
        };
      } else {
        setUserData(null);
        setPortfolio(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userData,
    portfolio,
    loading,
    login,
    register,
    logout,
    updateUserData,
    updatePortfolio,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
