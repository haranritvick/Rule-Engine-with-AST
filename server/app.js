const express = require('express');
const mongoose = require('mongoose');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();
app.use(express.json());
app.use('/api/rules', ruleRoutes);

module.exports = app;
