'use client';

import {
  ExternalLink,
  RefreshCw,
  Activity,
  Server,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import FadeOnScroll from '@/components/FadeOnScroll';
import { useEffect, useState, useCallback, useRef } from 'react';
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
    delegationFee: { value: '--', label: 'Delegation Fee', status: 'good', lastUpdated: '--' },
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
    potentialReward: '--',
  });

  const [lastUpdated, setLastUpdated] = useState('--');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error' | 'fallback'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMetrics = useCallback(async () => {
    console.log('🔄 Fetching validator metrics...');
    setIsRefreshing(true);
    setApiStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`/api/validator-metrics?t=${Date.now()}`, {
        cache: 'no-store',
        next: { revalidate: 0 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          Pragma: 'no-cache',
          Expires: '0',
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

      const result = await response.json();
      if (!result.success || !result.data) throw new Error(result.error || 'Invalid API response');

      const { validatorMetrics: apiValidatorMetrics, validatorInfo: apiValidatorInfo, lastUpdated } = result.data;
      const formatTime = (t: string) => new Date(t).toLocaleTimeString();

      setValidatorMetrics({
        ...apiValidatorMetrics,
        uptime: { ...apiValidatorMetrics.uptime, lastUpdated: formatTime(lastUpdated) },
        delegators: { ...apiValidatorMetrics.delegators, lastUpdated: formatTime(lastUpdated) },
        totalStake: { ...apiValidatorMetrics.totalStake, lastUpdated: formatTime(lastUpdated) },
        ownedStake: { ...apiValidatorMetrics.ownedStake, lastUpdated: formatTime(lastUpdated) },
        delegatorStake: { ...apiValidatorMetrics.delegatorStake, lastUpdated: formatTime(lastUpdated) },
        delegationFee: { ...apiValidatorMetrics.delegationFee, lastUpdated: formatTime(lastUpdated) },
      });

      setValidatorInfo(apiValidatorInfo);
      setLastUpdated(formatTime(lastUpdated));
      setApiStatus('success');
      console.log('✅ Updated with live data at', formatTime(lastUpdated));
    } catch (error) {
      console.error('❌ Fetch failed:', error);
      setApiStatus('fallback');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');

      // fallback data
      const now = new Date().toLocaleTimeString();
      const fallbackOwnedStake = 296099000000000;
      const fallbackDelegatorStake = 1183396000000000;
      const fallbackTotalStake = fallbackOwnedStake + fallbackDelegatorStake;

      setValidatorMetrics({
        uptime: { value: '99.95%', label: 'Uptime', status: 'good', lastUpdated: now },
        delegators: { value: '11', label: 'Delegators', status: 'good', lastUpdated: now },
        totalStake: {
          value: `${(fallbackTotalStake / 1e9).toLocaleString()} $METAL`,
          label: 'Total Stake',
          status: 'good',
          lastUpdated: now,
        },
        ownedStake: {
          value: `${(fallbackOwnedStake / 1e9).toLocaleString()} $METAL`,
          label: 'Owned Stake',
          status: 'good',
          lastUpdated: now,
        },
        delegatorStake: {
          value: `${(fallbackDelegatorStake / 1e9).toLocaleString()} $METAL`,
          label: 'Delegator Stake',
          status: 'good',
          lastUpdated: now,
        },
        delegationFee: { value: '8%', label: 'Delegation Fee', status: 'good', lastUpdated: now },
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
        potentialReward: '7.21 $METAL',
      });
      setLastUpdated(now);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'Live Data - Blockchain Metrics & System Status';
    fetchMetrics();

    // set up live polling
    console.log(`⚙️ Polling every ${validatorConfig.pollingInterval / 1000}s...`);
    intervalRef.current = setInterval(fetchMetrics, validatorConfig.pollingInterval);

    return () => {
      console.log('🧹 Cleaning up polling interval...');
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchMetrics]);

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
        {/* Header */}
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Activity className="h-10 w-10 text-cyber-green" />
            <h1 className="text-5xl md:text-6xl font-bold glow-text">
              <span className="text-cyber-blue">Live Data</span>
            </h1>
          </div>
          <p className="text-2xl text-muted-foreground mb-8">
            Real-time blockchain metrics and system performance
          </p>

          <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border max-w-3xl mx-auto">
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

            <div className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> {lastUpdated} | Auto-refresh: every{' '}
              {validatorConfig.pollingInterval / 1000}s
              {apiStatus === 'success' && <span className="ml-2 text-cyber-green">✓ Live</span>}
              {apiStatus === 'fallback' && <span className="ml-2 text-yellow-500">⚠ Fallback</span>}
              {apiStatus === 'error' && <span className="ml-2 text-red-500">✗ Error</span>}
            </div>
            {errorMessage && (
              <div className="mt-2 text-sm text-red-500">
                <strong>Error:</strong> {errorMessage}
              </div>
            )}
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
          {Object.values(validatorMetrics).map((metric) => (
            <FadeOnScroll key={metric.label}>
              <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg transition-all h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{metric.label}</h3>
                  <span>{getStatusIcon(metric.status)}</span>
                </div>
                <div className="text-3xl font-bold mb-2 text-foreground">{metric.value}</div>
                <p className="text-sm text-muted-foreground">Updated: {metric.lastUpdated}</p>
              </div>
            </FadeOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveData;
