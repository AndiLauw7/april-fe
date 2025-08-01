import React, { useContext, useState } from "react";
import { BukuContext } from "../../context/buku/BukuContext";
import LaskarPelangi from "../../assets/laskarpelangi.webp";
import {
  Search,
  BookOpen,
  User,
  Tag,
  CalendarDays,
  Layers,
} from "lucide-react";

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
const baseImageUrl = import.meta.env.VITE_IMAGE_URL;
return (
  <div className="max-w-7xl mx-auto px-4 py-6">
    <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center flex items-center justify-center gap-2">
      <BookOpen className="w-6 h-6" />
      Daftar Buku
    </h2>

    <div className="mb-6 flex justify-center">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Cari berdasarkan judul atau pengarang..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
    </div>

    {loading ? (
      <p className="text-center">Loading buku...</p>
    ) : filterBuku.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filterBuku.map((buku) => (
          <div
            key={buku.id}
            className="bg-white shadow-sm hover:shadow-lg rounded-2xl overflow-hidden transition-shadow duration-300"
          >
            {/* <img
              src={LaskarPelangi}
              alt={buku.judul_buku}
              className="w-full h-48 object-cover"
            /> */}
            <img
              src={
                buku.image ? `${baseImageUrl}/${buku.image}` : LaskarPelangi // fallback jika image null
              }
              alt={buku.judul_buku}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {buku.judul_buku}
              </h3>

              <div className="text-sm text-gray-600 flex items-center gap-2">
                <User className="w-4 h-4" /> {buku.pengarang}
              </div>

              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Tag className="w-4 h-4" /> {buku.kategori?.nama_kategori}
              </div>

              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="flex items-center gap-1 text-gray-600">
                  <CalendarDays className="w-4 h-4" />
                  {buku.tahun_terbit}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Stok: {buku.stok}
                </span>
              </div>
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
