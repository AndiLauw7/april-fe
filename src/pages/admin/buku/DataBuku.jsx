import React, { useContext, useState } from "react";
import { BukuContext } from "../../../context/buku/BukuContext";
import { useColumns } from "./ColumnsBuku";
import { TableCustom } from "../../../components/table/TableCustom";
import { ModalFromBuku } from "./ModalFromBuku";
import { Button } from "@mui/material";
export const DataBuku = () => {
  const { bukuList, hapusBuku, message } = useContext(BukuContext);
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
    hapusBuku(id);
  };

  const columns = useColumns(handleEdit, handleDelete);

  return (
    <div>
      {modalOpen && (
        <ModalFromBuku editId={editId} onClose={() => setModalOpen(false)} />
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen Buku</h1>
        <Button variant="contained" color="primary" onClick={handleTambah}>
          Tambah bUKU
        </Button>
      </div>
      <TableCustom data={bukuList} columns={columns} />
    </div>
  );
};
