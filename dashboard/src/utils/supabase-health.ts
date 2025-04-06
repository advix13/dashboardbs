import { supabase } from '@/lib/supabase';

export interface HealthCheckResult {
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: string;
  latency?: number;
}

export interface SupabaseHealthStatus {
  overall: 'healthy' | 'degraded' | 'offline';
  connectivity: HealthCheckResult;
  authentication: HealthCheckResult;
  database: HealthCheckResult;
  storage: HealthCheckResult;
  timestamp: string;
}

/**
 * Runs a comprehensive health check on Supabase connectivity
 */
export async function checkSupabaseHealth(): Promise<SupabaseHealthStatus> {
  const startTime = Date.now();
  const results: SupabaseHealthStatus = {
    overall: 'offline',
    connectivity: { status: 'error', message: 'Not tested' },
    authentication: { status: 'error', message: 'Not tested' },
    database: { status: 'error', message: 'Not tested' },
    storage: { status: 'error', message: 'Not tested' },
    timestamp: new Date().toISOString(),
  };

  // Check basic connectivity
  try {
    const connStart = Date.now();
    const { data, error } = await supabase.from('products').select('count', { count: 'exact' }).limit(1);
    const connEnd = Date.now();
    
    if (error) {
      results.connectivity = {
        status: 'error',
        message: 'Failed to connect to Supabase',
        details: error.message,
      };
    } else {
      results.connectivity = {
        status: 'success',
        message: 'Successfully connected to Supabase',
        latency: connEnd - connStart,
      };
    }
  } catch (error: any) {
    results.connectivity = {
      status: 'error',
      message: 'Connection error',
      details: error.message,
    };
  }

  // Check authentication service
  try {
    const authStart = Date.now();
    const { data, error } = await supabase.auth.getSession();
    const authEnd = Date.now();
    
    if (error) {
      results.authentication = {
        status: 'error',
        message: 'Authentication service unavailable',
        details: error.message,
      };
    } else {
      results.authentication = {
        status: 'success',
        message: 'Authentication service is operational',
        latency: authEnd - authStart,
      };
    }
  } catch (error: any) {
    results.authentication = {
      status: 'error',
      message: 'Authentication service error',
      details: error.message,
    };
  }

  // Check database query
  try {
    const dbStart = Date.now();
    const { data, error } = await supabase.from('products').select('*').limit(1);
    const dbEnd = Date.now();
    
    if (error) {
      results.database = {
        status: 'error',
        message: 'Database query failed',
        details: error.message,
      };
    } else {
      results.database = {
        status: 'success',
        message: 'Database query successful',
        latency: dbEnd - dbStart,
      };
    }
  } catch (error: any) {
    results.database = {
      status: 'error',
      message: 'Database error',
      details: error.message,
    };
  }

  // Check storage service
  try {
    const storageStart = Date.now();
    const { data, error } = await supabase.storage.listBuckets();
    const storageEnd = Date.now();
    
    if (error) {
      results.storage = {
        status: 'error',
        message: 'Storage service unavailable',
        details: error.message,
      };
    } else {
      results.storage = {
        status: 'success',
        message: 'Storage service is operational',
        latency: storageEnd - storageStart,
      };
    }
  } catch (error: any) {
    results.storage = {
      status: 'error',
      message: 'Storage service error',
      details: error.message,
    };
  }

  // Determine overall status
  const statuses = [
    results.connectivity.status,
    results.authentication.status,
    results.database.status,
    results.storage.status,
  ];
  
  const errorCount = statuses.filter(s => s === 'error').length;
  const warningCount = statuses.filter(s => s === 'warning').length;
  
  if (errorCount >= 2 || results.connectivity.status === 'error') {
    results.overall = 'offline';
  } else if (errorCount > 0 || warningCount > 0) {
    results.overall = 'degraded';
  } else {
    results.overall = 'healthy';
  }
  
  return results;
}

/**
 * Returns browser network information if available
 */
export function getNetworkInfo() {
  const info = {
    online: typeof navigator !== 'undefined' ? navigator.onLine : null,
    connectionType: null,
    effectiveType: null,
    downlink: null,
    rtt: null,
  };

  // @ts-ignore - Navigator connection API might not be typed
  if (typeof navigator !== 'undefined' && navigator.connection) {
    // @ts-ignore
    info.connectionType = navigator.connection.type;
    // @ts-ignore
    info.effectiveType = navigator.connection.effectiveType;
    // @ts-ignore
    info.downlink = navigator.connection.downlink;
    // @ts-ignore
    info.rtt = navigator.connection.rtt;
  }

  return info;
}

/**
 * Quick check if we're online and Supabase should be reachable
 */
export async function quickConnectivityCheck(): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return false;
    }
    
    const { data, error } = await supabase.from('products').select('count', { count: 'exact' }).limit(1);
    return !error;
  } catch {
    return false;
  }
} 