import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import "./QuestionList.css";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();

    const intervalId = setInterval(() => {
      fetchQuestions();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.48/qna_api/get_questions.php"
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const markAsAnswered = async (id) => {
    console.log("Marking as answered, ID:", id);
    try {
      await axios.post("http://192.168.0.48/qna_api/mark_answered.php", { id });
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q.id === id ? { ...q, answered: 1 } : q))
      );
    } catch (error) {
      console.error("Error marking question as answered:", error);
    }
  };

  return (
    <Container maxWidth="sm" className="list-container">
      <Typography variant="h5" align="center" gutterBottom className="title">
        รายการคำถาม
      </Typography>
      <Paper elevation={3} className="question-list">
        <List>
          {questions.length > 0 ? (
            questions.map((q) => (
              <ListItem key={q.id} className="question-item">
                <ListItemText primary={q.question_text} />
                <Button
                  variant="contained"
                  className={q.answered == 1 ? "answered-button" : "read-button"}
                  onClick={() => markAsAnswered(q.id)}
                  disabled={q.answered == 1}
                >
                  {q.answered == 1 ? "ตอบแล้ว" : "อ่านแล้ว"}
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" align="center">
              ยังไม่มีคำถาม
            </Typography>
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default QuestionList;
