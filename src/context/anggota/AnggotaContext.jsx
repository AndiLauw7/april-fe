/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import { getAllAnggota, updateAnggota } from "../../services/adminService";

export const AnggotaContext = createContext();

export const AnggotaProvider = ({ children }) => {
  const [anggotaList, setAnggotalist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchAnggota = async () => {
    try {
      setLoading(true);
      const resAnggota = await getAllAnggota();

      setAnggotalist(resAnggota.data.data);
    } catch (error) {
      console.error("Gagal ambil data anggota/buku:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAnggota();
  }, []);

  //   const editAnggota = async (id, updatedData) => {
  //     try {
  //       setLoading(true);
  //       const res = await updateAnggota(id, updatedData);
  //       console.log("Respons update anggota:", res);
  //       if (res && res.data) {
  //         const updatedData = res.data.data;
  //         await fetchAnggota();
  //         setMessage("Anggota berhasil diperbarui");
  //         return updatedData;
  //       } else {
  //         throw new Error("Gagal update anggota");
  //       }
  //     } catch (error) {
  //       console.error("Gagal update anggota:", error);
  //       setMessage("Gagal update anggota");
  //       throw error;
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const editAnggota = async (id, updatedData) => {
    try {
      setLoading(true);
      const res = await updateAnggota(id, updatedData);
      console.log("Respons update anggota:", res); // Log respons untuk debugging
      await fetchAnggota(); // Ambil data anggota terbaru setelah update
      setMessage("Anggota berhasil diperbarui");
      return res; // Pastikan kita mengembalikan data yang benar
    } catch (error) {
      console.error("Gagal update anggota:", error);
      setMessage("Gagal update anggota");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnggotaContext.Provider
      value={{ anggotaList, setAnggotalist, loading, message, editAnggota }}
    >
      {children}
    </AnggotaContext.Provider>
  );
};
