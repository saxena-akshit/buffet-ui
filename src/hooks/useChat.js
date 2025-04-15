import { useState, useCallback } from 'react';
import { sendMessageToBot } from '../services/chatbotService'; // Import the API service

/**
 * Custom hook to manage chat state and logic.
 * @returns {object} - Contains messages array, loading state, and sendMessage function.
 */
export const useChat = () => {
    // State for messages in the conversation
    const [messages, setMessages] = useState([]);
    // State to track if waiting for bot response
    const [loading, setLoading] = useState(false);

    // Function to add a message to the state
    // useCallback ensures this function reference is stable unless dependencies change
    const addMessage = useCallback((sender, text) => {
        const newMessage = {
            id: Date.now() + Math.random(), // Add random number for better uniqueness
            sender: sender,
            text: text,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
    }, []); // No dependencies, setMessages is stable

    // Function to handle sending a message (invokes API)
    const sendMessage = useCallback(async (userMessageText) => {
        if (!userMessageText || loading) return; // Prevent sending empty or while loading

        // Add user message immediately
        addMessage('user', userMessageText);

        setLoading(true); // Set loading state

        try {
            // Call the API service
            const botReplyText = await sendMessageToBot(userMessageText);
            // Add bot response
            addMessage('bot', botReplyText);
        } catch (error) {
            // Add error message if API fails
            addMessage('bot', "Sorry, I couldn't get a response right now. Please try again later.");
        } finally {
            setLoading(false); // Reset loading state
        }
    }, [addMessage, loading]); // Depend on addMessage and loading

    // Return state and functions needed by the component
    return {
        messages,
        loading,
        sendMessage, // Expose the function to send messages
    };
};
