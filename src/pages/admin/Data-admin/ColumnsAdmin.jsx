import React from "react";
import { useMemo } from "react";
import { ConvertTanggal } from "../../../utils/convert-tgl/ConvertTgl";

export const useColumns = (handleEdit, handleTambah) => {
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
        accessorKey: "nama",
        header: "Nama Admin ",
        grow: true,
        size: 10,
      },

      {
        accessorKey: "email",
        header: "email",
        grow: true,
        size: 10,
      },
    ],
    [handleEdit, handleTambah]
  );
  return columns;
};
