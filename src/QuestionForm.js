import React, { useState } from 'react';
import axios from 'axios';
import './QuestionForm.css'; // นำเข้าไฟล์ CSS

function QuestionForm() {
    const [question, setQuestion] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://192.168.0.48/qna_api/submit_question.php', { question_text: question });
            setShowPopup(true);
            setQuestion(''); // รีเซ็ตคำถาม
            setTimeout(() => setShowPopup(false), 3000); // ปิดป๊อปอัพอัตโนมัติ
        } catch (error) {
            console.error("Error submitting question:", error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="question-form">
                <h2>ส่งคำถามของคุณ</h2>
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="พิมพ์คำถามของคุณที่นี่..."
                    required
                    className="textarea"
                />
                <button type="submit" className="submit-button">ส่งคำถาม</button>
            </form>
            {showPopup && <div className="popup">ส่งคำถามสำเร็จ</div>}
        </div>
    );
}

export default QuestionForm;
