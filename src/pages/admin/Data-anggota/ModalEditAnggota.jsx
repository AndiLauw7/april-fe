import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AnggotaContext } from "../../../context/anggota/AnggotaContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const ModalEditAnggotaAdmin = ({
  onClose,
  existingData,
  refreshData,
}) => {
  const { editAnggota, loading, message, setMessage, fetchAnggota } =
    useContext(AnggotaContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Ambil data anggota khusus untuk edit email (password kosong biarkan)
  useEffect(() => {
    if (existingData) {
      setFormData({
        email: existingData.email || "",
        password: "",
      });
      setMessage("");
    }
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      // Validasi minimal 1 field harus diisi
      if (!formData.email && !formData.password) {
        setMessage("Harap isi email atau password minimal satu");
        return;
      }

      await editAnggota(existingData.id, formData);
      setMessage("Data anggota berhasil diubah");
      refreshData?.();
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
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" mb={2}>
          Edit Anggota (Admin)
        </Typography>

        {message && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Isi jika ingin ubah email"
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Isi jika ingin ubah password"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </Box>
    </Modal>
  );
};
