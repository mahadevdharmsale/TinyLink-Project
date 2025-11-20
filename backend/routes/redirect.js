
const Link = require('../models/Link');

module.exports = async function (req, res) {
  try {
    const code = req.params.code;
    const link = await Link.findOneAndUpdate(
      { code },
      { $inc: { clickCount: 1 }, $set: { lastClicked: new Date() } },
      { new: true }
    );
    if (!link) return res.status(404).send('Not found');
    return res.redirect(302, link.targetUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

