import { useMemo } from "react";

export const useColumns = (handleEdit, handleDelete) => {
  const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

  const columns = useMemo(
    () => [
      {
        header: "Aksi",
        size: 5,
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => handleEdit(row.original.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(row.original.id)}
            >
              Hapus
            </button>
          </div>
        ),
      },
      {
        header: "No",
        Cell: (info) => info.row.index + 1,
        grow: true,
        size: 10,
      },
      {
        accessorKey: "judul_buku",
        header: "Judul Buku",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "pengarang",
        header: "Pengarang",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "tahun_terbit",
        header: "Tahun Terbit",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "kategori.nama_kategori",
        header: "Kategori",
        grow: true,
        size: 10,
      },

      {
        accessorKey: "stok",
        header: "Stok",
        grow: true,
        size: 10,
      },
      {
        header: "Gambar",
        size: 10,
        Cell: ({ row }) => {
          const imageName = row.original.image;
          const imageUrl = imageName ? `${baseImageUrl}/${imageName}` : null;

          return imageUrl ? (
            <img
              src={imageUrl}
              alt="cover"
              className="w-16 h-20 object-cover rounded"
            />
          ) : (
            <span className="text-gray-400 italic">Tidak ada</span>
          );
        },
      },
    ],
    [handleEdit, handleDelete]
  );
  return columns;
};
