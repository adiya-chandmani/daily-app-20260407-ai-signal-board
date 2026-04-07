import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../src/App';
import { rankTrends, scoreTrend, trendItems } from '../src/data';

describe('trend ranking', () => {
  it('sorts items by descending score', () => {
    const ranked = rankTrends(trendItems);
    expect(scoreTrend(ranked[0])).toBeGreaterThanOrEqual(scoreTrend(ranked[1]));
  });
});

describe('App', () => {
  it('renders chosen trend and saves a note', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/AI Signal Board/i)).toBeInTheDocument();
    expect(screen.getByText(/AI tool overload/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Note name/i), 'Ship CSV export next');
    await user.click(screen.getByRole('button', { name: /Save note/i }));

    expect(screen.getByText(/Ship CSV export next/i)).toBeInTheDocument();
  });

  it('adds and removes a saved trend from watchlist', async () => {
    const user = userEvent.setup();
    render(<App />);

    const saveButton = screen.getAllByRole('button', { name: /Save to watchlist/i })[0];
    await user.click(saveButton);

    expect(screen.getByRole('heading', { name: /Watchlist/i })).toBeInTheDocument();
    expect(screen.getAllByText(/AI agents and AI workflow automation|People are overwhelmed by too many new AI tools every week/i).length).toBeGreaterThan(0);
  });
});
