import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function App() {
  return (
    <Router>
      <Routes>
        {/* หน้าแรกสำหรับส่งคำถาม */}
        <Route path="/question-form" element={<QuestionForm />} />
        
        {/* หน้าแสดงรายการคำถามสำหรับพิธีกร */}
        <Route path="/question-list" element={<QuestionList />} />
      </Routes>
    </Router>
  );
}

export default App;
