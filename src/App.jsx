/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardAdmin from "./pages/admin/Dashboard.jsx";
import BukuPage from "./pages/admin/BukuPage.jsx";
import AnggotaPage from "./pages/admin/AnggotaPage.jsx";
import PeminjamPage from "./pages/admin/PeminjamPage.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/buku" element={<BukuPage />} />
        <Route path="/admin/anggota" element={<AnggotaPage />} />
        <Route path="/admin/peminjaman" element={<PeminjamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
