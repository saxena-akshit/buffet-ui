import React from 'react';

function StatementTable({ title, statement }) {
    // Basic validation and data extraction
    if (!Array.isArray(statement) || statement.length === 0) {
        return <p className="dark:text-dark-text-secondary italic mt-4">No data available for {title}.</p>;
    }

    // Determine headers (years/dates) dynamically from the keys of the first item, excluding 'Item'
    // Sort headers chronologically (most recent first)
    const headers = Object.keys(statement[0] || {})
        .filter(key => key !== 'Item')
        .sort((a, b) => new Date(b) - new Date(a)); // Sort dates descending

    return (
        <div className="mt-6"> {/* Add margin top for spacing between tables */}
            <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{title}</h4>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {/* First header is 'Item' */}
                            <th scope="col" className="py-3 px-6 sticky left-0 bg-gray-50 dark:bg-gray-700 z-10">
                                Item
                            </th>
                            {/* Dynamically generated year/date headers */}
                            {headers.map(header => (
                                <th key={header} scope="col" className="py-3 px-6 text-right">
                                    {header} {/* Display date/year */}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {statement.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-dark-card dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {/* Financial Item Name (sticky column) */}
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white sticky left-0 bg-white dark:bg-dark-card z-10">
                                    {item.Item || 'N/A'}
                                </th>
                                {/* Dynamically generated value cells */}
                                {headers.map(header => (
                                    <td key={header} className="py-4 px-6 text-right">
                                        {/* API already formats numbers/NA */}
                                        {item[header] !== undefined ? item[header] : 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StatementTable;