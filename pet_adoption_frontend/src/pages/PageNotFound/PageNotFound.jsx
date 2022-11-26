import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function PageNotFound() {
  return (
    <Stack className="homePageCon" spacing={2}>
      <Typography
        className="header"
        variant="h3"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        404
      </Typography>
      <Typography
        className="sub-header"
        variant="h7"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        Page not found
      </Typography>{" "}
    </Stack>
  );
}
