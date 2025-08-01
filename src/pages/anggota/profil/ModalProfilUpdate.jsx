// components/anggota/EditProfilModal.jsx
import React, { useState } from "react";

const EditProfilModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({
    nama_siswa: user.nama_siswa,
    nohp: user.nohp,
    email: user.email,
    image: user.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(form); // function dari parent
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Edit Profil</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama_siswa"
            value={form.nama_siswa}
            onChange={handleChange}
            placeholder="Nama Lengkap"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="nohp"
            value={form.nohp}
            onChange={handleChange}
            placeholder="No HP"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="URL Foto Profil"
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilModal;
