const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const entrepreneurRoutes = require('./routes/entrepreneurs');
app.use('/api/entrepreneurs', entrepreneurRoutes);

const applicationRoutes = require('./routes/applications');
app.use('/api/applications', applicationRoutes);

app.use('/uploads', express.static(path.join(__dirname, './uploads')));




// Basic route
app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 