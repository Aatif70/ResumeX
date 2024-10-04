import React, { useState } from 'react';
import { Container, Typography, Box, LinearProgress, Paper, Card, CardContent, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2'; // For circular graph
import Chart from 'chart.js/auto'; // Required for Chart.js v3+
import { FaThumbsUp, FaComments } from 'react-icons/fa'; // Importing icons from react-icons
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebaseConfig"; // Adjust the path as necessary

const StyledPaper = styled(Paper)({
    padding: '40px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '80%',
    textAlign: 'center',
    marginBottom: '20px',
});


// Floating Action Buttons
const FeedbackFab = styled(Button)({
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    borderRadius: '50%',
    width: '56px',
    height: '56px',
    backgroundColor: '#00bcd4',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#0097a7',
    },
    zIndex: 1000,
});

const ChatbotFab = styled(Button)({
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    borderRadius: '50%',
    width: '56px',
    height: '56px',
    backgroundColor: '#00bcd4',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#0097a7',
    },
    zIndex: 1000,
});

// New button for generating report
const GenerateReportButton = styled(Button)({
    marginTop: '20px',
    backgroundColor: '#00bcd4',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#0097a7',
    },
});


// ATS Score and Analysis data (dummy data)
const atsScoreData = {
    labels: ['Skills Match', 'Experience', 'Formatting', 'ATS Keywords'],
    datasets: [{
        data: [80, 75, 90, 85],
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',  // Red with 60% opacity
            'rgba(54, 162, 235, 0.8)',  // Blue with 60% opacity
            'rgba(255, 206, 86, 0.8)',  // Yellow with 60% opacity
            'rgba(75, 192, 192, 0.8)'   // Green with 60% opacity
        ],
        borderWidth: 1,
        borderColor: '#fff',
    }],
};

const barChartData = {
    labels: ['Document Synopsis', 'Data Identification', 'Lexical Analysis', 'Syntactical Analysis'],
    datasets: [{
        label: 'Analysis Scores',
        data: [90, 75, 80, 85], // Example scores for each category
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
    }],
};


const tips = [
    { title: "Improve Skills Match", text: "Consider adding more keywords from the job description to better align your skills with the role." },
    { title: "Enhance Experience Section", text: "Detail your experience with specific examples that match the job requirements." },
    { title: "Refine Formatting", text: "Ensure that your resume formatting is consistent and easy to read." },
    { title: "Optimize ATS Keywords", text: "Incorporate industry-specific terms and keywords to improve your resume's ATS score." },
];

const TipsSection = styled(StyledPaper)(({ theme }) => ({
    textAlign: 'left', // Ensure text is left-aligned within the centered container
    maxWidth: '80%', // Limit width to make it look better centered
    margin: '40px auto', // Center horizontally
}));

const TipCard = styled('div')({
    marginBottom: '20px',
    marginTop: '30px',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const TipTitle = styled(Typography)({
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#00bcd4',
});

const TipText = styled(Typography)({
    fontSize: '1rem',
    color: '#333',
});


const ResumeAnalysis = () => {
    const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);
    const [reportGenerated, setReportGenerated] = useState(false); // State for report generation
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); // State for feedback dialog
    const [feedback, setFeedback] = useState(''); // State for feedback input
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State for chatbot
    const isMobile = useMediaQuery('(max-width:600px)');
    const [overallScore, setOverallScore] = useState(85); // Example score

    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const websiteName = "ResumeX";
    const tagline = "Smart Insights for Smarter Resumes";

    // Handle file selection and validation
    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     if (selectedFile) {
    //         const isValidFile = selectedFile.size <= 5 * 1024 * 1024; // 5 MB limit
    //         const isValidType = ['application/pdf'].includes(selectedFile.type);

    //         if (isValidFile && isValidType) {
    //             setFile(selectedFile);
    //             setError('');
    //         } else {
    //             setError('File must be a PDF less than 5MB.');
    //         }
    //     }
    // };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf' && selectedFile.size <= 5 * 1024 * 1024) {
            setFile(selectedFile);
            setError('');
        } else {
            setError('Please upload a valid PDF file less than 5MB.');
        }
    };
    

    // Handle file removal
    const handleReset = () => {
        setFile(null);
        setError('');
        setUploadProgress(0);
    };

    // Handle file upload and navigate to UploadPage
    const handleUpload = () => {
        if (file) {
            const storageRef = ref(storage, `resumes/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error('Error uploading file:', error);
                    setError('Error uploading file');
                },
                () => {
                    // Handle successful uploads on complete
                    console.log('File uploaded successfully');
                    setIsAnalysisVisible(true);
                    alert('File uploaded successfully!'); // Alert message
                }
            );
        } else {
            setError('Please select a file to upload.');
        }
    };

    const sectionStyle = {
        marginTop: '50px',
        padding: '30px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
        margin: '20px auto',
        width: '80%',
      };
    
      const cardContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      };
    
      const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        background: '#ffffff',
        transition: 'transform 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      };
    
      const cardHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '10px',
      };
    
      const iconStyle = {
        marginRight: '8px',
      };
    
      const cardContentStyle = {
        fontSize: '1rem',
        color: '#333',
      };
    
      const messageStyle = {
        marginTop: '5px',
        color: 'green',
        fontWeight: '500',
      };
    
      // Complete analysis data
      const analysisData1 = [
        { title: 'ATS Compliance', iconType: 'check', result: 'Compliant', message: 'Your resume appears to be compliant with applicant tracking systems. Awesome!' },
        { title: 'File Type', iconType: 'check', result: 'PDF document', message: 'The file type of your resume is: PDF document. Great!' },
        { title: 'File Size', iconType: 'check', result: '59 KB', message: 'This is small enough to likely avoid any transmission issues.' },
        { title: 'Page Count', iconType: 'check', result: '1 Page', message: 'This matches the page count of the most effective resumes.' },
        { title: 'Word Count', iconType: 'check', result: '453 Words', message: 'Great job! This matches the word count of the most effective resumes.' },
    ];

    const analysisData2 = [
        { title: 'Phone Number', iconType: 'check', result: '9196075530', message: 'We have successfully detected your phone number on your resume. If this is not correct, check your formatting.' },
        { title: 'E-mail Address', iconType: 'check', result: 'bahakimwaleed08@gmail.com', message: 'We have successfully detected your e-mail address on your resume.' },
        { title: 'LinkedIn URL', iconType: 'cross', result: 'Not Found', message: 'We were unable to detect your LinkedIn URL. Consider including this for better visibility.' },
        { title: 'Education Section', iconType: 'check', result: 'Detected', message: 'Fantastic! We have successfully detected an Education section.' },
        { title: 'Work History Section', iconType: 'check', result: 'Detected', message: 'Awesome! Your resume includes a Work History section.' },
        { title: 'Skills / Achievements Section', iconType: 'check', result: 'Detected', message: 'Superb! We have detected a Skills/Achievements section.' },
        { title: 'Date Formatting', iconType: 'check', result: 'Conventional', message: 'The dates on your resume appear to be formatted correctly. Great!' },
    ];

    const analysisData3= [
        { title: 'Personal Pronouns', iconType: 'check', result: 'None Detected', message: 'Perfect job! No personal pronouns were detected.' },
        { title: 'Numericized Data', iconType: 'check', result: 'Included', message: 'Good stuff! You have numericized your results.' },
        { title: 'Vocabulary Level', iconType: 'check', result: '5.5 out of 10', message: 'Magnificent! The vocabulary level on your resume is balanced.' },
        { title: 'Reading Level', iconType: 'check', result: '5.1 out of 10', message: 'Magnificent! The reading level on your resume is optimal.' },
        { title: 'Common Words', iconType: 'check', result: 'Using, Aurangabad, Academy', message: 'Each of these words appear frequently in your resume, representing your core themes.' },
    ];

    const analysisData4 = [
        { title: 'Measurable Achievements', iconType: 'cross', result: '0 Achievements', message: 'This is on the low end. We recommend adding more numerically quantified achievements.' },
        { title: 'Soft Skills', iconType: 'check', result: 'Adaptable, Adept, Dedicated', message: 'Your resume contains around 7 soft skills. Superb!' },
        { title: 'Hard Skills', iconType: 'check', result: 'Android, AWS, CSS, JavaScript, etc.', message: 'Your resume includes 17 hard skills. Awesome!' },
        { title: 'Skills Efficiency Ratio', iconType: 'check', result: '2.43', message: 'Fabulous! This is a solid skills efficiency ratio.' },
    ];


    const data = {
        labels: ['Soft Skills', 'Hard Skills'],
        datasets: [
          {
            label: 'Skills Efficiency Ratio',
            data: [7, 17], // Your soft skills and hard skills count
            backgroundColor: ['#AEC6E8', '#5A5AFC'], // Adjust colors as per your need
            hoverBackgroundColor: ['#99BADD', '#4D4DE8'],
          },
        ],
      };
      
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };
      
      const SkillsEfficiencyRatio = () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', width: '100%' }}>
        <div style={{ height: '200px', width: '200px'}}>
          <Doughnut data={data} options={options} />
        </div>
        </div>
      ); 


    const getIcon = (type) => {
        switch (type) {
          case 'check':
            return <FaCheckCircle color="green" style={iconStyle} />;
          case 'cross':
            return <FaTimesCircle color="red" style={iconStyle} />;
          case 'question':
            return <FaQuestionCircle color="orange" style={iconStyle} />;
          default:
            return null;
        }
    };

    const handleGenerateReport = () => {
        // Simulate report generation
        setReportGenerated(true);
        setTimeout(() => {
            setReportGenerated(false); // Reset report status after some time
        }, 5000); // Simulate report generation delay
    };

    const handleFeedbackSubmit = () => {
        // Handle feedback submission
        console.log("User Feedback:", feedback);
        setIsFeedbackOpen(false);
        setFeedback(''); // Clear the feedback input
    };

    return (
        <Container
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            padding: '0 2rem',
        }}>

         {/* Header with website name and tagline */}
         <div style={{ marginBottom: '40px' }}>
                <Typography
                    variant="h2"
                    style={{
                        color: '#00bcd4',
                        fontWeight: 'bold',
                        textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {websiteName}
                </Typography>
                <Typography
                    variant="h6"
                    style={{
                        color: '#0097a7',
                        marginTop: '10px',
                        fontStyle: 'italic',
                    }}
                >
                    {tagline}
                </Typography>
            </div>
            
            {!isAnalysisVisible && (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div
                            style={{
                                border: '2px dashed #00bcd4',
                                borderRadius: '10px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: '#f0f8ff',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                                cursor: 'pointer',
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                handleFileChange({ target: { files: e.dataTransfer.files } });
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Drag and Drop or Click to Select a File
                            </Typography>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload">
                                <Button variant="contained" color="primary" component="span">
                                    Choose File
                                </Button>
                            </label>
                            {file && (
                                <>
                                    <Typography variant="body2" style={{ marginTop: '10px' }}>
                                        {file.name}
                                    </Typography>
                                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                        <Button variant="outlined" color="secondary" onClick={handleReset}>
                                            Remove File
                                        </Button>
                                        <Button variant="contained" color="success" onClick={handleUpload}>
                                            Upload File
                                        </Button>
                                    </div>
                                </>
                            )}
                            {error && (
                                <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
                                    {error}
                                </Typography>
                            )}
                        </div>
                    </motion.div>

                    {/* Upload button and progress bar */}
                    <Box mt={4}>
                        {isScanning && (
                            <Box mt={2} width="100%">
                                <LinearProgress variant="determinate" value={uploadProgress} />
                                <Typography variant="body2" color="textSecondary">
                                    Uploading: {uploadProgress}%
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                            Upload Your Resume
                        </Typography>
                        <Typography variant="body1">
                            Please upload your resume in PDF format to receive an ATS score and detailed analysis.
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Ensure your file size is less than 5MB.
                        </Typography>
                    </motion.div>
                </>
            )}

        {/* ATS Score and Analysis Cards */}
        {isAnalysisVisible && (
            <div style={{ marginTop: '10px', width: '100%' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card style={{ backgroundColor: '#fff', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)', borderRadius: '12px', marginBottom: '20px' }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" style={{ marginBottom: '20px', fontWeight: 'bolder'}}>
                                    Your Resume Score: <span style={{ color: 'green', fontSize: 30}}>{overallScore}</span>
                                </Typography>
                                <div style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Doughnut 
                                        data={{
                                            labels: ['Score'],
                                            datasets: [{
                                            data: [overallScore, 100 - overallScore],
                                            backgroundColor: ['#36A2EB', '#D3D3D3'],
                                            }],
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card style={{ backgroundColor: '#fff', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)', borderRadius: '12px', marginBottom: '20px' }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" style={{ marginBottom: '20px', fontWeight: 'bolder'}}>
                                    Analysis Breakdown
                                </Typography>
                                <div style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Bar data={barChartData} />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>     


                <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bolder', fontSize: '60px' }}>Detail Resume Analysis</h2>

                <div style={sectionStyle}>
                    <h2 style={{ textAlign: 'left', marginBottom: '20px', fontWeight: 'bolder'}}>Document Synopsis</h2>
                        <div style={cardContainerStyle}>
                            {analysisData1.map((item, index) => (
                                <div key={index} style={cardStyle}>
                                    <div style={cardHeaderStyle}>
                                        {getIcon(item.iconType)}
                                        {item.title}
                                    </div>
                                    <div style={cardContentStyle}>
                                        <p>{item.result}</p>
                                        <p style={messageStyle}>{item.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>


                <div style={sectionStyle}>
                    <h2 style={{ textAlign: 'left', marginBottom: '20px', fontWeight: 'bolder'}}>Data Identification</h2>
                        <div style={cardContainerStyle}>
                            {analysisData2.map((item, index) => (
                                <div key={index} style={cardStyle}>
                                    <div style={cardHeaderStyle}>
                                        {getIcon(item.iconType)}
                                        {item.title}
                                    </div>
                                    <div style={cardContentStyle}>
                                        <p>{item.result}</p>
                                        <p style={messageStyle}>{item.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>


                <div style={sectionStyle}>
                    <h2 style={{ textAlign: 'left', marginBottom: '20px', fontWeight: 'bolder'}}> Lexical Analysis </h2>
                        <div style={cardContainerStyle}>
                            {analysisData3.map((item, index) => (
                                <div key={index} style={cardStyle}>
                                    <div style={cardHeaderStyle}>
                                        {getIcon(item.iconType)}
                                        {item.title}
                                    </div>
                                    <div style={cardContentStyle}>
                                        <p>{item.result}</p>
                                        <p style={messageStyle}>{item.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>

                <div style={sectionStyle}>
  <h2 style={{ textAlign: 'left', marginBottom: '20px', fontWeight: 'bolder' }}>
    Semantic Analysis
  </h2>
  <div style={cardContainerStyle}>
    {analysisData4.map((item, index) => (
      <div key={index} style={cardStyle}>
        <div style={cardHeaderStyle}>
          {getIcon(item.iconType)}
          {item.title}
        </div>
        <div style={cardContentStyle}>
          <p>{item.result}</p>
          <p style={messageStyle}>{item.message}</p>

          {/* Add the chart here only for Skills Efficiency Ratio */}
          {item.title === 'Skills Efficiency Ratio' && <SkillsEfficiencyRatio />}
        </div>
      </div>
    ))}
  </div>
</div>


                    {/* Tips Section */}
                    <TipsSection>
                        <Typography variant="h5" fontWeight="Bold" style={{ marginBottom: '20px', textAlign: 'center' }}>
                            Tips to Improve Your Resume
                        </Typography>
                        {tips.map((tip, index) => (
                            <TipCard key={index}>
                                <TipTitle variant="h6">{tip.title}</TipTitle>
                                <TipText variant="body1">{tip.text}</TipText>
                            </TipCard>
                        ))}
                    </TipsSection>

                    {/* Generate Report Button */}
                    <div style={{ marginTop: '5px' }}>
                        <GenerateReportButton
                            variant="contained"
                            color="primary"
                            onClick={handleGenerateReport}
                            disabled={reportGenerated}
                        >
                            {reportGenerated ? 'Report Generated' : 'Generate Report'}
                        </GenerateReportButton>
                    </div>
                </div>
            )}

            {/* Report Generated Message */}
            {reportGenerated && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6" style={{ color: '#00bcd4' }}>
                        Your report has been generated!
                    </Typography>
                    {/* You can include more information or a link to download the report */}
                </div>
            )}

            {/* Floating Action Buttons with Tooltips */}
            <Tooltip title="Feedback" placement="left" arrow>
                <FeedbackFab onClick={() => setIsFeedbackOpen(true)}>
                    <FaThumbsUp />
                </FeedbackFab>
            </Tooltip>

            <Tooltip title="Chat with Us" placement="left" arrow>
                <ChatbotFab onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
                    <FaComments />
                </ChatbotFab>
            </Tooltip>

            {/* Feedback Dialog */}
            <Dialog open={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)}>
                <DialogTitle>Provide Feedback</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Your Feedback"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsFeedbackOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFeedbackSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Placeholder for Chatbot UI */}
            {isChatbotOpen && (
                <div style={{ position: 'fixed', bottom: '100px', right: '100px', width: '300px', height: '400px', backgroundColor: '#fff', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)', borderRadius: '12px', padding: '20px' }}>
                    <Typography variant="h6">Chatbot</Typography>
                    <Typography variant="body2">How can I assist you?</Typography>
                    {/* You can replace this with an actual chatbot implementation */}
                </div>
            )}
        </Container>
    );
};

export default ResumeAnalysis;