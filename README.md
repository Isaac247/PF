# PromptForge 🔥

**Write better AI prompts — no technical knowledge required.**

PromptForge is a full-stack web app that generates precision prompts for any AI model (Claude, ChatGPT, Gemini, etc.) using Anthropic's proven prompt engineering techniques.

Users just visit the URL and start typing. No API keys, no sign-ups, no setup.

---

## How it works

```
User (browser) → Your Server → Anthropic API
```

Your Anthropic API key lives only on your server — users never see it or need one.

---

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 16 or higher
- An Anthropic API key → [console.anthropic.com](https://console.anthropic.com/settings/keys)

### 2. Clone & Install

```bash
# Install all dependencies (root + client)
npm run install:all
```

### 3. Configure your API key

```bash
# Copy the example env file
cp .env.example .env

# Open .env and paste your Anthropic API key
nano .env   # or use any text editor
```

Your `.env` should look like:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxx
PORT=3001
NODE_ENV=development
```

### 4. Run in development mode

```bash
npm run dev
```

This starts:
- **Backend** on `http://localhost:3001`
- **Frontend** on `http://localhost:3000`

Open `http://localhost:3000` in your browser. That's it!

---

## Deploy to Production

### Option A — Render.com (Easiest, free tier available)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set:
   - **Build command:** `npm run install:all && npm run build`
   - **Start command:** `npm start`
5. Add environment variable:
   - `ANTHROPIC_API_KEY` = your key
   - `NODE_ENV` = `production`
6. Deploy — Render gives you a public URL instantly

### Option B — Railway.app

1. Push to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add environment variables (`ANTHROPIC_API_KEY`, `NODE_ENV=production`)
4. Done — Railway auto-detects Node and deploys

### Option C — Heroku

```bash
heroku create your-promptforge-app
heroku config:set ANTHROPIC_API_KEY=sk-ant-api03-xxxx
heroku config:set NODE_ENV=production
git push heroku main
```

### Option D — VPS / Ubuntu Server

```bash
# On your server
git clone your-repo
cd promptforge-full
npm run install:all
npm run build

# Set env vars
export ANTHROPIC_API_KEY=sk-ant-api03-xxxx
export NODE_ENV=production
export PORT=3001

# Run with PM2 (keeps it alive)
npm install -g pm2
pm2 start server/index.js --name promptforge
pm2 save
```

Then point your domain/Nginx to port 3001.

---

## Project Structure

```
promptforge-full/
├── server/
│   └── index.js              ← Express server — holds the API key, proxies to Anthropic
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Header.jsx / .module.css
│       │   ├── Hero.jsx / .module.css
│       │   ├── InputPanel.jsx / .module.css
│       │   ├── OutputPanel.jsx / .module.css
│       │   ├── TipsStrip.jsx / .module.css
│       │   └── Footer.jsx / .module.css
│       ├── styles/
│       │   └── global.css         ← Design tokens
│       ├── api.js                 ← Calls /api/generate (your server)
│       ├── promptBuilder.js       ← Meta-prompt construction logic
│       ├── constants.js           ← Techniques, options, tips data
│       ├── App.jsx                ← Root component + state management
│       └── index.js               ← React entry point
├── .env.example                   ← Copy to .env and add your key
├── .gitignore
├── package.json                   ← Root scripts
└── README.md
```

---

## Features

| Feature | Description |
|---------|-------------|
| **Zero friction** | Users visit a URL — no keys, no accounts, no setup |
| **8 AI techniques** | Chain-of-Thought, Role Priming, XML Structure, Few-Shot, Constraints, Prefill, Self-Critique, Positive Framing |
| **Streaming output** | Prompts animate in as they're received |
| **Prompt refinement** | One-click tightening and improvement |
| **Quality score** | Visual meter based on depth of inputs |
| **Copy & export** | Copy to clipboard or download as .txt |
| **Rate limiting** | 20 requests per 10 mins per IP — prevents abuse |
| **Responsive** | Works on mobile, tablet, desktop |

---

## Security Notes

- The `ANTHROPIC_API_KEY` is **never sent to the browser**
- All Anthropic calls happen server-side only
- Rate limiting prevents API abuse
- Request payloads are sanitized and size-capped
- CORS is restricted to your domain in production

---

## Cost Estimate

Each prompt generation uses ~1,800 tokens (input + output) on Claude Sonnet 4.
At current pricing, roughly **$0.002–0.005 per generation**.
1,000 generations ≈ $2–5.

---

Built on [Anthropic's Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
