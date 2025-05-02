import React, { useContext, useEffect } from "react";
import { PeminjamanContext } from "../../context/peminjaman/PeminjamanContext";
import { AuthContext } from "../../context/auth-context/AuthContext";

const DashboardAnggota = () => {
  const { user } = useContext(AuthContext);
  const {
    peminjamanList,
    riwayatPeminjaman,
    fetchRiwayatPeminjamanAnggota,
    loading,
  } = useContext(PeminjamanContext);

  useEffect(() => {
    if (user?.id) {
      fetchRiwayatPeminjamanAnggota(user?.id);
    }
  }, [user?.id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Buku Yang Di Pinjam
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {riwayatPeminjaman.length} Buku
          </p>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">
            Status Peminjaman
          </h3>
          <p className="text-2xl font-bold text-green-500">
            {peminjamanList.length > 0
              ? peminjamanList.find(
                  (peminjaman) => peminjaman.status === "dikembalikan"
                )?.denda
              : "Belum Ada Peminjaman"}
          </p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Jatuh Tempo</h3>
          <p className="text-2xl font-bold text-yellow-500">2 Buku</p>
        </div> */}
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Informasi Terbaru
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>
            Perpanjangan buku bisa dilakukan setelah melakukan pengembalian.
          </li>
          <li>Pastikan pengembalian tepat waktu agar tidak kena denda.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardAnggota;
