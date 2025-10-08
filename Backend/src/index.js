require('dotenv').config({ path: __dirname + '/../.env' });
const fs = require('fs');
const { exec } = require('child_process');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // ✅ Required for reading cookies
const axios = require('axios');

const connectDB = require('./config/db');
const progressRouter = require('./routes/progressRouter');
const authRouter = require('./routes/authRoutes');
const TheoryRouter=require('./routes/TheoryRouter')
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // ✅ Frontend URL (Vite uses 5173)
  credentials: true               // ✅ Allow cookies
}));
app.use(express.json());
app.use(cookieParser()); // ✅ Required for req.cookies

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

// API Routes
const fetch = require('node-fetch');
const languageMap = {
  python: 71,
  cpp: 54,
  "c++": 54,
  java: 62,
  javascript: 63,
  node: 63,
  c: 50
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// Helper to Base64 encode string
const toBase64 = str => Buffer.from(str, 'utf-8').toString('base64');
const fromBase64 = str => Buffer.from(str, 'base64').toString('utf-8');

app.post('/api/execute', async (req, res) => {
  const { code, language, input } = req.body;

  if (!languageMap[language.toLowerCase()]) {
    return res.status(400).json({ error: 'Language not supported' });
  }

  try {
    // Encode code and input in Base64
    const submitResponse = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false',
      {
        source_code: toBase64(code),
        language_id: languageMap[language.toLowerCase()],
        stdin: toBase64(input || '')
      },
      {
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'Content-Type': 'application/json'
        }
      }
    );

    const token = submitResponse.data.token;

    // Polling until finished
    let result;
    while (true) {
      const poll = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`,
        {
          headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
          }
        }
      );

      result = poll.data;
      if (result.status.id > 2) break;
      await wait(1000);
    }

    res.json({
      stdout: fromBase64(result.stdout || ''),
      stderr: fromBase64(result.stderr || result.compile_output || result.message || ''),
      status: result.status.description
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});


app.use('/api/auth', authRouter);
app.use('/api/progress', progressRouter);
app.use('/api/theory', TheoryRouter);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
