import API from "./api";
export const getAllKategori = () => API.get("/kategori/get-kategori");
export const getKategoriById = (id) => API.get(`/kategori/get-kategori/${id}`);
export const createKategori = (data) =>
  API.post("/kategori/tambah-kategori", data);
export const updateKategori = (id, data) =>
  API.put(`/kategori/update-kategori/${id}`, data);
export const deleteKategori = (id) =>
  API.delete(`/kategori/hapus-kategori/${id}`);
