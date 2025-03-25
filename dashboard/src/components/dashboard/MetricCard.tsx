'use client';

import React, { ReactNode } from 'react';

interface MetricCardProps {
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
}

const MetricCard = ({ icon, iconBgColor, iconColor, title, value, change }: MetricCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col justify-center h-full">
      <div className="flex items-start">
        <div className={`${iconBgColor} p-2 rounded-md`}>
          <div className={`${iconColor}`}>{icon}</div>
        </div>
        <div className="ml-3">
          <p className={`text-sm text-gray-500 mb-1`}>{title}</p>
          <div className="flex items-center">
            <p className="text-xl font-bold text-gray-900">{value}</p>
            {change && (
              <span className={`ml-2 text-xs font-medium ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
                {change.value}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard; 