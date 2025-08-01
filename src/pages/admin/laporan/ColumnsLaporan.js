import { useMemo } from "react";

export const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        header: "No",
        Cell: ({ row }) => row.index + 1,
        size: 50,
      },
      {
        accessorFn: (row) => row.Anggotum?.nama_siswa,
        id: "nama_siswa",
        header: "Nama Siswa",
      },
      {
        accessorFn: (row) => row.Anggotum?.kelas,
        id: "kelas",
        header: "Kelas",
      },
      {
        accessorFn: (row) => row.buku?.judul_buku,
        id: "judul_buku",
        header: "Judul Buku",
      },
      {
        accessorFn: (row) =>
          new Date(row.tgl_pinjam).toLocaleDateString("id-ID"),
        id: "tgl_pinjam",
        header: "Tanggal Pinjam",
      },
      {
        accessorFn: (row) =>
          row.tgl_kembali
            ? new Date(row.tgl_kembali).toLocaleDateString("id-ID")
            : "-",
        id: "tgl_kembali",
        header: "Tanggal Kembali",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorFn: (row) => (row.denda ? `Rp${row.denda}` : "-"),
        id: "denda",
        header: "Denda",
      },
    ],
    []
  );
  return columns;
};
