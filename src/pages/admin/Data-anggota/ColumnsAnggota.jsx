import React from "react";
import { useMemo } from "react";
import { ConvertTanggal } from "../../../utils/convert-tgl/ConvertTgl";

export const useColumns = (handleEdit) => {
  const columns = useMemo(
    () => [
      {
        header: "Aksi",
        size: 5,
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="px-2 py-1 rounded bg-yellow-500 text-white"
              onClick={() => handleEdit(row.original.id)}
            >
              Edit
            </button>
            {/* <button
              className="px-2 py-1 rounded bg-red-500 text-white"
              onClick={() => handleOpenConfirm(row.original.id)}
            >
              Delete
            </button> */}
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
        accessorKey: "nis",
        header: "NIS",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "nama_siswa",
        header: "Nama Siswa",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "kelas",
        header: "Kelas",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "jenis_kelamin",
        header: "Jenis Kelamin",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "email",
        header: "email",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "nohp",
        header: "No Hp",
        grow: true,
        size: 10,
      },
    ],
    [handleEdit]
  );
  return columns;
};
