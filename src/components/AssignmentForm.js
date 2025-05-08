import React, { useState } from 'react';

export default function AssignmentForm({ onNewAssignment }) {
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentPrompt, setAssignmentPrompt] = useState('');
  const [rubric, setRubric] = useState({
    questions: [],
    gradingCriteria: []
  });
  

  const updateQuestion = (index, newText) => {
    setRubric(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, text: newText } : q
      )
    }));
  };

  const updatePoints = (index, newPoints) => {
    setRubric(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, points: parseInt(newPoints) || 0 } : q
      )
    }));
  };

  const updateQuestionImage = (index, file) => {
    const imageUrl = file ? URL.createObjectURL(file) : null;
    setRubric(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, image: file, imagePreview: imageUrl } : q
      )
    }));
  };

  const addQuestion = () => {
    setRubric(prev => ({
      ...prev,
      questions: [...prev.questions, { text: '', points: 10, image: null, imagePreview: null }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assignmentTitle.trim() || !assignmentPrompt.trim() || rubric.questions.length === 0) {
      alert("Please enter assignment title, prompt, and at least one question.");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title: assignmentTitle,
      prompt: assignmentPrompt,
      rubric,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    const existingAssignments = JSON.parse(localStorage.getItem('assignments')) || [];
    const updatedAssignments = [...existingAssignments, newAssignment];
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));

    onNewAssignment(newAssignment);

    setAssignmentTitle('');
    setAssignmentPrompt('');
    setRubric({ questions: [], gradingCriteria: [] });

    alert(`Assignment Created`);
  };

  return (
    <form className="assignment-creator" onSubmit={handleSubmit}>
      <input
        type="text"
        value={assignmentTitle}
        onChange={(e) => setAssignmentTitle(e.target.value)}
        placeholder="Assignment Title"
        required
      />

      <textarea
        value={assignmentPrompt}
        onChange={(e) => setAssignmentPrompt(e.target.value)}
        placeholder="Assignment description..."
        rows={4}
        required
      />

      <div className="rubric-container">
        <h3 className="rubric-heading">Assignment Questions</h3>
        {rubric.questions.map((q, i) => (
          <div key={i} className="rubric-question">
            <label className="rubric-label">Question</label>
            <input
              type="text"
              className="rubric-input text-input"
              value={q.text}
              onChange={(e) => updateQuestion(i, e.target.value)}
              placeholder="Enter question text"
            />

            <label className="rubric-label">Points</label>
            <div className="points-input-wrapper">
              <input
                type="number"
                className="rubric-input points-input"
                value={q.points}
                onChange={(e) => updatePoints(i, e.target.value)}
                min="1"
                max="100"
              />
              <span className="points-label">points</span>
            </div>

            <label className="rubric-label">Upload Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => updateQuestionImage(i, e.target.files[0])}
            />
            {q.imagePreview && (
              <div className="image-preview">
                <img
                  src={q.imagePreview}
                  alt={`Preview for question ${i + 1}`}
                  style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '8px' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="form-actions mt-6 flex flex-col sm:flex-row gap-3 justify-end">
  <button
    type="button"
    onClick={addQuestion}
    className="bg-white text-blue-600 border border-blue-500 hover:bg-blue-50 font-medium py-2 px-4 rounded-xl transition duration-200 shadow-sm"
  >
    + Add Question
  </button>
  <button
    type="submit"
    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl hover:bg-blue-700 transition duration-200 shadow-md"
  >
    Create Assignment
  </button>
</div>

    </form>
  );
}
