import React from 'react';

// Inline SVG Icons for Check/Cross/Minus
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const CrossIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


const MeetsIcon = ({ meets }) => {
    if (meets === true) {
        return <span title="Meets Rule"><CheckIcon /></span>;
    } else if (meets === false) {
        return <span title="Does Not Meet Rule"><CrossIcon /></span>;
    } else {
        return <span title="Not Applicable"><MinusIcon /></span>;
    }
};

function RatiosTable({ ratios }) {
    if (!Array.isArray(ratios) || ratios.length === 0) {
        return <p className="dark:text-dark-text-secondary">No ratio data available.</p>;
    }

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg border border-dark-border">
            <table className="w-full text-sm text-left text-dark-text-secondary">
                <thead className="text-xs uppercase bg-dark-card dark:bg-opacity-50 text-dark-text-secondary">
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
                        <tr key={index} className={`border-b dark:border-dark-border ${index % 2 === 0 ? 'bg-dark-card bg-opacity-20' : 'bg-dark-card bg-opacity-40'} hover:bg-dark-card-hover`}>
                            <th scope="row" className="py-4 px-6 font-medium text-dark-text whitespace-nowrap">
                                {ratio.name || 'N/A'}
                            </th>
                            <td className="py-4 px-6">
                                {ratio.value !== undefined ? ratio.value : 'N/A'}
                            </td>
                            <td className="py-4 px-6">
                                {ratio.rule || 'N/A'}
                            </td>
                            <td className="py-4 px-6 flex justify-center items-center">
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
