'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProductPerformanceProps {
  data: {
    name: string;
    sales: number;
    revenue: number;
  }[];
  title?: string;
}

export default function ProductPerformanceChart({ data, title = 'Product Performance' }: ProductPerformanceProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sort data by revenue
  const sortedData = [...data].sort((a, b) => b.revenue - a.revenue);
  
  // Chart options
  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          boxWidth: 8,
          boxHeight: 8,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: !!title,
        text: title,
        align: 'start' as const,
        font: {
          size: 14,
          weight: 'bold' as const
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const formattedValue = context.datasetIndex === 0 
              ? `${value.toLocaleString()} Units` 
              : `${value.toLocaleString()} CFA`;
            return `${context.dataset.label}: ${formattedValue}`;
          },
          labelTextColor: () => '#666',
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.06)',
        },
        ticks: {
          font: {
            size: 11
          },
          callback: function(value: any) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return (value / 1000).toFixed(0) + 'k';
            }
            return value;
          }
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 4,
      }
    },
    barPercentage: 0.7,
    categoryPercentage: 0.7,
  };

  const chartData = {
    labels: sortedData.map(item => item.name),
    datasets: [
      {
        label: 'Units Sold',
        data: sortedData.map(item => item.sales),
        backgroundColor: 'rgba(59, 130, 246, 0.75)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Revenue',
        data: sortedData.map(item => item.revenue),
        backgroundColor: 'rgba(6, 182, 212, 0.75)',
        borderColor: 'rgba(6, 182, 212, 1)',
        borderWidth: 1,
      },
    ],
  };

  if (!isClient) {
    return <div className="h-80 flex items-center justify-center">Loading chart...</div>;
  }

  return (
    <div className="h-80">
      <Bar options={options} data={chartData} />
    </div>
  );
} 