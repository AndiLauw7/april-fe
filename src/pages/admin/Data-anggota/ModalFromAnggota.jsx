import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  adminAddAnggota,
  //   adminUpdateAnggota,
  //   adminGetAnggotaById,
} from "../../../services/adminService";
import { AnggotaContext } from "../../../context/anggota/AnggotaContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

export const ModalFormAnggota = ({ onClose, editId = null, refreshData }) => {
  const { fetchAnggota, editAnggota, loading, message, setMessage } =
    useContext(AnggotaContext);
  const [formData, setFormData] = useState({
    nis: "",
    nama_siswa: "",
    kelas: "",
    jenis_kelamin: "",
    tgl_lahir: "",
    email: "",
    nohp: "",
    password: "",
  });

  // Ambil data jika sedang edit
  useEffect(() => {
    const fetchData = async () => {
      if (editId) {
        try {
          const data = await fetchAnggota(editId);
          setFormData({ ...data, password: "" });
        } catch (error) {
          setMessage("Gagal mengambil data anggota");
        }
      }
    };
    fetchData();
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      if (editId) {
        await editAnggota(editId, formData);
        setMessage("Data anggota berhasil diubah");
      } else {
        await adminAddAnggota(formData, token);
        setMessage("Data anggota berhasil ditambahkan");
      }
      refreshData?.(); // refresh daftar anggota di parent
      onClose();
    } catch (error) {
      setMessage(error?.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" mb={2}>
          {editId ? "Edit Anggota" : "Tambah Anggota"}
        </Typography>

        {message && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {/* Fields */}
        <TextField
          label="NIS"
          name="nis"
          value={formData.nis}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Nama Siswa"
          name="nama_siswa"
          value={formData.nama_siswa}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Kelas"
          name="kelas"
          value={formData.kelas}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Jenis Kelamin"
          name="jenis_kelamin"
          value={formData.jenis_kelamin}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="L">Laki-laki</MenuItem>
          <MenuItem value="P">Perempuan</MenuItem>
        </TextField>
        <TextField
          label="Tanggal Lahir"
          name="tgl_lahir"
          type="date"
          value={formData.tgl_lahir}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="No HP"
          name="nohp"
          value={formData.nohp}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {!editId && (
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Simpan
        </Button>
      </Box>
    </Modal>
  );
};
