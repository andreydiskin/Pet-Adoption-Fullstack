import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";

export const toastContext = createContext();

export const ToastContextProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [messege, setMessege] = useState({ msg: "", type: "success" });

  const positionConfig = {
    success: { vertical: "top", horizontal: "center" },
    error: { vertical: "bottom", horizontal: "left" },
  };

  const openToast = (messege, msgType) => {
    setMessege({ msg: messege, type: msgType });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const value = {
    openToast,
    messege,
    setMessege,
    open,
    setOpen,
  };

  return (
    <toastContext.Provider value={value}>
      <>
        {props.children}
        <Snackbar
          anchorOrigin={positionConfig[messege.type]}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={messege.type}
            sx={{ width: "100%" }}
          >
            {messege.msg}
          </Alert>
        </Snackbar>
      </>
    </toastContext.Provider>
  );
};
