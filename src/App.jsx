/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardAdmin from "./pages/admin/Dashboard.jsx";


import PeminjamPage from "./pages/admin/peminjaman/PeminjamPage.jsx";
import AdminLayouts from "./layouts/adminLayouts/AdminLayouts.jsx";
import { BukuPage } from "./pages/admin/buku/BukuPage.jsx";

import { BukuProvider } from "./context/buku/BukuContext.jsx";

import { PeminjamanProvider } from "./context/peminjaman/PeminjamanContext.jsx";
import AdminRoutePrivate from "./private/AdminroutePrivate.jsx";
import PrivateRouteAnggota from "./private/PrivateRoute.jsx";
import AnggotaLayout from "./layouts/anggotaLayouts/AnggotaLayouts.jsx";
import AuthLayouts from "./pages/auth/AuthLayouts.jsx";
import { AuthContext } from "./context/auth-context/AuthContext.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import DashboardAnggota from "./pages/anggota/AnggotaDashboard.jsx";
import ProfilAnggota from "./pages/anggota/ProfilAnggota.jsx";
import DaftarBukuAnggota from "./pages/anggota/DaftarBukuAnggota.jsx";
import RiwayatPeminjaman from "./pages/anggota/RiwayatPeminjaman.jsx";
import RegisterAdmin from "./pages/auth/RegisterAdmin.jsx";
import { AdminContextKelolaProvider } from "./context/admin/AdminContextKelola.jsx";
import { DataAnggota } from "./pages/admin/Data-anggota/DataAnggota.jsx";
import { AnggotaProvider } from "./context/anggota/AnggotaContext.jsx";
import DataAllAdmin from "./pages/admin/Data-admin/DataAdmin.jsx";
import LaporanPeminjam from "./pages/admin/laporan/LaporanPeminjam.jsx";
import { KategoriProvider } from "./context/kategori/KategoriContext.jsx";
import { Kategori } from "./pages/admin/kategori/Kategori.jsx";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/login"
          element={
            user ? (
              user.role === "admin" || user.role === "kepsek" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/anggota/dashboard" replace />
              )
            ) : (
              <AuthLayouts />
            )
          }
        />
        <Route path="/register" element={<AuthLayouts />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />

        <Route path="/admin" element={<AdminRoutePrivate />}>
          <Route element={<AdminLayouts />}>
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route
              path="buku"
              element={
                <BukuProvider>
                  <KategoriProvider>
                    <BukuPage />
                  </KategoriProvider>
                </BukuProvider>
              }
            />
            <Route
              path="kategori"
              element={
                <KategoriProvider>
                  <Kategori />
                </KategoriProvider>
              }
            />
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
              path="kelola-admin"
              element={
                <AdminContextKelolaProvider>
                  <DataAllAdmin />
                </AdminContextKelolaProvider>
              }
            />
            <Route
              path="kelola-anggota"
              element={
                <AdminContextKelolaProvider>
                  <AnggotaProvider>
                    <DataAnggota />
                  </AnggotaProvider>
                </AdminContextKelolaProvider>
              }
            />

            <Route
              path="laporan"
              element={
                <BukuProvider>
                  <PeminjamanProvider>
                    <LaporanPeminjam />
                  </PeminjamanProvider>
                </BukuProvider>
              }
            />
          </Route>
        </Route>

        <Route path="/anggota" element={<PrivateRouteAnggota />}>
          <Route element={<AnggotaLayout />}>
            <Route
              path="dashboard"
              element={
                <BukuProvider>
                  <PeminjamanProvider>
                    <DashboardAnggota />
                  </PeminjamanProvider>
                </BukuProvider>
              }
            />
            <Route path="profil" element={<ProfilAnggota />} />

            <Route
              path="daftar-buku"
              element={
                <BukuProvider>
                  <KategoriProvider>
                    <DaftarBukuAnggota />
                  </KategoriProvider>
                </BukuProvider>
              }
            />
            <Route
              path="riwayat-peminjaman"
              element={
                <BukuProvider>
                  <PeminjamanProvider>
                    <RiwayatPeminjaman />
                  </PeminjamanProvider>
                </BukuProvider>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
