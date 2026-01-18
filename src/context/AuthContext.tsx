import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load user on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("auth_user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
