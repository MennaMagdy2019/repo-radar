import React, { useMemo } from 'react';
import { MetricBarChart } from '../charts/MetricBarChart/MetricBarChart';

export interface IssuesChartItem {
  name: string;
  issues: number;
}

export interface IssuesChartProps {
  dataset: IssuesChartItem[];
}

export const IssuesChart: React.FC<IssuesChartProps> = ({ dataset }) => {
  const metricDataset = useMemo(() => dataset.map(({ name, issues }) => ({ name, value: issues })), [dataset]);

  return (
    <MetricBarChart
      dataset={metricDataset}
      title="Open Issues Monitor"
      seriesLabel="Open Issues"
      seriesColor="#f97316"
      emptyMessage="No tracked repositories yet."
      ariaLabel="Open issues per tracked repository"
      marginTop={3}
    />
  );
};
