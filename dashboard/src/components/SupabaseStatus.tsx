'use client';

import { useState, useEffect } from 'react';
import { checkSupabaseConnection, supabase } from '@/lib/supabase';
import { checkSupabaseHealth, getNetworkInfo, SupabaseHealthStatus } from '@/utils/supabase-health';

export default function SupabaseStatus() {
  const [status, setStatus] = useState<{
    connected: boolean;
    error?: string;
    latency?: number;
    checking: boolean;
    lastChecked: string | null;
    healthStatus?: SupabaseHealthStatus;
    networkInfo?: any;
    isExpanded: boolean;
  }>({
    connected: false,
    checking: true,
    lastChecked: null,
    isExpanded: false
  });

  const checkConnection = async () => {
    setStatus(prev => ({ ...prev, checking: true }));
    const networkInfo = getNetworkInfo();
    
    try {
      // First do a quick connection check
      const result = await checkSupabaseConnection();
      
      // Then run a more comprehensive health check
      const healthStatus = await checkSupabaseHealth();
      
      setStatus({
        connected: result.connected,
        latency: result.latency,
        error: result.error,
        checking: false,
        lastChecked: new Date().toLocaleTimeString(),
        healthStatus,
        networkInfo,
        isExpanded: status.isExpanded
      });
    } catch (error: any) {
      setStatus({
        connected: false,
        error: error.message || 'Unknown error',
        checking: false,
        lastChecked: new Date().toLocaleTimeString(),
        networkInfo,
        isExpanded: status.isExpanded
      });
    }
  };

  const toggleExpand = () => {
    setStatus(prev => ({ ...prev, isExpanded: !prev.isExpanded }));
  };

  useEffect(() => {
    checkConnection();
    
    // Set up automatic refresh every 30 seconds
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        checkConnection();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Optional: Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      console.log('Browser is online, checking Supabase connection...');
      checkConnection();
    };
    
    const handleOffline = () => {
      console.log('Browser is offline');
      setStatus(prev => ({ 
        ...prev, 
        connected: false, 
        error: 'Browser is offline',
        lastChecked: new Date().toLocaleTimeString()
      }));
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const healthStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="px-1.5 py-0.5 bg-green-100 text-green-800 rounded text-xs">OK</span>;
      case 'warning':
        return <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs">Warning</span>;
      case 'error':
        return <span className="px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-xs">Error</span>;
      default:
        return <span className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-xs">Unknown</span>;
    }
  };

  const statusColor = status.checking
    ? 'bg-yellow-400'
    : status.connected
      ? 'bg-green-500'
      : 'bg-red-500';

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ${
      status.isExpanded ? 'w-80' : 'max-w-xs'
    }`}>
      <div 
        className="p-4 cursor-pointer" 
        onClick={toggleExpand}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${statusColor}`}></div>
            Supabase Connection
          </h3>
          <button 
            onClick={(e) => { e.stopPropagation(); checkConnection(); }}
            className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
          >
            Refresh
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center">
            <span>
              {status.checking 
                ? 'Checking connection...' 
                : status.connected 
                  ? 'Connected to Supabase' 
                  : 'Connection Failed'
              }
            </span>
          </div>

          {status.latency && (
            <div className="flex justify-between">
              <span>API Latency:</span>
              <span className={`font-medium ${
                status.latency < 300 
                  ? 'text-green-600' 
                  : status.latency < 1000 
                    ? 'text-yellow-600' 
                    : 'text-red-600'
              }`}>
                {status.latency}ms
              </span>
            </div>
          )}

          {status.error && (
            <div className="text-red-600 break-words mt-1">
              {status.error}
            </div>
          )}

          {status.lastChecked && (
            <div className="text-gray-500 text-right text-xs mt-1">
              Last checked: {status.lastChecked}
            </div>
          )}
        </div>
      </div>

      {status.isExpanded && status.healthStatus && (
        <div className="px-4 pb-4 border-t border-gray-200 pt-2">
          <h4 className="text-xs font-semibold mb-2">Health Status: {status.healthStatus.overall}</h4>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Connectivity:</span>
              <div className="flex items-center">
                {healthStatusBadge(status.healthStatus.connectivity.status)}
                {status.healthStatus.connectivity.latency && (
                  <span className="ml-1 text-gray-500">{status.healthStatus.connectivity.latency}ms</span>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <span>Authentication:</span>
              <div className="flex items-center">
                {healthStatusBadge(status.healthStatus.authentication.status)}
                {status.healthStatus.authentication.latency && (
                  <span className="ml-1 text-gray-500">{status.healthStatus.authentication.latency}ms</span>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <span>Database:</span>
              <div className="flex items-center">
                {healthStatusBadge(status.healthStatus.database.status)}
                {status.healthStatus.database.latency && (
                  <span className="ml-1 text-gray-500">{status.healthStatus.database.latency}ms</span>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <span>Storage:</span>
              <div className="flex items-center">
                {healthStatusBadge(status.healthStatus.storage.status)}
                {status.healthStatus.storage.latency && (
                  <span className="ml-1 text-gray-500">{status.healthStatus.storage.latency}ms</span>
                )}
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-gray-100">
              <h5 className="font-semibold mb-1">Network Info</h5>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Browser Online:</span>
                  <span>{status.networkInfo?.online ? 'Yes' : 'No'}</span>
                </div>
                {status.networkInfo?.effectiveType && (
                  <div className="flex justify-between">
                    <span>Connection Type:</span>
                    <span>{status.networkInfo.effectiveType}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 