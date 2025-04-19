/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useContext } from "react";
import { PeminjamanContext } from "../../../context/peminjaman/PeminjamanContext";
import { useColumns } from "./ColumnsPeminjam";
import { TableCustom } from "../../../components/table/TableCustom";
import React from "react";
import { useNavigate } from "react-router-dom";

export const PeminjamanData = () => {
  const {
    peminjamanList,
    tambahPeminjaman,
    updatePeminjaman,
    message,
    loading,
  } = useContext(PeminjamanContext);
  const handleEdit = () => {};
  const handleKembalikan = async (id) => {
    await updatePeminjaman(id, { status: "dikembalikan" });
  };
  const navigate = useNavigate();
  const handleTambah = () => {
    navigate("/admin/create/peminjam");
  };
  const columns = useColumns(handleEdit, handleKembalikan);

  return (
    <div>
      <TableCustom
        data={peminjamanList}
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
