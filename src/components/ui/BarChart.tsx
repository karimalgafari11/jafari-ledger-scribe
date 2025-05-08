
import React from 'react';
import { ChartProps } from './charts.d';

const BarChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <p className="text-center text-muted-foreground">
        Bar Chart component placeholder for data: {data.labels.join(', ')}
      </p>
    </div>
  );
};

export { BarChart };
