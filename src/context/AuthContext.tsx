import { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (phone: string, name?: string) => Promise<void>;
  checkUser: (phone: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = await api.getUser();
        setUser(storedUser);
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (phone: string, name?: string) => {
    setIsLoading(true);
    try {
      const user = await api.login(phone, name);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const checkUser = async (phone: string) => {
    return await api.checkUser(phone);
  };

  const logout = async () => {
    setIsLoading(true);
    await api.logout();
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, checkUser, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
