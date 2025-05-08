
import React from 'react';
import { ChartProps } from './charts.d';

const LineChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <p className="text-center text-muted-foreground">
        Line Chart component placeholder for data: {data.labels.join(', ')}
      </p>
    </div>
  );
};

export { LineChart };
