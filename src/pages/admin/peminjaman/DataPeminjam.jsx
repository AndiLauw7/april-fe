/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from "react";
import { useContext } from "react";
import { PeminjamanContext } from "../../../context/peminjaman/PeminjamanContext";
import { useColumns } from "./ColumnsPeminjam";
import { TableCustom } from "../../../components/table/TableCustom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ModalPeminjamanan from "./ModalPeminjaman";

export const PeminjamanData = () => {
  const {
    peminjamanList,
    tambahPeminjaman,
    updatePeminjaman,
    message,
    loading,
  } = useContext(PeminjamanContext);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    const data = peminjamanList.find((item) => item.id === id);
    if (data) {
      setEditData(data);
      setOpenModal(true);
    }
    // navigate(`/admin/update/peminjam/${id}`);
  };
  const handleKembalikan = async (id) => {
    await updatePeminjaman(id, { status: "dikembalikan" });
  };
  const handleTambah = () => {
    setEditData(null);
    setOpenModal(true);
    // navigate("/admin/create/peminjam");
  };

  const columns = useColumns(handleEdit, handleKembalikan);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen Peminjaman</h1>
        <Button variant="contained" color="primary" onClick={handleTambah}>
          Tambah Peminjam
        </Button>
      </div>

      <TableCustom data={peminjamanList} columns={columns} />
      <ModalPeminjamanan
        open={openModal}
        onClose={() => setOpenModal(false)}
        mode={editData ? "edit" : "tambah"}
        editData={editData}
      />
    </div>
  );
};
