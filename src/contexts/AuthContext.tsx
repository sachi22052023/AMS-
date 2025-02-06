import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  isLoggedIn: boolean;
  currentUser: string | null;
  userFullName: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userFullName, setUserFullName] = useState<string | null>(null);

  const login = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === username);
    
    if (user && user.password === password) {
      setIsAdmin(user.role === "admin");
      setIsLoggedIn(true);
      setCurrentUser(username);
      setUserFullName(user.fullName);
      return true;
    } else if (username === 'admin' && password === 'Admin@1209') {
      // Fallback admin account
      setIsAdmin(true);
      setIsLoggedIn(true);
      setCurrentUser(username);
      setUserFullName('Administrator');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserFullName(null);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isLoggedIn, currentUser, userFullName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};