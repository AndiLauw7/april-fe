import API from "./api";
export const getAllBuku = () => API.get("/buku/get-buku");
export const getAllPeminjam = () => API.get("/peminjaman/get-peminjam");
export const getAllAnggota = () => API.get("/anggota/get-all");
