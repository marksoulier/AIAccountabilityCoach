import React, { useState } from 'react';
import GoalMake from './GoalMake';
import Results from './Results';
import Friends from './Friends';
import { useDispatch } from 'react-redux';
import { createGoalDream, updateGoal } from '../../actions/goalActions';
import { analyzeGoal } from '../../actions/GptApi';

function FormPage() {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState('goalMake');
  const [goalData, setGoalData] = useState({
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: '',
  });
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Function to handle the submission from GoalMake and analyze the goal
  const handleGoalSubmit = () => {
    setIsAnalyzing(true);
    analyzeGoal(goalData, setAnalysisResult, setCurrentStep, setIsAnalyzing);
  };


  // Function to handle the creation of the goal
  const createGoal = () => {
    const newGoalData = {
      goaltitle: goalData.specific,  // Keep the goal title as the specific goal
      description: `AI coach: ${analysisResult}\n\n` + // Begin with the analysis result
        `Measurable: ${goalData.measurable}\n` + // Use \n for new lines in the description
        `Achievable: ${goalData.achievable}\n` +
        `Relevant: ${goalData.relevant}\n` +
        `Time-Bound: ${goalData.timeBound}\n`,
      achieved: false,
      hours_spent: 0.00,
      hours_required: 0.00,
      date_time: new Date().toISOString(),
    };

    dispatch(createGoalDream(newGoalData)).then((action) => {
      if (action.type.endsWith('SUCCESS')) {
        // Assuming that the goal_id is returned as part of the action payload
        setGoalData((prevData) => ({
          ...prevData,
          goal_id: action.payload.goal_id
        }));
        setCurrentStep('friends'); // Proceed to friends after creating the goal
      } else {
        // Handle failure scenario
        console.error('Failed to create goal');
      }
    });
  };

  // Function to handle editing the goal (going back to GoalMake)
  const editGoal = () => {
    setCurrentStep('goalMake');
  };

  // Function to handle friends modal completion
  const handleFriendsSubmit = (emails, incentive) => {
    console.log('goalData:', goalData);
    const updatedGoalData = {
      goal_id: goalData.goal_id,
      connected_emails: emails,
      incentive: incentive,
    };
    dispatch(updateGoal(updatedGoalData));
    setCurrentStep('goalMake'); // Optionally, reset or go to a new step
  };

  return (
    <div className="App">
      {currentStep === 'goalMake' && (
        <GoalMake
          goalData={goalData}
          onChange={setGoalData}
          onSubmit={handleGoalSubmit}
          isAnalyzing={isAnalyzing}
        />
      )}
      {currentStep === 'results' && (
        <Results
          goalData={goalData}
          analysisResult={analysisResult}
          onEditGoal={editGoal}
          onCreateGoal={createGoal}
        />
      )}
      {currentStep === 'friends' && (
        <Friends
          handleSubmit={handleFriendsSubmit}
        />
      )}
    </div>
  );
}

export default FormPage;