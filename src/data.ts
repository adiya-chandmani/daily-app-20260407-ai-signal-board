export type TrendItem = {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  whyTrending: string;
  engagement: string;
  mentions: number;
  recencyScore: number;
  communityScore: number;
};

export const trendItems: TrendItem[] = [
  {
    id: 'ph-ai-agents',
    title: 'AI agents and AI workflow automation',
    source: 'Product Hunt',
    sourceUrl: 'https://www.producthunt.com/categories/ai-agents',
    whyTrending: 'Fresh Product Hunt category momentum around agent orchestration, voice, and workflow tools.',
    engagement: 'Multiple recent launches surfaced in snippet within the last 3 days.',
    mentions: 4,
    recencyScore: 9,
    communityScore: 8
  },
  {
    id: 'reddit-tool-overload',
    title: 'People are overwhelmed by too many new AI tools every week',
    source: 'Reddit / r/SideProject',
    sourceUrl: 'https://www.reddit.com/r/SideProject/comments/1sd96x8/honest_question_how_do_you_actually_keep_up_with/',
    whyTrending: 'Users explicitly complain that 50+ AI tools drop weekly across Product Hunt, Reddit, and other channels.',
    engagement: 'Strong pain-signal in discussion snippet; clear repeated demand for filtering.',
    mentions: 3,
    recencyScore: 9,
    communityScore: 9
  },
  {
    id: 'reddit-marketing-trends',
    title: 'Trend scanners that summarize AI chatter across communities',
    source: 'Reddit / r/AskMarketing',
    sourceUrl: 'https://www.reddit.com/r/AskMarketing/comments/1sdssnl/any_ai_tool_that_actually_pulls_trends_from/',
    whyTrending: 'Demand is shifting from raw feeds to high-signal summaries across Reddit and social channels.',
    engagement: 'Recent thread with direct tool recommendations and problem framing.',
    mentions: 3,
    recencyScore: 10,
    communityScore: 8
  },
  {
    id: 'github-sim',
    title: 'Open-source agent workflow platforms',
    source: 'GitHub',
    sourceUrl: 'https://github.com/simstudioai/sim',
    whyTrending: 'Agent orchestration repos are appearing in GitHub trend-related results and ecosystem roundups.',
    engagement: 'Cross-mentioned by GitHub and blog roundups, but still bigger than a one-day build target.',
    mentions: 2,
    recencyScore: 8,
    communityScore: 7
  },
  {
    id: 'ph-automation',
    title: 'AI automation tools that quietly do work in the background',
    source: 'Product Hunt',
    sourceUrl: 'https://www.producthunt.com/categories/ai-workflow-automation',
    whyTrending: 'Product Hunt category text emphasizes automation that removes weekly chores instead of adding dashboards.',
    engagement: 'Orbit Awards and category copy highlight active interest this week.',
    mentions: 3,
    recencyScore: 8,
    communityScore: 8
  }
];

export function scoreTrend(item: TrendItem): number {
  return item.mentions * 10 + item.recencyScore * 3 + item.communityScore * 4;
}

export function rankTrends(items: TrendItem[]): TrendItem[] {
  return [...items].sort((a, b) => scoreTrend(b) - scoreTrend(a));
}
