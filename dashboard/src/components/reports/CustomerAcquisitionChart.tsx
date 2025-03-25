'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

interface CustomerAcquisitionChartProps {
  data: {
    month: string;
    percentage: number;
  }[];
}

export default function CustomerAcquisitionChart({ data }: CustomerAcquisitionChartProps) {
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
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 8,
        cornerRadius: 4,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y}% growth`;
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
            size: 10
          }
        }
      },
      y: {
        display: false,
        min: 0,
        max: 100,
      }
    }
  };

  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        data: data.map(item => item.percentage),
        backgroundColor: data.map((_, index) => 
          index % 2 === 0 ? 'rgba(59, 130, 246, 0.65)' : 'rgba(59, 130, 246, 0.85)'
        ),
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
    ],
  };

  if (!isClient) {
    return <div className="h-24 flex items-center justify-center">Loading chart...</div>;
  }

  return (
    <div className="h-24">
      <Bar options={options} data={chartData} />
    </div>
  );
} 