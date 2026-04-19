// TofuPass API
// A tiny Express server that generates passwords and passphrases
// using cryptographically secure randomness (Node's crypto.randomInt).
//
// Endpoints:
//   GET /api/password              -> plain-text password
//   GET /api/passphrase?count=N    -> N-word passphrase (N between 4 and 30, default 4)
//   GET /api/stats                 -> in-memory counters (reset on restart)
//
// Licensed under GPL v3. See LICENSE.

const express = require('express');
const crypto = require('crypto');
const { firstWords, secondWords, passphraseWords, specialChars } = require('./wordlists');

const app = express();
const port = process.env.PORT || 3000;

const apiCallCounts = {
  password: 0,
  passphrase: 0,
  total: 0,
};

// --- Helpers ---

const getRandomItem = (array) => array[crypto.randomInt(0, array.length)];
const getRandomWord = (array) => getRandomItem(array).toLowerCase();
const getRandomNumber = () => crypto.randomInt(10, 100);
const getSecureRandomBoolean = () => crypto.randomInt(0, 2) === 1;
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// --- Endpoints ---

// GET /api/password -> plain-text password like "!DancingKoala73"
app.get('/api/password', (req, res) => {
  const firstWord = getRandomWord(firstWords);
  const secondWord = getRandomWord(secondWords);
  const randomSpecial = getRandomItem(specialChars);
  const randomNumber = getRandomNumber();
  const capitalizeFirst = getSecureRandomBoolean();
  const finalFirstWord = capitalizeFirst ? capitalize(firstWord) : firstWord;
  const finalSecondWord = capitalizeFirst ? secondWord : capitalize(secondWord);

  const formats = [
    `${randomSpecial}${finalFirstWord}${finalSecondWord}${randomNumber}`,
    `${finalFirstWord}${randomSpecial}${finalSecondWord}${randomNumber}`,
    `${finalFirstWord}${finalSecondWord}${randomSpecial}${randomNumber}`,
    `${finalFirstWord}${finalSecondWord}${randomNumber}${randomSpecial}`,
  ];
  const newPassword = getRandomItem(formats);

  apiCallCounts.password++;
  apiCallCounts.total++;
  res.type('text/plain').send(newPassword);
});

// GET /api/passphrase?count=N -> hyphen-joined passphrase, e.g. "koala-breeze-juniper-quartz"
app.get('/api/passphrase', (req, res) => {
  const count = req.query.count === undefined ? 4 : parseInt(req.query.count, 10);

  if (isNaN(count) || count < 4 || count > 30) {
    return res
      .status(400)
      .type('text/plain')
      .send('Error: The "count" parameter must be a number between 4 and 30.');
  }

  const selectedWords = new Set();
  while (selectedWords.size < count) {
    selectedWords.add(getRandomItem(passphraseWords));
  }

  const newPassphrase = Array.from(selectedWords).join('-');

  apiCallCounts.passphrase++;
  apiCallCounts.total++;
  res.type('text/plain').send(newPassphrase);
});

// GET /api/stats -> in-memory counters. Resets on every restart. No PII.
app.get('/api/stats', (req, res) => {
  res.json({
    generated_passwords: apiCallCounts.password,
    generated_passphrases: apiCallCounts.passphrase,
    total_api_calls: apiCallCounts.total,
  });
});

// --- Start ---

app.listen(port, () => {
  console.log(`TofuPass API listening on http://localhost:${port}`);
});
