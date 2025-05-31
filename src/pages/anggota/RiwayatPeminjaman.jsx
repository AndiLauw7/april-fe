import React, { useContext, useEffect } from "react";
import { PeminjamanContext } from "../../context/peminjaman/PeminjamanContext";
import { AuthContext } from "../../context/auth-context/AuthContext";
import { ConvertTanggal } from "../../utils/convert-tgl/ConvertTgl";
import { BookOpen, CalendarDays, BadgeCheck, XCircle } from "lucide-react";

const RiwayatPeminjaman = () => {
  const { fetchRiwayatPeminjamanAnggota, riwayatPeminjaman, loading } =
    useContext(PeminjamanContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.id) {
      fetchRiwayatPeminjamanAnggota(user?.id);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-10 text-blue-600">Loading...</div>;
  }

  if (riwayatPeminjaman.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Belum ada riwayat peminjaman.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        📖 Riwayat Peminjaman Buku
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {riwayatPeminjaman.map((peminjaman, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-all p-5 flex flex-col justify-between border border-gray-100"
          >
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                {peminjaman.buku.judul_buku}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                📚 Penulis: {peminjaman.buku.pengarang}
              </p>
              <p className="text-sm text-gray-600">
                🏷️ Kategori: {peminjaman.buku.kategori}
              </p>
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                Tgl. Pinjam: {ConvertTanggal(peminjaman.tgl_pinjam)}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                Tgl. Kembali: {ConvertTanggal(peminjaman.tgl_kembali)}
              </p>
              <p
                className={`flex items-center gap-2 font-medium ${
                  peminjaman.status?.toLowerCase() === "dikembalikan"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                <BadgeCheck className="w-4 h-4" />
                Status: {peminjaman.status}
              </p>
              <p
                className={`flex items-center gap-2 font-medium ${
                  peminjaman.denda > 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                <XCircle className="w-4 h-4" />
                Denda:{" "}
                {peminjaman.denda > 0
                  ? `Rp ${peminjaman.denda.toLocaleString()}`
                  : "Tidak ada denda"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiwayatPeminjaman;
