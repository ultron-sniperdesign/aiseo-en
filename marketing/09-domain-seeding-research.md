# 09 — Domain seeding & visibility research

> **Účel této kapitoly:** akční plán a research-backed checklist, **kam všude
> doménu `aiseo-optimalizace.cz` submitnout, sdílet a propagovat**, aby začala
> co nejrychleji rankovat v Googlu, Seznamu a AI engines.
>
> **Stav při založení:** web LIVE od 2026-04-29, registrovaný pouze na Google
> Search Console. Žádné jiné submissions, žádné backlinks, žádné community
> zmínky. Tento dokument je **akční seznam**, ne pouze rozcestník — položky
> jsou prioritizované a obsahují konkrétní URL + kontakt + odhad času.
>
> **Žije:** odškrtávej hotové položky (`- [x]`), přidávej datumy completion
> a poznámky. Commit prefix `marketing:`.

---

## 🎯 TL;DR — Top 5 must-do v 1. týdnu

1. **Bing Webmaster Tools** + GSC import (15 min) → pokrývá Bing + DuckDuckGo + ChatGPT Search + Copilot
2. **Seznam Webmaster** registrace + sitemap ping (20 min) → CZ ~12–16 % search share
3. **Robots.txt + llms.txt + sitemap direktiva** (dev task, 2 h) → AI crawlery + auto-discovery
4. **Firmy.cz + Živéfirmy.cz** zápisy (50 min) → CZ brand citation + dofollow
5. **sniperdesign.cz cross-promo + Upgates Marketplace + Shoptet Partneři** (1,5 h) → 3 high-DR partner links

---

## ✅ Week 1 — Must-do quick wins

### Search engines + indexation (dev/user split)

- [ ] **(uživatel)** Bing Webmaster Tools — registrace přes GSC import (1 klik)
  - URL: https://www.bing.com/webmasters
  - Submit `/sitemap-index.xml`
  - Pokrývá: Bing + DuckDuckGo + ChatGPT Search + Copilot
  - Čas: 15 min

- [ ] **(uživatel)** Seznam Webmaster
  - URL: https://webmaster.seznam.cz (registrace přes login.szn.cz)
  - Po verifikaci: ping sitemapy přes `https://search.seznam.cz/pridej-stranku?url=<sitemap>`
  - Pokrývá: ~12–16 % CZ search share
  - Čas: 20 min

- [ ] **(uživatel)** Google Search Console — pokročilé akce
  - Submit `/sitemap-index.xml` v Sitemaps sekci
  - URL Inspection + Request Indexing pro klíčové stránky (pillar, 4 sekce, /pack/, /navod-zdarma/, oba blog články, /kontakt/) — limit ~10/den
  - Čas: 30 min

### Dev tasks (commit do repa)

- [ ] **(dev)** Robots.txt audit — přidat 8 chybějících AI user-agentů
  - Soubor: `public/robots.txt`
  - Přidat (Allow): `Google-Extended`, `Applebot-Extended`, `Meta-ExternalAgent`, `ChatGPT-User`, `Perplexity-User`, `CCBot`, `Anthropic-AI`, `Diffbot`
  - Pokrývá: Gemini, Apple Intelligence, Meta AI, on-demand fetches, Common Crawl multiplier
  - Čas: 30 min

- [ ] **(dev)** Sitemap direktiva v robots.txt
  - Soubor: `public/robots.txt`
  - Přidat řádek: `Sitemap: https://aiseo-optimalizace.cz/sitemap-index.xml`
  - Pokrývá: auto-discovery i pro crawlery bez webmaster portálu
  - Čas: 5 min

- [ ] **(dev)** llms.txt vytvořit
  - Soubor: `public/llms.txt` (Markdown index)
  - Struktura: `# AI SEO Optimalizace` (H1) → blockquote 1–3 věty co web pokrývá → `## Pilíře` → annotated linky na `/seo-vs-geo-vs-aeo-vs-aio/`, `/seo/`, `/geo/`, `/aeo/`, `/aio/`, `/prakticky-postup/`, `/rozhodovaci-matice/`, `/pack/`, `/navod-zdarma/`
  - Spec: https://llmstxt.org
  - Pokrývá: low-effort defensivní signál pro Anthropic/OpenAI/Cursor/dev tooling
  - Čas: 1–2 h

### CZ katalogy a partner profily

- [ ] **(uživatel)** Firmy.cz zápis
  - URL: https://www.firmy.cz
  - Free tier dostatečný (dofollow z profilu)
  - Ověření telefonem
  - DR ~85 (Seznam), milionové návštěvy
  - Čas: 30 min

- [ ] **(uživatel)** Živéfirmy.cz zápis
  - URL: https://www.zivefirmy.cz
  - Free, doplnit logo + popis pro vyšší hvězdičky kvality záznamu
  - DR ~55, indexované Googlem (360k+ CZ firem)
  - Čas: 20 min

- [ ] **(uživatel/Sniperdesign)** sniperdesign.cz cross-promo
  - Footer link na aiseo-optimalizace.cz
  - „Naše projekty" / portfolio sekce listing
  - Krátký launch blog post („Spustili jsme edukativní portál o AI SEO")
  - Dofollow, kontextuální, nulový friction
  - Čas: 1 h

- [ ] **(uživatel)** Upgates Marketplace profil — edit
  - URL: https://marketplace.upgates.cz/agencies/sniper-design/
  - Sniperdesign už má profil (Zlatý partner od 2016) — jen do bio přidat aiseo-optimalizace.cz jako vlastní edukativní zdroj
  - DR Upgates ~60, vysoce relevantní traffic
  - Čas: 15 min

- [ ] **(uživatel)** Shoptet Partneři profil — edit
  - URL: https://partneri.shoptet.cz
  - Gold partner perks — přidat Pack landing jako edukativní materiál (pokud profil dovoluje URL)
  - DR Shoptet ~70
  - Čas: 15 min

- [ ] **(uživatel)** LinkedIn Company Page pro aiseo-optimalizace.cz
  - URL: https://www.linkedin.com (Pages → Create)
  - Logo + popis + cover image, link na pillar a /pack/
  - Hub pro pillar excerpts, baseline pro budoucí Sponsored Content
  - Čas: 30 min

**Týdenní deliverable:** ~5 h práce uživatele + ~2 h dev. Po týdnu = ~8 search engines/AI engines indexuje, 5+ kvalitních CZ katalogů, 3 partner pages s linkem, LinkedIn page connected.

---

## 🚀 Week 2–3 — Editorial pitches + komunitní seeding

### Editorial outreach (paralelně, různá témata)

| # | Médium | Kontakt | Téma pitch | DR | Honorář / model |
|---|---|---|---|---|---|
| 13 | **Lupa.cz** | redakce@lupa.cz + david.slizek@lupa.cz | „AI Overviews v ČR — co e-shopy přehlížejí" (5–6k znaků) | ~70 | 900–1300 Kč editorial |
| 14 | **Marketing Miner blog** | Filip Podstavec přes LinkedIn / podstavec.cz | „GEO case study — co funguje v CZ SERPs" | ~55 | free guest |
| 15 | **MediaGuru.cz** | Vojtěchovská / Straková (jmeno.prijmeni@omc.com) | News pitch o launchi AI SEO Wireframe Pack | ~60 | free |
| 16 | **MAM.cz** | redakce@mam.cz (Radana Čechová) | Expertní komentář k tématu AI SEO | ~60 | free |
| 17 | **CzechCrunch** | info@cc.cz | „Sniperdesign launched edu portál" — native nebo news | ~70 | paid native nebo free news |
| 18 | **Médiář.cz** | ondrej@aust.cz / potucek@mediar.cz | Sloupek o tématu | ~55 | free |
| 19 | **Collabim Akademie** | „hostující autor" sekce | Praktický návod ze série | ~55 | free guest |
| 20 | **Upgates blog pitch** | account manager (z partner portálu) | „AI SEO pro Upgates e-shopy" | ~55 | partner perk |
| 21 | **Shoptet blog pitch** | partner manager | Sezónní tip / partner content | ~65 | partner perk |
| 22 | **Heureka Group blog** | partnership team (přes Heureka Akademie) | Guest article | ~70 | free guest |

### Komunitní seeding (organic, value-first)

| # | Komunita | URL | Strategie 1. týden | Velikost |
|---|---|---|---|---|
| 23 | **LinkedIn — komentáře pod CZ SEO experty** | Daniel Nytra, Zdeněk Dvořák (Linki.cz), Marketing Miner tým, Vladimír Polách | 1 thoughtful comment/den po dobu 2 týdnů, pak vlastní post s linkem | velký engagement reach |
| 24 | **#HolkyzMarketingu (FB)** | https://www.facebook.com/groups/holkyzmarketingu | Value post o GEO/AI Overviews, link **jen v komentáři po dotazu** (admin Pavlína Louženská přísný) | ~42 000 členů |
| 25 | **Webtrh.cz — subforum „Marketing"** | https://webtrh.cz/forum/marketing-marketing/ | Value vlákno „Sdílím co funguje na CZ trhu v AI SEO" + link v signatuře. **NE „Fórum o SEO" — DEAD od 2010** | CZ #1 web/marketing forum |
| 26 | **Online Geniuses Slack** (EN) | https://onlinegeniuses.com | Value odpovědi v #seo / #ai-search channelech | ~53 000 marketérů |
| 27 | **r/SEO (EN)** | https://reddit.com/r/SEO | Po 2 týdnech karma building → příspěvek „Czech market: how Seznam + Google AI Overviews differ" + „Self-Promo Saturday" megathread | ~400k–1.3M |

### Reddit pravidla (důležité)

- 10 % rule = max 10 % příspěvků na vlastní obsah, jinak ban
- Mnoho subs vyžaduje 50–500 karma + 7–30 dní starý účet
- Strategie: 2–4 týdny aktivního komentování, **pak** teprve link drop
- Disclosure povinné: „Full disclosure: I built this"

### IndexNow setup (dev task, jednorázový)

- [ ] **(dev)** IndexNow integrace přes `astro-indexnow` npm
  - Generate 32-char hex key
  - `public/<key>.txt` obsahuje ten samý key
  - `astro.config.mjs` integration s `key: process.env.INDEXNOW_KEY`
  - `INDEXNOW_KEY` env var v GitHub Actions secrets
  - Při deployi pingne Bing + Yandex + Seznam + Naver + Yep okamžitě
  - GitHub: https://github.com/velohost/astro-indexnow
  - Čas: 2–3 h

---

## 🎤 Long-game (1–6 měsíců)

| # | Příležitost | Deadline / timing | Akce |
|---|---|---|---|
| 29 | **SEO Restart 2026** speaker slot | konference 17. 9. 2026 | Pitch academy@taste.cz s abstraktem AI SEO / GEO |
| 30 | **WebExpo 2026** Call for Papers | konference 27.–29. 5. 2026, **CFP otevřený — DEADLINE BLÍZKO!** | sarka@webexpo.net + form na https://webexpo.net/call-for-papers/ |
| 31 | **Reshoper 2026** | 15. 10. 2026 | Speaker pitch + booth (Sniperdesign) |
| 32 | **ShopCamp** | 17. 9. 2026 | Speaker pitch e-shoper komunita |
| 33 | **Protext (ČTK PR servis)** paid press release | jednorázová akce | protext@ctk.cz — balíček 5 PR za 6000 Kč, distribuce do 15+ portálů |
| 34 | **cs.wikipedia heslo „Generative Engine Optimization"** | průběžně | Vytvořit neutrální stub s nezávislými referencemi. **NE vlastní web jako primary ref** (Wikipedia COI rules) |
| 35 | **uLab PPC Brainfood podcast** (Markéta Kabátová) | dle host availability | LinkedIn outreach — téma AI vs PPC |
| 36 | **AffilBox affiliate program pro Pack** | průběžně | Self-service signup na https://www.affilbox.cz, 20–30 % commission pro SEO freelance partnery |
| 37 | **Featured.com + Qwoted** (EN expert sourcing) | průběžně | Self signup, expert quotes → EN backlinks |

---

## ❌ Anti-list — kam NEinvestovat čas

### Search/AI

- **Yandex Webmaster** — pro CZ low value (registrace zbytečná, IndexNow ho stejně pingne)
- **Naver, Baidu, Apple Siri webmaster** — irrelevantní pro CZ
- **Brave Search webmaster** — neexistuje
- **Mojeek / Kagi / You.com** submission — marginal traffic

### CZ katalogy — link farms / SpamBrain risk

- Centrum Katalog, Hledat.cz, Stránky.cz, Najdi.cz, AAA katalog, eVisitCard, JDI, ifirmy.cz, nej-firmy.cz, databaze.cz — Google je dnes většinou ignoruje, masivní zápis = riziko vnímání manipulace
- Placené „prémiové" zápisy v nízkokvalitních katalozích (Najisto premium, AAA balíčky 990–4990 Kč/rok) — Seznam Zprávy varují, je to často přeprodej free funkcí
- Cylex.cz za 25 Kč/rok — laciné, ale nízkokvalitní agregátor
- **Heureka, Trustpilot pro tuto doménu** — Heureka jen pro e-shopy s produkty, Trustpilot overkill pro PDF za 1490 Kč

### Komunity

- **r/czech, r/CzechRepublic, r/Prague** (594k+) — general-interest CZ subs, marketing content je downvote magnet + ban risk
- **Webtrh „Fórum o SEO"** — DEAD od 2010 (poslední post 11. 7. 2010, ověřeno)
- **Quora CZ + české topics** — minimální traffic, žádný CZ B2B publikum
- **X / Twitter pro CZ B2B** — CZ marketing scéna je na LinkedIn, ne na X
- **r/SEO link drop bez karma** — ban risk

### Ostatní

- **Google Business Profile pro aiseo-optimalizace.cz** přímo — Google nedovolí GBP pro čistě online produkt bez osobního kontaktu se zákazníky. Jen přes Sniperdesign profil (provozovna Akademická 663/5).
- **AKA členství** — desítky tisíc Kč/rok, ROI sporné pro tento produkt
- **Marketing Festival 2026** — neproběhne (další ročník 2027)

---

## 📊 Verifikace a KPI

| Milestone | KPI |
|---|---|
| Po týdnu 1 | Bing/Seznam/GSC ukazují web jako indexovaný, sitemap accepted; firmy.cz + živéfirmy.cz + 3 partner profily LIVE; llms.txt + robots.txt nasazené (`curl https://aiseo-optimalizace.cz/llms.txt` vrátí 200, `curl https://aiseo-optimalizace.cz/robots.txt` obsahuje 12+ AI user-agentů) |
| Po týdnu 2–3 | 2+ editorial pitches odeslané; 3+ LinkedIn posty publikované; 1+ vlákno na Webtrh.cz nebo FB skupině s engagement |
| Po měsíci | Organic traffic v GA4 měřitelný (>100 visits / měsíc); první brand mentions v Ahrefs / Marketing Miner; minimálně 1 backlink z DR 50+ webu |
| Po 3 měsících | 5+ kvalitních backlinks; ranking pro klíčová slova „AI SEO", „GEO", „AI Overviews" v top 20; LinkedIn page 100+ followers |

---

## 📚 Sources (research z 2026-05-17)

**Search engines + AI indexation:**
- Statcounter — Search Engine Market Share Czech Republic: https://gs.statcounter.com/search-engine-market-share/all/czech-republic
- Seznam Webmaster Tools setup: https://indexplease.com/blog/how-to-set-up-seznam-webmaster-tools/
- IndexNow.org supported engines: https://www.indexnow.org/searchengines
- llms.txt specification: https://llmstxt.org
- AI Crawler Comparison 2026: https://ai-ready-check.de/en/guides/ai-crawler-comparison/
- AI User-Agent Landscape 2026: https://nohacks.co/blog/ai-user-agents-landscape-2026
- ChatGPT Search optimization: https://www.erlin.ai/blog/chatgpt-search-optimization
- Perplexity citations 2026: https://authoritytech.io/blog/how-to-get-cited-in-perplexity-ai-2026
- astro-indexnow: https://github.com/velohost/astro-indexnow

**CZ katalogy:**
- Firmy.cz Nápověda: https://napoveda.firmy.cz/faq/je-profil-na-firmy-cz-bezplatny/
- Živéfirmy.cz: https://www.zivefirmy.cz
- Najisto.cz: https://najisto.centrum.cz/registrace/
- Radim Hasalík — varování před podvodnými katalogy: https://www.radimhasalik.cz/clanek/seznam-firem-sf-cz
- Seznam Zprávy — placené zápisy: https://www.seznamzpravy.cz/clanek/lide-plati-i-za-neco-co-je-zdarma-treba-za-zapis-do-katalogu-firem-109818
- A-WebSys — Firemní katalogy, kde stojí za to být: https://www.awebsys.cz/blog/firemni-katalogy-kde-stoji-za-to-byt
- Michal Kubíček — Seznam 200 katalogů (referenční): https://michalkubicek.cz/seznam-200-ceskych-a-slovenskych-katalogu-nejen-pro-linkbuildery/
- Upgates Marketplace Sniperdesign: https://marketplace.upgates.sk/agencies/sniper-design/
- Shoptet Partneři: https://partneri.shoptet.sk/

**Komunity:**
- #HolkyzMarketingu: https://www.facebook.com/groups/holkyzmarketingu/ + https://www.holkyzmarketingu.cz/
- Webtrh.cz Marketing forum: https://webtrh.cz/forum/marketing-marketing/
- Webtrh „Fórum o SEO" (DEAD): https://webtrh.cz/diskuse/forum-o-seo/
- Reddit self-promotion rules: https://karmaguy.io/en/blog/reddit-self-promotion-rules
- Online Geniuses Slack: https://onlinegeniuses.com

**Editorial / PR:**
- Lupa.cz Jak psát: https://www.lupa.cz/redakce/jak-psat/
- MediaGuru kontakt: https://www.mediaguru.cz/kontakt/
- MAM.cz: https://www.mam.cz/kontakty/
- CzechCrunch native: https://cc.cz/native/
- Marketing Miner: https://www.marketingminer.com/en/about-us
- Filip Podstavec blog: https://www.podstavec.cz/blog/
- Collabim akademie: https://www.collabim.cz/akademie/blog/
- Heureka Group blog: https://heureka.group/cz-cs/blog/

**Konference:**
- SEO Restart 2026: https://www.seorestart.cz/
- WebExpo 2026 CFP: https://webexpo.net/call-for-papers/
- Reshoper 2026: https://www.reshoper.cz/cs/konference/
- ShopCamp 2026: https://shopcamp.cz/

**PR servis:**
- Protext ČTK ceník: https://www.protext.cz/novy/cenik-protext-ctk.php
- AffilBox: https://www.affilbox.cz/
- Featured.com / Qwoted: https://featured.com + https://www.qwoted.com

---

**Konec briefu.** Pro orientaci v ostatních marketing briefech vrať se na [`README.md`](README.md).
