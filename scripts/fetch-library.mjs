// Downloads the Quran (Arabic + public-domain Pickthall English translation)
// and the major Hadith collections (English) from the fawazahmed0 open-source
// quran-api / hadith-api datasets (CC0-style free APIs, served via jsDelivr).
//
// Builds:
//   data/library/quran.json      ← search index used by /api/library/search
//   data/library/<coll>.json     ← one per hadith collection (with gradings)
//   data/quran.md                ← human-readable Quran (Arabic + English)
//   data/hadith/<coll>.md        ← human-readable hadith collections
//
// Usage:  node scripts/fetch-library.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const LIB = path.join(ROOT, 'data', 'library');
const HAD = path.join(ROOT, 'data', 'hadith');
mkdirSync(LIB, { recursive: true });
mkdirSync(HAD, { recursive: true });

const QURAN_CDN = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1';
const HADITH_CDN = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1';

const HADITH_NAMES = {
  bukhari: 'Sahih al-Bukhari',
  muslim: 'Sahih Muslim',
  abudawud: 'Sunan Abi Dawud',
  tirmidhi: 'Jami at-Tirmidhi',
  nasai: "Sunan an-Nasa'i",
  ibnmajah: 'Sunan Ibn Majah',
  malik: 'Muwatta Malik',
  nawawi: 'Forty Hadith of an-Nawawi',
  qudsi: 'Forty Hadith Qudsi',
  dehlawi: 'Forty Hadith of Shah Waliullah Dehlawi',
};

let totalBytes = 0;
async function getJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} for ${url}`);
  const text = await r.text();
  totalBytes += text.length;
  return JSON.parse(text);
}

// ── Quran ──────────────────────────────────────────────────
console.log('Fetching Quran (English — Pickthall, public domain)…');
const en = await getJson(`${QURAN_CDN}/editions/eng-mohammedmarmadu.min.json`);
console.log('Fetching Quran (Arabic — King Fahad Quran Complex)…');
let ar = null;
try { ar = await getJson(`${QURAN_CDN}/editions/ara-kingfahadquranc.min.json`); }
catch (e) { console.log(`  (Arabic edition unavailable: ${e.message} — continuing English-only)`); }

let surahNames = {};
try {
  const info = await getJson(`${QURAN_CDN}/info.json`);
  for (const c of info.chapters || []) surahNames[c.chapter ?? c.number] = c.name || c.englishname || '';
} catch { /* fall back to numbers only */ }

const arMap = new Map();
if (ar) for (const v of ar.quran) arMap.set(`${v.chapter}:${v.verse}`, v.text);

const quranIndex = en.quran.map(v => ({ ref: `Quran ${v.chapter}:${v.verse}`, text: v.text }));
writeFileSync(path.join(LIB, 'quran.json'), JSON.stringify(quranIndex));

let md = '# The Holy Quran\n\n> Arabic: King Fahad Quran Complex · English: Mohammed Marmaduke Pickthall (public domain)\n> Source: github.com/fawazahmed0/quran-api\n\n';
let curChapter = 0;
for (const v of en.quran) {
  if (v.chapter !== curChapter) {
    curChapter = v.chapter;
    const nm = surahNames[curChapter] ? ` — ${surahNames[curChapter]}` : '';
    md += `\n## Surah ${curChapter}${nm}\n\n`;
  }
  const arabic = arMap.get(`${v.chapter}:${v.verse}`);
  md += `**${v.chapter}:${v.verse}**${arabic ? `  ${arabic}` : ''}\n${v.text}\n\n`;
}
writeFileSync(path.join(ROOT, 'data', 'quran.md'), md);
console.log(`  ✓ ${quranIndex.length} verses → data/library/quran.json + data/quran.md`);

// ── Hadith collections ─────────────────────────────────────
const editions = await getJson(`${HADITH_CDN}/editions.json`);
for (const [key, display] of Object.entries(HADITH_NAMES)) {
  const englishEd = (editions[key]?.collection || []).find(e => e.language === 'English');
  if (!englishEd) { console.log(`  ✗ ${display}: no English edition — skipped`); continue; }
  console.log(`Fetching ${display}…`);
  const data = await getJson(englishEd.linkmin || englishEd.link);

  const items = [];
  let cmd = `# ${display}\n\n> English translation from github.com/fawazahmed0/hadith-api (sunnah.com data)\n\n`;
  for (const h of data.hadiths || []) {
    if (!h.text) continue;
    const grade = (h.grades || []).map(g => `${g.grade}${g.name ? ` (${g.name})` : ''}`).join('; ');
    items.push({ ref: `${display} ${h.hadithnumber}`, ...(grade ? { grade } : {}), text: h.text });
    cmd += `**${h.hadithnumber}.**${grade ? ` *[${grade}]*` : ''} ${h.text}\n\n`;
  }
  writeFileSync(path.join(LIB, `${key}.json`), JSON.stringify(items));
  writeFileSync(path.join(HAD, `${key}.md`), cmd);
  console.log(`  ✓ ${items.length} hadith → data/library/${key}.json + data/hadith/${key}.md`);
}

console.log(`\nDone. Downloaded ~${(totalBytes / 1024 / 1024).toFixed(1)} MB.`);
console.log('Restart the server (./stop.sh && ./start.sh) to load the library.');
