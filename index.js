'use strict';

const lodash = require('lodash');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();

app.use(express.json());

// Your code starts here.
// Placeholders for all requests are provided for your convenience.

app.get('/', (req, res) => {
  res.send('API is running');
});

app.post('/api/user', (req, res) => {});

app.post('/api/authenticate', (req, res) => {});

app.post('/api/logout', (req, res) => {});

app.post('/api/articles', (req, res) => {});

app.get('/api/articles', (req, res) => {});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
