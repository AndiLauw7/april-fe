import API from "./api";
import axios from "axios";
export const getAllBuku = () => API.get("/buku/get-buku");
export const getAllPeminjam = () => API.get("/peminjaman/get-peminjam");
export const getAllAnggota = () => API.get("/anggota/get-all");

export const registerAdmin = async (adminData, token) => {
  try {
    const response = await API.post(`/admin/register-no-invite`, adminData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const adminAddAnggota = async (anggotaData, token) => {
  try {
    const response = await API.post(`/admin/addAnggota`, anggotaData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
