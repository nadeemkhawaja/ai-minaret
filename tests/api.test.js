import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../server/app.js';

describe('API Endpoints', () => {
  it('POST /api/claude should return 400 for invalid JSON/missing messages', async () => {
    const response = await request(app)
      .post('/api/claude')
      .send({ invalid: 'data' });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid JSON or missing messages');
  });

  it('POST /api/claude should return 500 if API key is missing (mocked)', async () => {
    // Temporarily remove API key for this test
    const oldKey = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    const response = await request(app)
      .post('/api/claude')
      .send({ messages: [{ role: 'user', content: 'test' }] });
    
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server misconfiguration: API key missing');

    // Restore API key
    process.env.ANTHROPIC_API_KEY = oldKey;
  });
});
