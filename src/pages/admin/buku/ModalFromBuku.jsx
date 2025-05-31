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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

export const ModalFromBuku = ({ onClose, editId = null }) => {
  const { tambahBuku, updateDataBuku, message } = useContext(BukuContext);
  const [form, setForm] = useState({
    judul_buku: "",
    pengarang: "",
    tahun_terbit: "",
    penerbit: "",
    kategori: "",
    stok: "",
  });

  useEffect(() => {
    if (editId) {
      getBukuById(editId).then((res) => {
        setForm(res.data.buku);
      });
    } else {
      setForm({
        judul_buku: "",
        pengarang: "",
        tahun_terbit: "",
        penerbit: "",
        kategori: "",
        stok: "",
      });
    }
  }, [editId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateDataBuku(editId, form);
    } else {
      await tambahBuku(form);
      onClose();
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
            name: "judul_buku",
            label: "Judul Buku",
            required: true,
            type: "text",
          },
          {
            name: "pengarang",
            label: "Pengarang",
            required: true,
            type: "text",
          },
          {
            name: "tahun_terbit",
            label: "Tahun Terbit",
            required: true,
            type: "number",
          },
          {
            name: "penerbit",
            label: "Penerbit",
            required: false,
            type: "text",
          },
          {
            name: "kategori",
            label: "Kategori",
            required: false,
            type: "text",
          },
          { name: "stok", label: "Stok", required: false, type: "number" },
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

// export const ModalFromBuku = ({ onClose, editId = null }) => {
//   const { tambahBuku, updateBuku, message } = useContext(BukuContext);
//   const [form, setForm] = useState({
//     judul_buku: "",
//     pengarang: "",
//     tahun_terbit: "",
//     penerbit: "",
//     kategori: "",
//     stok: "",
//   });

//   useEffect(() => {
//     if (editId) {
//       getBukuById(editId).then((res) => {
//         setForm(res.data.buku);
//       });
//     }
//   }, [editId]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editId) {
//       await updateBuku(editId, form);
//     } else {
//       await tambahBuku(form);
//     }
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded w-[100%] max-w-xl relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-3 text-xl font-bold text-gray-500"
//         >
//           ×
//         </button>
//         <h2 className="text-xl font-bold mb-4">
//           {editId ? "Edit Buku" : "Tambah Buku"}
//         </h2>
//         {message && (
//           <div className="mb-4 p-2 bg-blue-100 border border-blue-300 rounded">
//             {message}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {[
//             "judul_buku",
//             "pengarang",
//             "tahun_terbit",
//             "penerbit",
//             "kategori",
//             "stok",
//           ].map((field) => (
//             <div key={field}>
//               <label className="capitalize">{field.replace("_", " ")}:</label>
//               <input
//                 type={field === "tahun_terbit" ? "number" : "text"}
//                 name={field}
//                 value={form[field] || ""}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded p-2 w-full"
//                 required={["judul_buku", "pengarang", "tahun_terbit"].includes(
//                   field
//                 )}
//               />
//             </div>
//           ))}
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Simpan
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
