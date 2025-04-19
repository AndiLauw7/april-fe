/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardAdmin from "./pages/admin/Dashboard.jsx";

import AnggotaPage from "./pages/admin/AnggotaPage.jsx";
import PeminjamPage from "./pages/admin/peminjaman/PeminjamPage.jsx";
import AdminLayouts from "./layouts/adminLayouts/AdminLayouts.jsx";
import { BukuPage } from "./pages/admin/buku/BukuPage.jsx";
import { TambahBuku } from "./pages/admin/buku/TambahBuku.jsx";
import { BukuProvider } from "./context/buku/BukuContext.jsx";
import { EditBuku } from "./pages/admin/buku/EditBuku.jsx";
import { PeminjamanProvider } from "./context/peminjaman/PeminjamanContext.jsx";
import { TambahPeminjaman } from "./pages/admin/peminjaman/TambahPeminjaman.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayouts />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route
            path="buku"
            element={
              <BukuProvider>
                <BukuPage />
              </BukuProvider>
            }
          />
          <Route
            path="tambah/buku"
            element={
              <BukuProvider>
                <TambahBuku />
              </BukuProvider>
            }
          />
          <Route
            path="update/buku/:id"
            element={
              <BukuProvider>
                <EditBuku />
              </BukuProvider>
            }
          />
          <Route path="anggota" element={<AnggotaPage />} />
          <Route
            path="peminjaman"
            element={
              <BukuProvider>
                <PeminjamanProvider>
                  <PeminjamPage />
                </PeminjamanProvider>
              </BukuProvider>
            }
          />
          <Route
            path="create/peminjam"
            element={
              <BukuProvider>
                <PeminjamanProvider>
                  <TambahPeminjaman />
                </PeminjamanProvider>
              </BukuProvider>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
