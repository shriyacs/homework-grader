// src/data/TeacherData.js

export const subjectData = {
    'Computer Science': {
      assignments: [
        {
          id: 1,
          title: 'React Basics Assignment',
          dueDate: '2025-05-10',
          questions: '1. What is JSX?\n2. Explain useState with an example.'
        },
        {
          id: 2,
          title: 'CSS Grid Practice',
          dueDate: '2025-05-15',
          questions: '1. How do you define a grid container?\n2. What does grid-template-columns do?'
        }
      ],
      submissions: [
        { id: 101, studentName: 'Alice Johnson', submittedAt: '2025-04-25T10:30:00', graded: true, grade: 92, fileUrl: '#' },
        { id: 102, studentName: 'Bob Smith', submittedAt: '2025-04-26T14:45:00', graded: false, fileUrl: '#' }
      ]
    },
    'Mathematics': {
      assignments: [
        {
          id: 3,
          title: 'Algebra Homework',
          dueDate: '2025-05-11',
          questions: '1. Solve for x: 2x + 3 = 7\n2. Factor: x² - 5x + 6'
        },
        {
          id: 4,
          title: 'Calculus Quiz',
          dueDate: '2025-05-18',
          questions: '1. What is a derivative?\n2. Find the derivative of x².'
        }
      ],
      submissions: [
        { id: 201, studentName: 'Jane Doe', submittedAt: '2025-04-25T11:00:00', graded: true, grade: 85, fileUrl: '#' },
        { id: 202, studentName: 'John Smith', submittedAt: '2025-04-26T12:45:00', graded: true, grade: 73, fileUrl: '#' }
      ]
    },
    'Physics': {
      assignments: [
        {
          id: 5,
          title: 'Newton’s Laws',
          dueDate: '2025-05-12',
          questions: '1. State Newton’s Second Law.\n2. Explain Inertia.'
        }
      ],
      submissions: [
        { id: 301, studentName: 'Emily Clark', submittedAt: '2025-04-27T14:00:00', graded: true, grade: 78, fileUrl: '#' }
      ]
    }
  };
  
  export const dummyAssignments = [
    {
      id: 1,
      title: 'React Basics Assignment',
      dueDate: '2025-05-10',
      questions: '1. What is JSX?\n2. Explain useState with an example.'
    },
    {
      id: 2,
      title: 'CSS Grid Practice',
      dueDate: '2025-05-15',
      questions: '1. How do you define a grid container?\n2. What does grid-template-columns do?'
    }
  ];
  
  export const dummySubmissions = [
    { id: 101, studentName: 'Alice Johnson', submittedAt: '2025-04-25T10:30:00', graded: true, grade: 92, fileUrl: '#' },
    { id: 102, studentName: 'Bob Smith', submittedAt: '2025-04-26T14:45:00', graded: false, fileUrl: '#' },
    { id: 103, studentName: 'Charlie Brown', submittedAt: '2025-04-26T17:20:00', graded: true, grade: 78, fileUrl: '#' },
    { id: 104, studentName: 'Erika Lee', submittedAt: '2025-04-26T16:20:00', graded: true, grade: 68, fileUrl: '#' },
    { id: 105, studentName: 'Krishna Rao', submittedAt: '2025-04-26T14:38:00', graded: true, grade: 83, fileUrl: '#' },
    { id: 106, studentName: 'Samay Raina', submittedAt: '2025-04-26T13:20:00', graded: true, grade: 84, fileUrl: '#' },
    { id: 107, studentName: 'Lucas West', submittedAt: '2025-04-26T19:52:00', graded: true, grade: 89, fileUrl: '#' },
    { id: 108, studentName: 'Indu Sree', submittedAt: '2025-04-26T07:10:00', graded: true, grade: 90, fileUrl: '#' },
  ];
  