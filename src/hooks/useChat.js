import { useState, useCallback } from 'react';
import { sendMessageToBot } from '../services/chatbotService';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const addMessage = useCallback((sender, text) => {
        const newMessage = {
            id: Date.now() + Math.random(),
            sender: sender,
            text: text,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
    }, []);

    const sendMessage = useCallback(async (userMessageText, selectedModel) => {
        if (!userMessageText || loading) return;

        addMessage('user', userMessageText);
        setLoading(true);

        try {
            // Pass the selected model to the service function
            const botReplyText = await sendMessageToBot(userMessageText, selectedModel);
            addMessage('bot', botReplyText);
        } catch (error) {
            // Use error message thrown by the service
            addMessage('bot', error.message || "Sorry, an unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }, [addMessage, loading]);

    return {
        messages,
        loading,
        sendMessage,
    };
};
