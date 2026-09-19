import React, { useMemo } from 'react';
import { MetricBarChart } from '../charts/MetricBarChart/MetricBarChart';

export interface ChartItem {
  name: string;
  stars: number;
}

export interface AnalyticsChartProps {
  dataset: ChartItem[];
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ dataset }) => {
  const metricDataset = useMemo(() => dataset.map(({ name, stars }) => ({ name, value: stars })), [dataset]);

  return (
    <MetricBarChart
      dataset={metricDataset}
      title="Stars Metrics Monitor"
      seriesLabel="Repository Stars"
      seriesColor="#0284c7"
      emptyMessage="No analytical tracking entities registered."
      ariaLabel="Stars per tracked repository"
    />
  );
};
