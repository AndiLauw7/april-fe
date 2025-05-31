// components/modal/ModalFormAdmin.jsx
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
import { AdminContextKelola } from "../../../context/admin/AdminContextKelola";

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

export const ModalFormAdmin = ({
  onClose,
  editId = null,
  existingData = {},
}) => {
  const { handleRegisterAdmin, handleUpdateAdmin, loading, error, message } =
    useContext(AdminContextKelola);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (editId && existingData) {
      setFormData({
        nama: existingData.nama || "",
        email: existingData.email || "",
        password: "",
      });
    }
  }, [editId, existingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await handleUpdateAdmin(editId, formData);
    } else {
      await handleRegisterAdmin(formData);
    }
    onClose(); // Tutup modal setelah submit
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
          {editId ? "Edit Admin" : "Tambah Admin"}
        </Typography>

        {message && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {["nama", "email", "password"].map((field) => (
          <TextField
            key={field}
            fullWidth
            margin="normal"
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            type={field === "password" ? "password" : "text"}
            value={formData[field]}
            onChange={handleChange}
            required
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
