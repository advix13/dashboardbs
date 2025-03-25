'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface CategoryChartProps {
  data: {
    category: string;
    percentage: number;
    value: number;
  }[];
}

export default function CategoryChart({ data }: CategoryChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12
          }
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
            const value = context.dataset.data[context.dataIndex];
            const category = data[context.dataIndex].category;
            const percentage = data[context.dataIndex].percentage;
            return `${category}: ${(value/1000).toFixed(1)}k CFA (${percentage}%)`;
          },
          labelTextColor: () => '#666',
        }
      }
    }
  };

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(59, 130, 246, 0.85)',
          'rgba(6, 182, 212, 0.85)',
          'rgba(147, 51, 234, 0.85)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(6, 182, 212, 1)',
          'rgba(147, 51, 234, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  // Calculate total value
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  }).format(totalValue / 1000);

  if (!isClient) {
    return <div className="relative h-80 p-2 flex items-center justify-center">Loading chart...</div>;
  }

  return (
    <div className="relative h-80 p-2">
      <div className="h-full">
        <Doughnut options={options} data={chartData} />
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-bold">{formattedTotal}k</div>
        <div className="text-xs text-gray-500">CFA Total</div>
      </div>
    </div>
  );
} 