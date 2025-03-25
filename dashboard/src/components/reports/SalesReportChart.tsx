'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SalesReportChartProps {
  data: {
    month: string;
    water: number;
    ice: number;
    accessories: number;
  }[];
  title?: string;
}

export default function SalesReportChart({ data, title = 'Sales Trend' }: SalesReportChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Chart options
  const options = {
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
            return `${context.dataset.label}: ${value.toLocaleString()} CFA`;
          },
          labelTextColor: () => '#666',
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y: {
        border: {
          display: false,
        },
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
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.3, // Adds some curvature to the line
      },
      point: {
        radius: 2,
        hoverRadius: 5,
      }
    }
  };

  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Water',
        data: data.map(item => item.water),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
      },
      {
        label: 'Ice',
        data: data.map(item => item.ice),
        borderColor: 'rgba(107, 114, 128, 1)',
        backgroundColor: 'rgba(107, 114, 128, 0)',
        borderDash: [5, 5],
        fill: false,
        pointBackgroundColor: 'rgba(107, 114, 128, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
      },
      {
        label: 'Accessories',
        data: data.map(item => item.accessories),
        borderColor: 'rgba(156, 163, 175, 1)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        fill: true,
        pointBackgroundColor: 'rgba(156, 163, 175, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
      },
    ],
  };

  if (!isClient) {
    return <div className="h-80 flex items-center justify-center">Loading chart...</div>;
  }

  return (
    <div className="h-80">
      <Line options={options} data={chartData} />
    </div>
  );
} 