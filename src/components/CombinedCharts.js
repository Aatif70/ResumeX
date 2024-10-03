import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Container, Grid, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

function CombinedCharts() {
    // Bar Chart Data
    const chartData = {
        labels: ['Skills Match', 'Experience', 'Formatting', 'ATS Keywords'],
        datasets: [
            {
                label: 'Score',
                data: [80, 75, 90, 85],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: '#4BC0C0',
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                },
            },
        },
    };

    // Pie Chart Data
    const pieData = {
        labels: ['Technical Skills', 'Soft Skills', 'Experience', 'Education'],
        datasets: [
            {
                data: [35, 25, 30, 10],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                borderWidth: 1,
                borderColor: '#fff',
            },
        ],
    };

    return (
        <Container
            style={{
                marginTop: '50px',
                textAlign: 'center',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.1)', // Slightly darker to enhance the glass effect
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(15px)', // Backdrop blur effect
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            }}
            id="analysis"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ marginBottom: '40px' }}
            >
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
                    Analysis Overview
                </Typography>
                <Typography variant="h6" component="p" style={{ marginBottom: '20px', color: '#555' }}>
                    Understand how your resume performs with our detailed analysis.
                </Typography>
            </motion.div>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Paper
                            elevation={3}
                            style={{
                                padding: '20px',
                                borderRadius: '20px',
                                background: 'rgba(255, 255, 255, 0.2)', // Glass effect for cards
                                backdropFilter: 'blur(20px)', // Stronger blur for glass effect
                                border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
                                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow for cards
                            }}
                        >
                            <Typography variant="h6" gutterBottom style={{ color: '#333' }}>
                                Skills Analysis
                            </Typography>
                            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Bar data={chartData} options={barOptions} />
                            </div>
                        </Paper>
                    </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Paper
                            elevation={3}
                            style={{
                                padding: '20px',
                                borderRadius: '20px',
                                background: 'rgba(255, 255, 255, 0.2)', // Glass effect for cards
                                backdropFilter: 'blur(20px)', // Stronger blur for glass effect
                                border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
                                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow for cards
                            }}
                        >
                            <Typography variant="h6" gutterBottom style={{ color: '#333' }}>
                                Resume Content Breakdown
                            </Typography>
                            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Pie data={pieData} options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
                                            },
                                        },
                                    },
                                }} />
                            </div>
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>

            {/* New Section with Card Text Below Charts */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ marginTop: '40px' }}
            >
                <Typography variant="h6" gutterBottom style={{ color: '#333' }}>
                    Optimize Your Resume with AI Insights
                </Typography>
                <Typography variant="body1" style={{ color: '#666' }}>
                    Our AI-powered analysis covers key areas including skills match, experience relevance, and formatting.
                    Optimize your resume for ATS systems and stand out to employers.
                </Typography>
            </motion.div>
        </Container>
    );
}

export default CombinedCharts;
