import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import './QuestionForm.css';

function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.0.48/qna_api/submit_question.php', { question_text: question });
      setShowPopup(true);
      setQuestion(''); // รีเซ็ตคำถาม
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Container disableGutters maxWidth={false} className="full-screen-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h5" align="center" gutterBottom className="form-title">
          ส่งคำถามของคุณ
        </Typography>
        <form onSubmit={handleSubmit} className="question-form">
          <TextField
            label="คำถาม"
            multiline
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="พิมพ์คำถามของคุณที่นี่..."
            fullWidth
            required
            variant="outlined"
            className="textarea"
          />
          <Button
            type="submit"
            variant="contained"
            className="submit-button"
            fullWidth
          >
            ส่งคำถาม
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={showPopup}
        autoHideDuration={3000}
        onClose={handleClosePopup}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClosePopup} severity="success" sx={{ width: '100%' }}>
          ส่งคำถามสำเร็จ!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default QuestionForm;
