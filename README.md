# ArgueMind — AI Debate Strategist

> **Hosted by Loffi** — your AI debate strategist.

**GitHub:** [github.com/nadeemkhawaja/arguemind](https://github.com/nadeemkhawaja/arguemind)

---

## How to Run

**No server needed. No deployment. Just open the file.**

```bash
# Option A — open directly
open index.html

# Option B — local server (recommended)
python3 -m http.server 8080
# then open http://localhost:8080
```

On first load, enter your **Anthropic API key** (`sk-ant-...`).  
Get one at [console.anthropic.com](https://console.anthropic.com) → API Keys.  
The key is stored in your browser session only — never sent to any server except `api.anthropic.com`.

---

## Features

- 🧠 **7-Layer PSIPAB Pipeline** — L0 Fallacy → L1 Context → L2 Args → L3 Counter → L4 Critique → L5 Verdict
- 📊 **AI Telemetry** — tokens, latency, efficiency ratio at every layer
- ⚡ **Telemetry Optimization** — auto alert if efficiency or latency threshold breached
- 🎯 **210 Topics** — 15 categories × 35 sub-categories × 6 topics each
- 📂 **3-Level Navigation** — Category → Sub-category → Topic
- ⚔️ **AI vs AI Arena** — Loffi debates an opponent AI
- 🎤 **Live Voice Debate** — speak vs Loffi in real time
- 🗺 **Flowchart Tab** — SVG pipeline diagram with PSIPAB labels
- 🔊 **Kokoro TTS** — local voice, runs in browser, no API key, no cost

---

## Kokoro TTS (Local Voice)

Kokoro is an 82M parameter TTS model that runs 100% in your browser via WebAssembly.

- First use downloads ~80MB model (cached after that, works offline)
- No API key · No cost · No data leaves your machine
- Apache licensed · 8 voices (American + British, male + female)
- Toggle on/off in the Voice accordion in the app

---

## Project Structure

```
arguemind/
├── index.html       ← Complete app — open in any browser
├── README.md
├── PROMPTS.md       ← All 14 AI prompts documented
└── docs/
    ├── FLOWCHART.md
    ├── PSIPAB.md
    ├── TELEMETRY.md
    └── REFLECTION.md
```

---

## Assignment Checklist

- [x] Req 1: Multi-layer reasoning — 5 layers (L1–L5) + L0 fallacy scan
- [x] Req 2: PSIPAB — labelled on every layer card + full table in Flowchart tab
- [x] Req 3: Flowchart — SVG diagram in dedicated tab
- [x] Req 4: Telemetry — tokens in/out, latency, efficiency per layer
- [x] Req 5: Optimization — efficiency + latency alerts after every run
- [ ] Req 6: Video demo — record with [Loom](https://loom.com) under 5 min

---

MIT License · Built by Nadeem Khawaja
