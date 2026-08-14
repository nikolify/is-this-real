# Is This Real?

**A game where believing the lie loses, and refusing to believe the truth loses too.**

### ▶ [Play it here](https://nikolify.github.io/is-this-real/)

Six minutes. Any phone. Nothing to install, no account, no data collected.

---

## The idea

Your grandmother forwards you a suspicious message and asks whether it's
real. You answer. You watch what your answer did to her.

Older people are losing money to scams that AI has made much harder to
spot: flawless official-sounding text, cloned voices, fake bills. So we
warn them. Constantly.

**And that creates a second harm nobody talks about.** People taught only
fear stop trusting everything. They stop answering unknown numbers and miss
the clinic. They abandon mobile banking. They ignore the real electricity
bill because it "looked like a scam", and the power gets cut.

Being defrauded is one harm. Being frightened out of digital life is
another.

So this game has **two ways to lose**:

- You said a scam was safe → she loses money
- You said something real was a scam → she misses her appointment, her power
  is cut, she stops trusting her own judgment

Neither trust nor doubt wins. You have to actually think.

---

## How it works

**Eight rounds, two acts, about six minutes.**

Two meters are always visible:

| Meter | Means |
|---|---|
| 💰 **Safe** | Did scams get through? |
| 💛 **Confident** | Is she still using her phone, and still asking you? |

**Verification is scarce.** "Let me check" is usually right, but you get
three checks and five rounds offer one. You have to decide what actually
deserves checking.

**Act 2 turns it around.** You lose your bag in another city and message her
from an unknown number for help. She doesn't believe it's you. You have to
prove who you are using exactly the standards you spent Act 1 imposing on
her. Every proof you reach for first is already on your own social media.

**The ending replays your own choices from her side** — built entirely from
what you did in that session, stored nowhere.

---

## Countries

The game is **always in English**. Choosing a country swaps the names,
places, institutions and currency for ones the player recognises.

| | She is | Calls you | Money | Electricity | Clinic |
|---|---|---|---|---|---|
| 🇱🇰 Sri Lanka | Achchi | Putha | Rs. / eZ Cash | CEB | OPD |
| 🇲🇲 Myanmar | Ah Phwa | Thar | Ks / KBZPay | ESE | Township Clinic |
| 🇮🇩 Indonesia | Nenek | Nak | Rp / DANA | PLN | Puskesmas |

Deep-link to one directly: [`?c=lk`](https://nikolify.github.io/is-this-real/?c=lk) ·
[`?c=mm`](https://nikolify.github.io/is-this-real/?c=mm) ·
[`?c=id`](https://nikolify.github.io/is-this-real/?c=id)

---

## Privacy

**The game asks for nothing and stores nothing.** No accounts, no analytics,
no cookies, no text inputs, no backend of any kind. Every message in the
game is fictional.

An earlier draft ended by asking players to type their family's code word.
It was removed. Asking for that is asking for genuinely sensitive
information, and "we promise to discard it" requires trust the player can't
verify. A project about protecting yourself shouldn't ask you to hand
anything over.

---

## Running it locally

It needs a tiny web server, because the browser blocks reading local JSON
files directly. Opening `index.html` by double-clicking will show a
"couldn't load" message.

```bash
python -m http.server 8123
```

Then open <http://localhost:8123>. Any static server works equally well.

---

## Files

| File | What it is |
|---|---|
| `index.html` | Page shell and meters |
| `style.css` | Landing page, phone-chat UI, light and dark mode |
| `game.js` | The engine: rounds, meters, endings |
| `content.lk.json` | 🇱🇰 Sri Lanka content |
| `content.mm.json` | 🇲🇲 Myanmar content |
| `content.id.json` | 🇮🇩 Indonesia content |
| `content.en.json` | Neutral template for adding a new country |

**All the writing lives in the JSON files.** You almost never need to touch
`game.js`.

### Editing a round

```json
{
  "id": 1,
  "act": "act1",
  "type": "forward",          // forward | voice | outgoing | ending
  "message": "the message text",
  "messageNote": "optional label above it",
  "prompt": "what she says",
  "choices": [
    { "text": "button label",
      "outcome": "what happens",
      "heard": "what she heard, shown in the ending",
      "safe": -2, "confident": -1,
      "usesCheck": false,
      "correct": false }
  ],
  "why": "one sentence. never a lecture."
}
```

If the JSON gets broken, the game says **"That file has a typo in it"** and
prints the exact line and column. Usually a missing comma or quote.

### Adding a country

1. Copy `content.en.json` to `content.xx.json`
2. Fill in `meta.country`, `meta.she`, `meta.callsYou`, and localise the rounds
3. Add it to the `COUNTRIES` list at the top of `game.js` (one line)

---

## Deploying

Fully static: no backend, no build step, no environment variables. Any free
static host works. This copy runs on GitHub Pages, deployed from `main`.

---

## About

Built for the **UNESCO Youth Hackathon 2026**, under the theme
*Play Your Part: Youth Designing the Future of Media and Information
Literacy*.

Made by a three-country team from Sri Lanka, Myanmar and Indonesia. Each of
us wrote the version for our own country, using messages our own families
have actually received.
