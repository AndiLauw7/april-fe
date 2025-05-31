import React, { useContext, useEffect } from "react";
import { PeminjamanContext } from "../../context/peminjaman/PeminjamanContext";
import { AuthContext } from "../../context/auth-context/AuthContext";
import { BookOpen, AlertCircle, CalendarCheck } from "lucide-react";

const DashboardAnggota = () => {
  const { user } = useContext(AuthContext);
  const { riwayatPeminjaman, fetchRiwayatPeminjamanAnggota, loading } =
    useContext(PeminjamanContext);

  useEffect(() => {
    if (user?.id) {
      fetchRiwayatPeminjamanAnggota(user?.id);
    }
  }, [user?.id]);

  const totalPeminjaman = riwayatPeminjaman?.length || 0;
  const totalDenda = riwayatPeminjaman?.reduce(
    (acc, curr) => acc + (curr.denda || 0),
    0
  );

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-blue-700">Dashboard Anggota</h2>
        <p className="text-sm text-gray-600">Selamat datang, {user?.nama}!</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl shadow flex items-center gap-4">
          <BookOpen className="text-blue-500" />
          <div>
            <h4 className="text-sm text-gray-600">Total Peminjaman</h4>
            <p className="text-xl font-semibold text-blue-700">
              {totalPeminjaman}
            </p>
          </div>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl shadow flex items-center gap-4">
          <AlertCircle className="text-red-500" />
          <div>
            <h4 className="text-sm text-gray-600">Total Denda</h4>
            <p className="text-xl font-semibold text-red-600">
              Rp {totalDenda}
            </p>
          </div>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl shadow flex items-center gap-4">
          <CalendarCheck className="text-green-500" />
          <div>
            <h4 className="text-sm text-gray-600">Status Terakhir</h4>
            <p className="text-sm text-gray-700">
              {riwayatPeminjaman[0]?.status || "Belum ada"}
            </p>
          </div>
        </div>
      </div>

      {/* Informasi Box */}
      <div className="bg-white p-5 shadow rounded-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          📢 Informasi Penting
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>
            📚 Perpanjangan buku bisa dilakukan setelah pengembalian buku.
          </li>
          <li>⏳ Pastikan pengembalian tepat waktu untuk menghindari denda.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardAnggota;
