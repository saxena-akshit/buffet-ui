import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat'; // Import the custom hook

function ChatbotPage() {
    // Use the custom hook to manage chat state and logic
    const { messages, loading, sendMessage } = useChat();
    // Local state for the input field value
    const [input, setInput] = useState('');

    // Refs for scrolling
    const messagesEndRef = useRef(null);
    const messageContainerRef = useRef(null);

    // Form submission handler
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) return; // Don't send empty messages

        sendMessage(trimmedInput); // Call the sendMessage function from the hook
        setInput(''); // Clear the input field locally
    };

    // Effect to scroll to the bottom whenever messages change
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
            {/* Header/Title */}

            <h1 className="text-2xl md:text-3xl font-bold mb-1 text-center text-transparent bg-clip-text text-gray-200 flex-shrink-0">
                Investment Chatbot
            </h1>
            <h1 className="text-2xl md:text-xl mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-gold-light flex-shrink-0">
                ~ Powered by Buffett AI
            </h1>

            {/* Message Display Area */}
            <div
                ref={messageContainerRef}
                className="flex-grow overflow-y-auto mb-4 space-y-4 p-4 md:p-6 bg-black bg-opacity-20 rounded-xl border border-dark-border shadow-inner"
            >
                {/* Render messages dynamically from the hook's state */}
                {messages.length === 0 ? (
                    <p className="text-dark-text-secondary italic text-center py-10">
                        Ask a question about Warren Buffett's investment philosophy...
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

                {/* Loading indicator (driven by hook's state) */}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-dark-card text-dark-text rounded-t-xl rounded-br-xl shadow-md py-2 px-4 inline-flex items-center space-x-2">
                            <span className="w-2 h-2 bg-brand-gold-light rounded-full animate-pulse delay-75"></span>
                            <span className="w-2 h-2 bg-brand-gold-light rounded-full animate-pulse delay-150"></span>
                            <span className="w-2 h-2 bg-brand-gold-light rounded-full animate-pulse delay-300"></span>
                        </div>
                    </div>
                )}

                {/* Empty div to ensure scrolling works */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleFormSubmit} className="flex-shrink-0 flex items-center bg-dark-card p-2 rounded-xl shadow-lg border border-dark-border focus-within:ring-2 focus-within:ring-brand-purple transition-all duration-300">
                <input
                    type="text"
                    value={input} // Use local input state
                    onChange={(e) => setInput(e.target.value)} // Update local input state
                    placeholder="Ask about Buffett's principles..."
                    className="flex-grow p-3 bg-transparent text-dark-text border-none focus:outline-none placeholder-dark-text-secondary disabled:opacity-50"
                    aria-label="Chat message input"
                    disabled={loading} // Use loading state from hook
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()} // Use loading state from hook
                    className="p-2.5 ml-2 bg-gradient-to-r from-brand-purple to-brand-purple-dark hover:from-brand-purple-light hover:to-brand-purple text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center shadow hover:shadow-lg"
                    aria-label="Send message"
                >
                    {/* Send Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </form>
        </div>
    );
}

export default ChatbotPage;
