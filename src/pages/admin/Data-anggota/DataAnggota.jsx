/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useContext } from "react";
import { useColumns } from "./ColumnsAnggota";
import { TableCustom } from "../../../components/table/TableCustom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AnggotaContext } from "../../../context/anggota/AnggotaContext";

export const DataAnggota = () => {
  const { anggotaList, message, loading } = useContext(AnggotaContext);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/edit/anggota/${id}`);
  };

  const handleTambah = () => {
    navigate("/admin/tambah/anggota");
  };

  const columns = useColumns(handleEdit);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Peminjam</h1>

      <TableCustom
        data={anggotaList}
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
