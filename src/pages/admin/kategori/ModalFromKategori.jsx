// components/modal/ModalFormBuku.jsx
import React, { useContext, useEffect, useState } from "react";
import { getBukuById } from "../../../services/bukuService";
import { BukuContext } from "../../../context/buku/BukuContext";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { KategoriContext } from "../../../context/kategori/KategoriContext";
import { getKategoriById } from "../../../services/kategoriService";

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

export const ModalFromKategori = ({ onClose, editId = null }) => {
  const { tambahKategori, updateDataKategori, message } =
    useContext(KategoriContext);
  const [form, setForm] = useState({
    nama_kategori: "",
  });

  useEffect(() => {
    if (editId) {
      getKategoriById(editId).then((res) => {
        setForm(res.data.data);
      });
    } else {
      setForm({
        nama_kategori: "",
      });
    }
  }, [editId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateDataKategori(editId, form);
    } else {
      await tambahKategori(form);
    }
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
          aria-label="close"
          size="large"
        >
          <CloseIcon />
        </IconButton>

        <Typography id="modal-title" variant="h6" component="h2" mb={2}>
          {editId ? "Edit Buku" : "Tambah Buku"}
        </Typography>

        {message && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {[
          {
            name: "nama_kategori",
            label: "Nama Kategori",
            required: true,
            type: "text",
          },
        ].map(({ name, label, required, type }) => (
          <TextField
            key={name}
            fullWidth
            margin="normal"
            label={label}
            name={name}
            type={type}
            value={form[name] || ""}
            onChange={handleChange}
            required={required}
            variant="outlined"
          />
        ))}

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
