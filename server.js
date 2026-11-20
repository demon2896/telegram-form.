const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const PORT = process.env.PORT || 3000;

app.post('/send', async (req, res) => {
  const { name, message } = req.body || {};
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Missing BOT_TOKEN or CHAT_ID' });
  }

  const text = `New contact form message:\nName: ${name}\nMessage: ${message}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });
    if (response.ok) {
      return res.status(200).json({ ok: true });
    }
    return res.status(500).json({ error: 'Telegram API error' });
  } catch (err) {
    return res.status(500).json({ error: 'Request failed' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

