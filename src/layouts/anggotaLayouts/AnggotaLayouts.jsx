/* eslint-disable no-unreachable */
// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const AnggotaLayout = () => {
//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md hidden md:block">
//         <div className="p-4 font-bold text-xl text-blue-600 border-b">
//           Anggota
//         </div>
//         <nav className="p-4">
//           <ul className="space-y-2">
//             <li>
//               <Link
//                 to="/anggota/dashboard"
//                 className="text-gray-700 hover:text-blue-600"
//               >
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/anggota/profil"
//                 className="text-gray-700 hover:text-blue-600"
//               >
//                 Profil
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/anggota/riwayat"
//                 className="text-gray-700 hover:text-blue-600"
//               >
//                 Riwayat Peminjaman
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-white p-4 shadow-md flex justify-between items-center">
//           <h1 className="text-lg font-semibold">Dashboard Anggota</h1>
//           <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//             Logout
//           </button>
//         </header>

//         {/* Main Content */}
//         <main className="p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AnggotaLayout;
import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context/AuthContext";

const AnggotaLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Header */}
      <header className="md:hidden bg-white p-4 flex justify-between items-center shadow">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-xl font-bold"
        >
          ☰
        </button>
        <span className="text-lg font-semibold">Dashboard Anggota</span>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white shadow-md`}
      >
        <div className="p-4 font-bold text-xl text-blue-600 border-b">
          Anggota
        </div>
        <nav className="p-4">
          <ul className="space-y-3">
            <li>
              <Link
                to="/anggota/dashboard"
                className="block text-gray-700 hover:text-blue-600"
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/anggota/profil"
                className="block text-gray-700 hover:text-blue-600"
              >
                👤 Profil
              </Link>
            </li>
            <li>
              <Link
                to="/anggota/riwayat"
                className="block text-gray-700 hover:text-blue-600"
              >
                📚 Riwayat Peminjaman
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Desktop Header */}
        <header className="hidden md:flex bg-white p-4 shadow-md justify-between items-center">
          <h1 className="text-lg font-semibold">Dashboard Anggota</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AnggotaLayout;
