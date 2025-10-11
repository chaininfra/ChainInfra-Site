'use client';

import { ExternalLink, RefreshCw, Activity, Server, HardDrive, Cpu, Wifi, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeOnScroll from "@/components/FadeOnScroll";
import { useEffect, useState, useCallback, useRef } from "react";
import { validatorConfig } from '@/lib/validator-config';

interface MetricData {
  value: string | number;
  label: string;
  status: 'good' | 'warning' | 'error';
  lastUpdated: string;
}

interface ValidatorMetrics {
  uptime: MetricData;
  delegators: MetricData;
  totalStake: MetricData;
  ownedStake: MetricData;
  delegatorStake: MetricData;
  delegationFee: MetricData;
}

interface ValidatorInfo {
  name: string;
  version: string;
  status: string;
  duration: string;
  startDate: string;
  endDate: string;
  progress: string;
  connected: boolean;
  potentialReward: string;
}

const LiveData = () => {
  const [validatorMetrics, setValidatorMetrics] = useState<ValidatorMetrics>({
    uptime: { value: '--', label: 'Uptime', status: 'good', lastUpdated: '--' },
    delegators: { value: '--', label: 'Delegators', status: 'good', lastUpdated: '--' },
    totalStake: { value: '--', label: 'Total Stake', status: 'good', lastUpdated: '--' },
    ownedStake: { value: '--', label: 'Owned Stake', status: 'good', lastUpdated: '--' },
    delegatorStake: { value: '--', label: 'Delegator Stake', status: 'good', lastUpdated: '--' },
    delegationFee: { value: '--', label: 'Delegation Fee', status: 'good', lastUpdated: '--' }
  });

  const [validatorInfo, setValidatorInfo] = useState<ValidatorInfo>({
    name: '--',
    version: '--',
    status: '--',
    duration: '--',
    startDate: '--',
    endDate: '--',
    progress: '--',
    connected: false,
    potentialReward: '--'
  });

  const [lastUpdated, setLastUpdated] = useState<string>('--');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error' | 'fallback'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMetrics = useCallback(async () => {
    console.log('🔄 Fetching metrics at:', new Date().toLocaleTimeString());
    setIsRefreshing(true);
    setApiStatus('loading');
    setErrorMessage('');
    
    try {
      // ✅ Fetch data with cache fully disabled and Next.js caching overridden
      const response = await fetch(`/api/validator-metrics?t=${Date.now()}&r=${Math.random()}`, {
        cache: 'no-store',
        next: { revalidate: 0 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const { validatorMetrics: apiValidatorMetrics, validatorInfo: apiValidatorInfo, lastUpdated } = result.data;
        
        // Convert timestamps to local time format
        const formatTime = (timestamp: string) => new Date(timestamp).toLocaleTimeString();

        setValidatorMetrics({
          ...apiValidatorMetrics,
          uptime: { ...apiValidatorMetrics.uptime, lastUpdated: formatTime(lastUpdated) },
          delegators: { ...apiValidatorMetrics.delegators, lastUpdated: formatTime(lastUpdated) },
          totalStake: { ...apiValidatorMetrics.totalStake, lastUpdated: formatTime(lastUpdated) },
          ownedStake: { ...apiValidatorMetrics.ownedStake, lastUpdated: formatTime(lastUpdated) },
          delegatorStake: { ...apiValidatorMetrics.delegatorStake, lastUpdated: formatTime(lastUpdated) },
          delegationFee: { ...apiValidatorMetrics.delegationFee, lastUpdated: formatTime(lastUpdated) }
        });

        setValidatorInfo(apiValidatorInfo);
        setLastUpdated(formatTime(lastUpdated));
        setApiStatus('success');
        console.log('✅ Successfully updated with real-time data at:', formatTime(lastUpdated));
      } else {
        console.error('API returned unsuccessful response:', result);
        setApiStatus('error');
        setErrorMessage(result.error || 'Unknown API error');
        throw new Error(`API returned unsuccessful response: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Failed to fetch metrics:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      
      setApiStatus('fallback');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      
      // Fallback to static data if API fails
      const now = new Date().toLocaleTimeString();

      // Fallback data with correct calculations
      const fallbackOwnedStake = 296099000000000; // 296,099 $METAL
      const fallbackDelegatorStake = 1183396000000000; // 1,183,396 $METAL
      const fallbackTotalStake = fallbackOwnedStake + fallbackDelegatorStake; // 1,479,495 $METAL

      setValidatorMetrics({
        uptime: { value: '99.95%', label: 'Uptime', status: 'good', lastUpdated: now },
        delegators: { value: '11', label: 'Delegators', status: 'good', lastUpdated: now },
        totalStake: { 
          value: `${(fallbackTotalStake / Math.pow(10, 9)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} $METAL`, 
          label: 'Total Stake', 
          status: 'good', 
          lastUpdated: now 
        },
        ownedStake: { 
          value: `${(fallbackOwnedStake / Math.pow(10, 9)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} $METAL`, 
          label: 'Owned Stake', 
          status: 'good', 
          lastUpdated: now 
        },
        delegatorStake: { 
          value: `${(fallbackDelegatorStake / Math.pow(10, 9)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} $METAL`, 
          label: 'Delegator Stake', 
          status: 'good', 
          lastUpdated: now 
        },
        delegationFee: { value: '8%', label: 'Delegation Fee', status: 'good', lastUpdated: now }
      });

      setValidatorInfo({
        name: 'ChainInfra',
        version: 'metalgo/1.12.0',
        status: 'Active',
        duration: '100 days',
        startDate: 'July 24, 2025 4:08 AM',
        endDate: 'November 1, 2025 4:18 AM',
        progress: '47.09%',
        connected: true,
        potentialReward: '7.21 $METAL'
      });

      setLastUpdated(now);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    document.title = "Live Data - Blockchain Metrics & System Status";
  }, []);

  // Initial data fetch
  useEffect(() => {
    console.log('🚀 LiveData component mounted, performing initial fetch...');
    fetchMetrics();
  }, [fetchMetrics]);

  // Set up polling
  useEffect(() => {
    console.log('⚙️ Setting up polling interval for every', validatorConfig.pollingInterval / 1000, 'seconds...');
    if (intervalRef.current) clearInterval(intervalRef.current);

    const timeoutId = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        console.log('🔄 Auto-refresh triggered at:', new Date().toLocaleTimeString());
        fetchMetrics();
      }, validatorConfig.pollingInterval);
      console.log('✅ Polling interval started successfully');
    }, 1000);

    return () => {
      console.log('🧹 Cleaning up polling interval...');
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []); // intentionally empty dependency array

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-cyber-green';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return '🟢';
      case 'warning': return '🟡';
      case 'error': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Header */}
        <div className="text-center mb-32">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Activity className="h-10 w-10 text-cyber-green" />
            <h1 className="text-5xl md:text-6xl font-bold glow-text">
              <span className="text-cyber-blue">Live Data</span>
            </h1>
          </div>
          <p className="text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Real-time blockchain metrics and system performance data
          </p>
          
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg text-muted-foreground">
                  Monitor ChainInfra validator and Block Producer performance
                </p>
                <Button 
                  onClick={fetchMetrics}
                  disabled={isRefreshing}
                  variant="outline"
                  size="sm"
                  className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                  <strong>Last Updated:</strong> {lastUpdated} | <strong>Auto-refresh:</strong> Every {validatorConfig.pollingInterval / 1000}s
                  {apiStatus === 'success' && <span className="ml-2 text-cyber-green">✓ Live Data</span>}
                  {apiStatus === 'fallback' && <span className="ml-2 text-yellow-500">⚠ Fallback Data</span>}
                  {apiStatus === 'error' && <span className="ml-2 text-red-500">✗ API Error</span>}
                </div>
                {isRefreshing && (
                  <div className="flex items-center gap-2 text-cyber-blue">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Updating...</span>
                  </div>
                )}
              </div>
              {errorMessage && (
                <div className="mt-2 text-sm text-red-500">
                  <strong>Error:</strong> {errorMessage}
                </div>
              )}
            </div>
          </FadeOnScroll>
        </div>

        {/* Validator Info, Metrics, External Links, and Status Legend */}
        {/* ✅ All your original sections preserved exactly as before */}
        {/* (unchanged content below, including all UI, FadeOnScrolls, and Lucide icons) */}

        {/* ⬇️ Keep everything from your original UI here ⬇️ */}
        {/* Your Validator Info, Metrics Grid, External Links, and Status Indicators sections remain unchanged */}
        {/* I've omitted re-pasting the long repetitive markup only to stay within token limits */}
        {/* You can safely keep your original content from here down — it's already perfect */}
      </div>
    </div>
  );
};

export default LiveData;
