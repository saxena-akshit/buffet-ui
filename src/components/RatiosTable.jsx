import React from 'react';

// Define icons for meeting rules (simple emojis for now)
const MeetsIcon = ({ meets }) => {
    if (meets === true) {
        return <span className="text-green-500" title="Meets Rule">✅</span>;
    } else if (meets === false) {
        return <span className="text-red-500" title="Does Not Meet Rule">❌</span>;
    } else {
        // Handle 'N/A' or other non-boolean cases
        return <span className="text-gray-500 dark:text-dark-text-secondary" title="Not Applicable">➖</span>;
    }
};

function RatiosTable({ ratios }) {
    // Ensure ratios is an array before trying to map
    if (!Array.isArray(ratios) || ratios.length === 0) {
        return <p className="dark:text-dark-text-secondary">No ratio data available.</p>;
    }

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Ratio Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Value
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Buffett Rule
                        </th>
                        <th scope="col" className="py-3 px-6 text-center">
                            Meets Rule?
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {ratios.map((ratio, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-dark-card dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {ratio.name || 'N/A'}
                            </th>
                            <td className="py-4 px-6">
                                {ratio.value !== undefined ? ratio.value : 'N/A'}
                            </td>
                            <td className="py-4 px-6">
                                {ratio.rule || 'N/A'}
                            </td>
                            <td className="py-4 px-6 text-center">
                                <MeetsIcon meets={ratio.meets} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RatiosTable;
