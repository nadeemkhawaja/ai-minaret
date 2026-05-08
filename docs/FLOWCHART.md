# ArgueMind — Pipeline Flowchart

## System Overview

ArgueMind runs a sequential 7-node reasoning pipeline. Each node receives all prior outputs as context (true chain-of-thought). Telemetry is captured at every node.

```
┌─────────────────────────────────────────────────────┐
│                    USER INPUT                        │
│         Topic · Position · Persona · Depth          │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│         LAYER 0 — FALLACY SCAN          [TELEMETRY] │
│  PSIPAB: P — Problem detection                      │
│  Detect logical fallacies in topic framing          │
│  Output: JSON {fallacies:[...]}                     │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│         LAYER 1 — CONTEXT ANALYSIS      [TELEMETRY] │
│  PSIPAB: P — Problem mapping                        │
│  Objective landscape. 4-5 key factors.              │
│  No position taken.                                 │
└──────────────────────┬──────────────────────────────┘
                       │ ← L1 injected into L2
                       ▼
┌─────────────────────────────────────────────────────┐
│         LAYER 2 — ARGUMENT BUILDER      [TELEMETRY] │
│  PSIPAB: S — Solution                               │
│  3 evidence-backed arguments                        │
│  Claim + Evidence + Example per argument            │
└──────────────────────┬──────────────────────────────┘
                       │
              ┌────────┴────────┐
              │  OPTIONAL PATH  │
              ▼                 │
┌─────────────────────┐         │
│  SOCRATIC DRILLING  │         │
│  Loffi asks 2       │         │
│  probing questions  │         │
│  User answers →     │         │
│  injected into L3   │         │
└──────────┬──────────┘         │
           └────────┬───────────┘
                    │ ← L1 + L2 + optional Socratic answers injected
                    ▼
┌─────────────────────────────────────────────────────┐
│        LAYER 3 — COUNTER-ARGUMENT        [TELEMETRY]│
│  PSIPAB: I — Implementation                         │
│  3 compelling counter-arguments                     │
│  Each directly addresses an L2 claim               │
└──────────────────────┬──────────────────────────────┘
                       │ ← L2 + L3 injected
                       ▼
┌─────────────────────────────────────────────────────┐
│         LAYER 4 — SELF-CRITIQUE         [TELEMETRY] │
│  PSIPAB: P — Proof                                  │
│  3-4 honest weaknesses in L2 arguments             │
│  Improvement suggestion per weakness                │
└──────────────────────┬──────────────────────────────┘
                       │ ← L1 + L2 + L3 + L4 all injected
                       ▼
┌─────────────────────────────────────────────────────┐
│     LAYER 5 — FINAL STRATEGY & VERDICT  [TELEMETRY] │
│  PSIPAB: A — Action + B — Benefit                   │
│  Synthesis of all layers                            │
│  Conditions for each side winning                   │
│  FINAL VERDICT from Loffi                          │
└───────────────┬──────────────────┬──────────────────┘
                │                  │
                ▼                  ▼
┌──────────────────┐  ┌────────────────────────────────┐
│   SCORE CARD     │  │     COACHING FEEDBACK          │
│  PSIPAB: Benefit │  │  PSIPAB: Benefit               │
│  4 metrics 0-100 │  │  Strengths · Weaknesses        │
│  Overall score   │  │  Style profile · Exercise      │
└──────────────────┘  └────────────────────────────────┘
                │                  │
                └─────────┬────────┘
                           ▼
┌─────────────────────────────────────────────────────┐
│      TELEMETRY OPTIMIZATION ALERT        (Req. 5)   │
│  Analyse efficiency ratio + latency                 │
│  Fire named recommendation if threshold breached    │
│  eff < 0.6 → recommend deeper depth                 │
│  tokens > 8000 → recommend concise mode             │
│  latency > 60s → flag slow pipeline                 │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                   EXPORT                            │
│      Markdown · Plain Text · JSON · Share Link      │
└─────────────────────────────────────────────────────┘
```

## Telemetry Captured at Every Layer

| Metric | Description |
|--------|-------------|
| input_tokens | Tokens sent to Claude |
| output_tokens | Tokens received |
| latency_s | API call duration in seconds |
| efficiency | output ÷ input ratio |

Displayed per-layer in each article card footer, and aggregated in the 5-cell telemetry bar above the pipeline.

## Context Chain Diagram

```
L1 output ──────────────────────────────────────────► L2 prompt
L1 output + L2 output ──────────────────────────────► L3 prompt
            L2 output + L3 output ──────────────────► L4 prompt
L1 + L2 + L3 + L4 outputs ──────────────────────────► L5 prompt
L2 + L3 + L4 + L5 excerpts ─────────────────────────► Score + Coach
```

Each arrow represents full-text injection, not summaries. This guarantees genuine chain-of-thought where every layer truly builds on what came before.
