
import React from "react";
import * as RechartsPrimitive from "recharts";
import { ChartContainer } from "@/components/ui/chart";

export const BarChart = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ChartContainer> & {
    data: any;
    options?: any;
  }
>(({ data, options, className, ...props }, ref) => {
  // Transform the data for Recharts format
  const transformedData = data.labels.map((label: any, i: number) => ({
    name: label,
    ...data.datasets.reduce((acc: any, dataset: any) => {
      acc[dataset.label] = dataset.data[i];
      return acc;
    }, {})
  }));
  
  return (
    <ChartContainer 
      ref={ref} 
      className={className} 
      config={{}} 
      {...props}
    >
      <RechartsPrimitive.BarChart data={transformedData}>
        <RechartsPrimitive.XAxis dataKey="name" />
        <RechartsPrimitive.YAxis />
        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        <RechartsPrimitive.Tooltip />
        <RechartsPrimitive.Legend />
        {data.datasets.map((dataset: any, index: number) => (
          <RechartsPrimitive.Bar
            key={index}
            dataKey={dataset.label}
            fill={dataset.backgroundColor}
            stroke={dataset.borderColor}
          />
        ))}
      </RechartsPrimitive.BarChart>
    </ChartContainer>
  );
});
BarChart.displayName = "BarChart";

export const LineChart = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ChartContainer> & {
    data: any;
    options?: any;
  }
>(({ data, options, className, ...props }, ref) => {
  // Transform the data for Recharts format
  const transformedData = data.labels.map((label: any, i: number) => ({
    name: label,
    ...data.datasets.reduce((acc: any, dataset: any) => {
      acc[dataset.label] = dataset.data[i];
      return acc;
    }, {})
  }));
  
  return (
    <ChartContainer 
      ref={ref} 
      className={className} 
      config={{}} 
      {...props}
    >
      <RechartsPrimitive.LineChart data={transformedData}>
        <RechartsPrimitive.XAxis dataKey="name" />
        <RechartsPrimitive.YAxis />
        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        <RechartsPrimitive.Tooltip />
        <RechartsPrimitive.Legend />
        {data.datasets.map((dataset: any, index: number) => (
          <RechartsPrimitive.Line
            key={index}
            type="monotone"
            dataKey={dataset.label}
            stroke={dataset.borderColor}
            fill={dataset.backgroundColor}
            dot={true}
            activeDot={{ r: 8 }}
            strokeWidth={2}
            connectNulls
            // Removed the tension property as it's not supported by Recharts
          />
        ))}
      </RechartsPrimitive.LineChart>
    </ChartContainer>
  );
});
LineChart.displayName = "LineChart";
