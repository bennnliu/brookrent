import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/user/userdata");
        setUser(res.data);
      } catch (e) {
        console.log("Not logged in");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (userData) => {
      setUser(userData); 
  };

  // 3. Logout function
  const logout = async () => {
    try {
      await api.post("/user/signout");
      setUser(null); 
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use it easily
export const useAuth = () => useContext(AuthContext);