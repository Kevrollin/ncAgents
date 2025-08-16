import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthUser {
  id?: string;
  username?: string;
  name?: string;
  email?: string;
  avatar?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // NOTE: For best security, store tokens in httpOnly cookies set by the backend.
  // This example uses sessionStorage for SPA-only scenarios. Tokens are cleared on tab close.
  useEffect(() => {
    const storedAccess = sessionStorage.getItem("access_token");
    const storedRefresh = sessionStorage.getItem("refresh_token");
    if (storedAccess && storedRefresh) {
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh);
      setIsAuthenticated(true);
      // Ensure axios has the auth header immediately on app load
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedAccess}`;
      fetchUser(storedAccess);
    }
    // Install a request interceptor to always attach the latest token
    const interceptorId = axios.interceptors.request.use((config) => {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        config.headers = config.headers || {};
        // Always overwrite with the freshest token
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      } else if (config.headers && "Authorization" in config.headers) {
        // If no token, ensure we do not send a bogus header
        delete (config.headers as any)["Authorization"];
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptorId);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("access_token", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      sessionStorage.removeItem("access_token");
      delete axios.defaults.headers.common["Authorization"];
    }
    if (refreshToken) {
      sessionStorage.setItem("refresh_token", refreshToken);
    } else {
      sessionStorage.removeItem("refresh_token");
    }
  }, [accessToken, refreshToken]);

  const fetchUser = async (token: string) => {
    try {
      const res = await axios.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = res.data || {};
      // Normalize server payload to our AuthUser shape
      const normalized: AuthUser = {
        id: payload.id ? String(payload.id) : undefined,
        username: payload.username,
        name: payload.username, // keep UI components that expect `name` working
        email: payload.email,
        avatar: payload.avatar,
        ...payload,
      };
      setUser(normalized);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post(
        "/api/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true },
      );
      // Set state
      setAccessToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token);
      setIsAuthenticated(true);
      // Immediately persist tokens to sessionStorage to avoid race conditions
      sessionStorage.setItem("access_token", res.data.access_token);
      sessionStorage.setItem("refresh_token", res.data.refresh_token);
      // Set axios default Authorization header for immediate subsequent requests
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.access_token}`;
      await fetchUser(res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);
      delete axios.defaults.headers.common["Authorization"];
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/signin");
  };

  const refresh = async () => {
    if (!refreshToken) return;
    try {
      const res = await axios.post("/api/auth/refresh", {
        refresh_token: refreshToken,
      });
      setAccessToken(res.data.access_token);
      await fetchUser(res.data.access_token);
    } catch (err) {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        login,
        logout,
        refresh,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
