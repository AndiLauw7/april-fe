import { useContext, useState } from "react";
import { KategoriContext } from "../../../context/kategori/KategoriContext";
import { Button } from "@mui/material";
import { TableCustom } from "../../../components/table/TableCustom";
import { useColumns } from "./ColumnsKategori";
import { ModalFromKategori } from "./ModalFromKategori";

export const DataKategori = () => {
  const { kategoriList } = useContext(KategoriContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleTambah = () => {
    setEditId(null); // tambah mode
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    setEditId(id);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    // hapusBuku(id);
  };
  const columns = useColumns(handleEdit, handleDelete);
  return (
    <div>
      {modalOpen && (
        <ModalFromKategori
          editId={editId}
          onClose={() => setModalOpen(false)}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen Kategori</h1>
        <Button variant="contained" color="primary" onClick={handleTambah}>
          Tambah Kategori
        </Button>
      </div>
      <TableCustom data={kategoriList} columns={columns} />
    </div>
  );
};
