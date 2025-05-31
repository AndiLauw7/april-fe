import { useContext, useEffect, useState } from "react";
import { AdminContextKelola } from "../../../context/admin/AdminContextKelola";
import { useColumns } from "./ColumnsAdmin";
import { useNavigate } from "react-router-dom";
import { TableCustom } from "../../../components/table/TableCustom";
import { ModalFormAdmin } from "./ModalFromAdmin";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
const DataAllAdmin = () => {
  const { dataAllAdmin, handleGetAllAdmin, handleDeleteAdmin } =
    useContext(AdminContextKelola);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    handleGetAllAdmin();
  }, []);

  const handleTambah = () => {
    setEditId(null);
    setEditData(null);
    setOpenModal(true);
  };

  const handleEdit = (id) => {
    const admin = dataAllAdmin.find((item) => item.id === id);
    setEditId(id);
    setEditData(admin);
    setOpenModal(true);
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
      handleGetAllAdmin(); // refresh data setelah hapus
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
          Tambah Admin
        </Button>
      </div>
      <TableCustom data={dataAllAdmin} columns={columns} />
      {openModal && (
        <ModalFormAdmin
          onClose={() => {
            setOpenModal(false);
            setEditId(null);
            setEditData(null);
            handleGetAllAdmin();
          }}
          editId={editId}
          existingData={editData}
        />
      )}
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Apakah Anda yakin ingin menghapus admin ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Batal
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DataAllAdmin;
