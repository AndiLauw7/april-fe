import API from "./api";

export const getAllBuku = () => API.get("/buku/get-buku");
export const getAllPeminjam = () => API.get("/peminjaman/get-peminjam");
export const getAllAnggota = () => API.get("/anggota/get-all");


export const getProfileAdmin = () => API.get("/admin/profile");
export const getAllAdmin = (config) => API.get("/admin/get-all", config);

export const updateAdmin = (id, data) => {
  const token = localStorage.getItem("token");
  return API.put(`/admin/update-admin/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteAdmin = (id) => {
  const token = localStorage.getItem("token");
  return API.delete(`/admin/delete-admin/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateAnggota = (id, data) => {
  console.log("Updating anggota:", id, data);
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token tidak ditemukan. Anda harus login terlebih dahulu.");
  }

  return API.put(`/anggota/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("Response from API:", response); // Log respons dari API
      return response.data; // ✅ ini yang harus dikembalikan
    })
    .catch((error) => {
      console.error("Error during updateAnggota:", error);
      throw error;
    });
};

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
