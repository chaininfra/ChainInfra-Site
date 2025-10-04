'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Calendar, Building, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  project_type: string;
  timeline: string | null;
  budget: string | null;
  requirements: string;
  additional_info: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export default function ContactRequests() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Fetch contact requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (statusFilter !== 'all') {
          params.set('status', statusFilter);
        }
        
        const response = await fetch(`/api/admin/contact-requests?${params}`);
        const result = await response.json();
        
        if (response.ok) {
          setRequests(result.data);
        } else {
          setError(result.error || 'Failed to fetch contact requests');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [statusFilter]);

  // Update request status
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/contact-requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setRequests(prev => 
          prev.map(req => 
            req.id === id ? { ...req, status: newStatus as any } : req
          )
        );
      } else {
        const result = await response.json();
        setError(result.error || 'Failed to update status');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="text-blue-600 border-blue-600"><Clock className="h-3 w-3 mr-1" />In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cyber-blue" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Contact Requests</h2>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No contact requests found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{request.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {request.email}
                      </div>
                      {request.organization && (
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {request.organization}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(request.created_at)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(request.status)}
                    <Select value={request.status} onValueChange={(value) => updateStatus(request.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">Project Type</h4>
                    <p className="text-sm text-muted-foreground capitalize">{request.project_type.replace('_', ' ')}</p>
                  </div>
                  {request.timeline && (
                    <div>
                      <h4 className="font-semibold mb-1">Timeline</h4>
                      <p className="text-sm text-muted-foreground">{request.timeline.replace('-', ' ')}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{request.requirements}</p>
                </div>
                
                {request.additional_info && (
                  <div>
                    <h4 className="font-semibold mb-2">Additional Information</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{request.additional_info}</p>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`mailto:${request.email}?subject=Re: Metal Node Build Request (${request.id})`, '_blank')}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(request.id)}
                  >
                    Copy ID
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
