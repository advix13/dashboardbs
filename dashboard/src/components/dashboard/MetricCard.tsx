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
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 flex flex-col justify-center h-full">
      <div className="flex items-start">
        <div className={`${iconBgColor} p-1.5 sm:p-2 rounded-md`}>
          <div className={`${iconColor}`}>{icon}</div>
        </div>
        <div className="ml-2 sm:ml-3">
          <p className={`text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1`}>{title}</p>
          <div className="flex items-center">
            <p className="text-lg sm:text-xl font-bold text-gray-900">{value}</p>
            {change && (
              <span className={`ml-1.5 sm:ml-2 text-xs font-medium ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
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