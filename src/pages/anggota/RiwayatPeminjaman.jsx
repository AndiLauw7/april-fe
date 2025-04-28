import React, { useContext, useEffect } from "react";
import { PeminjamanContext } from "../../context/peminjaman/PeminjamanContext";
import { AuthContext } from "../../context/auth-context/AuthContext";
import { ConvertTanggal } from "../../utils/convert-tgl/ConvertTgl";
import { BukuContext } from "../../context/buku/BukuContext";

const RiwayatPeminjaman = () => {
  const {
    fetchRiwayatPeminjamanAnggota,
    riwayatPeminjaman,
    bukuList,
    loading,
  } = useContext(PeminjamanContext);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user?.id) {
      fetchRiwayatPeminjamanAnggota(user?.id);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (riwayatPeminjaman.length === 0) {
    return (
      <div className="text-center py-10">Belum ada riwayat peminjaman.</div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {riwayatPeminjaman.map((item) => {
        const buku = bukuList.find((b) => b.id === item.bukuId) || {};
        return (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {buku.judul_buku}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  📚 Penulis: {buku.pengarang}
                </p>
                <p className="text-sm text-gray-600">
                  🏷️ Kategori: {buku.kategori}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  Tanggal Pinjam:
                  {ConvertTanggal(item.tgl_pinjam)}
                </p>
                <p className="text-xs text-gray-500">
                  Status: <span className="font-bold">{item.status}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RiwayatPeminjaman;
