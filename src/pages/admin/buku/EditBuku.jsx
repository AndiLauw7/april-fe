import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BukuContext } from "../../../context/buku/BukuContext";
import { getBukuById } from "../../../services/bukuService";

export const EditBuku = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateBukuContext, message } = useContext(BukuContext);
  const [form, setForm] = useState({
    judul_buku: "",
    pengarang: "",
    tahun_terbit: "",
    penerbit: "",
    kategori: "",
    stok: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBukuById(id);
        setForm(res.data.buku);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBukuContext(id, form);
    navigate("/admin/buku");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Update Buku</h2>
      {message && (
        <div className="mb-4 p-2 bg-blue-100 border border-blue-300 rounded">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>judul buku:</label>
          <input
            type="text"
            name="judul_buku"
            value={form.judul_buku}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label>pengarang:</label>
          <input
            type="text"
            name="pengarang"
            value={form.pengarang}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label>tahun terbit:</label>
          <input
            type="number"
            name="tahun_terbit"
            value={form.tahun_terbit}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Penerbit:</label>
          <input
            type="text"
            name="penerbit"
            value={form.penerbit}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Kategori</label>
          <input
            type="text"
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label>stok</label>
          <input
            type="text"
            name="stok"
            value={form.stok}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};
