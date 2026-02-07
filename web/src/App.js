import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Boardroom from './pages/Boardroom';
import Dashboard from './pages/Dashboard';
import Academy from './pages/Academy';
import Admin from './pages/Admin';
import ScrollToTop from './pages/ScrollToTop'; // Import

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Add ScrollToTop */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/boardroom/:projectId" element={<Boardroom />} />
        {/* Default redirect */}
        <Route path="/boardroom" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
