
import React from "react";
import * as RechartsPrimitive from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Define a proper type for the chart data
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export const PieChart = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<typeof ChartContainer>, "children" | "config"> & {
    data: ChartData;
  }
>(({ data, className, ...props }, ref) => {
  // Transform the data for Recharts format
  const transformedData = data.labels.map((label, i) => ({
    name: label,
    value: data.datasets[0].data[i],
  }));

  return (
    <ChartContainer 
      ref={ref} 
      className={className}
      config={{}} 
      {...props}
    >
      <RechartsPrimitive.PieChart>
        <RechartsPrimitive.Pie
          data={transformedData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill={data.datasets[0].backgroundColor || "#8884d8"}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {transformedData.map((entry, index) => (
            <RechartsPrimitive.Cell 
              key={`cell-${index}`} 
              fill={Array.isArray(data.datasets[0].backgroundColor) 
                ? data.datasets[0].backgroundColor[index % data.datasets[0].backgroundColor.length] 
                : data.datasets[0].backgroundColor || `hsl(${index * 45}, 70%, 60%)`} 
            />
          ))}
        </RechartsPrimitive.Pie>
        <RechartsPrimitive.Tooltip formatter={(value) => [`${value}`, ""]} />
        <RechartsPrimitive.Legend />
      </RechartsPrimitive.PieChart>
    </ChartContainer>
  );
});
PieChart.displayName = "PieChart";

export const BarChart = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<typeof ChartContainer>, "children" | "config"> & {
    data: ChartData;
  }
>(({ data, className, ...props }, ref) => {
  // Transform the data for Recharts format
  const transformedData = data.labels.map((label, i) => ({
    name: label,
    ...data.datasets.reduce((acc, dataset) => {
      acc[dataset.label] = dataset.data[i];
      return acc;
    }, {} as Record<string, number>)
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
        {data.datasets.map((dataset, index) => (
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
  Omit<React.ComponentProps<typeof ChartContainer>, "children" | "config"> & {
    data: ChartData;
  }
>(({ data, className, ...props }, ref) => {
  // Transform the data for Recharts format
  const transformedData = data.labels.map((label, i) => ({
    name: label,
    ...data.datasets.reduce((acc, dataset) => {
      acc[dataset.label] = dataset.data[i];
      return acc;
    }, {} as Record<string, number>)
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
        {data.datasets.map((dataset, index) => (
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
          />
        ))}
      </RechartsPrimitive.LineChart>
    </ChartContainer>
  );
});
LineChart.displayName = "LineChart";
