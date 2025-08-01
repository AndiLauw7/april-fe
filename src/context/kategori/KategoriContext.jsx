/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import {
  createKategori,
  getAllKategori,
  updateKategori,
} from "../../services/kategoriService";

export const KategoriContext = createContext([]);

export const KategoriProvider = ({ children }) => {
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchKategori = async () => {
    setLoading(true);
    try {
      const response = await getAllKategori();

      if (response?.data.data) {
        setKategoriList(response.data.data);
      }
    } catch (error) {
      setMessage("Error fetching kategori");
    } finally {
      setLoading(false);
    }
  };

  const tambahKategori = async (data) => {
    try {
      await createKategori(data);
      await fetchKategori();
      setMessage("Kategori berhasil ditambahkan");
    } catch (error) {
      setMessage("Error adding kategori");
      return error;
    }
  };

  const updateDataKategori = async (id, data) => {
    try {
      await updateKategori(id, data);
      await fetchKategori();
      setMessage("Kategori berhasil diupdate");
    } catch (error) {
      setMessage("Error updating kategori");
      return error;
    }
  };
  useEffect(() => {
    fetchKategori();
  }, []);
  return (
    <KategoriContext.Provider
      value={{
        kategoriList,
        setKategoriList,
        loading,
        setLoading,
        message,
        setMessage,
        fetchKategori,
        tambahKategori,
        updateDataKategori,
      }}
    >
      {children}
    </KategoriContext.Provider>
  );
};
