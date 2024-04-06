import React from 'react';
import { useLocation } from 'react-router-dom';

function ResultsPage() {
  const location = useLocation();
  const { goal, analysisResult } = location.state;

  return (
    <div>
      <h2>Goal Analysis</h2>
      {/* Render your goal and analysisResult */}
    </div>
  );
}

export default ResultsPage;
