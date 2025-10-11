'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EndpointStatusCardProps {
  name: string;
  type: string;
  endpoint: string;
  version?: string;
}

export default function EndpointStatusCard({ name, type, endpoint, version }: EndpointStatusCardProps) {
  const [status, setStatus] = useState<'Online' | 'Offline' | 'Unknown'>('Unknown');
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const checkEndpoint = async () => {
    setLoading(true);
    const start = performance.now();

    try {
      const res = await fetch(endpoint, { method: 'GET', cache: 'no-store' });
      const elapsed = Math.round(performance.now() - start);

      if (res.ok) {
        setStatus('Online');
        setResponseTime(elapsed);
      } else {
        setStatus('Offline');
      }
    } catch {
      setStatus('Offline');
    } finally {
      setLoading(false);
      setLastChecked(new Date().toLocaleString());
    }
  };

  useEffect(() => {
    checkEndpoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gradient-card p-6 rounded-xl cyber-border flex flex-col justify-between w-full max-w-md min-h-[250px] shadow-md hover:shadow-lg hover:shadow-cyber-green/10 transition-all duration-500">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
          {status === 'Online' && (
            <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
          )}
        </div>

        {/* Status Info */}
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Status:</span>{' '}
            <span className={status === 'Online' ? 'text-green-500' : 'text-red-500'}>
              {status}
            </span>
          </p>

          <p>
            <span className="text-muted-foreground">Response Time:</span>{' '}
            <span className="text-cyber-green">
              {responseTime !== null ? `${responseTime}ms` : '—'}
            </span>
          </p>

          {version && (
            <p>
              <span className="text-muted-foreground">Version:</span>{' '}
              <span className="text-cyber-purple">{version}</span>
            </p>
          )}

          {lastChecked && (
            <p>
              <span className="text-muted-foreground">Last Checked:</span>{' '}
              <span className="text-cyber-blue">{lastChecked}</span>
            </p>
          )}

          {/* Endpoint (with proper wrapping) */}
          <p className="text-sm font-mono text-cyber-green break-all whitespace-normal mt-2">
            <span className="text-muted-foreground">Endpoint:</span>{' '}
            <a
              href={endpoint}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-green hover:text-cyber-blue transition-colors underline-offset-2 hover:underline"
            >
              {endpoint}
            </a>
          </p>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-6 flex justify-start">
        <Button
          variant="outline"
          size="sm"
          onClick={checkEndpoint}
          disabled={loading}
          className="flex items-center gap-2 border-cyber-green text-cyber-green hover:bg-cyber-green/10"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Checking...' : 'Refresh'}
        </Button>
      </div>
    </div>
  );
}
