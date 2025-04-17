import React from 'react';
import { Link } from 'react-router-dom';
// Import Lucide icons
import { MessageCircle, LayoutDashboard } from 'lucide-react';

// Removed old inline SVG icon components

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 text-center bg-dark-bg">
            {/* Title - More impactful */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-24 tracking-tight text-brand-purple">
                Buffett Insights <br className="hidden md:block" /> Financial Analyzer
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                {/* Chatbot Card (Purple Accent - Lucide Icon & Hover Effect) */}
                <Link to="/chatbot" className="bg-dark-card rounded-xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] cursor-pointer border border-dark-border group ring-1 ring-transparent hover:ring-brand-purple-light">
                    {/* Lucide Icon with hover effect */}
                    <MessageCircle className="w-12 h-12 mb-5 text-brand-purple transition-all duration-300 group-hover:text-brand-purple-light group-hover:scale-110" strokeWidth={1.5} />
                    <h2 className="text-2xl font-semibold mb-3 text-dark-text">
                        AI Investment Chatbot
                    </h2>
                    <p className="text-dark-text-secondary mb-4 flex-grow">
                        Get Warren Buffett investment insights through conversation.
                    </p>
                    {/* Purple Button */}
                    <span className="mt-auto px-6 py-2 bg-gradient-to-r from-brand-purple to-brand-purple-dark group-hover:from-brand-purple-light group-hover:to-brand-purple text-white font-semibold rounded-lg transition-all duration-300 shadow-md group-hover:shadow-lg">
                        Start Chatting
                    </span>
                </Link>

                {/* Dashboard Card (Gold/Orange Accent - Lucide Icon & Hover Effect) */}
                <Link to="/dashboard" className="bg-dark-card rounded-xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] cursor-pointer border border-dark-border group ring-1 ring-transparent hover:ring-brand-gold-light">
                    {/* Lucide Icon with hover effect */}
                    <LayoutDashboard className="w-12 h-12 mb-5 text-brand-gold transition-all duration-300 group-hover:text-brand-gold-light group-hover:scale-110" strokeWidth={1.5} />
                    <h2 className="text-2xl font-semibold mb-3 text-dark-text">
                        Financial Statement Dashboard
                    </h2>
                    <p className="text-dark-text-secondary mb-4 flex-grow">
                        Analyze key financials and Buffett ratios for public companies.
                    </p>
                    {/* Gold/Orange Button */}
                    <span className="mt-auto px-6 py-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark group-hover:from-brand-gold-light group-hover:to-brand-gold text-white font-semibold rounded-lg transition-all duration-300 shadow-md group-hover:shadow-lg">
                        Go to Dashboard
                    </span>
                </Link>

            </div>
        </div>
    );
}

export default HomePage;