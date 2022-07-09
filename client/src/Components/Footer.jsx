import React from "react";
import { Container, Box } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 5 }}
        py={{ xs: 5, sm: 5 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Box textAlign="center">Waves &reg; {new Date().getFullYear()}</Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
