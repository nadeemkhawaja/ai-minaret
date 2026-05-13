import { writeFileSync, unlinkSync } from 'node:fs';
import { networkInterfaces } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import app from './app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT_FILE = path.join(__dirname, '..', '.server-port');

// PORT=0 → OS picks a free random port. Set PORT=3000 (etc.) to pin it.
const REQUESTED_PORT = Number(process.env.PORT ?? 0);
const HOST = process.env.HOST || '0.0.0.0';

function lanAddresses() {
  const out = [];
  const ifaces = networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        out.push({ name, address: iface.address });
      }
    }
  }
  return out;
}

// Pick the most likely "real" LAN IP:
// 1) prefer en0 (macOS Wi-Fi/primary), then en1, eth0, wlan0
// 2) skip docker/vmnet/utun/bridge
// 3) prefer RFC1918 ranges (192.168/10/172.16-31)
function primaryIp() {
  const all = lanAddresses();
  const skip = /^(docker|vmnet|utun|bridge|veth|br-|tun|tap)/i;
  const preferred = ['en0', 'en1', 'eth0', 'wlan0'];
  const filtered = all.filter((i) => !skip.test(i.name));
  for (const name of preferred) {
    const hit = filtered.find((i) => i.name === name);
    if (hit) return hit;
  }
  const priv = filtered.find((i) =>
    /^10\.|^192\.168\.|^172\.(1[6-9]|2\d|3[01])\./.test(i.address),
  );
  return priv || filtered[0] || null;
}

const server = app.listen(REQUESTED_PORT, HOST, () => {
  const { port } = server.address();
  const primary = primaryIp();
  try {
    writeFileSync(
      PORT_FILE,
      JSON.stringify({ port, ip: primary?.address || '127.0.0.1' }),
    );
  } catch {}
  console.log(`\n  ✅  Express server listening on ${HOST}:${port}`);
  if (primary) {
    console.log(`  🌐  Primary IP detected: ${primary.address} (${primary.name})`);
    console.log(`  →  http://${primary.address}:${port}`);
  }
  console.log(`  →  http://localhost:${port}`);
  const others = lanAddresses().filter((i) => i.address !== primary?.address);
  for (const { name, address } of others) {
    console.log(`     also: http://${address}:${port}   (${name})`);
  }
  console.log('  🔑  API key loaded from .env\n');
});

function cleanup() {
  try { unlinkSync(PORT_FILE); } catch {}
  server.close(() => process.exit(0));
}
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
