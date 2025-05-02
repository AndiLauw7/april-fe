import React from "react";
import { DataBuku } from "./DataBuku";
import { BukuProvider } from "../../../context/buku/BukuContext";

export const BukuPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Buku </h1>
      <DataBuku />
    </div>
  );
};
