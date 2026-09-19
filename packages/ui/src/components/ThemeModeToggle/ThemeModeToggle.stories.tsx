import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeModeToggle } from './ThemeModeToggle';

const meta = {
  title: 'UI/ThemeModeToggle',
  component: ThemeModeToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightMode: Story = {
  args: {
    mode: 'light',
    onChange: () => undefined,
  },
};

export const DarkMode: Story = {
  args: {
    mode: 'dark',
    onChange: () => undefined,
  },
};