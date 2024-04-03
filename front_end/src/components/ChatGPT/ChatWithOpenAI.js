import React, { useState } from 'react';
import store from '../../store';

function ChatWithOpenAI() {
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const accessToken = store.getState().auth.accessToken;
        // Setup headers with Authorization
        try {
            const response = await fetch('/api/chat/', { // Adjust this URL to your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` // Include the token here
                },
                body: JSON.stringify({ content: inputValue }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setResponse(data.response);
        } catch (error) {
            console.error("Failed to fetch response from OpenAI:", error);
            setResponse("Failed to get response.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="messageInput">Your Message:</label>
                <input
                    type="text"
                    id="messageInput"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button type="submit">Send</button>
            </form>
            {response && <p>Response: {response}</p>}
        </div>
    );
}

export default ChatWithOpenAI;
