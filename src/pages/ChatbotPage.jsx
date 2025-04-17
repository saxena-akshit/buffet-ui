import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat'; // Import the custom hook

// Simple Toggle Switch Component
const ToggleSwitch = ({ model, setModel }) => {
    const isRag = model === 'rag';

    const handleToggle = () => {
        setModel(isRag ? 'gemini' : 'rag');
    };

    return (
        <div className="flex items-center justify-center space-x-3 mb-4">
            <span className={`font-medium text-sm ${!isRag ? 'text-brand-gold-light' : 'text-dark-text-secondary'}`}>
                Gemini
            </span>
            <button
                type="button"
                onClick={handleToggle}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card ${isRag ? 'bg-brand-purple focus:ring-brand-purple-light' : 'bg-brand-gold focus:ring-brand-gold-light'}`}
                role="switch"
                aria-checked={isRag}
            >
                <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${isRag ? 'translate-x-6' : 'translate-x-1'}`}
                />
            </button>
            <span className={`font-medium text-sm ${isRag ? 'text-brand-purple-light' : 'text-dark-text-secondary'}`}>
                Custom RAG
            </span>
        </div>
    );
};


function ChatbotPage() {
    const { messages, loading, sendMessage } = useChat();
    const [input, setInput] = useState('');
    // State for the selected model ('gemini' or 'rag')
    const [selectedModel, setSelectedModel] = useState('gemini'); // Default to Gemini

    const messagesEndRef = useRef(null);
    const messageContainerRef = useRef(null);

    // Updated submit handler to pass the selected model
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput || loading) return;

        // Pass the current selectedModel to the sendMessage function
        sendMessage(trimmedInput, selectedModel);
        setInput('');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
            }
        }, 0);
        return () => clearTimeout(timer);
    }, [messages]);

    return (
        <div className="flex flex-col h-screen p-4 md:p-6 bg-gradient-to-b from-dark-bg to-gray-900 text-dark-text">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-gold-light flex-shrink-0">
                AI Investment Chatbot
            </h1>

            {/* Message Display Area */}
            <div
                ref={messageContainerRef}
                className="flex-grow overflow-y-auto mb-4 space-y-4 p-4 md:p-6 bg-black bg-opacity-20 rounded-xl border border-dark-border shadow-inner"
            >
                {messages.length === 0 ? (
                    <p className="text-dark-text-secondary italic text-center py-10">
                        Select a model below and ask a question...
                    </p>
                ) : (
                    messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`shadow-md py-2 px-4 max-w-[75%] md:max-w-[65%] ${message.sender === 'user'
                                    ? 'bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white rounded-t-xl rounded-bl-xl'
                                    : 'bg-dark-card text-dark-text rounded-t-xl rounded-br-xl'
                                }`}>
                                {message.text}
                            </div>
                        </div>
                    ))
                )}
                {loading && (<div className="flex justify-start"> <div className="bg-dark-card text-dark-text rounded-t-xl rounded-br-xl shadow-md py-2 px-4 inline-flex items-center space-x-2"> <span className="w-2 h-2 bg-brand-gold-light rounded-full animate-pulse delay-75"></span> <span className="w-2 h-2 bg-brand-gold-light rounded-full animate-pulse delay-150"></span> <span className="w-2 h-2 bg-brand-gold-light rounded-full animate-pulse delay-300"></span> </div> </div>)}
                <div ref={messagesEndRef} />
            </div>

            {/* Model Toggle Switch */}
            <div className="flex-shrink-0 mb-2">
                <ToggleSwitch model={selectedModel} setModel={setSelectedModel} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleFormSubmit} className="flex-shrink-0 flex items-center bg-dark-card p-2 rounded-xl shadow-lg border border-dark-border focus-within:ring-2 focus-within:ring-brand-purple transition-all duration-300">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Ask ${selectedModel === 'gemini' ? 'Gemini' : 'Custom RAG'} about Buffett...`} // Dynamic placeholder
                    className="flex-grow p-3 bg-transparent text-dark-text border-none focus:outline-none placeholder-dark-text-secondary disabled:opacity-50"
                    aria-label="Chat message input"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="p-2.5 ml-2 bg-gradient-to-r from-brand-purple to-brand-purple-dark hover:from-brand-purple-light hover:to-brand-purple text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center shadow hover:shadow-lg"
                    aria-label="Send message"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /> </svg>
                </button>
            </form>
        </div>
    );
}

export default ChatbotPage;

