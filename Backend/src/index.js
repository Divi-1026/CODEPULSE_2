require('dotenv').config({ path: __dirname + '/../.env' });
const fs = require('fs');
const { exec, spawn } = require('child_process');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const submitRouter = require("./routes/submit")
const complexityRoutes=require("./routes/Time")
const axios = require('axios');
const path = require('path');
const util = require('util');
const os = require('os');
const problemRouter=require('./routes/ProbblemRoute')
const connectDB = require('./config/db');
const progressRouter = require('./routes/progressRouter');
const authRouter = require('./routes/authRoutes');
const TheoryRouter = require('./routes/TheoryRouter');
const redisClient = require('./config/redis');
const app = express();

// Connect to MongoDB
const InitalizeConnection = async ()=>{
    try{

        await Promise.all([connectDB(),redisClient.connect()]);
        console.log("DB Connected");
        
        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at port number: "+ process.env.PORT);
        })

    }
    catch(err){
        console.log("Error: "+err);
    }
}


InitalizeConnection();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




// Test Route
app.get("/", (req, res) => {
    res.send("Backend is working ✅");
});

// Judge0 Language Map
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
const toBase64 = str => Buffer.from(str, 'utf-8').toString('base64');
const fromBase64 = str => Buffer.from(str, 'base64').toString('utf-8');

// Existing Judge0 Execution Endpoint
app.post('/api/execute', async (req, res) => {
    const { code, language, input } = req.body;
  console.log("api ",code,language)
    if (!languageMap[language.toLowerCase()]) {
        return res.status(400).json({ error: 'Language not supported' });
    }

    try {
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
// const analyzer = new ComplexityAnalyzer();
// Complexity Analysis Endpoint
// app.post('/api/analyze-complexity', async (req, res) => {
//     try {
//         const { code, language, input } = req.body;

//         if (!code || !language) {
//             return res.status(400).json({
//                 error: 'Code and language are required',
//                 status: 'error'
//             });
//         }

//         const analysisResult = await analyzer.analyzeCode(code, language, input || '');
//         res.json(analysisResult);

//     } catch (error) {
//         console.error('Complexity analysis error:', error);
//         res.status(500).json({
//             error: 'Internal server error during analysis',
//             status: 'error'
//         });
//     }
// });

// Cleanup endpoint
// app.post('/api/cleanup', async (req, res) => {
//     try {
//         const tempDir = path.join(__dirname, 'temp');
//         if (fs.existsSync(tempDir)) {
//             const files = fs.readdirSync(tempDir);
//             for (const file of files) {
//                 await unlinkAsync(path.join(tempDir, file));
//             }
//         }
//         res.json({ message: 'Cleanup completed' });
//     } catch (error) {
//         res.status(500).json({ error: 'Cleanup failed' });
//     }
// });

// API Routes
app.use('/api', complexityRoutes);
app.use('/api/auth', authRouter);
app.use('/api/progress', progressRouter);
app.use('/api/theory', TheoryRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);

// Start Server
