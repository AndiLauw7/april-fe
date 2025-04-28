import React, { useContext } from "react";

const DashboardAnggota = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Pinjaman
          </h3>
          <p className="text-2xl font-bold text-blue-600">5 Buku</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Jatuh Tempo</h3>
          <p className="text-2xl font-bold text-yellow-500">2 Buku</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Status Akun</h3>
          <p className="text-2xl font-bold text-green-500">Aktif</p>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Informasi Terbaru
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Perpanjangan buku bisa dilakukan maksimal 2x.</li>
          <li>Pastikan pengembalian tepat waktu agar tidak kena denda.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardAnggota;
