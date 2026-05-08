# ArgueMind — Design Reflection

## Project Summary

ArgueMind is a multi-layer AI reasoning system built around the PSIPAB framework, designed to help professionals and executives sharpen their thinking and argumentation skills.

**Host:** Loffi — AI Debate Strategist
**Model:** Claude Sonnet 4 (claude-sonnet-4-20250514)
**Deployment:** Netlify + Supabase
**Interface:** Single HTML file — no framework, no build step

---

## Core Design Decisions

### 1. True Context Chaining vs Parallel Generation

**Decision:** Every layer receives the full text of all prior layers, not just the topic label.

**Why it matters:** The most common failure in multi-layer AI systems is treating each layer as independent. If Layer 3 (Counter-Argument) only receives the topic string, it generates counters to a generic position — not to the specific arguments that Layer 2 actually built. True context chaining means Loffi is genuinely responding to what was argued, not to a label.

**Trade-off:** Context grows significantly by Layer 5. Layer 5's input can be 4-5× larger than Layer 1's. This increases cost and latency. The telemetry optimization system monitors this and recommends Concise depth when input tokens exceed 8,000.

**Outcome:** Measurably higher quality arguments. L3 counter-arguments directly reference and challenge specific L2 claims. L4 self-critique is grounded in what L3 actually attacked.

---

### 2. PSIPAB as Visible Framework, Not Hidden Structure

**Decision:** Display PSIPAB labels explicitly on every layer card.

**Why it matters:** A framework that only exists in the code is invisible to users and assessors. Making PSIPAB visible on every layer card transforms it from an architecture decision into a learning tool — users see the reasoning structure as it builds.

**Implementation:** Each layer card header displays the PSIPAB label in gold:
- L0: "P — Problem · Detect logical fallacies"
- L1: "P — Problem · Map the debate landscape"
- L2: "S — Solution · Build your strongest arguments"
- L3: "I — Implementation · Steel-man the opposition"
- L4: "P — Proof · Audit weaknesses honestly"
- L5: "A — Action + B — Benefit · Final strategy & verdict"

---

### 3. Telemetry as a Feature, Not a Debug Tool

**Decision:** Show token counts, latency, and efficiency ratio to users — not just developers.

**Why it matters:** Most AI applications hide telemetry. Exposing it serves two purposes: (1) it demonstrates the system's transparency about how it works, and (2) it creates the data needed for the optimization requirement.

**The efficiency ratio** (output_tokens ÷ input_tokens) is the most useful single metric. It tells you whether the model is being appropriately thorough relative to the context it received. A ratio below 0.6 means the model is underutilising the context — a signal to increase depth.

---

### 4. Single HTML File Architecture

**Decision:** Build the entire application in one HTML file with zero dependencies.

**Why it matters:** Most AI applications require a build system, npm install, framework setup, and local server. This creates friction between the idea and the running application.

A single HTML file deploys to Netlify with a git push, runs offline, can be emailed, and requires no maintenance. The trade-off (no hot reload, no TypeScript) is worth the deployment simplicity for a demo-class application.

**Result:** The deployed application is a single 200KB file that loads in under 1 second.

---

### 5. 3-Level Topic Navigation

**Decision:** Category → Sub-category → Topic (3 levels, not 1).

**Why it matters:** With 15 categories and 210 topics, a flat list is unusable. A 2-level system (category + grid) creates grids of 6-14 topics that require scanning. The 3-level system (category tab → sub-category pill → 6 cards) keeps every view to exactly 6 items — a cognitive load that matches human short-term memory capacity.

**Architecture:**
- Level 1: 15 category tabs (Sports, Travel, News...)
- Level 2: 2-6 sub-category pills per category (Soccer, Boxing, Cricket...)
- Level 3: 6 topic cards per sub-category, each with 2 debate positions

---

### 6. Loffi as a Named Persona

**Decision:** Give the AI host a specific name, identity, and real photo.

**Why it matters:** Anonymous AI systems feel mechanical. Naming the host "Loffi" and embedding her actual portrait creates a sense of interaction with a specific entity rather than a tool. Users engage differently with a named, pictured host than with a generic "AI assistant."

**Implementation:** Loffi's photo is embedded as a base64 data URI directly in the HTML — no external URL, works offline, loads instantly.

---

## What Worked Well

**The PSIPAB layering** produced noticeably better arguments than simple prompt chaining. The constraint of each layer having a defined role prevented the model from jumping to conclusions or repeating itself across layers.

**The editorial broadsheet aesthetic** differentiated ArgueMind from typical dark-theme AI apps. The light paper background, serif typography, and newspaper column layout make the debate output feel like a considered document rather than a chat response.

**The fallacy detection Layer 0** is genuinely useful. Topics like "Should we ban all social media?" contain false dichotomies that L0 catches and flags before the user wastes tokens arguing a poorly framed question.

---

## What Would Be Improved Next

**Streaming layer output** — currently each layer appears after its API call completes. Streaming the tokens as they arrive would make the reasoning feel alive rather than appearing in chunks. The Netlify function would need to use `anthropic.messages.stream()` and pipe SSE chunks.

**Supabase integration** — the schema is written and deployed but the front-end doesn't yet write debates to the database. Activating this would enable leaderboards, share links with persistent state, and debate history across sessions.

**Richer telemetry** — currently tracking tokens and latency. Adding cost per layer (based on model pricing), token distribution across layers (which layers use most context), and session-level efficiency trends would make the optimization insights more actionable.

**Voice-first mode** — the Live Debate tab uses Web Speech API for speech-to-text and ElevenLabs for text-to-speech. A fully voice-first version where the user never types would be significantly more natural for real-time debate practice.

---

## Lessons Learned

1. **Context injection quality matters more than prompt length.** A short, precise prompt with rich prior context produces better output than a long prompt with no context.

2. **Making the framework visible changes how users engage.** When users see "P — Problem" on the first card, they understand they are in a structured reasoning process, not just getting a long response.

3. **Telemetry creates accountability.** Displaying efficiency ratios per layer makes it immediately obvious when a layer underperformed — something that is invisible when you only see the text output.

4. **Single-file architecture has real deployment advantages** for demo-class applications. The ability to email the file, run it offline, and deploy with a drag-and-drop is worth more than the tooling convenience of a bundled framework.

5. **Naming the AI matters.** "Loffi" produces more engaged interactions than "the AI." The persona makes the interaction feel purposeful rather than mechanical.
