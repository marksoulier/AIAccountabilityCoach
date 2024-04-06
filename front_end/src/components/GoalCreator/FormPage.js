import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState({
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: '',
  });
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const questions = [
    { name: "specific", label: "Specific: What do you want to accomplish?" },
    { name: "measurable", label: "Measurable: How will you measure success?" },
    { name: "achievable", label: "Achievable: Is it achievable? Why?" },
    { name: "relevant", label: "Relevance: Why is this goal important to you?" },
    { name: "timeBound", label: "Time-Bound: When do you want to achieve this goal?" },
  ];

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);
      const analysisResult = await analyzeGoal(); // Use a local variable instead
      setIsAnalyzing(false);
      navigate('/results', { state: { goal, analysisResult } });
    }
  };

  const analyzeGoal = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'text-davinci-003',
        prompt: `Is this a good SMART goal? ${Object.values(goal).join(' ')}`,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      });
      const data = response.data;
      if (!data.choices || data.choices.length === 0) {
        return 'Error: The analysis could not be completed.';
      }
      return data.choices[0].text;
    } catch (error) {
      console.error('An error occurred:', error);
      return 'Error: Unable to perform the analysis.';
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2>Create Your SMART Goal</h2>
        {questions.slice(0, step).map((question, index) => (
          index + 1 === step ? (
            <TextField
              key={question.name}
              label={question.label}
              variant="outlined"
              name={question.name}
              value={goal[question.name]}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          ) : (
            <div key={question.name}>
              <strong>{question.label}</strong>
              <p>{goal[question.name]}</p>
            </div>
          )
        ))}
        <Button type="submit" variant="contained" color="primary" disabled={isAnalyzing}>
          {isAnalyzing ? 'Analyzing...' : (step === 5 ? 'Submit Goal' : 'Next')}
        </Button>
      </form>
    </div>
  );
}

export default FormPage;
