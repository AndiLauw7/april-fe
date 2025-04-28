import { useState, useContext } from "react";
import React from "react";
import { AuthContext } from "../../context/auth-context/AuthContext";

const FormRegister = ({ switchForm }) => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nis: "",
    nama_siswa: "",
    email: "",
    password: "",
    kelas: "",
    jenis_kelamin: "L",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData, "anggota");
      alert("Registrasi berhasil! Silakan login.");
      switchForm(); // Balik ke form login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        name="nis"
        placeholder="NIS"
        value={formData.nis}
        onChange={handleChange}
        required
        className="w-full p-2 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="nama_siswa"
        placeholder="Nama Siswa"
        value={formData.nama_siswa}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="kelas"
        placeholder="Kelas"
        value={formData.kelas}
        onChange={handleChange}
        required
        className="w-full p-2 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="jenis_kelamin"
        value={formData.jenis_kelamin}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="L">Laki-laki</option>
        <option value="P">Perempuan</option>
      </select>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-2 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600/80 text-1xl font-semibold text-white py-3 rounded-md  hover:bg-blue-700 s transition"
      >
        Register
      </button>
      <p className="text-center mt-2 text-sm">
        Sudah punya akun?{" "}
        <button
          type="button"
          onClick={switchForm}
          className="text-blue-900 underline"
        >
          Login di sini
        </button>
      </p>
    </form>
  );
};

export default FormRegister;
