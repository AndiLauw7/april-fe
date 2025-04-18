import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayouts = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/buku">Kelola Buku</Link>
          <Link to="/admin/anggota">Kelola Anggota</Link>
          <Link to="/admin/peminjaman">Peminjaman</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayouts;
