import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextState {
  user: object;
  child: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  selectChild(id: number): Promise<void>,
  loading: boolean;
}


export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [child, setChild] = useState('');
  const [data, setData] = useState<AuthState>({} as AuthState);
  

  useEffect(() => {
    async function loadStrorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoTask:token',
        '@GoTask:user',
      ]);

      const child = await AsyncStorage.getItem('@GoTask:child');

      if(child) {
        setChild(child);
      }

      if(token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1])})
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000)
    }
    
    loadStrorageData();
  }, [])
  
  const signIn = useCallback(async({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
      isMobile: true
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;


    await AsyncStorage.multiSet([
      ['@GoTask:token', token],
      ['@GoTask:user', JSON.stringify(user)],
    ])

    setData({ token, user }); 
  }, []);

  const selectChild = useCallback(async( id ) => {

    const idString = id.toString();

    await AsyncStorage.setItem('@GoTask:child', idString);

    setChild(id);
  }, []);
  
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@GoTask:token',
      '@GoTask:user',
      '@GoTask:child',
    ]);

    setData({} as AuthState);
    setChild('');
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, selectChild, loading, child }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth Error!');
  }

  return context;
}