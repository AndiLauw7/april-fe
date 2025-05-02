// src/pages/anggota/ProfilAnggota.jsx
import React, { useContext, useEffect } from "react";
import dasboardDepan from "../../assets/backgroud-depan.webp";
import { AuthContext } from "../../context/auth-context/AuthContext";
const ProfilAnggota = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Profil Anggota</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2">
        <div className="mb-4">
          <p className="text-gray-600">Nama Lengkap</p>
          <p className="font-semibold">{user.nama_siswa}</p>
          <p className="text-gray-600">Nomor Induk Siswa</p>
          <p className="font-semibold">{user.nis}</p>
          <p className="text-gray-600">Kelas</p>
          <p className="font-semibold">{user.kelas}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">Email</p>
          <p className="font-semibold">{user.email}</p>
          <p className="text-gray-600">No HP</p>
          <p className="font-semibold">{user.nohp}</p>
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
