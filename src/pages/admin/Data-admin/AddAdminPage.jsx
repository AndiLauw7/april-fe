/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { AdminContextKelola } from "../../../context/admin/AdminContextKelola";

const AddAdminPage = () => {
  const { handleRegisterAdmin, loading, error, message } =
    useContext(AdminContextKelola);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleRegisterAdmin(formData);
      alert("Admin berhasil ditambahkan!");
      // Redirect ke halaman admin lainnya atau login page
    } catch (err) {
      alert(error || "Terjadi kesalahan saat menambahkan admin");
    }
  };

  return (
    <div className="container">
      <h1>Tambah Admin Baru</h1>
      {message && (
        <div className="mb-4 p-2 bg-blue-100 border border-blue-300 rounded">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
        >
          {loading ? "Loading..." : "Tambah Admin"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AddAdminPage;
