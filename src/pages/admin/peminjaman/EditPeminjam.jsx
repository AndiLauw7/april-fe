import React, { useContext, useEffect, useState } from "react";
import { PeminjamanContext } from "../../../context/peminjaman/PeminjamanContext";
import { useNavigate, useParams } from "react-router-dom";

const EditPeminjam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateAllDataPeminjam, peminjamanList, AnggotaList, bukuList } =
    useContext(PeminjamanContext);
  const [formData, setFormData] = useState({
    tanggal_pinjam: "",
    tanggal_kembali: "",
    status: "",
    anggotaId: "",
    bukuId: "",
  });
  useEffect(() => {
    const peminjaman = peminjamanList.find((item) => item.id === parseInt(id));
    if (peminjaman) {
      setFormData({
        tanggal_pinjam: peminjaman.tanggal_pinjam?.slice(0, 10) || "",
        tanggal_kembali: peminjaman.tanggal_kembali?.slice(0, 10) || "",
        status: peminjaman.status || "",
        anggotaId: peminjaman.anggotaId || "",
        bukuId: peminjaman.bukuId || "",
      });
    }
  }, [id, peminjamanList]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Kirim update:", id, formData);
    await updateAllDataPeminjam(id, formData);
    navigate("/admin/peminjaman");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Tanggal Pinjam</label>
        <input
          type="date"
          name="tanggal_pinjam"
          value={formData.tanggal_pinjam}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Tanggal Kembali</label>
        <input
          type="date"
          name="tanggal_kembali"
          value={formData.tanggal_kembali}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="dipinjam">Dipinjam</option>
          <option value="dikembalikan">Dikembalikan</option>
        </select>
      </div>
      <div>
        <label className="block">Anggota</label>
        <select
          name="anggotaId"
          value={formData.anggotaId}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          {AnggotaList.map((siswa) => (
            <option key={siswa.id} value={siswa.id}>
              {siswa.nama_siswa}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block">Buku</label>
        <select
          name="bukuId"
          value={formData.bukuId}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          {bukuList.map((buku) => (
            <option key={buku.id} value={buku.id}>
              {buku.judul_buku}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Simpan Perubahan
      </button>
    </form>
  );
};
export default EditPeminjam;
