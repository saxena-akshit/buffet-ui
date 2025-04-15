/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'; // Import defaultTheme

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'brand-purple': '#6B46C1',
                'brand-purple-light': '#805AD5',
                'brand-purple-dark': '#553C9A',
                'brand-gold': '#D69E2E',
                'brand-gold-light': '#ECC94B',
                'brand-gold-dark': '#B7791F',
                'dark-bg': '#1A202C',
                'dark-card': '#2D3748',
                'dark-card-hover': '#4A5568', // Added hover state for cards
                'dark-text': '#E2E8F0',
                'dark-text-secondary': '#A0AEC0',
                'dark-border': '#4A5568',
                'tooltip-bg': '#4A5568',
            },
            fontFamily: {
                // Set Poppins as the default sans-serif font
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        // require('@tailwindcss/forms'),
    ],
}
