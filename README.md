# AI Signal Board

A small React app built for the 2026-04-07 Daily App Builder run.

## Today's trend

**Chosen trend:** AI tool overload + rising demand for high-signal summaries around AI agents and workflow automation.

## Problem

Product Hunt, Reddit, and GitHub are surfacing new AI launches constantly. The real pain is not a lack of tools — it is filtering the noise into a short list of trends worth acting on.

## Solution

AI Signal Board ranks a handful of current AI trend candidates with a transparent score, lets you filter the shortlist, save items to a watchlist, and jot down follow-up actions.

## Core features

1. Transparent trend scoring from mentions, recency, and community signal.
2. High-signal shortlist filtering with an adjustable minimum score.
3. Tiny watchlist + next-action notes for follow-up.

## Explicit scope cuts

- No live scraping or external APIs in v1
- No auth or backend persistence
- No deep social analytics pipeline

## Stack

- React + TypeScript
- Vite
- Vitest + Testing Library

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test
```

## Lint

```bash
npm run lint
```

## Research notes behind the trend pick

Shortlist sources used during the research step:

- Product Hunt AI Agents: https://www.producthunt.com/categories/ai-agents
- Product Hunt AI Workflow Automation: https://www.producthunt.com/categories/ai-workflow-automation
- Reddit / r/SideProject discussion on AI tool overload: https://www.reddit.com/r/SideProject/comments/1sd96x8/honest_question_how_do_you_actually_keep_up_with/
- Reddit / r/AskMarketing thread asking for AI trend scanners: https://www.reddit.com/r/AskMarketing/comments/1sdssnl/any_ai_tool_that_actually_pulls_trends_from/
- GitHub / simstudioai/sim: https://github.com/simstudioai/sim

## Repo hygiene

This repo is meant to be easy to clone, run, and inspect quickly. The app stays intentionally small so the value is obvious in one screen.
