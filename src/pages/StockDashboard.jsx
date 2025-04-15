import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatiosTable from '../components/RatiosTable';
import StatementTable from '../components/StatementTable';

function StockDashboard() {
    const [symbol, setSymbol] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchData = async (e) => {
        e.preventDefault();
        if (!symbol.trim()) {
            setError("Please enter a stock symbol.");
            return;
        }
        setLoading(true);
        setData(null);
        setError(null);
        const apiUrl = `http://127.0.0.1:8000/api/financials/${symbol.toUpperCase()}/`; // Ensure backend URL is correct

        try {
            const response = await axios.get(apiUrl);
            setData(response.data);
        } catch (err) {
            console.error("API Error:", err);
            if (err.response) {
                setError(`Error ${err.response.status}: ${err.response.data.error || 'Failed to fetch data.'}`);
            } else if (err.request) {
                setError("Network Error: Could not connect to the backend API. Is it running?");
            } else {
                setError(`An unexpected error occurred: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        // Use padding instead of container for edge-to-edge feel if desired, or keep container
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-gold-light">
                Financial Dashboard
            </h1>

            {/* Input Form */}
            <form onSubmit={handleFetchData} className="mb-10 max-w-lg mx-auto flex items-center bg-gradient-to-r from-dark-card to-gray-800 p-1 rounded-lg shadow-lg border border-dark-border focus-within:ring-2 focus-within:ring-brand-purple transition-all duration-300">
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter Stock Symbol (e.g., AAPL)"
                    className="flex-grow p-3 bg-dark-card text-dark-text border-none rounded-l-md focus:outline-none placeholder-dark-text-secondary"
                    aria-label="Stock Symbol Input"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="p-3 px-5 bg-gradient-to-r from-brand-purple to-brand-purple-dark hover:from-brand-purple-light hover:to-brand-purple text-white font-semibold rounded-r-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : 'Analyze'}
                </button>
            </form>

            {/* Loading State */}
            {loading && (
                <div className="text-center text-brand-gold-light flex justify-center items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-brand-gold-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading financial data...</span>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="text-center text-red-400 bg-red-900 bg-opacity-30 border border-red-700 p-4 rounded-lg max-w-lg mx-auto">
                    <p className="font-semibold text-red-300">Error:</p>
                    <p>{error}</p>
                </div>
            )}

            {/* Results Display Area */}
            {data && !loading && !error && (
                <div className="mt-10 space-y-10">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-brand-gold-light">
                        Analysis for {data.symbol}
                    </h2>

                    {/* Section for Ratios Table */}
                    <div className="bg-gradient-to-br from-dark-card to-gray-800 rounded-xl shadow-xl p-4 md:p-6 border border-dark-border">
                        <h3 className="text-xl font-semibold mb-4 text-brand-purple-light">Key Buffett Ratios</h3>
                        <RatiosTable ratios={data.ratios} />
                    </div>

                    {/* Section for Financial Statements */}
                    <div className="bg-gradient-to-br from-dark-card to-gray-800 rounded-xl shadow-xl p-4 md:p-6 border border-dark-border">
                        <h3 className="text-xl font-semibold mb-4 text-brand-purple-light">Financial Statements</h3>
                        <div className="space-y-8"> {/* Add space between statement tables */}
                            <StatementTable title="Income Statement" statement={data.incomeStatement} />
                            <StatementTable title="Balance Sheet" statement={data.balanceSheet} />
                            <StatementTable title="Cash Flow" statement={data.cashFlow} />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default StockDashboard;