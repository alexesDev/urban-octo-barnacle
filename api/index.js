const casual = require('casual');
const randomInt = require('random-int');
const express = require('express');
const app = express();

const messages = [];

function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateMessage() {
  setTimeout(generateMessage, randomInt(1, 10) * 500);

  messages.push({
    id: messages.length + 1,
    text: casual.sentence,
  });
}

app.get('/messages', async (req, res) => {
  const index = req.query.from ? messages.findIndex(m => m.id >= req.query.from) : 0;
  await pause(randomInt(0, 9) === 0 ? 2000 : 50);
  res.json(messages.slice(index));
});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});

generateMessage();
