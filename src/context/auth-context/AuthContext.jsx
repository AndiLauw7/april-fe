import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dataToken = localStorage.getItem("token") || "";
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(dataToken);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/anggota/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.anggota);
      } else {
        setUser(null);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/anggota/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("token", data.token);
      setToken(data.token);

      await fetchProfile();
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
