/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardAdmin from "./pages/admin/Dashboard.jsx";
import BukuPage from "./pages/admin/BukuPage.jsx";
import AnggotaPage from "./pages/admin/AnggotaPage.jsx";
import PeminjamPage from "./pages/admin/PeminjamPage.jsx";
import AdminLayouts from "./layouts/adminLayouts/AdminLayouts.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayouts />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="buku" element={<BukuPage />} />
          <Route path="anggota" element={<AnggotaPage />} />
          <Route path="peminjaman" element={<PeminjamPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
