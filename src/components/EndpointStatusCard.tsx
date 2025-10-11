'use client';

import { useEffect, useState } from 'react';
import { Globe, CheckCircle, XCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  name: string;
  type: string;
  endpoint: string;
  healthPath?: string;
}

const EndpointStatusCard = ({ name, type, endpoint, healthPath = '/health' }: Props) => {
  const [status, setStatus] = useState<'online' | 'offline'>('offline');
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [lastChecked, setLastChecked] = useState<string>('');

  const fetchStatus = async () => {
    const start = Date.now();
    try {
      const res = await fetch(endpoint + healthPath, { cache: 'no-store' });
      const duration = Date.now() - start;

      if (!res.ok) throw new Error('Offline');
      const data = await res.json();

      setResponseTime(duration);
      setStatus('online');
      setDetails(data.data || data);
      setLastChecked(new Date().toLocaleString());
    } catch {
      setStatus('offline');
      setResponseTime(null);
      setDetails(null);
      setLastChecked(new Date().toLocaleString());
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-background/50 border border-border/50 hover:border-cyber-green/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
          {status === 'online' ? (
            <CheckCircle className="text-cyber-green w-6 h-6" />
          ) : (
            <XCircle className="text-red-500 w-6 h-6" />
          )}
        </div>

        <div className="space-y-2 text-sm font-mono">
          <p>
            <span className="text-muted-foreground">Status:</span>{' '}
            <span className={status === 'online' ? 'text-cyber-green' : 'text-red-500'}>
              {status === 'online' ? 'Online' : 'Offline'}
            </span>
          </p>
          <p>
            <span className="text-muted-foreground">Response Time:</span>{' '}
            {responseTime ? `${responseTime}ms` : 'N/A'}
          </p>
          {details?.head_block && (
            <p>
              <span className="text-muted-foreground">Head Block:</span> {details.head_block}
            </p>
          )}
          {details?.version && (
            <p>
              <span className="text-muted-foreground">Version:</span> {details.version}
            </p>
          )}
          <p>
            <span className="text-muted-foreground">Last Checked:</span> {lastChecked}
          </p>
          <p className="truncate">
            <span className="text-muted-foreground">Endpoint:</span>{' '}
            <a
              href={endpoint}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-green hover:text-cyber-blue"
            >
              {endpoint}
            </a>
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <Button size="sm" variant="outline" onClick={fetchStatus} className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" /> Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EndpointStatusCard;
