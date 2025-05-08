import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AssignmentForm from '../components/AssignmentForm';
import GradeReport from '../components/GradeReport';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { subjectData, dummyAssignments, dummySubmissions } from './TeacherData';
import './Teacher.css';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assignments');
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editAssignment, setEditAssignment] = useState(null);
  const [subjects, setSubjects] = useState(['Computer Science', 'Mathematics', 'Physics']);
  const [selectedSubject, setSelectedSubject] = useState('Computer Science');

  useEffect(() => {
    const data = subjectData[selectedSubject] || { assignments: [], submissions: [] };
    setAssignments(data.assignments);
    setSelectedAssignment(data.assignments[0] || null);
    setSubmissions(data.submissions);
  }, [selectedSubject]);

  useEffect(() => {
    setAssignments(dummyAssignments);
    if (dummyAssignments.length > 0) {
      setSelectedAssignment(dummyAssignments[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedAssignment) {
      setSubmissions(dummySubmissions);
    }
  }, [selectedAssignment]);

  useEffect(() => {
    if ((activeTab === 'grades' || activeTab === 'analysis') && !selectedAssignment && assignments.length > 0) {
      setSelectedAssignment(assignments[0]);
    }
  }, [activeTab, assignments, selectedAssignment]);

  // ... rest of your component (unchanged)


  const publishGrades = () => {
    alert('Grades published to students!');
  };

  const gradeCategories = [
    { name: '90-100', color: '#10b981' },
    { name: '80-89', color: '#3b82f6' },
    { name: '70-79', color: '#f59e0b' },
    { name: '<70', color: '#ef4444' }
  ];

  const analysisData = gradeCategories.map(cat => {
    let count = submissions.filter(s => {
      const g = s.grade ?? -1;
      if (cat.name === '90-100') return g >= 90;
      if (cat.name === '80-89') return g >= 80 && g < 90;
      if (cat.name === '70-79') return g >= 70 && g < 80;
      if (cat.name === '<70') return g >= 0 && g < 70;
      return false;
    }).length;
    return { name: cat.name, value: count };
  });

  return (
    <div className="teacher-container">
      <header>
        <h1>Teacher Dashboard</h1>
        <div className="subject-selector">
          <label htmlFor="subject-select">My Subjects:</label>
          <div className="custom-select-wrapper">
            <select
              id="subject-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>
      </div>

        <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
      </header>

      <div className="menu-tabs">
        <button className={activeTab === 'create' ? 'active' : ''} onClick={() => setActiveTab('create')}>Create Assignment</button>
        <button className={activeTab === 'assignments' ? 'active' : ''} onClick={() => setActiveTab('assignments')}>Assignments</button>
        <button className={activeTab === 'grades' ? 'active' : ''} onClick={() => setActiveTab('grades')}>Grade Submissions</button>
        <button className={activeTab === 'analysis' ? 'active' : ''} onClick={() => setActiveTab('analysis')}>Class Analysis</button>
      </div>

      {activeTab === 'create' && (
          <div className="assignments-section">
            <h2>Create new Assignment</h2>
            <AssignmentForm onNewAssignment={(newAssign) => setAssignments([...assignments, newAssign])} />
          </div>
        )}

      <div className="tab-content">
      {activeTab === 'assignments' && (
  <div className="assignments-section">
    <h2>Your Assignments</h2>
    <ul>
      {assignments.map((assignment) => (
        <li
          key={assignment.id}
          className={selectedAssignment?.id === assignment.id ? 'active' : ''}
        >
          {isEditing && editAssignment?.id === assignment.id ? (
            <div>
              <input
                type="text"
                value={editAssignment.title}
                onChange={(e) =>
                  setEditAssignment({ ...editAssignment, title: e.target.value })
                }
              />
              <input
                type="date"
                value={editAssignment.dueDate}
                onChange={(e) =>
                  setEditAssignment({ ...editAssignment, dueDate: e.target.value })
                }
              />
              <textarea
                rows="3"
                value={editAssignment.questions}
                onChange={(e) =>
                  setEditAssignment({ ...editAssignment, questions: e.target.value })
                }
                placeholder="Enter assignment questions..."
              />
              <button
                onClick={() => {
                  const updatedList = assignments.map((a) =>
                    a.id === editAssignment.id ? editAssignment : a
                  );
                  setAssignments(updatedList);
                  setIsEditing(false);
                  setEditAssignment(null);
                }}
              >
                💾 Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditAssignment(null);
                }}
              >
                ❌ Cancel
              </button>
            </div>
          ) : (
            <div onClick={() => setSelectedAssignment(assignment)}>
              <strong>{assignment.title}</strong> (Due: {new Date(assignment.dueDate).toLocaleDateString()})
              <p style={{ whiteSpace: 'pre-wrap' }}>{assignment.questions}</p>
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                  setEditAssignment(assignment);
                }}
              >
                ✏️ Edit
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

        {activeTab === 'grades' && selectedAssignment && (
          <div className="grading-section">
            <h2>Submissions for {selectedAssignment.title}</h2>
            <div className="submissions-list">
              {submissions.map(sub => (
                <div key={sub.id} className="submission-card">
                  <h3>{sub.studentName}</h3>
                  <p>Submitted: {new Date(sub.submittedAt).toLocaleString()}</p>
                  <p>Status: {sub.graded ? `Graded (${sub.grade}%)` : 'Pending'}</p>
                  <button onClick={() => window.open(sub.fileUrl, '_blank')}>View</button>
                </div>
              ))}
            </div>
            <GradeReport submissions={submissions} />
            <button
              onClick={publishGrades}
              disabled={!submissions.every(s => s.graded)}
              className="publish-button"
            >
              Publish All Grades
            </button>
          </div>
        )}

        {activeTab === 'analysis' && selectedAssignment && (
          <div className="analysis-section">
            <h2>Class Analysis for {selectedAssignment.title}</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={analysisData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {analysisData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={gradeCategories[index].color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}
      </div>
    </div>
  );
}
