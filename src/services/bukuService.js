import API from "./api";
export const getAllBuku = () => API.get("/buku/get-buku");
export const getBukuById = (id) => API.get(`/buku/get-buku/${id}`);
export const createBuku = (data) =>
  API.post("/buku/add-buku", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateBuku = (id, data) =>
  API.put(`/buku/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteBuku = (id) => API.delete(`/buku/hapus-buku/${id}`);
