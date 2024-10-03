// src/components/StatisticsSection.js
import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const statsData = [
    { label: 'Resumes Analyzed', value: '10,000+' },
    { label: 'User Satisfaction', value: '98%' },
    { label: 'Job Success Rate', value: '85%' },
];

const StatisticsSection = () => {
    return (
        <Container
            style={{
                marginTop: '50px',
                padding: '40px 20px',
                background: 'rgba(255, 255, 255, 0.15)', // Glassmorphic background
                backdropFilter: 'blur(15px)', // Glassmorphism effect
                borderRadius: '20px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <Typography
                    variant="h4"
                    style={{
                        fontWeight: 'bold',
                        color: '#333',
                        marginBottom: '30px',
                    }}
                >
                    Our Impact in Numbers
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {statsData.map((stat, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <motion.div
                                whileHover={{ scale: 1.05 }} // Slight scale on hover
                                transition={{ duration: 0.3 }}
                            >
                                <Paper
                                    elevation={3}
                                    style={{
                                        padding: '20px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        borderRadius: '12px',
                                        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
                                        border: '1px solid rgba(255, 255, 255, 0.5)', // Glassmorphic border
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        style={{ color: '#ff4081', fontWeight: 'bold' }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        style={{ color: '#333', marginTop: '10px' }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>

            {/* Blob Shape for background */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle at 30% 30%, rgba(119, 227, 167, 0.5), transparent)', // Soft color for the blob
                    borderRadius: '50%',
                    filter: 'blur(150px)',
                    zIndex: 0,
                    top: '10%',
                    left: '50%',
                    transform: 'translate(-50%, -10%)',
                }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
                transition={{ duration: 8, loop: Infinity, ease: 'easeInOut' }}
            ></motion.div>
        </Container>
    );
};

export default StatisticsSection;
