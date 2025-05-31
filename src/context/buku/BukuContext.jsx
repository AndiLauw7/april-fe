/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { getAllBuku } from "../../services/adminService";
import { createBuku, deleteBuku, updateBuku } from "../../services/bukuService";

export const BukuContext = createContext();

export const BukuProvider = ({ children }) => {
  const [bukuList, setBukuList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchBuku = async () => {
    try {
      const res = await getAllBuku();
      if (res?.data?.buku) {
        setBukuList(res.data.buku);
      }
    } catch (error) {
      console.log(error);

      return error;
    } finally {
      setLoading(false);
    }
  };
  const tambahBuku = async (data) => {
    try {
      await createBuku(data);
      await fetchBuku();
      setMessage("Buku berhasil ditambahkan");
    } catch (error) {
      console.log(error);
      setMessage("Buku gagal ditambahkan");
      return error;
    }
  };

  const hapusBuku = async (id) => {
    try {
      await deleteBuku(id);
      setMessage("Buku berhasil dihapus");
      await fetchBuku();
    } catch (error) {
      console.log(error);
      setMessage("Buku gagal dihapus");

      return error;
    }
  };

  const updateDataBuku = async (id, data) => {
    try {
      await updateBuku(id, data);
      await fetchBuku();
      setMessage("Buku berhasil diupdate");
    } catch (error) {
      console.log(error);
      setMessage("Gagal update buku");
      return error;
    }
  };
  useEffect(() => {
    fetchBuku();
  }, []);

  useEffect(() => {
    if (message) {
      const timeOut = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timeOut);
    }
  }, [message]);
  return (
    <BukuContext.Provider
      value={{
        bukuList,
        tambahBuku,
        hapusBuku,
        loading,
        message,
        updateDataBuku,
      }}
    >
      {children}
    </BukuContext.Provider>
  );
};
