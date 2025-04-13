import API from "./api";
export const getAllBuku = () => API.get("/buku/get-buku");
export const getBukuById = (id) => API.get(`/buku/get-buku/${id}`);
export const createBuku = (data) => API.post("/buku/add-buku", data);
export const updateBuku = (id, data) => API.put(`/buku/update/${id}`, data);
export const deleteBuku = (id) => API.delete(`/buku/hapus-buku/${id}`);
