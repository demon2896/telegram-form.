const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post('/send', async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).send('بيانات ناقصة');

  const text = `📩 رسالة جديدة من نموذج التواصل:\n\n👤 الاسم: ${name}\n💬 الرسالة:\n${message}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });
    if (response.ok) res.sendStatus(200);
    else res.sendStatus(500);
  } catch (err) {
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
