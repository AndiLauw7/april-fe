import React from "react";
import { useMemo } from "react";
import { ConvertTanggal } from "../../../utils/convert-tgl/ConvertTgl";
import { FormatRupiah } from "../../../utils/format-rupiah/FormatRupiah";

export const useColumns = (handleEdit, handleKembalikan) => {
  const columns = useMemo(
    () => [
      {
        header: "Aksi",
        size: 5,
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className={`px-2 py-1 rounded ${
                row.original.status === "dikembalikan"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white"
              }`}
              onClick={() => handleEdit(row.original.id)}
            >
              Edit
            </button>
            {row.original.status === "dipinjam" && (
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => handleKembalikan(row.original.id)}
              >
                Kembalikan
              </button>
            )}
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
        accessorKey: "Anggotum.nama_siswa",
        header: "Nama Siswa",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "buku.judul_buku",
        header: "Buku",
        grow: true,
        size: 10,
      },
      {
        header: "Tanggal Pinjam",
        grow: true,
        size: 10,
        accessorFn: (row) => ConvertTanggal(row.tgl_pinjam),
      },
      {
        header: "Tanggal Kembali",
        grow: true,
        size: 10,
        accessorFn: (row) => ConvertTanggal(row.tgl_kembali),
      },
      {
        accessorKey: "status",
        header: "Status",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "denda",
        header: "Denda",
        grow: true,
        size: 10,
        accessorFn: (row) => FormatRupiah(row.denda),
      },
    ],
    [handleEdit, handleKembalikan]
  );
  return columns;
};
