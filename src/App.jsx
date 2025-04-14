// src/App.jsx (Updated: Apply 'dark' class to <html> element)
import React, { useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StockDashboard from './pages/StockDashboard';
// import Header from './components/Header'; // Optional: Commented out - Component not created

function App() {
  // Apply 'dark' class to the root <html> element for Tailwind darkMode: 'class'
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');

    // Optional: Cleanup function to remove the class if the App unmounts
    // return () => {
    //   root.classList.remove('dark');
    // };
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    // The 'dark' class is now managed on the <html> tag by the useEffect hook
    <div>
      <Router>
        {/* Optional: Add a persistent Header */}
        {/* <Header /> */} {/* Commented out - Component not created */}
        {/* Apply min-h-screen here or ensure body takes full height */}
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<StockDashboard />} />
            {/* Add other routes here if needed */}
          </Routes>
        </main>
        {/* Optional: Add a persistent Footer */}
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;