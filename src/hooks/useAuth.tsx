import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContextProps {
  login: (payload: LoginProps) => Promise<void>;
  logout: () => Promise<void>;
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginProps {
  email: string;
  password: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<null | FirebaseAuthTypes.User>(null);
  const [loading, setLoading] = useState(false);

  async function login({ email, password }: LoginProps) {
    setLoading(true);
    try {
      const authenticatedUser = await auth().signInWithEmailAndPassword(email, password);
      setUser(authenticatedUser.user);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        throw new Error('invalid_email');
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('invalid_credentials');
      } else {
        throw new Error('unknown_error');
      }
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await auth().signOut();
      setUser(null);
    } catch {
      throw new Error('unknown_error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((state) => {
      if (state) setUser(state)
    });

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
