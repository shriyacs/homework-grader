import React, { useState, useEffect } from 'react';

export default function GradeReport() {
  const [submissions, setSubmissions] = useState([]);

  // Dummy student submissions
  useEffect(() => {
    const dummySubmissions = [
      {
        id: 1,
        studentName: 'John Doe',
        assignmentTitle: 'Math Assignment 1',
        grade: '',
        feedback: '',
      },
      {
        id: 2,
        studentName: 'Jane Smith',
        assignmentTitle: 'Math Assignment 1',
        grade: '',
        feedback: '',
      },
      {
        id: 3,
        studentName: 'Emily Davis',
        assignmentTitle: 'History Essay',
        grade: '',
        feedback: '',
      },
      {
        id: 4,
        studentName: 'Chris Lee',
        assignmentTitle: 'Computer Science Project',
        grade: '',
        feedback: '',
      },
    ];

    setSubmissions(dummySubmissions);
  }, []);

  const handleGradeChange = (id, value) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, grade: value } : sub
      )
    );
  };

  const handleFeedbackChange = (id, value) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, feedback: value } : sub
      )
    );
  };

  const handleSave = (id) => {
    const updated = submissions.find((sub) => sub.id === id);
    alert(`Saved grade for ${updated.studentName}: ${updated.grade}%`);
  };

  return (
    <div className="grade-report-container">
      <h2>Grade Student Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Assignment</th>
            <th>Grade (%)</th>
            <th>Feedback</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.studentName}</td>
              <td>{sub.assignmentTitle}</td>
              <td>
                <input
                  type="number"
                  value={sub.grade}
                  onChange={(e) =>
                    handleGradeChange(sub.id, e.target.value)
                  }
                  min="0"
                  max="100"
                  placeholder="Enter grade"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={sub.feedback}
                  onChange={(e) =>
                    handleFeedbackChange(sub.id, e.target.value)
                  }
                  placeholder="Enter feedback"
                />
              </td>
              <td>
                <button onClick={() => handleSave(sub.id)}>
                  Save Grade
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
