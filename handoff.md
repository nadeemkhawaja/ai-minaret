# AI-Minaret: Development Handoff & Status

## 1. Key Requirements & Constraints
* **Aesthetics**: UI must remain premium, sleek, and visually stunning (e.g., using `object-fit: cover` for the new futuristic minaret hero banner).
* **Brevity**: The AI Scholar outputs must be extremely crisp, simple, and clear for a normal reader. The default depth is strictly set to "Brief (20-50 words)".
* **Model Separation**: Different layers must run on different models (Layers 0,2,3,5 use Primary; Layers 1,4 use Secondary for independent perspectives). This transparency must be clearly visible in the UI.
* **Knowledge Source Blending**: The system must intelligently mix sources (Tafsir Ibn Kathir, Al-Qurtubi, uploaded `.md` files) across different layers, rather than statically locking one source.
* **Theological Constraints (Layer 5)**: The final verdict must give heavy weight to Sahih Muslim for Hadith, but treat the Quran as the absolute final authority (no Hadith can contradict the Quran).

## 2. Current Status
* The UI is fully optimized with the new Hero Image and "Brief" default argument depths.
* The **Coaching Notes** generation is hyper-optimized down to a strict 50-word, 3-sentence format (Key Strength, Biggest Weakness, Quick Win).
* The **Dynamic Topic Generator** is live. The app quietly auto-generates 1 novel debate topic in the background per session and saves it to a persistent `data/topics.json` backend DB, organically growing the app's topic library over time.
* **Model Transparency** is fully implemented. Every layer's subheading actively displays the role, provider, and exact model (e.g., `Primary Model (LOCAL) · google/gemma-4-26B-A4B-it`).
* **The Auto-Blender** source logic is fully implemented. Layers 1-4 randomly shuffle and combine 2 unique sources (including uploaded `.md` files).
* **Layer 5 Synthesis** explicitly forces the LLM to evaluate all sources, heavily weighting Sahih Muslim and strictly filtering by the Quran. 

## 3. Key Decisions Made
1. **Frontend-Driven Background Generation**: Instead of building LLM calls in the Node backend, the frontend triggers `generateDynamicTopic()` silently on boot (max 1 per session via `sessionStorage`). It then POSTs the generated JSON to the backend `/api/dynamic-topics` to save it. This respects the user's local API keys and avoids backend bloat.
2. **Auto-Blender vs Manual UI**: Rather than cluttering the UI with 5 dropdowns for 5 layers, we chose "The Auto-Blender." The code dynamically computes `getLayerSources()` for Layers 1-4 to pick 2 distinct sources, ensuring a multi-dimensional debate organically.
3. **Layer 5 Override**: We overrode the Auto-Blender for Layer 5 only. It forces the string `"ALL Uploaded Files, Quran, Sahih Muslim, and Category Sources"` and injects strict prompt constraints to fulfill the theological requirements.

## 4. Finalized Code Logic Snippets

**Auto-Blender Logic (src/main.js):**
```javascript
const currentCatObj = CATS.find(c => c.id === S.currentCat);
const currentSubObj = currentCatObj ? currentCatObj.subs.find(s => s.id === S.currentSub) : null;
const allAvailableSources = currentSubObj ? [...currentSubObj.sources] : [S.source];
if (S.uploadFileNames && S.uploadFileNames.length > 0) allAvailableSources.push(...S.uploadFileNames);

function getLayerSources() {
  if (allAvailableSources.length === 0) return S.source;
  const shuffled = [...allAvailableSources].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2).join(' & ');
}
// Used in Layers 1-4: const src1 = getLayerSources();
```

**Layer 5 Theological Constraints (src/main.js):**
```javascript
const src5 = "ALL Uploaded Files, Quran, Sahih Muslim, and Category Sources";
await runLayer(5,'Final Strategy & Verdict',"AI Scholar's definitive ruling",'#0a0a08',
  `You are AI Scholar, an elite AI Reasoning Strategist and host.
Tone: ${S.tone}. Keep the output brief, simple, crisp, and clear for a normal reader.
CRITICAL RULE: Draw on ALL category sources and all uploaded .md files. Give heavy weight to Sahih Muslim for Hadith evidence. You MUST always look to the Quran as the final authoritative verdict, and ensure no cited Hadith contradicts the Quran.
...
End with a bold "FINAL VERDICT:" from AI Scholar. ${S.depth} words. ${CITE}`, false, src5);
```

**Dynamic DB Endpoints (server/app.js):**
```javascript
const TOPICS_DB_PATH = path.join(rootDir, 'data', 'topics.json');

app.get('/api/dynamic-topics', (req, res) => {
  if (!fs.existsSync(TOPICS_DB_PATH)) return res.json({});
  return res.json(JSON.parse(fs.readFileSync(TOPICS_DB_PATH, 'utf8')));
});

app.post('/api/dynamic-topics', express.json(), (req, res) => {
  const { subId, topic } = req.body;
  let db = fs.existsSync(TOPICS_DB_PATH) ? JSON.parse(fs.readFileSync(TOPICS_DB_PATH, 'utf8')) : {};
  if (!db[subId]) db[subId] = [];
  db[subId].push(topic);
  fs.writeFileSync(TOPICS_DB_PATH, JSON.stringify(db, null, 2));
  return res.json({ success: true, db });
});
```
