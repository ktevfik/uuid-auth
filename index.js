'use strict';

const lodash = require('lodash');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const auth = require('./middleware/auth');
const app = express();

app.use(express.json());
const connectDB = require('./db/mongoose');

connectDB();

const User = require('./models/user');

// Your code starts here.
// Placeholders for all requests are provided for your convenience.

app.get('/', (req, res) => {
  res.send('API is running');
});

// @route   POST api/user
// @desc    Register user
// @access  Public
app.post('/api/user', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ msg: 'User already exists' });
  try {
    user = new User(req.body);

    await user.save();

    res.status(201).json({ msg: '201 OK' });
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route   POST api/authenticate
// @desc    Login user
// @access  Public
app.post('/api/authenticate', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('-password');

    const token = await user.generateAuthToken();

    res.status(200).json({ id: user.id, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/api/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.status(200).json({ msg: '200 OK' });
  } catch (e) {
    res.status(500).send();
  }
});

app.post('/api/articles', (req, res) => {});

app.get('/api/articles', (req, res) => {});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
