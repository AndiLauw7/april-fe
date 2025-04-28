/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* <Route
          path="/login"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/anggota/dashboard" replace />
              )
            ) : (
              <AuthLayouts />
            )
          }
        /> */}
        <Route
          path="/login"
          element={
            user ? (
              user.role === "admin" ? (
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
        </Route>
        <Route path="/anggota" element={<PrivateRouteAnggota />}>
          <Route element={<AnggotaLayout />}>
            <Route path="dashboard" element={<DashboardAnggota />} />
            <Route path="profil" element={<ProfilAnggota />} />

            <Route
              path="daftar-buku"
              element={
                <BukuProvider>
                  <DaftarBukuAnggota />
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
