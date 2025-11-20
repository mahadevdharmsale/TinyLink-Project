
const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, match: /^[A-Za-z0-9]{6,8}$/ },
  targetUrl: { type: String, required: true },
  clickCount: { type: Number, default: 0 },
  lastClicked: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Link', LinkSchema);

