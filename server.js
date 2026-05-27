// TofuPass API
// A tiny Express server that generates passwords and passphrases
// using cryptographically secure randomness (Node's crypto.randomInt).
//
// Endpoints:
//   GET /api/password?lang=CODE    -> plain-text password
//   GET /api/passphrase?count=N&lang=CODE
//                                    -> N-word passphrase (N between 4 and 30, default 4)
//   GET /api/stats                 -> in-memory counters (reset on restart)
//
// Licensed under GPL v3. See LICENSE.

const express = require('express');
const crypto = require('crypto');
const { getWordLists, specialChars } = require('./wordlists');

const app = express();
const port = process.env.PORT || 3000;
const rateLimitSecret = crypto.randomBytes(32);

const getPositiveIntegerConfig = (name, fallback) => {
  const value = parseInt(process.env[name] || '', 10);
  return Number.isInteger(value) && value > 0 ? value : fallback;
};

const rateLimitConfig = {
  refillPerSecond: getPositiveIntegerConfig('RATE_LIMIT_REFILL_PER_SECOND', 1),
  burst: getPositiveIntegerConfig('RATE_LIMIT_BURST', 10),
  hourly: getPositiveIntegerConfig('RATE_LIMIT_HOURLY', 1000),
};

const apiCallCounts = {
  password: 0,
  passphrase: 0,
  total: 0,
};

const rateLimitBuckets = new Map();

// --- Helpers ---

const getRandomItem = (array) => array[crypto.randomInt(0, array.length)];
const getRandomWord = (array) => getRandomItem(array).toLowerCase();
const getRandomNumber = () => crypto.randomInt(10, 100);
const getSecureRandomBoolean = () => crypto.randomInt(0, 2) === 1;
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const getClientAddress = (req) =>
  req.get('cf-connecting-ip') ||
  req.get('x-real-ip') ||
  req.ip ||
  req.socket.remoteAddress ||
  'unknown';

const getRateLimitKey = (req, hourWindow) =>
  crypto
    .createHmac('sha256', rateLimitSecret)
    .update(`${hourWindow}:${getClientAddress(req)}`)
    .digest('hex');

const getRateLimitBucket = (key, now) => {
  const existingBucket = rateLimitBuckets.get(key);

  if (existingBucket) {
    return existingBucket;
  }

  const newBucket = {
    tokens: rateLimitConfig.burst,
    hourlyCount: 0,
    lastRefill: now,
    expiresAt: now + (60 * 60 * 1000),
  };
  rateLimitBuckets.set(key, newBucket);
  return newBucket;
};

const cleanupExpiredRateLimitBuckets = (now) => {
  for (const [key, bucket] of rateLimitBuckets.entries()) {
    if (bucket.expiresAt <= now) {
      rateLimitBuckets.delete(key);
    }
  }
};

const generationRateLimiter = (req, res, next) => {
  const now = Date.now();
  const hourWindow = Math.floor(now / (60 * 60 * 1000));
  const key = getRateLimitKey(req, hourWindow);
  const bucket = getRateLimitBucket(key, now);
  const elapsedSeconds = Math.max(0, (now - bucket.lastRefill) / 1000);

  cleanupExpiredRateLimitBuckets(now);

  bucket.tokens = Math.min(
    rateLimitConfig.burst,
    bucket.tokens + (elapsedSeconds * rateLimitConfig.refillPerSecond)
  );
  bucket.lastRefill = now;

  const retryAfterSeconds = Math.max(1, Math.ceil((1 - bucket.tokens) / rateLimitConfig.refillPerSecond));
  const hourResetSeconds = Math.max(1, Math.ceil(((hourWindow + 1) * 60 * 60 * 1000 - now) / 1000));

  res.set('X-RateLimit-Limit', `${rateLimitConfig.refillPerSecond}/second; ${rateLimitConfig.hourly}/hour`);
  res.set('X-RateLimit-Remaining-Hour', String(Math.max(0, rateLimitConfig.hourly - bucket.hourlyCount)));

  if (bucket.hourlyCount >= rateLimitConfig.hourly) {
    res.set('Retry-After', String(hourResetSeconds));
    return res
      .status(429)
      .type('text/plain')
      .send('too many requests; please try again later');
  }

  if (bucket.tokens < 1) {
    res.set('Retry-After', String(retryAfterSeconds));
    return res
      .status(429)
      .type('text/plain')
      .send('too many requests; please slow down');
  }

  bucket.tokens -= 1;
  bucket.hourlyCount += 1;
  res.set('X-RateLimit-Remaining-Hour', String(Math.max(0, rateLimitConfig.hourly - bucket.hourlyCount)));
  return next();
};

// --- Endpoints ---

// GET /api/password -> plain-text password like "!DancingKoala73"
app.get('/api/password', generationRateLimiter, (req, res) => {
  const { firstWords, secondWords } = getWordLists(req.query.lang);
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
  const { passphraseWords } = getWordLists(req.query.lang);

  if (isNaN(count) || count < 4 || count > 30) {
    return res
      .status(400)
      .type('text/plain')
      .send('count must be between 4 and 30');
  }

  if (count > passphraseWords.length) {
    return res
      .status(400)
      .type('text/plain')
      .send('Error: The selected language does not have enough unique words for that count.');
  }

  generationRateLimiter(req, res, () => {
    const selectedWords = new Set();
    while (selectedWords.size < count) {
      selectedWords.add(getRandomItem(passphraseWords));
    }

    const newPassphrase = Array.from(selectedWords).join('-');

    apiCallCounts.passphrase++;
    apiCallCounts.total++;
    res.type('text/plain').send(newPassphrase);
  });
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
