import store from '../store';

//Function for the form creation step
export const analyzeGoal = async (goal, setAnalysisResult, setCurrentStep, setIsAnalyzing) => {
    const accessToken = store.getState().auth.accessToken; // Retrieve the access token
    const goal_text = Object.values(goal).join(' '); // Combine all goal inputs into a single string

    setIsAnalyzing(true); // Start analyzing
    try {
        const response = await fetch('/api/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ content: goal_text }),
        });

        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }

        const data = await response.json();
        setAnalysisResult(data.response); // Assuming server returns analysis in 'response' key
        setCurrentStep('results'); // Move to results after receiving analysis
    } catch (error) {
        console.error("Failed to fetch response from API:", error);
        setAnalysisResult("Failed to get response.");
    } finally {
        setIsAnalyzing(false); // Stop analyzing
    }
};
