
// src/pages/StockDashboard.jsx (Placeholder)
import React, { useState } from 'react';
import axios from 'axios'; // Or use fetch

import RatiosTable from '../components/RatiosTable';
import StatementTable from '../components/StatementTable';

function StockDashboard() {
    const [symbol, setSymbol] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchData = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!symbol.trim()) {
            setError("Please enter a stock symbol.");
            return;
        }
        setLoading(true);
        setData(null); // Clear previous data
        setError(null); // Clear previous error

        // IMPORTANT: Replace with the actual URL of your Django backend
        // If your Django backend is running on http://127.0.0.1:8000
        const apiUrl = `http://127.0.0.1:8000/api/financials/${symbol.toUpperCase()}/`;

        try {
            const response = await axios.get(apiUrl);
            setData(response.data);
        } catch (err) {
            console.error("API Error:", err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(`Error ${err.response.status}: ${err.response.data.error || 'Failed to fetch data.'}`);
            } else if (err.request) {
                // The request was made but no response was received
                setError("Network Error: Could not connect to the backend API. Is it running?");
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(`An unexpected error occurred: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                Stock Financial Dashboard
            </h1>

            {/* Input Form */}
            <form onSubmit={handleFetchData} className="mb-8 max-w-md mx-auto flex items-center bg-white dark:bg-dark-card p-4 rounded-lg shadow-md">
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter Stock Symbol (e.g., AAPL)"
                    className="flex-grow p-3 border border-gray-300 dark:border-dark-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-purple dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    aria-label="Stock Symbol Input"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="p-3 bg-brand-purple hover:bg-purple-700 text-white font-semibold rounded-r-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Loading...' : 'Analyze'}
                </button>
            </form>

            {/* Loading State */}
            {loading && (
                <div className="text-center text-brand-gold dark:text-brand-gold">
                    <p>Loading financial data...</p>
                    {/* You could add a spinner icon here */}
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="text-center text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 p-4 rounded-md max-w-lg mx-auto">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                </div>
            )}

            {/* Results Display Area */}
            {data && !loading && !error && (
                // Use grid or flex layout for results sections
                <div className="mt-8 space-y-8">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-brand-gold">
                        Analysis for {data.symbol}
                    </h2>

                    {/* Section for Ratios Table */}
                    <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-4 md:p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Key Buffett Ratios</h3>
                        <RatiosTable ratios={data.ratios} />
                    </div>

                    {/* Section for Financial Statements */}
                    <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-4 md:p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Financial Statements</h3>
                        {/* Use the StatementTable component for each statement */}
                        <div className="space-y-6"> {/* Add space between statement tables */}
                            <StatementTable title="Income Statement" statement={data.incomeStatement} />
                            <StatementTable title="Balance Sheet" statement={data.balanceSheet} />
                            <StatementTable title="Cash Flow" statement={data.cashFlow} />
                        </div>
                    </div>

                    {/* Raw JSON for debugging (Optional) */}
                    {/* <pre className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded overflow-x-auto text-xs">
                  {JSON.stringify(data, null, 2)}
              </pre> */}
                </div>
            )}

        </div>
    );
}

export default StockDashboard;