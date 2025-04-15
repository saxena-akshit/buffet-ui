import React, { useState } from 'react'; // Import useState

// --- Ratio Explanations ---
// Storing explanations in a simple object, keyed by ratio name
const ratioExplanations = {
    "Gross Margin": "Measures profitability after deducting the direct costs (Cost of Goods Sold) from revenue. A high margin (Buffett likes > 40%) suggests the company has pricing power and isn't just competing on price.",
    "SG&A / Gross Profit": "Selling, General & Administrative expenses as a percentage of Gross Profit. Shows overhead efficiency. Buffett prefers low overhead (< 30%) as wide-moat companies often don't need excessive spending here.",
    "R&D / Gross Profit": "Research & Development spending relative to Gross Profit. Buffett is wary of businesses needing constant high R&D, as it doesn't always translate to shareholder value. Prefers < 30% or none.",
    "Depreciation / Gross Profit": "Depreciation expense relative to Gross Profit. Reflects the cost of maintaining physical assets. Buffett prefers businesses that don't need heavy capital investment in depreciating assets (< 10%).",
    "Interest Exp / Operating Income": "Interest Expense as a percentage of Operating Income (or EBIT). Measures the burden of debt relative to operating profitability. Great businesses often require little debt (< 15%).",
    "Income Tax Rate": "Taxes paid (Tax Provision) as a percentage of Pre-Tax Income. Profitable companies typically pay close to the statutory corporate tax rate.",
    "Net Margin": "Overall profitability (Net Income / Total Revenue). Shows how much of each dollar in revenue translates to bottom-line profit. Buffett likes consistently high margins (> 20%).",
    "EPS Growth (YoY)": "Year-over-year percentage change in Earnings Per Share. Great companies consistently grow their profits per share.",
    "Cash vs Current Debt": "Compares readily available cash & equivalents to debt due within one year. Ideally, cash should exceed current debt, indicating strong liquidity.",
    "Debt to Equity": "Measures financial leverage (Total Liabilities / Total Shareholder Equity). A lower ratio (< 0.80) indicates the company finances itself more with equity than debt, which Buffett prefers.",
    "Preferred Stock": "Indicates if the company uses preferred stock financing. Buffett generally dislikes this as it adds complexity and obligations senior to common shareholders.",
    "Retained Earnings Growth (YoY)": "Shows if the company is increasing its cumulative reinvested profits year-over-year. Consistent growth indicates profits are being effectively reinvested back into the business.",
    "Treasury Stock Exists?": "Indicates if the company has repurchased its own shares (shown as a negative value in equity). Buffett views buybacks favorably when done at good prices.",
    "CapEx / Net Income": "Capital Expenditures (investments in long-term assets) as a percentage of Net Income. A low ratio (< 25%) suggests the company doesn't need to spend heavily on equipment/assets to generate profits (capital light)."
};
// --- End Ratio Explanations ---


// Inline SVG Icons
const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-300 group-hover:text-blue-100 cursor-help"> {/* Changed cursor */}
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
);


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

    // State to track which tooltip is hovered (using index)
    const [hoveredTooltip, setHoveredTooltip] = useState(null);

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
                            {/* Ratio Name Cell with Tooltip Trigger */}
                            <th scope="row" className="py-4 px-6 font-medium text-dark-text whitespace-nowrap relative">
                                {/* Wrap name and icon in a div for hover events and relative positioning context */}
                                <div
                                    className="flex items-center space-x-2 group cursor-help" // Use group for potential icon styling on hover
                                    onMouseEnter={() => setHoveredTooltip(index)}
                                    onMouseLeave={() => setHoveredTooltip(null)}
                                >
                                    <span>{ratio.name || 'N/A'}</span>
                                    <InfoIcon /> {/* Icon indicates information is available */}

                                    {/* Tooltip - Absolutely Positioned ABOVE, Conditionally Rendered */}
                                    {hoveredTooltip === index && (
                                        <div
                                            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs z-30 p-2 text-s font-normal text-dark-text bg-dark-bg rounded-md shadow-xl border border-dark-border pointer-events-none whitespace-normal"
                                        >
                                            {ratioExplanations[ratio.name] || 'No explanation available.'}
                                        </div>
                                    )}
                                </div>
                            </th>
                            {/* Other Cells */}
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
