import React, { useEffect, useState } from "react";
import { FaBook, FaUsers, FaShoppingCart, FaClock } from "react-icons/fa";
import CountUp from "react-countup";

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

  const cardsData = [
    {
      title: "Total Buku",
      value: dataBuku && Array.isArray(dataBuku) ? dataBuku.length : 0,
      icon: <FaBook size={28} className="text-blue-600" />,
      colorClass: "border-blue-400",
      bgGradient: "bg-gradient-to-r from-blue-50 to-blue-100",
    },
    {
      title: "Total Anggota",
      value: anggota ? anggota.length : 0,
      icon: <FaUsers size={28} className="text-green-600" />,
      colorClass: "border-green-400",
      bgGradient: "bg-gradient-to-r from-green-50 to-green-100",
    },
    {
      title: "Total Peminjaman",
      value: totalPeminjaman,
      icon: <FaShoppingCart size={28} className="text-yellow-600" />,
      colorClass: "border-yellow-400",
      bgGradient: "bg-gradient-to-r from-yellow-50 to-yellow-100",
    },
    {
      title: "Peminjaman Aktif",
      value: aktif,
      icon: <FaClock size={28} className="text-red-600" />,
      colorClass: "border-red-400",
      bgGradient: "bg-gradient-to-r from-red-50 to-red-100",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">
        Dashboard Admin
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cardsData.map(({ title, value, icon, colorClass, bgGradient }) => (
          <div
            key={title}
            className={`flex items-center p-5 rounded-lg shadow-lg border-l-8 ${colorClass} ${bgGradient} hover:shadow-2xl transition-shadow duration-300 cursor-default`}
          >
            <div className="mr-4">{icon}</div>
            <div>
              <h3 className="text-sm text-gray-500 font-semibold">{title}</h3>
              <p className="text-2xl font-bold text-gray-900">
                <CountUp end={value} duration={1.5} separator="," />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
