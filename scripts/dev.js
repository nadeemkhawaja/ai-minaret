// Dev launcher: start Express on a random port, wait until it writes
// .server-port, then start Vite with BACKEND_PORT in its env so its
// proxy can target the backend. Both bind to 0.0.0.0 (LAN-accessible).
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PORT_FILE = path.join(ROOT, '.server-port');

try { unlinkSync(PORT_FILE); } catch {}

const children = [];
function shutdown(code = 0) {
  for (const c of children) { try { c.kill('SIGTERM'); } catch {} }
  try { unlinkSync(PORT_FILE); } catch {}
  process.exit(code);
}
process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

const server = spawn('node', ['server/index.js'], {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env, PORT: process.env.PORT ?? '0', HOST: process.env.HOST ?? '0.0.0.0' },
});
children.push(server);
server.on('exit', (code) => shutdown(code ?? 0));

async function waitForBackend(timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (existsSync(PORT_FILE)) {
      const raw = readFileSync(PORT_FILE, 'utf8').trim();
      if (raw) {
        try { return JSON.parse(raw); } catch { return { port: Number(raw), ip: '127.0.0.1' }; }
      }
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error('Timed out waiting for backend to report its port');
}

const { port: backendPort, ip: backendIp } = await waitForBackend();
console.log(`  🔗  Vite will proxy /api → http://${backendIp}:${backendPort}`);

const viteBin = path.join(ROOT, 'node_modules', '.bin', 'vite');
const vite = spawn(viteBin, ['--host'], {
  cwd: ROOT,
  stdio: 'inherit',
  env: {
    ...process.env,
    BACKEND_PORT: String(backendPort),
    BACKEND_IP: backendIp,
  },
});
children.push(vite);
vite.on('exit', (code) => shutdown(code ?? 0));
