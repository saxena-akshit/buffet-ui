// tailwind.config.js

// Import defaultTheme for extending font families correctly
/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

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
                // Dark theme palette - Darker
                'dark-bg': '#020617',          // slate-950 (Very dark background)
                'dark-card': '#0F172A',       // slate-900 (Card background)
                'dark-card-hover': '#1E293B', // slate-800 (Hover state)
                'dark-input': '#1E293B',      // slate-800 (Input field background)
                'dark-text': '#E2E8F0',        // slate-200 (Primary light text)
                'dark-text-secondary': '#94A3B8', // slate-400 (Secondary/dimmer text)
                'dark-border': '#1E293B',      // slate-800 (Borders)
                'tooltip-bg': '#1E293B',      // slate-800 (Tooltip background)
                'message-area-bg': 'rgba(0, 0, 0, 0.4)', // Custom message area bg
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        // require('@tailwindcss/forms'),
    ],
}
