import React, { useState } from "react";
import { adminAddAnggota } from "../../../services/adminService";

const AddAnggotaPage = () => {
  const [formData, setFormData] = useState({
    nis: "",
    nama_siswa: "",
    kelas: "",
    jenis_kelamin: "",
    tgl_lahir: "",
    email: "",
    nohp: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      const response = await adminAddAnggota(formData, token);
      setSuccess(response.message);
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div>
      <h1>Tambah Anggota Baru</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nis"
          placeholder="NIS"
          value={formData.nis}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="text"
          name="nama_siswa"
          placeholder="Nama Siswa"
          value={formData.nama_siswa}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="text"
          name="kelas"
          placeholder="Kelas"
          value={formData.kelas}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="text"
          name="jenis_kelamin"
          placeholder="Jenis Kelamin"
          value={formData.jenis_kelamin}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="date"
          name="tgl_lahir"
          placeholder="Tanggal Lahir"
          value={formData.tgl_lahir}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="text"
          name="nohp"
          placeholder="Nomor HP"
          value={formData.nohp}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
          required
        />

        <button
          type="submit"
          // disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
        >
          Tambah Anggota
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddAnggotaPage;
