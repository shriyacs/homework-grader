import React from 'react';
import './Student.css';
import { useNavigate } from 'react-router-dom';


export default function StudentView() {
  const mockAssignments = [
    { id: 1, title: 'Math Homework', dueDate: '2025-05-05', description: 'Complete chapters 5 and 6.' },
    { id: 2, title: 'Science Project', dueDate: '2025-05-10', description: 'Prepare a presentation on renewable energy.' }
  ];

  const mockGrades = [
    { assignmentId: 1, assignmentTitle: 'Math Homework', value: 92, feedback: 'Great job!' },
    { assignmentId: 2, assignmentTitle: 'Science Project', value: 88, feedback: 'Well researched.' }
  ];

  const navigate = useNavigate();

  return (
    <div className="student-container">
      <header className="student-header">
        <h1>Student Portal</h1>
        <button onClick={function() {navigate('/');}} className="logout-button">
          Logout
        </button>
      </header>

      <div className="student-content">
        <section className="assignments-section">
          <h2>Current Assignments</h2>
          {mockAssignments.map(assignment => (
            <div key={assignment.id} className="assignment-card">
              <h3>{assignment.title}</h3>
              <p><strong>Due:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
              <p>{assignment.description}</p>
            </div>
          ))}
        </section>

        <section className="grades-section">
          <h2>Your Grades</h2>
          {mockGrades.length > 0 ? (
            <table className="grades-table">
              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Grade</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {mockGrades.map(grade => (
                  <tr key={grade.assignmentId}>
                    <td>{grade.assignmentTitle}</td>
                    <td>{grade.value}%</td>
                    <td>{grade.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No grades available yet</p>
          )}
        </section>
      </div>
    </div>
  );
}
