import API from "./api";

export const createPeminjaman = (data) => API.post("/peminjaman/create", data);
export const getAllPeminjam = () => API.get("/peminjaman/get-peminjam");
export const updatePeminjam = (id, data) =>
  API.put(`/peminjaman/update-peminjam/${id}`, data);
