// src/components/StatsBox/StatsBox.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const StatsBox = () => {
  // Placeholder statistics data
  const statsData = {
    totalGoals: 5,
    goalsCompleted: 2,
    activePartners: 3,
  };

  return (
    <Card sx={{ minWidth: 275, margin: '20px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
          Overall Stats
        </Typography>
        <Typography variant="h5" component="h2">
          Total Goals: {statsData.totalGoals}
        </Typography>
        <Typography sx={{ marginBottom: 2 }} color="textSecondary">
          Goals Completed: {statsData.goalsCompleted}
        </Typography>
        <Typography variant="body2" component="p">
          Active Partners: {statsData.activePartners}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatsBox;