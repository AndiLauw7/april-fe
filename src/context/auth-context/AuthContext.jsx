/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { registerAdmin, registerAnggota } from "../../services/authServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dataToken = localStorage.getItem("token") || "";
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(dataToken);

  const fetchProfile = async () => {
    const role = localStorage.getItem("role");

    // const url =
    //   role === "admin" ? "/api/v1/admin/profile" : "/api/v1/anggota/profile";

    const url =
      role === "anggota" ? "/api/v1/anggota/profile" : "/api/v1/admin/profile";

    try {
      const res = await fetch(`http://localhost:5000${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        // setUser(data[role] || data.admin);
        // setUser(role === "anggota" ? data.anggota : data.admin);
        const role = localStorage.getItem("role");
        const profile = role === "anggota" ? data.anggota : data.admin;

        if (!profile) {
          console.error("Profil tidak ditemukan untuk role:", role);
          setUser(null);
          return;
        }
        setUser({ ...profile, role });
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
      const res = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      setToken(data.token);

      await fetchProfile();
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const register = async (data, role) => {
    try {
      if (role === "admin") {
        await registerAdmin(data);
      } else if (role === "anggota") {
        await registerAnggota(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, token, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
