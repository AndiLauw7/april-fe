import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { registerAdmin } from "../../services/authServices";

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    inviteCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAdmin(formData, "admin");
      alert("Registrasi Admin berhasil! Silakan login.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="inviteCode"
            placeholder="Kode Undangan"
            value={formData.inviteCode}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
