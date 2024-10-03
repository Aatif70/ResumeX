import React, { useState } from 'react';
import { Container, Paper, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

function FAQsSection() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const faqs = [
        {
            question: "What is ResumeX?",
            answer: "ResumeX is a comprehensive resume analysis platform designed to enhance your CV for better ATS scores and job search outcomes."
        },
        {
            question: "How does ResumeX work?",
            answer: "You upload your resume, and ResumeX scans it using advanced algorithms to provide feedback on formatting, keyword usage, and overall strength."
        },
        {
            question: "Can I get personalized feedback on my resume?",
            answer: "Yes, ResumeX provides detailed and personalized feedback based on your resume content and ATS requirements."
        },
        {
            question: "What is ATS and why is it important?",
            answer: "ATS (Applicant Tracking System) is software used by recruiters to scan resumes for relevant information. ResumeX optimizes your resume for better ATS compatibility."
        },
        {
            question: "Is my data secure with ResumeX?",
            answer: "Absolutely! We take privacy and security seriously and ensure that your data is safely stored and only used for the purpose of resume analysis."
        }
    ];

    return (
        <Container
            style={{
                marginTop: '50px',
                padding: '40px 20px',
                background: 'rgba(255, 255, 255, 0.15)', // Glassmorphic background
                backdropFilter: 'blur(15px)', // Background blur effect
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
            }}
            id="faqs"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <Typography variant="h4" style={{ fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: '20px' }}>
                    Frequently Asked Questions
                </Typography>

                {faqs.map((faq, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                        style={{
                            background: 'rgba(255, 255, 255, 0.7)', // Softer glassmorphic effect
                            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)', // Box shadow for better visibility
                            margin: '10px 0',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.5)', // Border for clear card visibility
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}a-content`}
                            id={`panel${index}a-header`}
                        >
                            <Typography variant="h6" style={{ color: '#ff4081' }}>
                                {faq.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Typography variant="body2" style={{ color: '#555' }}>
                                    {faq.answer}
                                </Typography>
                            </motion.div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </motion.div>

            {/* Blob Shape for background */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle at 30% 30%, rgba(167, 119, 227, 0.5), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(150px)',
                    zIndex: 0,
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -30%)',
                }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
                transition={{ duration: 8, loop: Infinity, ease: 'easeInOut' }}
            ></motion.div>
        </Container>
    );
}

export default FAQsSection;
