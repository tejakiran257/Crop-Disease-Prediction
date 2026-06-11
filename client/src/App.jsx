import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CropRecommendation from './pages/CropRecommendation';
import FertilizerRecommendation from './pages/FertilizerRecommendation';
import ChatAssistant from './pages/ChatAssistant';
import DiseaseDetection from './pages/DiseaseDetection';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crop-recommend" element={<CropRecommendation />} />
            <Route path="/fertilizer-recommend" element={<FertilizerRecommendation />} />
            <Route path="/chat" element={<ChatAssistant />} />
            <Route path="/disease-detect" element={<DiseaseDetection />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
