import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const Message = ({ status, msg }) => {
  // "error", "warning", "info", "success"
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={status}>
        <AlertTitle className="message">{status}</AlertTitle>
        <strong>{msg}</strong>
      </Alert>
    </Stack>
  );
};

export default Message;
