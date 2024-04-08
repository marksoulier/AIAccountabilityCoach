// src/App.js
import React from "react";
import Navbar from "../Navbar/Navbar";
import StatsBox from "../StatsBox/BoxStats";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import GoalGrid from "../GoalGrid/GoalGrid";

function Front() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Container sx={{ paddingTop: 8, paddingBottom: 8 }} maxWidth="md">
        <Box mt={8}>
          <StatsBox />
        </Box>
        <GoalGrid />
      </Container>
    </Box>
  );
}

export default Front;
