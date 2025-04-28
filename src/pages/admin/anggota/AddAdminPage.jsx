/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { AdminContextKelola } from "../../../context/admin/AdminContextKelola";

const AddAdminPage = () => {
  const { handleRegisterAdmin, loading, error } =
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
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
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Tambah Admin"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AddAdminPage;
