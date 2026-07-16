INTELLECTS Club Website

A single-page site for the INTELLECTS Club (SRM Institute of Science and
Technology, Ramapuram Campus), built as plain HTML + CSS + JavaScript —
no frameworks, no build step.

Live site: https://psmrithi.github.io/intellects-website/
Repo: https://github.com/psmrithi/intellects-website

intellects-website/
├── index.html   → all page content & structure
├── style.css    → all styling (design tokens at the top)
├── script.js    → nav toggle, counters, scroll reveal, card glow/tilt, join form
├── photos/      → real team member photos (referenced by index.html)
└── README.md    → this file

Everything is separated: markup, styling, and behaviour live in their own
files and are linked from index.html.


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


2. What's already done


Hero, About (mission/vision), Why Join, Team, Past Events, Upcoming
Events, FAQ, and a membership sign-up form
Dark violet + coral theme, distinct from typical navy/teal tech-club
palettes
Real photos for all 11 board members (faculty advisor uses initials only)
UI polish: cursor-tracked glow on cards, 3D tilt on team cards, button
shine sweep, breathing hero badge, pulsing timeline dots, animated stat
counters, scroll-reveal animations
Fully responsive, keyboard-focus visible, respects prefers-reduced-motion


3. What's still left to finish

WhereWhat to doindex.html → #leads (faculty card)Confirm "Prof. Dapne" is the correct spellingindex.html → #faqTwo answers still marked TODO — event frequency & certificate policy, confirm with leadershipscript.js → join formCurrently opens an email draft with the visitor's details. Connect to Google Forms or Formspree for real data collection (see below)script.js → stats sectionUpdate member count / events / domains if the real numbers change


4. About the membership form

The site has no backend or database (it's just static files hosted on
GitHub Pages), so the "Become a member" form currently works by opening the
visitor's email app with their details pre-filled, addressed to
INTELLECTS@SRMIST.EDU.IN. That works, but it relies on the visitor
actually hitting send, and doesn't give you a spreadsheet of responses.

Before this goes live for real signups, pick one:


Google Forms — quickest. Create a Form with matching fields, then
either swap in the Form's embed code, or update script.js to POST to
its response URL.
Formspree (formspree.io) — free tier, no backend needed. Sign up, get
a form endpoint URL, and replace the mailto: logic in the join-form
section of script.js with a fetch() call to that endpoint.
Your own backend — if you want full control and a real database.


5. Adding or updating a team photo


Drop the photo into the photos/ folder (square images work best —
the CSS crops to a circle automatically).
In index.html, find that person's .team-card, and point the <img>
src at the new file:


html   <div class="team-card__avatar"><img src="photos/yourfile.jpg" alt="Full Name"></div>

6. Updating past / upcoming events


Past events live in the <ol class="timeline"> inside #log —
duplicate an <li class="timeline__item"> block per event.
Upcoming events live in the .event-grid inside #upcoming —
duplicate a .event-card block per event.



7. Pushing changes to GitHub

bashcd intellects-website
git add .
git commit -m "describe what you changed"
git push

If this is a brand new clone/folder that isn't connected to GitHub yet:

bashgit init
git add .
git commit -m "Initial commit: INTELLECTS club website"
git branch -M main
git remote add origin https://github.com/psmrithi/intellects-website.git
git push -u origin main

8. Deploying (GitHub Pages)


On GitHub, go to the repo → Settings → Pages.
Under Build and deployment, set Source to Deploy from a branch.
Choose branch main, folder / (root) → Save.
Wait ~1 minute — the site goes live at:
https://psmrithi.github.io/intellects-website/



9. Design notes

Dark theme with a violet + coral identity — chosen to be distinct from
generic tech-club palettes (no navy/teal, no black/neon-green).


Hero — a rotating, breathing "orbit" badge symbolizing the club's
network/community.
Benefits section answers "why join" directly: real projects, new
tech, leadership roles, networking.
Team grid includes all board members plus the faculty advisor, with
a cursor-tracked glow and subtle 3D tilt on hover.
Past events are a chronological timeline with pulsing markers.
FAQ uses native <details>/<summary> — accessible, no JS required.
Typography: Sora (display), Inter (body), Space Mono (labels).


Restyle colors in the :root block at the top of style.css — everything
derives from those tokens (--violet, --coral, --mint, --bg).
Contentindex (6).htmlhtmlstyle (1).css295 linescssscript (1).js138 linesjsREADME (7).md157 linesmd