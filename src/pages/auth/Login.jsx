/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import bakground from "../../assets/backgroud-depan.webp";
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
    // <div className="min-h-screen bg-gray-100">
    //   <div
    //     className="h-screen bg-cover bg-center flex items-center justify-center text-white"
    //     style={{ backgroundImage: `url(${bakground})` }}
    //   >
    //     <h1 className="text-4xl font-bold bg-black/50 px-6 py-2 rounded-lg">
    //       <form onSubmit={handleLogin}>
    //         <input
    //           type="email"
    //           placeholder="Email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <input
    //           type="password"
    //           placeholder="Kata Sandi"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <button type="submit">Login</button>
    //       </form>
    //     </h1>
    //   </div>
    // </div>
    // <div className="min-h-screen bg-gray-100">
    //   <div
    //     className="h-screen bg-cover bg-center flex items-center justify-center"
    //     style={{ backgroundImage: `url(${bakground})` }}
    //   >
    //     <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-sm w-full">
    //       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
    //         Login ke Akun Anda
    //       </h2>
    //       <form onSubmit={handleLogin} className="space-y-4">
    //         <input
    //           type="email"
    //           placeholder="Email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         />
    //         <input
    //           type="password"
    //           placeholder="Kata Sandi"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         />
    //         <button
    //           type="submit"
    //           className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
    //         >
    //           Login
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100">
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bakground})` }}
      >
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-white/50">
          <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-[0_0_2px_#3b82f6]">
            SMPN 1 KEMIRI
            <br />
            KAB TANGERANG
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-white/20 text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-white/20 text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600/80 text-1xl font-semibold text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
