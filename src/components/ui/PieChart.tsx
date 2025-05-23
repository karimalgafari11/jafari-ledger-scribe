
import React from 'react';
import { ChartProps } from './charts.d';

const PieChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <p className="text-center text-muted-foreground">
        Pie Chart component placeholder for data: {data.labels.join(', ')}
      </p>
    </div>
  );
};

export { PieChart };
