/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { BukuContext } from "../../../context/buku/BukuContext";
import { PeminjamanContext } from "../../../context/peminjaman/PeminjamanContext";
import { createPeminjaman } from "../../../services/peminjamanService";
import { useNavigate } from "react-router-dom";

export const TambahPeminjaman = () => {
  const navigate = useNavigate();
  const { bukuList } = useContext(BukuContext);
  const { AnggotaList, fetchDataJoin, fetchPeminjaman } =
    useContext(PeminjamanContext);

  const [formData, setFormData] = useState({
    anggotaId: "",
    bukuId: "",
    tgl_pinjam: "",
    tgl_kembali: "",
  });

  const handleChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPeminjaman(formData);
      fetchPeminjaman();
      setFormData({
        anggotaId: "",
        bukuId: "",
        tgl_pinjam: "",
        tgl_kembali: "",
      });
    } catch (error) {
      alert("Gagal menambahkan peminjaman");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block">Nama Anggota:</label>
        <select
          name="anggotaId"
          value={formData.anggotaId}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
          required
        >
          <option value="">-- Pilih Anggota --</option>
          {AnggotaList.map((anggota) => (
            <option key={anggota.id} value={anggota.id}>
              {anggota.nama_siswa}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block">Judul Buku:</label>
        <select
          name="bukuId"
          value={formData.bukuId}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
          required
        >
          <option value="">-- Pilih Buku --</option>
          {bukuList
            .filter((buku) => buku.stok > 0)
            .map((buku) => (
              <option key={buku.id} value={buku.id}>
                {buku.judul_buku}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block">Tanggal Pinjam:</label>
        <input
          type="date"
          name="tgl_pinjam"
          value={formData.tgl_pinjam}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>

      <div>
        <label className="block">Tanggal Kembali:</label>
        <input
          type="date"
          name="tgl_kembali"
          value={formData.tgl_kembali}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Tambah Peminjaman
      </button>
    </form>
  );
};
