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
      // Fetch data from our API endpoint with aggressive cache busting
      const response = await fetch(`/api/validator-metrics?t=${Date.now()}&r=${Math.random()}`, {
        cache: 'no-store',
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

  // Set up polling - FIXED VERSION
  useEffect(() => {
    console.log('⚙️ Setting up polling interval for every', validatorConfig.pollingInterval / 1000, 'seconds...');
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Small delay to ensure initial fetch completes
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
  }, []); // Empty dependency array - this is the fix!

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

        {/* Validator Info */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <FadeOnScroll>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                Validator Information
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Current validator details and status
              </p>
            </FadeOnScroll>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="h-6 w-6 text-cyber-blue" />
                  <h3 className="text-lg font-semibold">Name</h3>
                </div>
                <div className="text-2xl font-bold text-foreground">{validatorInfo.name}</div>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-green/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="h-6 w-6 text-cyber-green" />
                  <h3 className="text-lg font-semibold">Version</h3>
                </div>
                <div className="text-2xl font-bold text-foreground">{validatorInfo.version}</div>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-purple/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="h-6 w-6 text-cyber-purple" />
                  <h3 className="text-lg font-semibold">Status</h3>
                </div>
                <div className="text-2xl font-bold text-foreground">{validatorInfo.status}</div>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-cyber-blue" />
                  <h3 className="text-lg font-semibold">Duration</h3>
                </div>
                <div className="text-2xl font-bold text-foreground">{validatorInfo.duration}</div>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-green/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-cyber-green" />
                  <h3 className="text-lg font-semibold">Progress</h3>
                </div>
                <div className="text-2xl font-bold text-foreground">{validatorInfo.progress}</div>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-green/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-cyber-green" />
                  <h3 className="text-lg font-semibold">Potential Reward</h3>
                </div>
                <div className="text-2xl font-bold text-foreground">{validatorInfo.potentialReward}</div>
              </div>
            </FadeOnScroll>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-purple/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="h-6 w-6 text-cyber-purple" />
                  <h3 className="text-lg font-semibold">Start Date</h3>
                </div>
                <div className="text-sm font-medium text-foreground">{validatorInfo.startDate}</div>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-cyber-blue" />
                  <h3 className="text-lg font-semibold">End Date</h3>
                </div>
                <div className="text-sm font-medium text-foreground">{validatorInfo.endDate}</div>
              </div>
            </FadeOnScroll>
          </div>
        </div>

        {/* Validator Metrics */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Validator Metrics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ChainInfra validator and Block Producer performance
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
            {/* Uptime */}
            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-cyber-green" />
                    <h3 className="text-lg font-semibold">{validatorMetrics.uptime.label}</h3>
                  </div>
                  <span className="text-lg">{getStatusIcon(validatorMetrics.uptime.status)}</span>
                </div>
                <div className="text-3xl font-bold mb-2 text-foreground">
                  {validatorMetrics.uptime.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  Updated: {validatorMetrics.uptime.lastUpdated}
                </p>
              </div>
            </FadeOnScroll>

            {/* Total Stake */}
            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Activity className="h-6 w-6 text-cyber-purple" />
                    <h3 className="text-lg font-semibold">{validatorMetrics.totalStake.label}</h3>
                  </div>
                  <span className="text-lg">{getStatusIcon(validatorMetrics.totalStake.status)}</span>
                </div>
                <div className="text-3xl font-bold mb-2 text-foreground">
                  {validatorMetrics.totalStake.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  Updated: {validatorMetrics.totalStake.lastUpdated}
                </p>
              </div>
            </FadeOnScroll>

            {/* Owned Stake */}
            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Server className="h-6 w-6 text-cyber-blue" />
                    <h3 className="text-lg font-semibold">{validatorMetrics.ownedStake.label}</h3>
                  </div>
                  <span className="text-lg">{getStatusIcon(validatorMetrics.ownedStake.status)}</span>
                </div>
                <div className="text-3xl font-bold mb-2 text-foreground">
                  {validatorMetrics.ownedStake.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  Updated: {validatorMetrics.ownedStake.lastUpdated}
                </p>
              </div>
            </FadeOnScroll>

            {/* Delegators */}
            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-cyber-blue" />
                    <h3 className="text-lg font-semibold">{validatorMetrics.delegators.label}</h3>
                  </div>
                  <span className="text-lg">{getStatusIcon(validatorMetrics.delegators.status)}</span>
                </div>
                <div className="text-3xl font-bold mb-2 text-foreground">
                  {validatorMetrics.delegators.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  Updated: {validatorMetrics.delegators.lastUpdated}
                </p>
              </div>
            </FadeOnScroll>

            {/* Delegation Fee */}
            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-cyber-green" />
                    <h3 className="text-lg font-semibold">{validatorMetrics.delegationFee.label}</h3>
                  </div>
                  <span className="text-lg">{getStatusIcon(validatorMetrics.delegationFee.status)}</span>
                </div>
                <div className="text-3xl font-bold mb-2 text-foreground">
                  {validatorMetrics.delegationFee.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  Updated: {validatorMetrics.delegationFee.lastUpdated}
                </p>
              </div>
            </FadeOnScroll>

            {/* Delegator Stake */}
            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-cyber-green" />
                    <h3 className="text-lg font-semibold">{validatorMetrics.delegatorStake.label}</h3>
                  </div>
                  <span className="text-lg">{getStatusIcon(validatorMetrics.delegatorStake.status)}</span>
                </div>
                <div className="text-3xl font-bold mb-2 text-foreground">
                  {validatorMetrics.delegatorStake.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  Updated: {validatorMetrics.delegatorStake.lastUpdated}
                </p>
              </div>
            </FadeOnScroll>
          </div>
        </div>

        {/* External Links */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              External Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access detailed metrics and explorer data
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            <FadeOnScroll>
              <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 text-center">
                <div className="inline-flex p-4 rounded-lg bg-cyber-blue/10 mb-6">
                  <ExternalLink className="h-8 w-8 text-cyber-blue" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Metal Explorer</h3>
                <p className="text-muted-foreground mb-6">
                  View detailed validator information, delegation data, and blockchain metrics
                </p>
                <a 
                  href={validatorConfig.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white hover:shadow-2xl hover:shadow-cyber-blue/30 transition-all duration-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Explorer
                  </Button>
                </a>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-green/20 transition-all duration-500 text-center">
                <div className="inline-flex p-4 rounded-lg bg-cyber-green/10 mb-6">
                  <Activity className="h-8 w-8 text-cyber-green" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Grafana Dashboard</h3>
                <p className="text-muted-foreground mb-6">
                  Access detailed monitoring dashboards and system metrics
                </p>
                {validatorConfig.grafanaDashboardUrl ? (
                  <a 
                    href={validatorConfig.grafanaDashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-gradient-to-r from-cyber-green to-cyber-blue text-white hover:shadow-2xl hover:shadow-cyber-green/30 transition-all duration-300">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Dashboard
                    </Button>
                  </a>
                ) : (
                  <Button size="lg" className="bg-gradient-to-r from-cyber-green to-cyber-blue text-white hover:shadow-2xl hover:shadow-cyber-green/30 transition-all duration-300" disabled>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Dashboard Coming Soon
                  </Button>
                )}
              </div>
            </FadeOnScroll>
          </div>
        </div>

        {/* Status Legend */}
        <div className="mb-32">
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Status Indicators</h3>
                <p className="text-muted-foreground">Understanding the status colors and icons</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">🟢</div>
                  <div className="text-lg font-semibold text-cyber-green mb-1">Good</div>
                  <div className="text-sm text-muted-foreground">Normal operation</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">🟡</div>
                  <div className="text-lg font-semibold text-yellow-500 mb-1">Warning</div>
                  <div className="text-sm text-muted-foreground">Attention needed</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">🔴</div>
                  <div className="text-lg font-semibold text-red-500 mb-1">Error</div>
                  <div className="text-sm text-muted-foreground">Immediate action required</div>
                </div>
              </div>
            </div>
          </FadeOnScroll>
        </div>
      </div>
    </div>
  );
};

export default LiveData;