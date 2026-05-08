// ArgueMind — Local Server
// Reads ANTHROPIC_API_KEY from .env
// Proxies /api/claude → api.anthropic.com (key never hits the browser)
// Serves index.html on http://localhost:3000
//
// Usage:
//   npm install
//   npm start

import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Load .env ──────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    console.error('\n  ❌  .env file not found.');
    console.error('  Create one with: ANTHROPIC_API_KEY=sk-ant-...\n');
    process.exit(1);
  }
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

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY || !API_KEY.startsWith('sk-ant-')) {
  console.error('\n  ❌  ANTHROPIC_API_KEY missing or invalid in .env');
  console.error('  It must start with sk-ant-\n');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

// ── MIME types ─────────────────────────────────────────────
const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

// ── Claude API proxy ────────────────────────────────────────
function proxyToClaude(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    // Validate JSON
    let parsed;
    try { parsed = JSON.parse(body); } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
      return;
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
      res.writeHead(apiRes.statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `http://localhost:${PORT}`,
      });
      apiRes.pipe(res);
    });

    proxy.on('error', err => {
      console.error('Proxy error:', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Proxy error: ' + err.message }));
    });

    proxy.write(payload);
    proxy.end();
  });
}

// ── Static file server ──────────────────────────────────────
function serveStatic(req, res) {
  // Only serve files from project root — no directory traversal
  const urlPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  // Must stay within project directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

// ── Main server ─────────────────────────────────────────────
const server = http.createServer((req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': `http://localhost:${PORT}`,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  // API proxy endpoint
  if (req.url === '/api/claude' && req.method === 'POST') {
    proxyToClaude(req, res);
    return;
  }

  // Block direct access to sensitive files
  const blocked = ['.env', '.env.local', 'package.json', 'server.js'];
  const filename = path.basename(req.url.split('?')[0]);
  if (blocked.includes(filename)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\n  ✅  ArgueMind running at http://localhost:' + PORT);
  console.log('  🔑  API key loaded from .env');
  console.log('  🔒  Key never exposed to browser\n');
});
