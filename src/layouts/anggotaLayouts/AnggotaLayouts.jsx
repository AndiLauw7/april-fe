import React, { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context/AuthContext";
import {
  FaBook,
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaHistory,
  FaBars,
} from "react-icons/fa";

const AnggotaLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
      isActive
        ? "bg-white text-blue-900 font-semibold"
        : "text-white hover:bg-blue-800"
    }`;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Header */}
      <header className="md:hidden bg-white p-4 flex justify-between items-center shadow">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-blue-800"
        >
          <FaBars />
        </button>
        <span className="text-xl font-semibold text-gray-800">
          {user?.nama_siswa || "Anggota"}!
        </span>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-blue-900 text-white shadow-md`}
      >
        <div className="p-5 text-lg font-bold border-b border-blue-700">
          SMPN 1 KEMIRI
          <br />
          KAB TANGERANG
        </div>
        <nav className="p-4 space-y-3">
          <NavLink to="/anggota/dashboard" className={navLinkClass}>
            <FaHome /> Dashboard
          </NavLink>
          <NavLink to="/anggota/profil" className={navLinkClass}>
            <FaUser /> Profil
          </NavLink>
          <NavLink to="/anggota/daftar-buku" className={navLinkClass}>
            <FaBook /> Daftar Buku
          </NavLink>
          <NavLink to="/anggota/riwayat-peminjaman" className={navLinkClass}>
            <FaHistory /> Riwayat Peminjaman
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left text-white hover:bg-red-600 px-4 py-2 rounded-md transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="hidden md:flex bg-white p-4 shadow-md justify-end items-center">
          <h1 className="text-lg font-semibold">
            {user?.nama_siswa || "Anggota"}!
          </h1>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AnggotaLayout;
