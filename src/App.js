import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import TeacherDashboard from './pages/Teacher';
import StudentView from './pages/Student';

function App() {
  return (
    <BrowserRouter basename="/homework-grader">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teacher" element={<TeacherDashboard />}/>
        <Route path="/student" element={<StudentView />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;