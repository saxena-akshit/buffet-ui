import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 text-center">
            <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                Buffett Insights Financial Analyzer
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                {/* Chatbot Section (Dummy) */}
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl opacity-60 cursor-not-allowed">
                    {/* Icon Placeholder - Consider adding an SVG or icon library */}
                    <div className="text-5xl mb-4 text-brand-purple"> {/* Placeholder Icon Style */}
                        🤖
                    </div>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
                        AI Investment Chatbot
                    </h2>
                    <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                        Get Warren Buffett investment insights through conversation.
                    </p>
                    <button
                        disabled
                        className="mt-auto px-6 py-2 bg-gray-400 dark:bg-gray-600 text-white rounded-md cursor-not-allowed"
                    >
                        Coming Soon
                    </button>
                </div>

                {/* Dashboard Section */}
                <Link to="/dashboard" className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                    {/* Icon Placeholder */}
                    <div className="text-5xl mb-4 text-brand-gold"> {/* Placeholder Icon Style */}
                        📊
                    </div>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
                        Financial Statement Dashboard
                    </h2>
                    <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                        Analyze key financials and Buffett ratios for public companies.
                    </p>
                    {/* The Link component makes the whole card clickable */}
                    <span className="mt-auto px-6 py-2 bg-brand-purple hover:bg-purple-700 text-white font-semibold rounded-md transition-colors duration-200">
                        Go to Dashboard
                    </span>
                </Link>

            </div>
        </div>
    );
}

export default HomePage;