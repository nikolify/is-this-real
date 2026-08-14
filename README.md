# Is This Real?

A mobile web game for the UNESCO Youth Hackathon 2026.

> Your grandmother forwards you suspicious messages and asks "is this real?"
> Believing the lie loses. Refusing to believe the truth loses too.

---

## Run it locally

The game loads its content from a JSON file, so it needs a tiny web
server. Opening `index.html` directly will show a "couldn't load" message.

**With Python (already installed here):**

```bash
python -m http.server 8123
```

Then open <http://localhost:8123>

**Or with Node:**

```bash
npx serve .
```

---

## Files

| File | What it is |
|---|---|
| `index.html` | Page shell + meters |
| `style.css` | Landing page, phone-chat UI, light + dark mode |
| `game.js` | The engine: rounds, meters, endings |
| `content.lk.json` | 🇱🇰 **Sri Lanka** content |
| `content.mm.json` | 🇲🇲 **Myanmar** content |
| `content.id.json` | 🇮🇩 **Indonesia** content |
| `content.en.json` | Neutral template, copy this to add a 4th country |
| `GAME-DESIGN-Is-This-Real.md` | Full design doc for the team |
| `TEAM-BRIEF-Is-This-Real.md` | Plain-language brief to share |

**You almost never need to touch `game.js`.** Editing the game means
editing your country's JSON file.

**One file per person.** Whoever is from that country owns that file,
you can all work at once with no merge conflicts.

---

## Countries

The landing page asks the player where they are. **The game is always in
English.** The country changes the names, places, institutions and
currency to ones the player recognises.

| | She is | Calls you | Money | Electricity | Clinic |
|---|---|---|---|---|---|
| 🇱🇰 | Achchi | Putha | Rs. / eZ Cash | CEB | OPD |
| 🇲🇲 | Ah Phwa | Thar | Ks / KBZPay | ESE | Township Clinic |
| 🇮🇩 | Nenek | Nak | Rp / DANA | PLN | Puskesmas |

Deep-link straight into one: <http://localhost:8123/?c=lk> (`lk`, `mm`, `id`)

**Please check your own country's file.** The names, institutions and
scam wording are a first draft. Fix anything that doesn't sound like a
message someone there would actually receive. That realism is the
whole point.

### Adding a fourth country

1. Copy `content.en.json` → `content.xx.json`
2. Fill in `meta.country`, `meta.she`, `meta.callsYou`, and localise the rounds
3. Add it to the `COUNTRIES` list at the top of `game.js` (3 lines)

---

## How the game works

- Two meters start at **3 / 5**: 💰 **Safe** and 💛 **Confident**
- **3 checks** for the whole game, but **5 rounds offer one**, so you must
  choose which to spend them on. That scarcity is the point.
- If either meter hits **0**, the game ends early
- Four endings depending on your final meters

## Editing a round

Each round in `content.en.json`:

```json
{
  "id": 1,
  "act": "act1",
  "type": "forward",          // forward | voice | outgoing | ending
  "message": "the message text",
  "messageNote": "optional label above it",
  "prompt": "what Amma says",
  "choices": [
    { "text": "button label",
      "outcome": "what happens",
      "safe": -2, "confident": -1,
      "usesCheck": false,
      "correct": false }
  ],
  "why": "one sentence. never a lecture."
}
```

---

## Sharing and hosting

It's fully static: no backend, no build step, no environment variables.
**Every free static host works.**

### Fastest way to share it today (2 minutes, no account)

1. Go to **<https://app.netlify.com/drop>**
2. Drag this whole folder onto the page
3. You get a live URL instantly. Send it to anyone.

Good for showing teammates. Not the long-term home.

### Permanent home (needed before we submit)

**The proposal will contain a link the judges click. It must not expire.**
A Netlify Drop link made without an account is temporary, so use one of
these for the real thing:

**GitHub Pages**

1. Create a repo on github.com, drag the files into the web uploader
   (no git install needed)
2. Repo → **Settings** → **Pages** → Source: **Deploy from a branch** →
   branch `main`, folder `/ (root)` → Save
3. Live in about a minute at `https://<username>.github.io/<repo>/`

**Cloudflare Pages**

Dashboard → **Workers & Pages** → **Create** → **Pages** → **Upload assets**,
then drag the folder in. Free, stable URL, often faster outside Europe/US.

Both are free forever and both work perfectly here. To update either one,
re-upload the changed files.

### If the JSON gets broken while editing

The game will say **"That file has a typo in it"** and print the exact line
and column. Usually a missing comma or a missing `"`. Paste the file into
**jsonlint.com** to find it.

---

## Privacy

The game asks the player for nothing and stores nothing. There are no
text inputs, no analytics, no accounts, no cookies, no database, and no
backend of any kind. Every message in the game is fictional.

An earlier draft asked the player to type their family's code word at the
end. It was cut. Asking for that is asking for genuinely personal
information, and "we promise to discard it" requires trust the player
cannot verify. Collecting nothing is both safer and a stronger claim.
