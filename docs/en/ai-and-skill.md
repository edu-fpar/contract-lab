# Prepare your course with an AI

Two options: any AI with the instructions page, or Claude with the skill, which also checks the verdicts.

## 1. With any AI

<div class="ai-box">
<ol class="ai-steps">
<li><strong>Copy the instruction.</strong> It already contains the link to the instructions for the AI. The text is editable: adapt the audience, the law or the number of steps before copying.
<div class="ai-prompt js-ia-prompt" contenteditable="true" spellcheck="false" title="Editable text">Read the instructions at <span class="js-ia-url" data-path="en/instructions-ia.md">https://edu-fpar.github.io/contract-lab/docs/en/instructions-ia.md</span> and prepare a Contract Lab scenario from the course below (or the attached file). Audience: HR / employment law students (undergraduate), 6 to 8 steps, with two questions for the class.</div>
<button class="ai-btn big" data-copy-sel=".js-ia-prompt">📋 Copy the instruction</button></li>
<li><strong>Paste it into your AI</strong> (ChatGPT, Claude, Gemini, Mistral, Copilot…), then add your course: text pasted after it, or an attached file.</li>
<li><strong>Copy the AI's answer</strong> and paste it into the <a href="../index.html?lang=en&scenarios" target="_blank" rel="noopener">workshop</a>: 🎬 Cinema → 📚 Scenarios → Start. You can paste the whole answer.</li>
</ol>
<details class="ai-more"><summary>Your AI cannot open links?</summary>
<p>Copy the full version instead: the instructions and the request in a single text. Paste it into your AI, then add your course.</p>
<button class="ai-btn warn" data-copy-full="en/instructions-ia.md">📄 Copy the full version</button> <a class="ai-link" href="en/instructions-ia.md" target="_blank" rel="noopener">see the instructions</a>
</details>
<p class="ai-note">💡 Using Claude? The <a href="#/en/ai-and-skill">Contract Lab skill</a> also checks every verdict with the workshop's engine.</p>
<p class="ai-note js-ia-local" hidden>ℹ️ You are reading this documentation locally: the instruction points to the published version, which an online AI can read.</p>
</div>

**Which law?** The instructions tell the AI to choose **English law** (front matter `droit: uk`) for a course on the law of England & Wales — contract of employment, restrictive covenants, unfair dismissal, redundancy, settlement agreements — and **French law** otherwise. To be sure, say it in the instruction: "English law (England & Wales)" or "French law, in English".

A general AI cannot run the workshop's engine: **check the verdicts** announced in the commentary against what the workshop shows (click a card for its full check), and **check the law**: statute sections, cases, durations, amounts — especially the annual figures (week's pay cap, compensatory award cap, minimum wage), which change every April, and the Employment Rights Act 2025 reforms. Syntax warnings appear under the commentary.

AIs that explore a site can also start from the [`llms.txt`](https://edu-fpar.github.io/contract-lab/llms.txt ':ignore') file, which points to the useful pages.

## 2. With Claude: the "scenario-contract-lab" skill (recommended)

A *skill* is a set of instructions that Claude loads automatically when the request relates to it. This one, bilingual (English and French), teaches Claude to:
1. read your **course material** (PDF, slides, handout, case study);
2. choose the **law** (English law or French law) and the language of the scenario;
3. keep what the tool can **represent** — clauses and safeguards, incompatibilities, obligations and breaches, terminations and procedures, payments — and leave aside, telling you, what it cannot show correctly;
4. write a progressive scenario that reuses **your examples and figures**, with questions for the class whose answer is not given away by the canvas;
5. **replay it with the workshop's real engine** to check that the verdicts, safeguards and calculations announced in the commentary match those that will be displayed;
6. deliver the `.md` file, with the list of what to proofread (references added, simplifications).

Statute sections and cases are only added if they appear in your material or are certain; simplifications are flagged in the scenario.

### Installing the skill

The file to install is [`skill/scenario-contract-lab.skill`](../skill/scenario-contract-lab.skill ':ignore'). It is an archive of the `skill/scenario-contract-lab/` folder.

- **Claude (web or desktop app)**: in the settings, *Skills* section, import this file. Code execution must be allowed for the check to work.
- **Claude Code**: copy the `skill/scenario-contract-lab/` folder into `~/.claude/skills/` (for you) or into a project's `.claude/skills/`.

The check uses Node.js. If the environment does not have it, Claude applies the rules by hand and tells you.

### Using it

Attach your material and ask, for example:

> Here is my chapter on restrictive covenants. Make me a Contract Lab scenario to go through the case study in class, about 6 steps.

> From these slides on unfair dismissal for misconduct, prepare a step-by-step animation for my second-year students, with two questions.

You receive a `.md` file to open in the workshop: 🎬 Cinema → 📚 Scenarios → open the file, or drop the file onto the window.

### Contents of the skill

| File | Role |
|---|---|
| `SKILL.md` | the method: read, choose the law, choose what to show, build, check, deliver |
| `references/format-en.md` · `references/format.md` | the scenario syntax and the catalogues (English / French) |
| `references/checking-rules-en.md` · `references/regles-de-calcul.md` | what the engine checks and calculates, and what it does not represent |
| `references/example-en.md` · `references/exemple.md` | a model scenario (restrictive covenants, English law / the French non-compete clause) |
| `scripts/verifier.js` | replays a scenario with the engine and shows, step by step, the verdicts, the safeguards and the calculations |
| `scripts/lib/` | copy of the workshop's engine (both laws, both languages) |

The checker can also be used without an AI, to check a scenario written by hand:

```bash
node skill/scenario-contract-lab/scripts/verifier.js my-scenario.md
node skill/scenario-contract-lab/scripts/verifier.js my-scenario.md --lang en
```

Messages are in English when the scenario is detected as English (front matter `droit: uk`, `### Answer` headings, English text), in French otherwise; `--lang en` or `--lang fr` forces the language. For each step it lists each item with its verdict (✅ ⚠️ ⛔ ⚡), its conditions (✔ met, with the item that meets it; ✘ missing, with the effect), its incompatibilities (⊘) and its calculations (🧮), then the relations. It reports commands not understood (errors) and points to review (warnings): question without `verification off` while a highlighted item shows its verdict, question without a right answer, bubble too long, step without commentary.
