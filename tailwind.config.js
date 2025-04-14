/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Make sure this covers your file types
    ],
    darkMode: 'class', // Enable dark mode based on class
    theme: {
        extend: {
            colors: {
                // Define your custom colors
                // Using common names, adjust hex codes as needed
                'brand-purple': '#6B46C1', // Example Purple
                'brand-gold': '#D69E2E',   // Example Gold
                // Dark theme colors
                'dark-bg': '#1A202C',      // Dark background
                'dark-card': '#2D3748',    // Darker card/element background
                'dark-text': '#E2E8F0',    // Light text for dark background
                'dark-text-secondary': '#A0AEC0', // Dimmer text
                'dark-border': '#4A5568',  // Borders in dark mode
            },
            fontFamily: {
                // Optional: Add a modern font like Inter
                // sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [
        // require('@tailwindcss/forms'), // Uncomment if you installed the forms plugin
    ],
}