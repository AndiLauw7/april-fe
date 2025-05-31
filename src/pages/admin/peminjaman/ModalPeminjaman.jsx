import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { BukuContext } from "../../../context/buku/BukuContext";
import { PeminjamanContext } from "../../../context/peminjaman/PeminjamanContext";
import { createPeminjaman } from "../../../services/peminjamanService";

const ModalPeminjamanan = ({ open, onClose, mode, editData }) => {
  const { bukuList } = useContext(BukuContext);
  const { AnggotaList, fetchPeminjaman, updateAllDataPeminjam } =
    useContext(PeminjamanContext);

  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    anggotaId: "",
    bukuId: "",
    tgl_pinjam: "",
    tgl_kembali: "",
    status: "dipinjam",
  });

  useEffect(() => {
    if (isEdit && editData) {
      setFormData({
        anggotaId: editData.anggotaId || "",
        bukuId: editData.bukuId || "",
        tgl_pinjam: editData.tgl_pinjam?.slice(0, 10) || "",
        tgl_kembali: editData.tgl_kembali?.slice(0, 10) || "",
        status: editData.status || "dipinjam",
      });
    } else {
      setFormData({
        anggotaId: "",
        bukuId: "",
        tgl_pinjam: "",
        tgl_kembali: "",
      });
    }
  }, [open, mode, editData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateAllDataPeminjam(editData.id, formData);
      } else {
        await createPeminjaman(formData);
      }
      fetchPeminjaman();
      onClose();
    } catch (err) {
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {isEdit ? "Edit Peminjaman" : "Tambah Peminjaman"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className="space-y-4">
          {/* <TextField
            select
            label="Nama Anggota"
            name="anggotaId"
            fullWidth
            required
            value={formData.anggotaId}
            onChange={handleChange}
          >
            {AnggotaList.map((siswa) => (
              <MenuItem key={siswa.id} value={siswa.id}>
                {siswa.nama_siswa}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Judul Buku"
            name="bukuId"
            fullWidth
            required
            value={formData.bukuId}
            onChange={handleChange}
          >
            {bukuList
              .filter((b) => b.stok > 0 || isEdit) // agar buku yg sudah dipinjam tetap tampil saat edit
              .map((buku) => (
                <MenuItem key={buku.id} value={buku.id}>
                  {buku.judul_buku}
                </MenuItem>
              ))}
          </TextField> */}
          <Autocomplete
            options={AnggotaList}
            getOptionLabel={(option) => option.nama_siswa || ""}
            value={AnggotaList.find((a) => a.id === formData.anggotaId) || null}
            onChange={(_, newValue) => {
              setFormData((prev) => ({
                ...prev,
                anggotaId: newValue ? newValue.id : "",
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Nama Anggota" required fullWidth />
            )}
          />

          <Autocomplete
            options={bukuList.filter((b) => b.stok > 0 || isEdit)}
            getOptionLabel={(option) => option.judul_buku || ""}
            value={bukuList.find((b) => b.id === formData.bukuId) || null}
            onChange={(_, newValue) => {
              setFormData((prev) => ({
                ...prev,
                bukuId: newValue ? newValue.id : "",
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Judul Buku" required fullWidth />
            )}
          />

          <TextField
            type="date"
            name="tgl_pinjam"
            label="Tanggal Pinjam"
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            value={formData.tgl_pinjam}
            onChange={handleChange}
          />

          <TextField
            type="date"
            name="tgl_kembali"
            label="Tanggal Kembali"
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            value={formData.tgl_kembali}
            onChange={handleChange}
          />

          {isEdit && (
            <TextField
              select
              label="Status"
              name="status"
              fullWidth
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="dipinjam">Dipinjam</MenuItem>
              <MenuItem value="dikembalikan">Dikembalikan</MenuItem>
            </TextField>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained" color="primary">
            {isEdit ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalPeminjamanan;
