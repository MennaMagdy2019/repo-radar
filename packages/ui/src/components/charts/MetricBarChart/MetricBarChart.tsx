import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';

export interface MetricBarChartItem {
  name: string;
  value: number;
}

export interface MetricBarChartProps {
  dataset: MetricBarChartItem[];
  title: string;
  seriesLabel: string;
  seriesColor: string;
  emptyMessage: string;
  ariaLabel: string;
  marginTop?: number;
}

const chartMargin = { top: 20, bottom: 0, left: 15, right: 15 };
const getRepositoryLabel = (name: string) => name.split('/')[1] || name;

export const MetricBarChart: React.FC<MetricBarChartProps> = ({
  dataset,
  title,
  seriesLabel,
  seriesColor,
  emptyMessage,
  ariaLabel,
  marginTop = 0,
}) => {
  const labels = useMemo(() => dataset.map((item) => getRepositoryLabel(item.name)), [dataset]);
  const values = useMemo(() => dataset.map((item) => item.value), [dataset]);
  const xAxis = useMemo(() => [{
    id: `${seriesLabel.toLowerCase().replaceAll(' ', '-')}-x-axis`,
    scaleType: 'band' as const,
    data: labels,
    tickLabelStyle: { angle: 25, textAnchor: 'start' as const, fontSize: 10 },
  }], [labels, seriesLabel]);
  const series = useMemo(() => [{
    id: `${seriesLabel.toLowerCase().replaceAll(' ', '-')}-series`,
    data: values,
    label: seriesLabel,
    color: seriesColor,
  }], [seriesColor, seriesLabel, values]);

  return (
    <Card variant="outlined" sx={{ height: '100%', minHeight: 420, mt: marginTop }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
        {dataset.length === 0 ? (
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed', borderColor: 'divider', mt: 2, minHeight: 280 }}>
            <Typography variant="body2" color="text.secondary">{emptyMessage}</Typography>
          </Box>
        ) : (
          <Box sx={{ width: '100%', height: 320, flexGrow: 1 }}>
            <BarChart xAxis={xAxis} series={series} margin={chartMargin} aria-label={ariaLabel} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};