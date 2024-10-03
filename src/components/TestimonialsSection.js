import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaMale, FaFemale } from 'react-icons/fa'; // Gender icons
import { motion, AnimatePresence } from 'framer-motion';
import { Paper, Typography, Container, Modal, Box } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSwipeable } from 'react-swipeable'; // For two-finger swipe

function TestimonialsSection() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // To control background blur

    const testimonials = [
        {
            icon: <FaMale size={80} color="#ff4081" />, // Male icon
            name: "John Doe",
            feedback: "ResumeX helped me get my dream job! The analysis was accurate and insightful.",
        },
        {
            icon: <FaFemale size={80} color="#ff4081" />, // Female icon
            name: "Jane Smith",
            feedback: "The ATS score feature is a game-changer. My resume finally stands out to recruiters.",
        },
        {
            icon: <FaMale size={80} color="#ff4081" />,
            name: "Michael Johnson",
            feedback: "I was able to improve my resume formatting and keyword usage thanks to ResumeX!",
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => setOpenModal(false),
        onSwipedRight: () => setOpenModal(false),
        trackTouch: true,
        preventDefaultTouchmoveEvent: true,
    });

    const handleOpenModal = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setOpenModal(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTestimonial(null);
        setIsModalOpen(false);
    };

    return (
        <Container
            style={{
                marginTop: '50px',
                padding: '40px 20px',
                background: 'rgba(255, 255, 255, 0.15)', // Glassmorphic background
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: isModalOpen ? 'blur(10px)' : 'none', // Blur background when modal is open
                transition: 'backdrop-filter 0.3s ease-in-out',
            }}
            id="testimonials"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <Typography variant="h4" style={{ fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: '20px' }}>
                    What People Are Saying
                </Typography>

                <Slider {...settings} style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }} // Slight scale on hover
                            transition={{ duration: 0.3 }}
                            onClick={() => handleOpenModal(testimonial)} // Open modal on click
                        >
                            <Paper 
                                elevation={3} 
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '30px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Softer, semi-transparent background
                                    borderRadius: '12px',
                                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)', // Shadow for visibility
                                    margin: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer', // Make clickable
                                    border: '1px solid rgba(255, 255, 255, 0.5)', // Visible border for glassmorphic look
                                }}
                            >
                                {testimonial.icon} {/* Icon */}
                                <Typography variant="h6" style={{ color: '#ff4081', marginTop: '10px' }}>
                                    {testimonial.name}
                                </Typography>
                                <Typography variant="body2" style={{ color: '#555', marginTop: '10px' }}>
                                    {testimonial.feedback.slice(0, 50)}... {/* Shorten feedback */}
                                </Typography>
                            </Paper>
                        </motion.div>
                    ))}
                </Slider>
            </motion.div>

            {/* Modal for showing full testimonial */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box 
                    {...handlers} // Apply swipeable handlers for two-finger swipe
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        backgroundColor: 'rgba(255, 255, 255, 1)', // Modal with full opacity
                        border: '2px solid #ff4081',
                        boxShadow: 24,
                        borderRadius: '20px',
                        padding: '20px',
                        textAlign: 'center',
                        outline: 'none',
                    }}
                >
                    <AnimatePresence>
                        {selectedTestimonial && (
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                transition={{ duration: 0.3 }}
                            >
                                {selectedTestimonial.icon}
                                <Typography variant="h6" style={{ color: '#ff4081', marginTop: '10px' }}>
                                    {selectedTestimonial.name}
                                </Typography>
                                <Typography variant="body2" style={{ color: '#555', marginTop: '10px' }}>
                                    {selectedTestimonial.feedback}
                                </Typography>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>
            </Modal>

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

export default TestimonialsSection;
