/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { BukuContext } from "../../context/buku/BukuContext";
import LaskarPelangi from "../../assets/laskarpelangi.webp";
const DaftarBukuAnggota = () => {
  const { bukuList, loading } = useContext(BukuContext);
  const [searchItem, setSearchItem] = useState("");
  const filterBuku = bukuList.filter((buku) => {
    const lowerSearch = searchItem.toLowerCase();
    return (
      buku.judul_buku.toLowerCase().includes(lowerSearch) ||
      buku.pengarang.toLowerCase().includes(lowerSearch)
    );
  });
  return (
    <div className="max-w-10xl mx-auto px-2 py-2">
      <h2 className="text-lg font-bold text-blue-700 mb-2 text-center">
        Daftar Buku
      </h2>
      <div className="mb-2 flex justify-center">
        <input
          type="text"
          placeholder="Cari buku berdasarkan judul atau kategori..."
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
      {loading ? (
        <p className="text-center">Loading buku...</p>
      ) : filterBuku.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterBuku.map((buku) => (
            <div
              key={buku.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  {buku.judul_buku.length > 25
                    ? buku.judul_buku.slice(0, 25) + "...."
                    : buku.judul_buku}
                </h3>
                <p className="text-sm text-gray-600">
                  📚 Penulis: {buku.pengarang}
                </p>
                <p className="text-sm text-gray-600">
                  🏷️ Kategori: {buku.kategori}
                </p>
                <p className="text-sm text-gray-600">
                  📅 Tahun Terbit: {buku.tahun_terbit}
                </p>
                <p className="text-sm text-gray-600">📅 Stok : {buku.stok}</p>

                <img
                  src={LaskarPelangi}
                  alt={buku.judul_buku}
                  className="w-full h-full object-cover mt-2 rounded-sm"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Buku tidak ditemukan</p>
      )}
    </div>
  );
};
export default DaftarBukuAnggota;
