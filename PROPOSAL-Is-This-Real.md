# Is This Real?

### A game where believing the lie loses, and refusing to believe the truth loses too

**UNESCO Youth Hackathon 2026** · Theme: *Play Your Part: Youth Designing the Future of Media and Information Literacy*

| | |
|---|---|
| **Category** | Game (browser-based) |
| **Challenge tracks** | AI and MIL · MIL Education |
| **Play it now** | **https://nikolify.github.io/is-this-real/** |
| **Source code** | https://github.com/nikolify/is-this-real |

> **This is not a concept. It is finished and playable.** Open the link on any
> phone. It takes six minutes. We would rather you played it than read about it.

---

## 1. Team

| Name | Age | Country | Role |
|---|---|---|---|
| *[name]* | *[age]* | 🇱🇰 Sri Lanka | *[role]* |
| *[name]* | *[age]* | 🇲🇲 Myanmar | *[role]* |
| *[name]* | *[age]* | 🇮🇩 Indonesia | *[role]* |

We are a three-country team from South and Southeast Asia. That is not
incidental to the project: each of us wrote the version of the game for our
own country, using messages our own families have actually received.

---

## 2. Problem statement

Older people in our countries are losing money to scams that arrive by
message, and the scams have become far harder to spot. Generative AI now
writes flawless official-sounding text and clones a family member's voice
from a few seconds of video. The advice our grandparents were given
(*"scams have bad spelling"*, *"you can tell from the voice"*) stopped
working, and nobody has replaced it.

So we do what everyone does: we warn them. Constantly. Be careful, don't
click, don't trust it, ask me first.

**And that creates a second harm that almost nobody is addressing.**

People who are taught only fear stop trusting *everything*. They stop
answering unknown numbers, so they miss the clinic calling. They abandon
mobile banking, so they queue for hours. They ignore the real electricity
bill because it "looked like a scam", and the power gets cut. They stop
asking their grandchildren, because the answer is always no.

Access to information is a right. Fear removes it just as effectively as
fraud does. **Being defrauded is one harm; being frightened out of digital
life is another.** Current MIL and anti-scam education treats only the
first.

---

## 3. Our insight

Every media and information literacy game we could find has **one way to
lose: you believed something false.** That makes maximum suspicion the
winning strategy, which is both a poor game and poor advice.

Real media literacy is not suspicion. It is **calibration** — the judgment
to know which claims need checking and which do not, and the skill to check
them properly.

So we built a game with **two ways to lose**:

- You said a scam was safe → she loses money
- You said something real was a scam → she misses her appointment, her power
  is cut, she stops trusting her own judgment

Neither trust nor doubt wins. The player has to think.

**Wider relevance.** The same dynamic is now used against journalists: once
audiences know anything can be faked, genuine evidence is dismissed as
"probably AI". A public trained only to doubt is not a protected public.
Teaching calibration rather than fear matters well beyond family group
chats.

---

## 4. What the game is

Your grandmother forwards you a suspicious message and asks whether it is
real. You answer. You watch what your answer did to her.

**One round looks like this:**

> 📱 **She forwards a screenshot**
> *"URGENT: Your electricity account will be DISCONNECTED on Friday due to
> non-payment. Pay immediately at [link]."*
>
> **"Putha, is this real? Should I just pay it?"**
>
> **You choose:** ✅ "It's fine" · 🚫 "It's a scam, ignore it" · 🔍 "Wait, let me check"
>
> *You chose "It's a scam."*
> **Friday: her power is cut off. It was her real bill.**

Eight rounds, two acts, about six minutes.

**Two meters are always visible.** 💰 *Safe* — did scams get through?
💛 *Confident* — is she still using her phone, and still asking you?

**Verification is scarce.** "Let me check" is usually the right answer, but
you get three checks and five rounds offer one. You must decide what
deserves real verification, which is the actual daily problem.

**Act 2 turns it around.** You lose your bag in another city and message her
from an unknown number for help. She does not believe it is you. You must
prove your identity using exactly the standards you spent Act 1 imposing on
her. Every "proof" you reach for first (your birthday, your dog's name) is
already on your own social media. Only a memory that was never posted works.

**The ending replays your own choices from her side.** A player who cried
scam at everything reads:

> You said: *"It's a scam, ignore it"* → She heard: **"I cannot even recognise my own bills anymore."**

A careful player reads:

> You said: *"Wait, let me check"* → She heard: **"There is a way to find out. I can do that myself."**

The whole game is about the cost to her, and this is the only place the
player sees it in her own voice, in their own words.

---

## 5. Target audience

**Players and learners: young people, 15–30** — the family "tech support"
every household already relies on.

**Beneficiaries: their older relatives.**

We are deliberate about this split. Young people do not need to be taught
what a scam is; they think they already know. What they have never been
taught is that **they are their family's information gatekeeper, and that
protecting someone with fear pushes that person out of digital life.** That
is the lesson, and it is genuinely new to them.

The game closes by inviting the player to play it again *with* the person
they were protecting, which is how it reaches older people directly.

One round exists purely to prevent condescension: she has already verified
a message in person at the government office, and the only correct answer
is to say so. The player must be wrong, and she must be right.

---

## 6. What it teaches

| Round | MIL competency |
|---|---|
| 1 | Recognising the advance-fee pattern |
| 2 | Urgency is not evidence; verify through an already-trusted channel |
| 3 | A voice is no longer identity; call back on a known number |
| 4 | Respecting verification others have already done |
| 5 | Retiring dead heuristics: grammar no longer signals fraud |
| 6 | Experiencing verification from the other side |
| 7 | What actually constitutes proof of identity |
| 8 | Trust is a shared resource you can personally deplete |

After every round a single sentence explains why. Never a lecture.

---

## 7. Innovation and creativity

- **A losing condition nobody else uses.** We could not find another MIL
  game where excessive doubt is punished. It changes what the player
  practises: judgment instead of suspicion.
- **The perspective reversal.** Most MIL projects seat the learner as judge.
  Act 2 seats them as the person who cannot be believed.
- **A personalised ending with no personal data.** The closing screen is
  built entirely from choices made inside the session.
- **The theme, literally.** *Play Your Part* — the player's part is the role
  they already occupy in their own family.

---

## 8. Feasibility

**It is built, deployed, and playable today at the link above.**

It is a static website: HTML, CSS and one JavaScript file. No server, no
database, no accounts, no dependencies, no build step, no running costs.
It loads on a low-end Android phone over a weak connection.

All writing lives in one JSON file per country, so content and code were
developed in parallel by different team members with no conflicts.

**Current status:** complete and public. *[Add after testing: "We tested with
N people and simplified round X based on what we observed."]*

---

## 9. Sustainability

- **Zero marginal cost, permanently.** Static hosting is free at any scale
  we are likely to reach. There is nothing to maintain, patch, or pay for.
- **Anyone can extend it.** A new country or language is one JSON file. No
  programming is required to write one.
- **Open source**, so it outlives our involvement.
- **No data means no liability** — nothing to secure, no policy to write,
  no consent to manage.

---

## 10. Impact and inclusion

- Serves a group MIL programmes routinely skip: **older people**, who are
  targeted most and reached least.
- Names a harm that is rarely named: **digital exclusion caused by fear**,
  not only by fraud.
- Built for **low-end devices and weak connections**, not flagship phones.
- **Localised, not translated.** The Sri Lankan, Burmese and Indonesian
  versions use their own kinship terms, institutions, currencies and payment
  services, so the messages read as things that genuinely arrive here. The
  interface stays in English for accessibility.
- **Free, no download, no sign-up, no barrier.**

---

## 11. Privacy by design

**The game asks for nothing and stores nothing.** No accounts, no analytics,
no cookies, no text inputs, no backend. Every message is fictional.

An earlier draft ended by asking players to type their family's code word.
We removed it. Asking for that is asking for genuinely sensitive
information, and *"we promise to discard it"* asks for trust the player
cannot verify. A project teaching people to protect themselves should not
require them to hand anything over.

---

## 12. What comes next

1. **More countries.** The structure is built for it; each is one file.
2. **A print version** for community sessions where phones or connectivity
   are limited.
3. **Classroom use.** Six minutes fits inside a lesson, and the reflection
   screen is designed to start the discussion rather than end it.
4. **Local-language editions**, beginning with Sinhala, Tamil, Burmese and
   Bahasa Indonesia.

---

> **https://nikolify.github.io/is-this-real/**
>
> Six minutes. Any phone. Nothing to install.
