require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // ✅ Required for reading cookies

const connectDB = require('./config/db');
const progressRouter = require('./routes/progressRouter');
const authRouter = require('./routes/authRoutes');

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
app.use('/api/auth', authRouter);
app.use('/api/progress', progressRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
