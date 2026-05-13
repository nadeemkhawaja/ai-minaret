import express from 'express';
import cors from 'cors';
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
app.use(cors());
app.use(express.json());

// ── API Routes ─────────────────────────────────────────────
app.post('/api/claude', (req, res) => {
  const parsed = req.body;
  if (!parsed || !parsed.messages) {
    return res.status(400).json({ error: 'Invalid JSON or missing messages' });
  }

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'Server misconfiguration: API key missing' });
  }

  const payload = JSON.stringify({
    model: parsed.model || 'claude-sonnet-4-20250514',
    max_tokens: parsed.max_tokens || 1200,
    messages: parsed.messages,
  });

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
  };

  const proxy = https.request(options, apiRes => {
    res.status(apiRes.statusCode);
    apiRes.pipe(res);
  });

  proxy.on('error', err => {
    console.error('Proxy error:', err.message);
    res.status(502).json({ error: 'Proxy error: ' + err.message });
  });

  proxy.write(payload);
  proxy.end();
});

app.use(express.static(path.join(rootDir, 'dist')));

export default app;
