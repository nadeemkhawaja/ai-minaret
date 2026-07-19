// Netlify Edge Function — API proxy
// Supports: Anthropic (Claude), OpenRouter
// User can supply their own key via request body userKey field
// Falls back to ANTHROPIC_API_KEY env var for Anthropic requests

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body || !body.messages) {
    return new Response(JSON.stringify({ error: 'Missing messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // User-supplied key from request header (stored in browser localStorage, never in code)
  const userKey = req.headers.get('x-user-api-key') || '';

  // Use user key if provided, otherwise fall back to server env key
  const API_KEY = userKey || process.env.ANTHROPIC_API_KEY || '';

  if (!API_KEY) {
    return new Response(
      JSON.stringify({
        error: 'No API key available. Set ANTHROPIC_API_KEY in Netlify env, or add your key in the ⚙ Settings panel.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const model = body.model || 'claude-opus-4-8';
  const isOpenRouter = model.includes('/') && !model.startsWith('claude-');

  // Route to OpenRouter if model looks like an OpenRouter model
  // (OpenRouter models are like "anthropic/claude-3.7-sonnet", "google/gemma-3-27b-it:free")
  // Pure Anthropic models like "claude-3-7-sonnet-20250219" go to Anthropic directly
  if (isOpenRouter) {
    // This shouldn't normally be called via proxy for OpenRouter — the frontend calls OR directly.
    // But if it does, proxy it.
    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': req.headers.get('origin') || 'https://arguemind.netlify.app',
        'X-Title': 'ArgueMind',
      },
      body: JSON.stringify({
        model,
        max_tokens: body.max_tokens || 1200,
        messages: body.messages,
      }),
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Default: Anthropic API
  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: body.max_tokens || 1200,
      messages: body.messages,
      ...(body.system ? { system: body.system } : {}),
      ...(body.thinking ? { thinking: body.thinking } : {}),
    }),
  });

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
