// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import InfoCards from './components/InfoCards';
import TestimonialsSection from './components/TestimonialsSection';
import FAQsSection from './components/FAQsSection';
import StatisticsSection from './components/StatisticsSection';
import CombinedCharts from './components/CombinedCharts';
import ResumeAnalysis from './components/ResumeAnalysis';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div>
                        <Header />
                        <Hero />
                        <CombinedCharts />
                        <InfoCards />
                        <StatisticsSection />
                        <TestimonialsSection />
                        <FAQsSection />
                    </div>
                } />
                <Route path="/upload" element={<ResumeAnalysis />} /> {/* Route for FileUpload */}
            </Routes>
        </Router>
    );
}

export default App;
