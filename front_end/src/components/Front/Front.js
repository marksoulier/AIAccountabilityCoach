import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import StatsBox from "../StatsBox/BoxStats";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import GoalGrid from "../GoalGrid/GoalGrid";
import BasicModal from "../Modal/Modal";
import GoalDetailsModal from "../GoalDetailsModal/GoalDetailsModal";

function Front() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleOpenModal = (goal) => {
    setSelectedGoal(goal);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedGoal(null); // Reset selected goal when modal closes
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Container sx={{ paddingTop: 8, paddingBottom: 8 }} maxWidth="md">
        <Box mt={8}>
          <StatsBox />
        </Box>
        <GoalGrid onGoalClick={handleOpenModal} />
        <BasicModal open={modalOpen} onClose={handleCloseModal} title="Goal Details">
          {selectedGoal && <GoalDetailsModal open={modalOpen} handleClose={handleCloseModal} goal={selectedGoal} />}
        </BasicModal>
      </Container>
    </Box>
  );
}

export default Front;
