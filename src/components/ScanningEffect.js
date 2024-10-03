// src/components/ScanningEffect.js
import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Button } from '@mui/material';
import { motion } from 'framer-motion';

function ScanningEffect({ fileUploaded }) {
    const [scanning, setScanning] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);

    React.useEffect(() => {
        if (fileUploaded) {
            setScanning(true);
            setScanComplete(false);
            const scanningDuration = 5000; // Simulated scanning duration

            const timer = setTimeout(() => {
                setScanning(false);
                setScanComplete(true);
            }, scanningDuration);

            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, [fileUploaded]);

    return (
        <Container style={{ marginTop: '50px', textAlign: 'center' }}>
            {scanning ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div style={{
                        height: '300px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '12px',
                        backgroundColor: '#fff',
                        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <CircularProgress
                            style={{ position: 'absolute', zIndex: 1 }}
                            size={80}
                            color="primary"
                        />
                        <Typography variant="h6" component="p">
                            Scanning Your Resume...
                        </Typography>
                    </div>
                </motion.div>
            ) : scanComplete ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Typography variant="h6" component="p">
                        Scanning Complete!
                    </Typography>
                    <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                        View Results
                    </Button>
                </motion.div>
            ) : (
                <Typography variant="body1">
                    Upload a resume to see the scanning effect.
                </Typography>
            )}
        </Container>
    );
}

export default ScanningEffect;
