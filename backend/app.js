const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const linksRouter = require('./routes/links');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/healthz', (req, res) => res.json({ ok: true, version: "1.0" }));

app.use('/api/links', linksRouter);

// Redirect route (placed last)
app.get('/:code', require('./routes/redirect'));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tinylink';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error('Mongo connect error', err));

module.exports = app;
