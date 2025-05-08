
import React from "react";
import * as RechartsPrimitive from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Define a proper type for the chart data
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderDash?: number[];
  }[];
}

export const PieChart = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<typeof ChartContainer>, "children" | "config"> & {
    data?: ChartData;
  }
>(({ data, className, ...props }, ref) => {
  // Transform the data for Recharts format - with null check
  const transformedData = React.useMemo(() => {
    if (!data?.labels || !data?.datasets?.[0]?.data) {
      return [];
    }
    return data.labels.map((label, i) => ({
      name: label,
      value: data.datasets[0].data[i] || 0,
    }));
  }, [data]);

  // Get colors from the utils - these are the colors we'll use for individual pie slices
  const pieColors = [
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 99, 132, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)'
  ];

  // If we don't have data, return an empty chart container
  if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
    return (
      <ChartContainer 
        ref={ref} 
        className={className}
        config={{}} 
        {...props}
      >
        <RechartsPrimitive.PieChart>
          <RechartsPrimitive.Text x={150} y={100} textAnchor="middle" dominantBaseline="middle">
            No data available
          </RechartsPrimitive.Text>
        </RechartsPrimitive.PieChart>
      </ChartContainer>
    );
  }

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
          fill={typeof data.datasets[0].backgroundColor === 'string' ? data.datasets[0].backgroundColor : "#8884d8"}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {transformedData.map((entry, index) => (
            <RechartsPrimitive.Cell 
              key={`cell-${index}`} 
              fill={pieColors[index % pieColors.length]} 
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
    data?: ChartData;
  }
>(({ data, className, ...props }, ref) => {
  // Transform the data for Recharts format - with null check
  const transformedData = React.useMemo(() => {
    if (!data?.labels) {
      return [];
    }
    return data.labels.map((label, i) => {
      const item: Record<string, any> = { name: label };
      if (data.datasets) {
        data.datasets.forEach(dataset => {
          if (dataset.label && dataset.data) {
            item[dataset.label] = dataset.data[i] || 0;
          }
        });
      }
      return item;
    });
  }, [data]);
  
  // If we don't have data, return an empty chart container
  if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
    return (
      <ChartContainer 
        ref={ref} 
        className={className}
        config={{}} 
        {...props}
      >
        <RechartsPrimitive.BarChart>
          <RechartsPrimitive.Text x={150} y={100} textAnchor="middle" dominantBaseline="middle">
            No data available
          </RechartsPrimitive.Text>
        </RechartsPrimitive.BarChart>
      </ChartContainer>
    );
  }
  
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
        {data.datasets.map((dataset, index) => {
          const backgroundColor = typeof dataset.backgroundColor === 'string' 
            ? dataset.backgroundColor 
            : Array.isArray(dataset.backgroundColor) && dataset.backgroundColor.length > index
              ? dataset.backgroundColor[index] 
              : `rgba(54, 162, 235, 0.${index + 5})`;
              
          return (
            <RechartsPrimitive.Bar
              key={index}
              dataKey={dataset.label}
              fill={backgroundColor}
              stroke={dataset.borderColor}
            />
          )
        })}
      </RechartsPrimitive.BarChart>
    </ChartContainer>
  );
});
BarChart.displayName = "BarChart";

export const LineChart = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<typeof ChartContainer>, "children" | "config"> & {
    data?: ChartData;
  }
>(({ data, className, ...props }, ref) => {
  // Transform the data for Recharts format
  const transformedData = React.useMemo(() => {
    if (!data?.labels) {
      return [];
    }
    return data.labels.map((label, i) => {
      const item: Record<string, any> = { name: label };
      if (data.datasets) {
        data.datasets.forEach(dataset => {
          if (dataset.label && dataset.data) {
            item[dataset.label] = dataset.data[i] || 0;
          }
        });
      }
      return item;
    });
  }, [data]);
  
  // If we don't have data, return an empty chart container
  if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
    return (
      <ChartContainer 
        ref={ref} 
        className={className}
        config={{}} 
        {...props}
      >
        <RechartsPrimitive.LineChart>
          <RechartsPrimitive.Text x={150} y={100} textAnchor="middle" dominantBaseline="middle">
            No data available
          </RechartsPrimitive.Text>
        </RechartsPrimitive.LineChart>
      </ChartContainer>
    );
  }
  
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
        {data.datasets.map((dataset, index) => {
          const backgroundColor = typeof dataset.backgroundColor === 'string' 
            ? dataset.backgroundColor 
            : Array.isArray(dataset.backgroundColor) && dataset.backgroundColor.length > index
              ? dataset.backgroundColor[index] 
              : undefined;
          
          return (
            <RechartsPrimitive.Line
              key={index}
              type="monotone"
              dataKey={dataset.label}
              stroke={dataset.borderColor || `rgba(54, 162, 235, 0.${index + 5})`}
              fill={backgroundColor}
              dot={true}
              activeDot={{ r: 8 }}
              strokeWidth={2}
              connectNulls
              strokeDasharray={dataset.borderDash ? "5 5" : undefined}
            />
          )
        })}
      </RechartsPrimitive.LineChart>
    </ChartContainer>
  );
});
LineChart.displayName = "LineChart";
