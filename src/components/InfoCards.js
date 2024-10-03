// src/components/InfoCards.js
import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

function InfoCards() {
    const cardsData = [
        {
            title: "AI-Powered Analysis",
            description: "Utilize advanced AI algorithms to analyze your resume and get actionable insights."
        },
        {
            title: "ATS Optimization",
            description: "Optimize your resume to pass through Applicant Tracking Systems with a higher success rate."
        },
        {
            title: "Detailed Feedback",
            description: "Get in-depth feedback on each section of your resume to make it more impactful."
        }
    ];

    return (
        <Container
            style={{
                marginTop: '50px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.15)', // Light background with transparency for glassmorphism
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(15px)', // Backdrop blur effect
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ marginBottom: '40px', textAlign: 'center' }}
            >
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
                    Why Choose Us?
                </Typography>
                <Typography variant="h6" component="p" style={{ marginBottom: '20px', color: '#555' }}>
                    Discover the benefits of our AI-driven resume analysis.
                </Typography>
            </motion.div>

            <Grid container spacing={4}>
                {cardsData.map((card, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                        >
                            <Card
                                style={{
                                    height: '100%',
                                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Softer, semi-transparent background
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.boxShadow = '0px 15px 35px rgba(0, 0, 0, 0.2)';
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.boxShadow = '0px 10px 30px rgba(0, 0, 0, 0.15)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                                aria-label={`${card.title} Card`}
                            >
                                <CardContent>
                                    <Typography variant="h5" component="h2" style={{ color: '#333' }}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" component="p" style={{ color: '#666' }}>
                                        {card.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* Blob Shape Animation */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle at 30% 30%, rgba(167, 119, 227, 0.5), transparent)',
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
}

export default InfoCards;
