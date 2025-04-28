// src/pages/anggota/ProfilAnggota.jsx
import React from "react";
import dasboardDepan from "../../assets/backgroud-depan.webp";
const ProfilAnggota = () => {
  const user = {
    nama: "Andi Lauw",
    email: "andi@example.com",
    noHp: "081234567890",
    alamat: "Jl. Buku No. 123",
    tanggalBergabung: "2024-03-01",
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Profil Anggota</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2">
        <div className="mb-4">
          <p className="text-gray-600">Nama Lengkap</p>
          <p className="font-semibold">{user.nama}</p>
          <p className="text-gray-600">Nomor Induk</p>
          <p className="font-semibold">1234567</p>
          <p className="text-gray-600">Kelas</p>
          <p className="font-semibold">12 A</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">Email</p>
          <p className="font-semibold">{user.email}</p>
          <p className="text-gray-600">No HP</p>
          <p className="font-semibold">{user.noHp}</p>
          <p className="text-gray-600">Alamat</p>
          <p className="font-semibold">{user.alamat}</p>
          <p className="text-gray-600">Tanggal Bergabung</p>
          <p className="font-semibold">{user.tanggalBergabung}</p>
        </div>

        <div className="mb-4">
          <img
            src={dasboardDepan}
            alt="Image"
            className="w-40 h-40 rounded-full object-cover px-2 py-10"
          />
        </div>
      </div>

      <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Edit Profil
        </button>
      </div>
    </div>
  );
};

export default ProfilAnggota;
