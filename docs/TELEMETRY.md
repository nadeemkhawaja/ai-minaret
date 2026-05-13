# ArgueMind — AI Telemetry Specification

## Overview

ArgueMind captures AI telemetry at every layer of the reasoning pipeline. This satisfies **Requirement 4** (telemetry at every layer) and feeds into **Requirement 5** (one optimization based on telemetry).

---

## Metrics Captured Per Layer

| Metric | Type | Description | Where Displayed |
|--------|------|-------------|-----------------|
| `input_tokens` | Integer | Tokens sent to Claude API | Layer card footer |
| `output_tokens` | Integer | Tokens received from Claude | Layer card footer |
| `latency_s` | Float | API call duration in seconds | Layer card footer |
| `efficiency` | Float | `output_tokens ÷ input_tokens` | Layer card footer (red if <0.6) |

**Example Layer 2 footer display:**
```
↑ 1,842 in  ↓ 1,134 out  eff 0.62
```

---

## Aggregate Telemetry Bar

The 5-cell bar above the pipeline shows running totals:

| Cell | Label | Value |
|------|-------|-------|
| 1 | ↑ Input | Sum of all input_tokens |
| 2 | ↓ Output | Sum of all output_tokens |
| 3 | ⚡ Total | input + output |
| 4 | ⏱ Time | Wall clock from Run click |
| 5 | ⚖ Efficiency | total_output ÷ total_input |

---

## Requirement 5 — Telemetry-Driven Optimization

After every pipeline run, ArgueMind runs `runTelemetryOptimization()`.

This function inspects the telemetry and fires one of four named recommendations:

### Rule 1 — Low Output Density
```
Trigger: efficiency < 0.6
Label:   "Low output density detected (eff: X.XX)"
Action:  "Optimization applied: switching to Deep Dive depth will increase 
          argument density. Try Argument Depth 300–350 words."
Layer:   All layers
```

### Rule 2 — High Input Token Cost
```
Trigger: total_input_tokens > 8,000
Label:   "High input token cost (N tokens)"
Action:  "Optimization applied: context chaining is working but growing large. 
          Consider Concise depth to reduce cost by ~35%."
Layer:   L3 → L5 (where chained context is largest)
```

### Rule 3 — High Latency
```
Trigger: elapsed_seconds > 60
Label:   "High latency detected (Ns total)"
Action:  "Optimization applied: Concise depth (150–200 words) will reduce 
          latency by approximately 40% with minimal quality loss."
Layer:   All layers
```

### Rule 4 — Healthy Pipeline
```
Trigger: efficiency >= 0.8 AND total_output > 2,000
Label:   "Strong output density confirmed (eff: X.XX)"
Action:  "Pipeline is performing optimally. No optimization required."
Layer:   All layers
```

---

## Efficiency Ratio Explained

The efficiency ratio (`output_tokens ÷ input_tokens`) is ArgueMind's primary pipeline health metric.

| Ratio | Interpretation |
|-------|----------------|
| > 0.8 | Excellent — high output relative to context sent |
| 0.6 – 0.8 | Good — normal range for chained reasoning |
| 0.4 – 0.6 | Low — model being too concise, depth increase recommended |
| < 0.4 | Very low — something may be wrong, check prompt or topic |

As the pipeline progresses from L1 to L5, the input grows (because prior layers are injected as context) while output size stays roughly constant. This naturally pushes efficiency down in later layers. The telemetry system accounts for this by evaluating the **global** efficiency across all layers, not just per-layer.

---

## Telemetry in the Layer Cards

Each completed layer article card displays:

```
Layer 2 — Argument Builder                            PRINTED
C — Complication · SCIPAB Framework
Three evidence-backed arguments in your defence
By Loffi · ESPN · 4.2s · eff: 0.68
────────────────────────────────────────────────────
[article body text — 2 newspaper columns]
────────────────────────────────────────────────────
↑ 1842 in   ↓ 1251 out   eff 0.68   [Copy]  [Read Aloud]
```

The efficiency ratio turns **red** if it falls below 0.6, giving the user an immediate visual signal that a layer underperformed.

---

## Telemetry Data Flow

```
API call starts
     │
     ├── Record t0 = Date.now()
     │
     ▼
Claude API call (/.netlify/functions/claude)
     │
     ├── Returns: { content[0].text, usage.input_tokens, usage.output_tokens }
     │
     ▼
Capture metrics:
     ├── text = content[0].text
     ├── inTok = usage.input_tokens
     ├── outTok = usage.output_tokens
     ├── elapsed = (Date.now() - t0) / 1000
     ├── efficiency = outTok / inTok
     │
     ├── S.totalIn += inTok
     └── S.totalOut += outTok
     │
     ▼
Display in layer card footer + update aggregate bar
     │
     ▼
After final layer → runTelemetryOptimization()
     ├── Check efficiency, tokens, latency
     └── Render named optimization recommendation
```
