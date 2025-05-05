/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import {
  adminAddAnggota,
  getAllAdmin,
  registerAdmin,
} from "../../services/adminService";

export const AdminContextKelola = createContext();
export const AdminContextKelolaProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataAllAdmin, setDataAllAdmin] = useState([]);
  const handleRegisterAdmin = async (adminData) => {
    setLoading(true);
    try {
      const response = await registerAdmin(adminData, adminData.token);
      setAdminData(response.admin);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const handleAddAnggota = async (anggotaData) => {
    setLoading(true);
    try {
      const response = await adminAddAnggota(anggotaData, adminData.token);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const handleGetAllAdmin = async () => {
    try {
      setLoading(true);
      const response = await getAllAdmin({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.admin);

      setDataAllAdmin(response.data.admin);
    } catch (error) {
      console.error("Gagal mengambil data admin", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <AdminContextKelola.Provider
      value={{
        adminData,
        dataAllAdmin,
        loading,
        error,
        handleRegisterAdmin,
        handleAddAnggota,
        handleGetAllAdmin,
      }}
    >
      {children}
    </AdminContextKelola.Provider>
  );
};
