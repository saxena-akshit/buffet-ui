import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/chatbot/'; // Base url

/**
 * Sends a message to the chatbot backend API.
 * @param {string} userMessage - The message text from the user.
 * @returns {Promise<string>} - A promise that resolves with the bot's reply text.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const sendMessageToBot = async (userMessage) => {
    try {
        const response = await axios.post(API_URL, { message: userMessage });
        if (response.data && response.data.reply) {
            return response.data.reply;
        } else {
            // Handle cases where the backend response format is unexpected
            throw new Error("Invalid response format from bot API");
        }
    } catch (error) {
        console.error("Error sending message to bot:", error);
        // Rethrow or handle specific errors as needed
        throw error; // Let the caller handle the error display
    }
};
