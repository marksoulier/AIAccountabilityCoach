import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleGoalAchieved } from '../../actions/goalActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { green, red } from '@mui/material/colors';
import Box from '@mui/material/Box';

const GoalCard = ({ goal_id, goaltitle, description, achieved, hours_spent, hours_required, date_time, connected_emails, incentive, user }) => {
  const dispatch = useDispatch();

  const handleAchieveGoal = () => {
    dispatch(toggleGoalAchieved(goal_id));
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: 2, border: achieved ? `2px solid ${green[500]}` : `2px solid ${red[500]}` }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {goaltitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Description: {description}
        </Typography>
        <Chip
          label={achieved ? "Completed" : "Not completed"}
          size="small"
          color={achieved ? "success" : "error"}
          style={{
            backgroundColor: achieved ? green[500] : red[500],
            color: "white",
            marginBottom: 2
          }}
        />
        <Typography color="text.secondary">Hours Spent: {hours_spent}</Typography>
        <Typography color="text.secondary">Hours Required: {hours_required}</Typography>
        <Typography color="text.secondary">Due Date: {new Date(date_time).toLocaleDateString()}</Typography>
        <Typography color="text.secondary">Connected Emails: {connected_emails}</Typography>
        <Typography color="text.secondary">Incentive: {incentive}</Typography>
        <Typography color="text.secondary">User ID: {user}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleAchieveGoal} style={{ color: achieved ? green[500] : red[500] }}>
          {achieved ? 'Mark as Incomplete' : 'Mark as Complete'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default GoalCard;
