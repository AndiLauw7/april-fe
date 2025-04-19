import React, { useContext } from "react";
import { TableCustom } from "../../../components/table/TableCustom";
import { BukuContext } from "../../../context/buku/BukuContext";
import { useColumns } from "./ColumnsBuku";
import { useNavigate } from "react-router-dom";
export const DataBuku = () => {
  const { bukuList, tambahBuku, hapusBuku, message } = useContext(BukuContext);
  const navigate = useNavigate();
  const handleTambah = () => {
    navigate("/admin/tambah/buku");
  };

  const handleDelete = (id) => {
    hapusBuku(id);
    navigate("/admin/buku");
  };
  const handleEdit = (id) => {
    navigate(`/admin/update/buku/${id}`);
  };
  const columns = useColumns(handleEdit, handleDelete);

  return (
    <div>
      <TableCustom
        data={bukuList}
        columns={columns}
        renderTopToolbarCustomActions={() => {
          return (
            <div className="flex">
              <button
                className="bg-blue-200 text-gray-600 px-2 pb-1 rounded font-bold text-2xl"
                onClick={handleTambah}
              >
                +
              </button>
              {message && (
                <div className="px-2 bg-blue-100 border border-blue-300 semibold text-2xl rounded">
                  {message}
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
