import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';
import { Switch } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

// Bot Avatar - Solid Color
const BotAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-sm font-bold text-white flex-shrink-0 mr-3 shadow">
        AI
    </div>
);
// User Avatar Placeholder
const UserAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-sm font-bold text-slate-300 flex-shrink-0 ml-3 shadow">
        U
    </div>
);

const ModelToggleSwitch = ({ model, setModel }) => {
    const isRag = model === 'rag';
    return (
        <div className="flex items-center justify-center space-x-4">
            <span className={`font-semibold text-xs transition-colors ${!isRag ? 'text-brand-gold-light' : 'text-dark-text-secondary'}`}>
                Gemini
            </span>
            <Switch
                checked={isRag}
                onChange={() => setModel(isRag ? 'gemini' : 'rag')}
                className={`${isRag ? 'bg-brand-purple' : 'bg-brand-gold' // Use solid colors
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-brand-purple-light shadow-inner`} // Adjusted size slightly
            >
                <span className="sr-only">Select Model</span>
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out shadow ${ // Removed shadow-lg for cleaner knob
                        isRag ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </Switch>
            <span className={`font-semibold text-xs transition-colors ${isRag ? 'text-brand-purple-light' : 'text-dark-text-secondary'}`}>
                Custom RAG
            </span>
        </div>
    );
};


function ChatbotPage() {
    const { messages, loading, sendMessage } = useChat();
    const [input, setInput] = useState('');
    const [selectedModel, setSelectedModel] = useState('gemini');

    const messagesEndRef = useRef(null);
    const messageContainerRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput || loading) return;
        sendMessage(trimmedInput, selectedModel);
        setInput('');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
            }
        }, 50);
        return () => clearTimeout(timer);
    }, [messages]);

    return (
        // Main container - Apply user's width/centering preference
        <div className="flex flex-col h-screen bg-dark-bg text-dark-text p-4 sm:p-6 w-full md:w-2/3 mx-auto"> {/* Added w-full md:w-2/3 mx-auto */}
            {/* Header */}
            <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-center text-slate-200 flex-shrink-0">
                AI Investment Chatbot
            </h1>

            {/* Message Display Area - Darker BG */}
            <div
                ref={messageContainerRef}
                className="flex-grow overflow-y-auto mb-4 space-y-4 p-4 bg-message-area-bg rounded-xl border border-dark-border shadow-inner" // Using custom color from config
            >
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            className={`flex w-full ${message.sender === 'user' ? 'justify-end' : 'justify-start items-end'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <div className={`flex items-start max-w-[85%] md:max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {message.sender === 'bot' ? <BotAvatar /> : <UserAvatar />}
                                <div className={`shadow-md py-2 px-4 rounded-lg ${message.sender === 'user' ? 'bg-brand-purple text-white' : 'bg-dark-input text-dark-text'}`}> {/* Using dark-input for bot bubble */}
                                    <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Loading indicator - Minimal Text */}
                {loading && (
                    <motion.div
                        className="flex items-start w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <BotAvatar />
                        <div className="bg-dark-input text-dark-text rounded-lg shadow-md py-2.5 px-4">
                            <p className="text-sm text-dark-text-secondary animate-pulse">Thinking...</p>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Footer Area containing Input and Switch */}
            <div className="flex-shrink-0 pt-2">
                {/* Input Form */}
                <form onSubmit={handleFormSubmit} className="flex items-center bg-dark-card p-2 rounded-xl shadow-md border border-dark-border focus-within:ring-2 focus-within:ring-brand-purple transition-all duration-300">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Ask ${selectedModel === 'gemini' ? 'Gemini (Buffett Style)' : 'Custom RAG'}...`}
                        className="flex-grow p-3 bg-transparent text-slate-100 border-none focus:outline-none placeholder-slate-500 disabled:opacity-50 text-sm"
                        aria-label="Chat message input"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="p-2.5 ml-2 bg-brand-purple hover:bg-brand-purple-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-brand-purple-light text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow hover:shadow-md"
                        aria-label="Send message"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /> </svg>
                    </button>
                </form>

                {/* Model Toggle Switch - Below Input */}
                <div className="mt-3 flex justify-center"> {/* Adjusted margin */}
                    <ModelToggleSwitch model={selectedModel} setModel={setSelectedModel} />
                </div>
            </div>

        </div> // End main container div
    );
}

export default ChatbotPage;
