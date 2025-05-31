import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { WarningAmber as WarningIcon } from "@mui/icons-material";

const ModalCustom = ({
  open = false,
  onClose,
  title,
  children, // fleksibel bisa form atau teks
  showActions = false, // apakah menampilkan tombol action (untuk konfirmasi)
  onConfirm,
  onCancel,
  confirmLabel = "Yes",
  cancelLabel = "No",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        id="modal-title"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <WarningIcon sx={{ color: "#FF9800", marginRight: 1 }} />
        {title}
      </DialogTitle>

      <DialogContent dividers id="modal-content">
        {children}
      </DialogContent>

      {showActions && (
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} color="primary" autoFocus>
            {confirmLabel}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ModalCustom;
