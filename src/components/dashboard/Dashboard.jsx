import React from "react";
import backround from "../../assets/backgroud-depan.webp";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${backround})` }}
      >
        <h1 className="text-4xl font-bold bg-black/50 px-6 py-2 rounded-lg">
          Selamat Datang di Sekolah
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
