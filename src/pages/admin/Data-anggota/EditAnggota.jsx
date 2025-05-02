/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import { adminAddAnggota } from "../../../services/adminService";
import { AnggotaContext } from "../../../context/anggota/AnggotaContext";
import { useParams } from "react-router-dom";

const EditAnggotaPage = () => {
  const { id } = useParams();
  const { anggotaList, editAnggota } = useContext(AnggotaContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const pilihAnggota = anggotaList.find((a) => a.id === parseInt(id));
    if (pilihAnggota) {
      setFormData({
        email: pilihAnggota.email || "",
        password: "",
      });
    }
  }, [id, anggotaList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await editAnggota(id, formData);
      console.log("Respons dari update anggota:", response); // Log respons untuk debugging
      setSuccess(response.message); // Pastikan respons memiliki properti 'message'
      setError("");
    } catch (err) {
      setError(err.message); // Tangani error dengan menampilkan pesan
      setSuccess("");
    }
  };

  if (!formData.email) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <h1>Tambah Anggota Baru</h1>
      <form onSubmit={handleSubmit}>
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
          type="password"
          name="password"
          placeholder="Password Baru"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />

        <button
          type="submit"
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

export default EditAnggotaPage;
