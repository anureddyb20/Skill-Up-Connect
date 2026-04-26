const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, 'db.json');

// Initialize DB if not exists
if (!fs.existsSync(DB_PATH)) {
  const initialData = {
    users: [],
    results: [],
    jobs: [
      { id: 1, title: 'Frontend Developer', company: 'TechCorp', category: 'Technology' },
      { id: 2, title: 'Sales Representative', company: 'SalesForce', category: 'Sales & Marketing' }
    ],
    questions: [
      { id: 1, category: 'Communication', text: 'How to handle conflict?' }
    ],
    resumes: {},
    startedCourses: {}
  };
  fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
}

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// Auth Endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  const db = readDB();
  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }
  const newUser = { id: Date.now(), email, password, name, onboarded: false };
  db.users.push(newUser);
  writeDB(db);
  res.json({ success: true, user: newUser });
});

// Assessment Endpoints
app.get('/api/questions', (req, res) => {
  const db = readDB();
  res.json(db.questions);
});

app.post('/api/results', (req, res) => {
  const { userId, score, breakdown } = req.body;
  const db = readDB();
  const newResult = { id: Date.now(), userId, score, breakdown, timestamp: new Date() };
  db.results.push(newResult);
  writeDB(db);
  res.json({ success: true, result: newResult });
});

// Resume Endpoints
app.get('/api/resume/:userId', (req, res) => {
  const db = readDB();
  res.json(db.resumes[req.params.userId] || null);
});

app.post('/api/resume/:userId', (req, res) => {
  const db = readDB();
  db.resumes[req.params.userId] = req.body;
  writeDB(db);
  res.json({ success: true });
});

// Course Progress Endpoints
app.get('/api/courses/:userId', (req, res) => {
  const db = readDB();
  res.json(db.startedCourses[req.params.userId] || []);
});

app.post('/api/courses/:userId', (req, res) => {
  const { courseId } = req.body;
  const db = readDB();
  const userId = req.params.userId;
  if (!db.startedCourses[userId]) db.startedCourses[userId] = [];
  if (!db.startedCourses[userId].includes(courseId)) {
    db.startedCourses[userId].push(courseId);
    writeDB(db);
  }
  res.json({ success: true, startedCourses: db.startedCourses[userId] });
});

// Recommendations Endpoint
app.get('/api/recommendations/:userId', (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id == req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  const matchedJobs = db.jobs.filter(j => user.roles?.includes(j.category));
  res.json({ jobs: matchedJobs, courses: [] });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
