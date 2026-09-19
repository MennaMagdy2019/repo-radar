import type { Meta, StoryObj } from '@storybook/react-vite';
import { MetricBarChart } from './MetricBarChart';

const meta = {
  title: 'Charts/MetricBarChart',
  component: MetricBarChart,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof MetricBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithRepositories: Story = {
  args: {
    dataset: [
      { name: 'facebook/react', value: 245000 },
      { name: 'microsoft/typescript', value: 98000 },
      { name: 'vitejs/vite', value: 72000 },
    ],
    title: 'Repository stars',
    seriesLabel: 'Stars',
    seriesColor: '#0284c7',
    emptyMessage: 'No repositories',
    ariaLabel: 'Repository stars chart',
  },
};

export const Empty: Story = {
  args: {
    ...WithRepositories.args,
    dataset: [],
  },
};