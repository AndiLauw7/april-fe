import React, { useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context/AuthContext";
import {
  FaBook,
  FaSignOutAlt,
  FaUserShield,
  FaHome,
  FaUsers,
  FaExchangeAlt,
  FaKickstarter,
} from "react-icons/fa";
import { TbReport } from "react-icons/tb";
const AdminLayouts = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition font-medium ${
      isActive ? "bg-blue-700 text-yellow-300" : "text-white hover:bg-blue-800"
    }`;

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-yellow-300">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <FaHome /> Dashboard
          </NavLink>
          <NavLink to="/admin/buku" className={linkClass}>
            <FaBook /> Kelola Buku
          </NavLink>
          <NavLink to="/admin/kategori" className={linkClass}>
            <FaKickstarter /> Kelola Kategori
          </NavLink>
          <NavLink to="/admin/kelola-admin" className={linkClass}>
            <FaUserShield /> Kelola Admin
          </NavLink>
          <NavLink to="/admin/kelola-anggota" className={linkClass}>
            <FaUsers /> Kelola Anggota
          </NavLink>
          <NavLink to="/admin/peminjaman" className={linkClass}>
            <FaExchangeAlt /> Kelola Peminjaman
          </NavLink>
          <NavLink to="/admin/laporan" className={linkClass}>
            <TbReport /> Kelola Laporan
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition text-white"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-700">
              👋 Hello, {user?.nama}
            </h1>
            <p className="text-sm text-gray-500">
              Selamat datang di panel admin.
            </p>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayouts;
