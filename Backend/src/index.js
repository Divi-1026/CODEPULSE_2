require('dotenv').config({ path: __dirname + '/../.env' });

const cors = require('cors');
const express = require('express');

const connectDB = require('./config/db');

connectDB();

const app = express();
app.get("/", (req, res) => {
    res.send("Backend is working ✅");
  });
  
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
