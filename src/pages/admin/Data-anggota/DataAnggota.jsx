/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useContext, useState } from "react";
import { useColumns } from "./ColumnsAnggota";
import { TableCustom } from "../../../components/table/TableCustom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AnggotaContext } from "../../../context/anggota/AnggotaContext";
import { Button } from "@mui/material";
import { ModalFormAnggota } from "./ModalFromAnggota";
import { ModalEditAnggotaAdmin } from "./ModalEditAnggota";

export const DataAnggota = () => {
  const { anggotaList, fetchAnggota, message, loading } =
    useContext(AnggotaContext);
  const navigate = useNavigate();
  const [openModalTambah, setOpenModalTambah] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleEdit = (id) => {
    const anggota = anggotaList.find((item) => item.id === id);
    setEditData(anggota);
    setOpenModalEdit(true);
  };
  const handleTambah = () => {
    setOpenModalTambah(true);
  };
  const handleOpenConfirm = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      await handleDeleteAdmin(deleteId); // pastikan ini dari context/service-mu
      setSnackbar({
        open: true,
        message: "Admin berhasil dihapus",
        severity: "success",
      });
      fetchAnggota(); // refresh data setelah hapus
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan saat menghapus admin";
      setSnackbar({
        open: true,
        message: "Gagal menghapus admin: " + msg,
        severity: "error",
      });
    } finally {
      handleCloseConfirm();
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const columns = useColumns(handleEdit, handleOpenConfirm);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen Admin</h1>
        <Button variant="contained" color="primary" onClick={handleTambah}>
          Tambah Anggota
        </Button>
      </div>
      <TableCustom data={anggotaList} columns={columns} />
      {openModalTambah && (
        <ModalFormAnggota
          onClose={() => {
            setOpenModalTambah(false);
            setEditData(null);
            fetchAnggota();
          }}
        />
      )}
      {openModalEdit && (
        <ModalEditAnggotaAdmin
          onClose={() => {
            setOpenModalEdit(false);
            setEditData(null);
            fetchAnggota();
          }}
          existingData={editData}
        />
      )}
    </div>
  );
};
