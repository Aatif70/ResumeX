import React from 'react';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0', // Updated background color for consistency
        }}>
            {/* Glassmorphic Background Card */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }} 
                style={{
                    position: 'absolute',
                    width: '80%',
                    height: '60%',
                    background: 'rgba(255, 255, 255, 0.15)', // Adjusted for stronger effect
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.18)', // Added border for glass effect
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                }}>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ textAlign: 'center', color: '#333' }}
                >
                    <Typography variant="h2" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
                        Elevate Your Resume with AI Insights
                    </Typography>
                    <Typography variant="h5" component="p" gutterBottom style={{ marginBottom: '20px', color: '#555' }}>
                        Smart Insights for Smart Resumes
                    </Typography>
                    <Typography variant="h6" component="p" gutterBottom style={{ marginBottom: '30px', color: '#777' }}>
                        Get an ATS score and detailed analysis to help you stand out.
                    </Typography>
                    <Link to="/upload" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            size="large"
                            style={{
                                backgroundColor: 'rgba(0, 188, 212, 0.9)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '25px',
                                fontSize: '18px',
                                boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
                                transition: 'background-color 0.3s, transform 0.3s',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 188, 212, 0.7)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 188, 212, 0.9)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                            aria-label="Get Started"
                        >
                            Get Started
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Blob Shape */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle at 30% 30%, #a777e3, transparent)',
                    borderRadius: '50%',
                    filter: 'blur(150px)',
                    zIndex: 0,
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -30%)'
                }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
                transition={{ duration: 8, loop: Infinity, ease: 'easeInOut' }}
            ></motion.div>
        </div>
    );
}

export default Hero;
