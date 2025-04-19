/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { getAllAnggota, getAllPeminjam } from "../../services/adminService";
import {
  createPeminjaman,
  updatePeminjam,
} from "../../services/peminjamanService";
import { getAllBuku } from "../../services/bukuService";
import { BukuContext } from "../buku/BukuContext";

export const PeminjamanContext = createContext();

export const PeminjamanProvider = ({ children }) => {
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [AnggotaList, setAnggotaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { bukuList } = useContext(BukuContext);
  const fetchDataJoin = async () => {
    try {
      const resAnggota = await getAllAnggota();
      const resBuku = await getAllBuku();
      setAnggotaList(resAnggota.data.data);
    } catch (error) {
      console.error("Gagal ambil data anggota/buku:", error);
    }
  };

  useEffect(() => {
    fetchDataJoin();
  }, []);
  const fetchPeminjaman = async () => {
    try {
      setLoading(true);
      const res = await getAllPeminjam();
      if (res?.data?.dataPeminjman) {
        console.log(res.data.dataPeminjman);
        setPeminjamanList(res.data.dataPeminjman);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const tambahPeminjaman = async (data) => {
    try {
      await createPeminjaman(data);
      await fetchPeminjaman();
      setMessage("Peminjaman berhasil ditambahkan");
    } catch (error) {
      console.log(error);
      setMessage("Peminjaman gagal ditambahkan");
      return error;
    }
  };

  //   const hapusPeminjam = async (id) => {
  //     try {
  //       await deletePeminjam(id);
  //       await fetchPeminjaman();
  //       setMessage("Peminjaman berhasil dihapus");
  //     } catch (error) {
  //       console.log(error);
  //       setMessage("Peminjaman gagal dihapus");
  //       return error;
  //     }
  //   };

  const updatePeminjaman = async (id, status) => {
    try {
      await updatePeminjam(id, { status });
      setMessage("Status peminjaman berhasil diperbarui");
      await fetchPeminjaman();
    } catch (error) {
      console.log(error);
      setMessage("Peminjaman gagal update");
      return error;
    }
  };

  useEffect(() => {
    fetchPeminjaman();
  }, []);
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);
  return (
    <PeminjamanContext.Provider
      value={{
        peminjamanList,
        tambahPeminjaman,
        updatePeminjaman,
        fetchDataJoin,
        fetchPeminjaman,
        AnggotaList,
        loading,
        message,
        bukuList,
      }}
    >
      {children}
    </PeminjamanContext.Provider>
  );
};
