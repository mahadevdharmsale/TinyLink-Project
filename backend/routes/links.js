
const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const validUrl = require('valid-url');

function genCode(len = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// POST /api/links
router.post('/', async (req, res) => {
  try {
    const { targetUrl, customCode } = req.body;
    if (!targetUrl || !validUrl.isUri(targetUrl)) return res.status(400).json({ error: 'Invalid target URL' });

    let code = customCode ? customCode.trim() : genCode(6);
    if (!/^[A-Za-z0-9]{6,8}$/.test(code)) return res.status(400).json({ error: 'Code must be 6-8 alphanumeric characters' });

    const existing = await Link.findOne({ code });
    if (existing) return res.status(409).json({ error: 'Code already in use' });

    const link = new Link({ code, targetUrl });
    await link.save();
    return res.status(201).json({ code, shortUrl: `${process.env.BASE_URL || ''}/${code}`, targetUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/links
router.get('/', async (req, res) => {
  const links = await Link.find().sort({ createdAt: -1 });
  res.json(links);
});

// GET /api/links/:code
router.get('/:code', async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });
  if (!link) return res.status(404).json({ error: 'Not found' });
  res.json(link);
});

// DELETE /api/links/:code
router.delete('/:code', async (req, res) => {
  const deleted = await Link.findOneAndDelete({ code: req.params.code });
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

module.exports = router;

