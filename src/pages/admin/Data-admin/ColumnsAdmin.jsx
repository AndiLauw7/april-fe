import { useContext, useMemo } from "react";
import { AdminContextKelola } from "../../../context/admin/AdminContextKelola";

export const useColumns = (handleEdit, handleOpenConfirm) => {
  const { adminData } = useContext(AdminContextKelola);
  const columns = useMemo(
    () => [
      {
        header: "Aksi",
        size: 5,
        Cell: ({ row }) => {
          const admin = row.original;
          return (
            <div className="flex gap-2">
              <button
                className="px-2 py-1 rounded bg-yellow-500 text-white"
                onClick={() => handleEdit(row.original.id)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 rounded bg-red-500 text-white"
                onClick={() => handleOpenConfirm(admin.id)}
                disabled={admin.id === adminData?.id}
                title={
                  admin.id === adminData?.id
                    ? "Tidak bisa menghapus akun sendiri"
                    : ""
                }
              >
                Delete
              </button>
            </div>
          );
        },
      },
      {
        header: "No",
        Cell: (info) => info.row.index + 1,
        size: 10,
      },
      {
        accessorKey: "nama",
        header: "Nama Admin",
        size: 10,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 10,
      },
    ],
    [handleEdit, handleOpenConfirm]
  );
  return columns;
};
