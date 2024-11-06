// server/server.js

const express = require('express');
const cors = require('cors'); // Import cors
const path = require('path');
const mongoose = require('mongoose');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
// Routes
app.use('/api/rules', ruleRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Connect to MongoDB (if you're using it)
mongoose.connect('mongodb+srv://ruleengine:assignment@cluster0.exhwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
