// ============================================
// PROMPTFORGE — Express Backend Server
// Proxies requests to Anthropic API securely.
// The API key never touches the browser.
// ============================================

require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');
const fetch      = require('node-fetch');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────
app.use(express.json({ limit: '10kb' }));

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL || true   // your deployed frontend domain
    : 'http://localhost:3000',
  methods: ['POST'],
}));

// Rate limiting — prevent abuse
// 20 requests per 10 minutes per IP
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please wait a few minutes before trying again.',
  },
});

app.use('/api/', limiter);

// ── Health check ─────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Anthropic Proxy ───────────────────────────
app.post('/api/generate', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Server is not configured. Please contact the administrator.',
    });
  }

  const { messages, max_tokens = 1800 } = req.body;

  // Basic validation
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request payload.' });
  }

  // Sanitize — only pass what we need to Anthropic
  const sanitizedMessages = messages.map(m => ({
    role:    String(m.role),
    content: String(m.content).slice(0, 8000), // cap content size
  }));

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-api-key':       apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: Math.min(Number(max_tokens) || 1800, 2000),
        messages:   sanitizedMessages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = data?.error?.message || `Anthropic API error (${response.status})`;
      return res.status(response.status).json({ error: msg });
    }

    // Return just the text content
    const text = data.content.map(b => b.text || '').join('');
    return res.json({ text });

  } catch (err) {
    console.error('Anthropic fetch error:', err.message);
    return res.status(502).json({
      error: 'Could not reach the AI service. Please try again.',
    });
  }
});

// ── Serve React build in production ──────────
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// ── Start ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║  PromptForge Server                  ║
  ║  Running on http://localhost:${PORT}    ║
  ║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(22)}║
  ╚══════════════════════════════════════╝
  `);
});
