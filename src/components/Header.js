import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const styles = {
    appBar: {
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        zIndex: 1,
        position: 'relative',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 4rem',
    },
    title: {
        fontWeight: 'bold',
        color: '#00bcd4', // Same color as button
        letterSpacing: '2px',
        transition: 'transform 0.3s ease',
        textShadow: '0 0 4px rgba(0, 188, 212, 0.5)', // Decreased glow intensity and range
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        margin: '0 10px',
        fontSize: '16px',
        fontWeight: '600',
        textTransform: 'uppercase',
        borderRadius: '20px',
        padding: '10px 24px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: '#00bcd4',
        border: '2px solid rgba(0, 188, 212, 0.9)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
    },
};

function Header() {
    return (
        <AppBar position="static" style={styles.appBar}>
            <Toolbar style={styles.toolbar}>
                <Typography variant="h4" style={styles.title}>
                    ResumeX
                </Typography>
                <div style={styles.buttonContainer}>
                    {['Features', 'Analysis'].map((text, index) => (
                        <motion.div
                            key={text}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Button
                                href={`#${text.toLowerCase()}`}
                                style={styles.button}
                                aria-label={text}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(0, 188, 212, 0.7)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {text}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
