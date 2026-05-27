const fs = require('fs');
const path = require('path');
const { firstWords, secondWords, passphraseWords } = require('../wordlists');

const outputDir = path.join(__dirname, '..', 'localized-wordlists');
const languages = {
  es: 'Spanish',
  pt: 'Portuguese',
  fr: 'French',
  de: 'German',
  ja: 'Japanese',
  'zh-cn': 'Chinese (Simplified)',
  ar: 'Arabic',
  id: 'Indonesian',
  hi: 'Hindi',
  ru: 'Russian',
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sanitizeWord = (word, fallback) => {
  const cleaned = String(word || '')
    .trim()
    .replace(/[‐‑‒–—―]/g, '-')
    .replace(/\s+/g, '')
    .replace(/-+/g, '')
    .toLocaleLowerCase();

  return cleaned || fallback;
};

const translateBatch = async (words, lang, attempt = 1) => {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', lang);
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', words.join('\n'));

  const response = await fetch(url);
  if (!response.ok) {
    if (attempt < 5) {
      await sleep(500 * attempt);
      return translateBatch(words, lang, attempt + 1);
    }
    throw new Error(`Translation request failed for ${lang}: ${response.status}`);
  }

  const data = await response.json();
  const translated = data[0].map((part) => part[0]).join('').split('\n');

  if (translated.length !== words.length) {
    if (words.length === 1) {
      return [translated.join('')];
    }

    const midpoint = Math.ceil(words.length / 2);
    const firstHalf = await translateBatch(words.slice(0, midpoint), lang);
    const secondHalf = await translateBatch(words.slice(midpoint), lang);
    return [...firstHalf, ...secondHalf];
  }

  return translated;
};

const translateList = async (sourceWords, lang, label, chunkSize = 250) => {
  const translated = [];

  for (let index = 0; index < sourceWords.length; index += chunkSize) {
    const chunk = sourceWords.slice(index, index + chunkSize);
    const chunkTranslations = await translateBatch(chunk, lang);

    for (let offset = 0; offset < chunk.length; offset++) {
      translated.push(sanitizeWord(chunkTranslations[offset], chunk[offset]));
    }

    process.stdout.write(
      `\r${lang} ${label}: ${Math.min(index + chunkSize, sourceWords.length)}/${sourceWords.length}`
    );
    await sleep(120);
  }

  process.stdout.write('\n');
  return translated;
};

const translateLanguage = async (lang) => {
  const outputPath = path.join(outputDir, `${lang}.json`);

  if (fs.existsSync(outputPath)) {
    console.log(`${lang}: already exists, skipping`);
    return;
  }

  console.log(`${lang}: translating ${languages[lang]}`);
  const first = await translateList(firstWords, lang, 'firstWords');
  const second = await translateList(secondWords, lang, 'secondWords');
  const passphrase = await translateList(passphraseWords, lang, 'passphraseWords');

  fs.writeFileSync(
    outputPath,
    `${JSON.stringify({ firstWords: first, secondWords: second, passphraseWords: passphrase }, null, 2)}\n`
  );
};

const main = async () => {
  fs.mkdirSync(outputDir, { recursive: true });

  const requested = process.argv.slice(2);
  const targetLanguages = requested.length ? requested : Object.keys(languages);

  for (const lang of targetLanguages) {
    if (!languages[lang]) {
      throw new Error(`Unsupported target language for translation script: ${lang}`);
    }

    await translateLanguage(lang);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
