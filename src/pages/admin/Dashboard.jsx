/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts.jsx";
import StatCard from "../../components/card/StatCard";
import {
  getAllAnggota,
  getAllBuku,
  getAllPeminjam,
} from "../../services/adminService";
const Dashboard = () => {
  const [dataBuku, setBuku] = useState([]);
  const [peminjaman, setPeminjaman] = useState([]);
  const [anggota, setAnggota] = useState([]);

  useEffect(() => {
    getAllBuku()
      .then((res) => {
        if (res?.data?.buku) {
          setBuku(res.data.buku);
        } else {
          return;
        }
      })
      .catch((err) => console.log("Error fetching buku data:", err));
    getAllPeminjam()
      .then((res) => {
        setPeminjaman(res.data.dataPeminjman || []);
      })
      .catch((err) => console.error(err));
    getAllAnggota()
      .then((res) => {
        setAnggota(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const totalPeminjaman = peminjaman.length;
  const aktif = peminjaman.filter((p) => p.status === "dipinjam").length;
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>
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
    </div>
  );
};

export default Dashboard;
