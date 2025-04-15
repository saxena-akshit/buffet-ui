import React from 'react';
import { Link } from 'react-router-dom';

// Simple inline SVG icons as placeholders
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-brand-purple">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-3.04 8.25-6.75 8.25a8.254 8.254 0 0 1-4.13-.996l-3.612 1.026a.75.75 0 0 1-.976-.976l1.026-3.612a8.254 8.254 0 0 1-.996-4.13C3.75 7.444 6.79 3.75 11.25 3.75S18.75 7.444 18.75 12c0 .464-.033.92-.096 1.368a.75.75 0 0 1-1.4.248c.054-.35.08-.704.08-1.068c0-3.496-2.35-6.375-5.25-6.375S6 8.504 6 12s2.35 6.375 5.25 6.375c.364 0 .718-.026 1.068-.08a.75.75 0 0 1 .248 1.4A9.755 9.755 0 0 1 11.25 20.25C7.5 20.25 4.5 16.556 4.5 12z" />
    </svg>
);

const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-brand-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v16.5h16.5M18.75 18.75l-4.5-4.5-2.625 2.625-3.375-3.375" />
    </svg>
);


function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light via-brand-gold-light to-brand-purple">
                Buffett Insights Financial Analyzer
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                {/* Chatbot Section */}
                <Link to="/chatbot" className="bg-gradient-to-br from-dark-card to-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer border border-dark-border group">
                    <ChatIcon />
                    <h2 className="text-2xl font-semibold mb-3 text-white">
                        AI Investment Chatbot
                    </h2>
                    <p className="text-dark-text-secondary mb-4">
                        Get Warren Buffett investment insights through conversation.
                    </p>
                    {/* Removed disabled button, added styled span */}
                    <span className="mt-auto px-6 py-2 bg-gradient-to-r from-brand-purple to-brand-purple-dark group-hover:from-brand-purple-light group-hover:to-brand-purple text-white font-semibold rounded-md transition-all duration-300 shadow group-hover:shadow-lg">
                        Start Chatting
                    </span>
                </Link>

                {/* Dashboard Section */}
                <Link to="/dashboard" className="bg-gradient-to-br from-dark-card to-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer border border-dark-border group">
                    <ChartIcon />
                    <h2 className="text-2xl font-semibold mb-3 text-white">
                        Financial Statement Dashboard
                    </h2>
                    <p className="text-dark-text-secondary mb-4">
                        Analyze key financials and Buffett ratios for public companies.
                    </p>
                    <span className="mt-auto px-6 py-2 bg-gradient-to-r from-brand-purple to-brand-purple-dark group-hover:from-brand-purple-light group-hover:to-brand-purple text-white font-semibold rounded-md transition-all duration-300 shadow group-hover:shadow-lg">
                        Go to Dashboard
                    </span>
                </Link>

            </div>
        </div>
    );
}

export default HomePage;