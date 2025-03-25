'use client';

import React from 'react';
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

// Chart options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
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
          return value >= 1000 ? value / 1000 + 'k' : value;
        }
      }
    }
  }
};

interface RevenueChartProps {
  data: {
    month: string;
    water: number;
    ice: number;
    accessories: number;
  }[];
  timePeriod: string;
}

export default function RevenueChart({ data, timePeriod }: RevenueChartProps) {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Water',
        data: data.map((item) => item.water),
        backgroundColor: 'rgba(59, 130, 246, 0.85)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      },
      {
        label: 'Ice',
        data: data.map((item) => item.ice),
        backgroundColor: 'rgba(6, 182, 212, 0.85)',
        borderColor: 'rgba(6, 182, 212, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      },
      {
        label: 'Accessories',
        data: data.map((item) => item.accessories),
        backgroundColor: 'rgba(147, 51, 234, 0.85)',
        borderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      },
    ],
  };

  return (
    <div className="p-4 h-80">
      <Bar options={options} data={chartData} />
    </div>
  );
} 