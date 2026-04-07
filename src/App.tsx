import { useMemo, useState } from 'react';
import { rankTrends, scoreTrend, trendItems, type TrendItem } from './data';

type Note = {
  name: string;
  urgency: 'low' | 'medium' | 'high';
};

const picker = {
  chosenTrend: 'AI tool overload + demand for high-signal AI workflow / agent trend summaries',
  goal: 'Help builders turn noisy AI launches into a short, ranked watchlist they can act on in minutes.',
  features: [
    'Rank trend candidates with a transparent signal score.',
    'Filter to high-signal items and inspect why each one is trending now.',
    'Create a tiny watchlist of trends to revisit later.'
  ],
  scopeCuts: [
    'No live scraping or external APIs in v1.',
    'No user auth, backend, or persistence beyond local session state.',
    'No full social analytics or sentiment model.'
  ]
};

function TrendCard({ item, saved, onToggle }: { item: TrendItem; saved: boolean; onToggle: (id: string) => void }) {
  return (
    <article className="card">
      <div className="row row-space">
        <div>
          <p className="eyebrow">{item.source}</p>
          <h3>{item.title}</h3>
        </div>
        <div className="score">{scoreTrend(item)}</div>
      </div>
      <p>{item.whyTrending}</p>
      <ul className="meta">
        <li><strong>Engagement:</strong> {item.engagement}</li>
        <li><strong>Mentions:</strong> {item.mentions} source hits</li>
        <li><strong>Recency:</strong> {item.recencyScore}/10</li>
        <li><strong>Community:</strong> {item.communityScore}/10</li>
      </ul>
      <div className="row row-space">
        <a href={item.sourceUrl} target="_blank" rel="noreferrer">Open source</a>
        <button onClick={() => onToggle(item.id)}>{saved ? 'Remove from watchlist' : 'Save to watchlist'}</button>
      </div>
    </article>
  );
}

export function App() {
  const [minimumScore, setMinimumScore] = useState(70);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [note, setNote] = useState<Note>({ name: '', urgency: 'medium' });
  const [notes, setNotes] = useState<Note[]>([]);

  const ranked = useMemo(() => rankTrends(trendItems), []);
  const filtered = ranked.filter((item) => scoreTrend(item) >= minimumScore);
  const savedItems = ranked.filter((item) => savedIds.includes(item.id));

  function toggleSaved(id: string) {
    setSavedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function addNote() {
    if (!note.name.trim()) return;
    setNotes((current) => [{ ...note, name: note.name.trim() }, ...current]);
    setNote({ name: '', urgency: 'medium' });
  }

  return (
    <main className="shell">
      <section className="hero card">
        <p className="eyebrow">Daily App Builder · 2026-04-07</p>
        <h1>AI Signal Board</h1>
        <p>
          A tiny React app built around one clear trend: people are drowning in AI launches and want a fast way to spot the few signals worth acting on.
        </p>
        <div className="grid three">
          <div>
            <h2>Goal</h2>
            <p>{picker.goal}</p>
          </div>
          <div>
            <h2>Core features</h2>
            <ul>
              {picker.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
          <div>
            <h2>Scope cuts</h2>
            <ul>
              {picker.scopeCuts.map((cut) => <li key={cut}>{cut}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <div className="row row-space">
            <h2>Trend shortlist</h2>
            <label>
              Minimum score: <strong>{minimumScore}</strong>
              <input
                aria-label="Minimum score"
                type="range"
                min="50"
                max="100"
                step="5"
                value={minimumScore}
                onChange={(event) => setMinimumScore(Number(event.target.value))}
              />
            </label>
          </div>
          <p className="subtle">Filtering rationale: multiple-source mentions + high recency + visible community pain beats big-but-vague infrastructure hype.</p>
          <div className="stack">
            {filtered.map((item) => (
              <TrendCard key={item.id} item={item} saved={savedIds.includes(item.id)} onToggle={toggleSaved} />
            ))}
            {filtered.length === 0 && <p>No trends pass this threshold. Lower the score filter.</p>}
          </div>
        </div>

        <div className="stack">
          <section className="card">
            <h2>Chosen trend</h2>
            <p>{picker.chosenTrend}</p>
            <p className="subtle">Why this won: it is repeated across Product Hunt and Reddit, clearly painful, and small enough to prototype in one day.</p>
          </section>

          <section className="card">
            <h2>Watchlist</h2>
            {savedItems.length === 0 ? <p>No saved trends yet.</p> : (
              <ul>
                {savedItems.map((item) => <li key={item.id}>{item.title}</li>)}
              </ul>
            )}
          </section>

          <section className="card">
            <h2>Next-action notes</h2>
            <div className="stack compact">
              <input
                aria-label="Note name"
                placeholder="Add a follow-up idea"
                value={note.name}
                onChange={(event) => setNote((current) => ({ ...current, name: event.target.value }))}
              />
              <select
                aria-label="Urgency"
                value={note.urgency}
                onChange={(event) => setNote((current) => ({ ...current, urgency: event.target.value as Note['urgency'] }))}
              >
                <option value="low">Low urgency</option>
                <option value="medium">Medium urgency</option>
                <option value="high">High urgency</option>
              </select>
              <button onClick={addNote}>Save note</button>
            </div>
            {notes.length === 0 ? <p className="subtle">No notes yet.</p> : (
              <ul>
                {notes.map((entry, index) => <li key={`${entry.name}-${index}`}>{entry.name} · {entry.urgency}</li>)}
              </ul>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
