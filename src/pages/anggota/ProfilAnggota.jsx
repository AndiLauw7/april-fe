// src/pages/anggota/ProfilAnggota.jsx
import React, { useContext, useEffect } from "react";
import dasboardDepan from "../../assets/backgroud-depan.webp";
import { AuthContext } from "../../context/auth-context/AuthContext";
const ProfilAnggota = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Profil Anggota
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Gambar Profil */}
          <div className="flex-shrink-0">
            <img
              src={dasboardDepan}
              alt="Profil"
              className="w-40 h-40 rounded-full object-cover ring-4 ring-blue-300 shadow-md"
            />
          </div>

          {/* Detail Profil */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 w-full">
            <div>
              <p className="text-gray-500 text-sm">Nama Lengkap</p>
              <p className="font-semibold">{user.nama_siswa}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Nomor Induk Siswa</p>
              <p className="font-semibold">{user.nis}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Kelas</p>
              <p className="font-semibold">{user.kelas}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">No HP</p>
              <p className="font-semibold">{user.nohp}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Alamat</p>
              <p className="font-semibold">{user.alamat}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tanggal Bergabung</p>
              <p className="font-semibold">{user.tanggalBergabung}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow">
            Edit Profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilAnggota;
