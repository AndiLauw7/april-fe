/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts.jsx";
import StatCard from "../../components/card/StatCard";
import { getAllBuku, getAllPeminjam } from "../../services/adminService";
const Dashboard = () => {
  const [dataBuku, setBuku] = useState([]);
  console.log(dataBuku);

  const [peminjaman, setPeminjaman] = useState([]);
  const [anggota, setAnggota] = useState([]);

  useEffect(() => {
    getAllBuku()
      .then((res) => {
        console.log("Full API Response:", res); // Menampilkan seluruh response
        if (res?.data?.buku) {
          console.log("Buku data:", res.data.buku); // Cek apakah buku ada
          setBuku(res.data.buku); // Update state dengan data buku
        } else {
          console.error("Data buku tidak ditemukan");
        }
      })
      .catch((err) => console.log("Error fetching buku data:", err));

    getAllPeminjam()
      .then((res) => {
        setPeminjaman(res.data.dataPeminjman || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const totalPeminjaman = peminjaman.length;
  const aktif = peminjaman.filter((p) => p.status === "dipinjam").length;
  return (
    <div>
      <AdminLayouts>
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        {/* <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">Total Buku</div>
          <div className="bg-white p-4 rounded shadow">Total Anggota</div>
          <div className="bg-white p-4 rounded shadow">Peminjaman Aktif</div>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Buku"
            value={dataBuku && Array.isArray(dataBuku) ? dataBuku.length : 0}
            color="border-blue-500"
          />
          <StatCard
            title="Total Anggota"
            value={anggota ? anggota.length : 0}
            color="border-green-500"
          />
          <StatCard
            title="Total Peminjaman"
            value={totalPeminjaman}
            color="border-yellow-500"
          />
          <StatCard
            title="Peminjaman Aktif"
            value={aktif}
            color="border-red-500"
          />
        </div>
      </AdminLayouts>
    </div>
  );
};

export default Dashboard;
