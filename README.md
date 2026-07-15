INTELLECTS Club Website

A single-page site for the INTELLECTS Club (Dept. of CSE, SRM IST Ramapuram),
built as plain HTML + CSS + JavaScript — no frameworks, no build step.

intellects-website/
├── index.html   → all page content & structure
├── style.css    → all styling (design tokens at the top)
├── script.js    → nav toggle, heatmap animation, counters, scroll reveal
└── README.md    → this file

Everything is separated exactly as requested: markup, styling and behaviour
live in their own files and are linked from index.html.


1. Run it locally

You don't need to install anything to view it — but use a local server
instead of double-clicking the file, so nothing breaks silently:

Option A — VS Code


Install the Live Server extension.
Right-click index.html → Open with Live Server.


Option B — Python (already on most machines)

bashcd intellects-website
python3 -m http.server 8000

Then open http://localhost:8000 in your browser.

Option C — Node

bashnpx serve intellects-website


2. What you still need to fill in

I've built the full structure and design, but researching the club is
part of the assignment — I deliberately left these as clearly marked
TODOs rather than inventing facts about real people/events:

WhereWhat to doindex.html → #aboutReplace mission/vision text with the club's actual wordingindex.html → #leadsDuplicate a .team-card block per real member (President, VP, domain leads). Add real names, roles, LinkedIn/GitHub linksindex.html → #logReplace/add <li class="commit"> entries with real past events (dates, names) from Instagram/LinkedInindex.html → #achievementsReplace .release-card placeholders with real wins/milestonesindex.html → #feedEmbed real LinkedIn/Instagram posts (see below)script.js → stats sectionUpdate member count / events / founding year with real numbersREADME.md (bottom) & footerAdd your GitHub repo link + deployed site URL

How to embed a real LinkedIn post


Open the post on the club's LinkedIn page.
Click the ... menu on the post → Embed this post.
LinkedIn gives you an <iframe> snippet — paste it in place of a
.feed-card in index.html.
Only posts the page admin has enabled embedding for will work — if a
post can't be embedded, use a screenshot + link instead.


Instagram posts

Instagram embeds work the same way: open the post → ... → Embed
→ paste the provided <blockquote class="instagram-media"> snippet
(you'll also need Instagram's embed script — see their embed dialog for
the exact <script> tag to add before </body>).


3. Push it to GitHub

bashcd intellects-website
git init
git add .
git commit -m "Initial commit: INTELLECTS club website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main

Then commit again each time you add real content — that's the point of
the challenge:

bashgit add .
git commit -m "Add real team bios and event history"
git push


4. Deploy it (free, via GitHub Pages)


On GitHub, go to your repo → Settings → Pages.
Under Build and deployment, set Source to Deploy from a branch.
Choose branch main, folder / (root) → Save.
Wait ~1 minute, then your site is live at:
https://YOUR-USERNAME.github.io/YOUR-REPO/
Paste that URL into:

your repo's About section (gear icon on the repo homepage → Website field)
the footer of index.html (#deployLink) and script.js (deployLink.href)
your submission message, as required by the challenge






5. What you still need to double-check

WhatWhyFaculty advisor name "Prof. Dapne"This spelling looked unusual — please confirm it's correct before publishingTeam members' LinkedIn URLsAll currently href="#" placeholders — search LinkedIn ↗ in index.htmlFAQ answers marked TODOEvent frequency and certificate policy need confirming with leadershipUpcoming eventsMarked "unverified" — sourced from a demo admin panel, not a confirmed listJoin form backendSee below — currently opens an email draft, not saved anywhere

6. About the membership form

The site has no backend or database (it's just static files hosted on GitHub
Pages), so the "Become a member" form currently works by opening the
visitor's email app with their details pre-filled, addressed to
INTELLECTS@SRMIST.EDU.IN. That works, but it relies on the visitor actually
hitting send, and doesn't give you a spreadsheet of responses.

Before this goes live for real signups, pick one:


Google Forms — quickest. Create a Form with matching fields, then
either swap in the Form's embed code, or update script.js to POST to
its response URL (there are tutorials for "submit Google Form via
JavaScript fetch").
Formspree (formspree.io) — free tier, no backend needed. Sign up, get
a form endpoint URL, and replace the mailto: logic in the join form
section of script.js with a fetch() call to that endpoint.
Your own backend — if you want full control and a real database.


The exact spot to edit is marked with a TODO comment in script.js.

7. Design notes

Dark theme with a violet + coral identity — chosen to be distinct from
generic tech-club palettes (no navy/teal, no black/neon-green).


Hero — a rotating "orbit" badge symbolizing the club's network/community.
Benefits section answers "why join" directly: real projects, new tech,
leadership roles, networking.
Team grid includes all 12 board members plus the faculty advisor.
Past events are a chronological timeline of verified activity.
Upcoming events are clearly flagged as unverified.
FAQ uses native <details>/<summary> — accessible, no JS required.
Typography: Sora (display), Inter (body), Space Mono (labels).
Fully responsive, keyboard-focus visible, respects prefers-reduced-motion.


Restyle colors in the :root block at the top of style.css — everything
derives from those tokens (--violet, --coral, --mint, --bg).
