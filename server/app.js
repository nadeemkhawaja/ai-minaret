import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// ── Load .env ──────────────────────────────────────────────
export function loadEnv() {
  const envPath = path.join(rootDir, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    process.env[key] = process.env[key] ?? val;
  }
}

loadEnv();

const app = express();
// No CORS middleware: the UI is served same-origin (Vite proxies /api in dev),
// so cross-origin pages on the LAN can't spend the server's API key.
app.use(express.json());

// ── API Routes ─────────────────────────────────────────────
app.post('/api/claude', async (req, res) => {
  const parsed = req.body;
  if (!parsed || !parsed.messages) {
    return res.status(400).json({ error: 'Invalid JSON or missing messages' });
  }

  // Accept user-supplied key from header (stored in browser, never in source code)
  const userKey = req.headers['x-user-api-key'] || '';
  const API_KEY = userKey || process.env.ANTHROPIC_API_KEY || '';
  
  const overrideBaseUrl = process.env.LOCAL_LLM_BASE_URL;
  const overrideModel = process.env.LOCAL_LLM_MODEL;

  if (!API_KEY && !overrideBaseUrl) {
    return res.status(500).json({ error: 'No API key. Set ANTHROPIC_API_KEY in .env or add your key in ⚙ Settings.' });
  }

  const model = overrideModel || parsed.model || 'claude-opus-4-8';
  const isOpenRouter = model.includes('/') && !model.startsWith('claude-');

  try {
    if (isOpenRouter) {
      const baseUrl = overrideBaseUrl ? overrideBaseUrl.replace(/\/$/, '') : 'https://openrouter.ai/api/v1';
      
      let messages = [...parsed.messages];
      if (parsed.system) {
        messages = [{ role: 'system', content: parsed.system }, ...messages];
      }

      const upstream = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY || 'local'}`,
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'ArgueMind'
        },
        body: JSON.stringify({
          model,
          max_tokens: parsed.max_tokens || 1200,
          messages
        })
      });
      const text = await upstream.text();
      return res.status(upstream.status).type('application/json').send(text);
    }

    const baseUrl = overrideBaseUrl ? overrideBaseUrl.replace(/\/$/, '') : 'https://api.anthropic.com/v1';
    
    const upstream = await fetch(`${baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY || 'local',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens: parsed.max_tokens || 1200,
        messages: parsed.messages,
        ...(parsed.system ? { system: parsed.system } : {}),
        ...(parsed.thinking ? { thinking: parsed.thinking } : {})
      })
    });
    const text = await upstream.text();
    return res.status(upstream.status).type('application/json').send(text);

  } catch (err) {
    console.error('Proxy error:', err.message);
    return res.status(502).json({ error: 'Proxy error: ' + err.message });
  }
});

// ── Local model proxy (Ollama / LM Studio) ─────────────────
// OpenAI-compatible chat endpoint on this machine. Proxied server-side
// so the browser needs no CORS setup. Restricted to localhost targets.
app.post('/api/local', async (req, res) => {
  const { baseUrl, model, max_tokens, messages } = req.body || {};
  if (!messages) return res.status(400).json({ error: 'Missing messages' });

  let url;
  try { url = new URL(baseUrl || 'http://localhost:11434'); }
  catch { return res.status(400).json({ error: 'Invalid local endpoint URL' }); }
  if (!['localhost', '127.0.0.1', '[::1]', '::1'].includes(url.hostname)) {
    return res.status(400).json({ error: 'Local endpoint must be on localhost (e.g. http://localhost:11434)' });
  }

  try {
    const upstream = await fetch(`${url.origin}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: model || 'llama3.2', max_tokens: max_tokens || 1200, messages }),
    });
    const text = await upstream.text();
    res.status(upstream.status).type('application/json').send(text);
  } catch (err) {
    res.status(502).json({
      error: `Cannot reach local model at ${url.origin} — is Ollama or LM Studio running? (${err.message})`,
    });
  }
});

// ── Local Quran/Hadith library search ──────────────────────
// Reads data/library/*.json (built by scripts/fetch-library.mjs) into
// memory once, then serves keyword matches to ground the AI's citations.
let LIBRARY = null;
function loadLibrary() {
  if (LIBRARY) return LIBRARY;
  LIBRARY = [];
  const dir = path.join(rootDir, 'data', 'library');
  if (!fs.existsSync(dir)) return LIBRARY;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    try {
      const items = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      for (const it of items) {
        if (it && it.ref && it.text) LIBRARY.push({ ...it, lc: it.text.toLowerCase() });
      }
    } catch (err) {
      console.error(`Library: skipping ${f} — ${err.message}`);
    }
  }
  console.log(`  📚  Library loaded: ${LIBRARY.length} verses/hadith`);
  return LIBRARY;
}

const STOP_WORDS = new Set(['the','a','an','of','in','on','and','or','is','are','was','were','to','for','vs','with','do','does','did','be','not','it','at','by','from','that','this','should','would','can','could','who','what','when','how','why','all','any','his','her','their','has','have','had','which','into','about','than','then','them','they','there','its','only','also','but','if','as','he','she','we','you','your']);

app.get('/api/library/search', (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  const limit = Math.min(Number(req.query.limit) || 6, 20);
  const terms = [...new Set(q.split(/[^a-z']+/).filter(w => w.length > 2 && !STOP_WORDS.has(w)))];
  if (!terms.length) return res.json({ results: [] });

  const lib = loadLibrary();
  const minScore = Math.min(2, terms.length);
  const scored = [];
  for (const item of lib) {
    let score = 0;
    for (const t of terms) if (item.lc.includes(t)) score++;
    if (score >= minScore) scored.push({ score, item });
  }
  scored.sort((a, b) => b.score - a.score || a.item.text.length - b.item.text.length);
  res.json({
    count: lib.length,
    results: scored.slice(0, limit).map(({ item }) => ({
      ref: item.ref,
      grade: item.grade || undefined,
      text: item.text.length > 400 ? item.text.slice(0, 400) + '…' : item.text,
    })),
  });
});

app.use(express.static(path.join(rootDir, 'dist')));

export default app;
