import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // Store a mock role if needed
    localStorage.setItem('userRole', role);
    navigate(`/${role}`);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Welcome to Homework Grader</h2>
        <p>Select your role to continue</p>

        <div className="role-buttons">
          <button className="role-button student" onClick={() => handleRoleSelect('student')}>
            I’m a Student
          </button>
          <button className="role-button teacher" onClick={() => handleRoleSelect('teacher')}>
            I’m a Teacher
          </button>
        </div>
      </div>
    </div>
  );
}
