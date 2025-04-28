/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { adminAddAnggota, registerAdmin } from "../../services/adminService";

export const AdminContextKelola = createContext();
export const AdminContextKelolaProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <AdminContextKelola.Provider
      value={{
        adminData,
        loading,
        error,
        handleRegisterAdmin,
        handleAddAnggota,
      }}
    >
      {children}
    </AdminContextKelola.Provider>
  );
};
