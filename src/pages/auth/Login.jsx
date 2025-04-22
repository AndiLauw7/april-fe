/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log(data);

      alert("Login Berhasil");
    } catch (error) {
      alert("Login gagal: " + error.message);
    }
  };
  useEffect(() => {
    if (user) {
      if (user.role === "anggota") {
        navigate("/anggota/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, [user]);
  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Kata Sandi"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};
export default LoginPage;
