const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const linksRouter = require('./routes/links');

const app = express();
app.use(cors());
app.use(express.json());

// Health check (Render pings this)
app.get('/healthz', (req, res) => res.json({ ok: true, version: "1.0" }));

// API routes
app.use('/api/links', linksRouter);

// Redirect route (must be last)
app.get('/:code', require('./routes/redirect'));

// ------------------------------
// DATABASE CONNECTION (Render-safe)
// ------------------------------
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is missing. Add it in Render Environment Variables.");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Export app
module.exports = app;
