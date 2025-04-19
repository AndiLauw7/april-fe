import React from "react";
import { DataBuku } from "./DataBuku";
import { BukuProvider } from "../../../context/buku/BukuContext";

export const BukuPage = () => {
  return (
    <div>
      <DataBuku />
    </div>
  );
};
