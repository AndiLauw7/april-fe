/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import API from "../../../services/api";
import { useColumns } from "./ColumnsLaporan";
import { TableCustom } from "../../../components/table/TableCustom";
import { Grid, Stack, Button, TextField, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PrinterIcon } from "lucide-react";
import ReactToPrint from "react-to-print";
import "./print.css";
const LaporanPeminjam = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const STATUS_ALL = "semua";
  const columns = useColumns();

  const fetchLaporan = async () => {
    try {
      // const response = await API.get("/laporan", {
      //   params: {
      //     startDate,
      //     endDate,
      //     status,
      //   },
      // });
      const params = {};

      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      // Jangan kirim status jika "semua" atau kosong
      if (status && status !== STATUS_ALL) {
        params.status = status;
      }

      const response = await API.get("/laporan", { params });
      setData(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil laporan:", error);
    }
  };
  const handleCetakPDF = () => {
    const params = new URLSearchParams();

    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate.toISOString());
    // if (status) params.append("status", status);
    if (status && status !== STATUS_ALL) {
      params.append("status", status);
    }
    params.append("format", "pdf");
    params.append("printedBy", "Admin Budi"); // Ganti dengan nama user login jika ada
    const url = `http://localhost:5000/api/v1/laporan?${params.toString()}`;
    // const url = `/api/laporan?${params.toString()}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      {/* Filter */}
      <div className="flex justify-between items-center mb-4">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="Tanggal Awal"
                value={startDate}
                maxDate={new Date()}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="Tanggal Akhir"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <TextField
                select
                label="Status"
                fullWidth
                size="small"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                SelectProps={{
                  displayEmpty: true,
                }}
              >
                <MenuItem value={STATUS_ALL}>Semua</MenuItem>
                <MenuItem value="dipinjam">Dipinjam</MenuItem>
                <MenuItem value="dikembalikan">Dikembalikan</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ height: "100%" }}
                alignItems="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={fetchLaporan}
                  fullWidth
                >
                  Tampilkan
                </Button>
                {/* <Button
                  variant="outlined"
                  color="success"
                  onClick={() => window.print()}
                  disabled={data.length === 0}
                  fullWidth
                  startIcon={<PrinterIcon />}
                >
                  Cetak
                </Button> */}
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleCetakPDF}
                  disabled={data.length === 0}
                  fullWidth
                  startIcon={<PrinterIcon />}
                >
                  Cetak PDF
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </div>

      <TableCustom columns={columns} data={Array.isArray(data) ? data : []} />
    </div>
  );
};

export default LaporanPeminjam;
