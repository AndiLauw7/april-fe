import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context/AuthContext";

const AnggotaLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <header className="md:hidden bg-white p-4 flex justify-between items-center shadow">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-xl font-bold"
        >
          ☰
        </button>
        <span className="text-2xl font-semibold justify-end text-gray-800">
          {user?.nama_siswa || "Anggota"}!
        </span>
        <h2 className="text-2xl font-bold text-gray-800"></h2>
      </header>

      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64  bg-blue-900 shadow-md`}
      >
        <div className="p-4 font-bold text-md text-white border-b">
          SMPN 1 KEMIRI <br /> KAB TANGERANG
        </div>
        <nav className="p-4">
          <ul className="space-y-3">
            <li>
              <Link
                to="/anggota/dashboard"
                className="block text-white hover:text-blue-600"
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/anggota/profil"
                className="block text-white hover:text-blue-600"
              >
                🧑🏻‍🏫 Profil
                {/* 🧑🏻 */}
              </Link>
            </li>
            <li>
              <Link
                to="/anggota/daftar-buku"
                className="block text-white hover:text-blue-600"
              >
                📚 Daftar Buku
              </Link>
            </li>
            <li>
              <Link
                to="/anggota/riwayat-peminjaman"
                className="block text-white hover:text-blue-600"
              >
                Riwayat Peminjaman
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="hidden md:flex bg-white p-4 shadow-md justify-end items-center">
          <h1 className="text-lg  font-semibold">
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
