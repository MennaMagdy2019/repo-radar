import type { Meta, StoryObj } from '@storybook/react-vite';
import { RepoCard } from './RepoCard';

const meta = {
  title: 'UI/RepoCard',
  component: RepoCard,
  tags: ['autodocs'],
} satisfies Meta<typeof RepoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  args: {
    name: 'facebook/react',
    data: {
      stargazers_count: 245000,
      open_issues_count: 1200,
      last_commit_date: '2026-09-18T12:00:00Z',
    },
    isLoading: false,
    error: null,
    onRefresh: () => undefined,
    onUntrack: () => undefined,
  },
};

export const Loading: Story = {
  args: { ...Loaded.args, isLoading: true },
};

export const ErrorState: Story = {
  args: { ...Loaded.args, error: 'GitHub API rate limit reached.' },
};
