'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Star, 
  Eye, 
  Trash2, 
  RefreshCw,
  Filter,
  Search
} from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  client_title?: string;
  client_company?: string;
  client_email: string;
  testimonial_text: string;
  rating?: number;
  service_type?: string;
  project_description?: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  created_at: string;
}

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, [statusFilter]);

  const fetchTestimonials = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      
      const response = await fetch(`/api/admin/testimonials?${params}`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      
      const data = await response.json();
      setTestimonials(data.data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTestimonialStatus = async (id: string, status: string, featured?: boolean) => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, featured }),
      });

      if (response.ok) {
        fetchTestimonials(); // Refresh the list
      } else {
        const errorData = await response.json();
        alert(`Failed to update testimonial: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      alert('Failed to update testimonial');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTestimonials(); // Refresh the list
      } else {
        const errorData = await response.json();
        alert(`Failed to delete testimonial: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.client_company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.testimonial_text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="h-8 w-8 animate-spin text-cyber-blue" />
        <span className="ml-2">Loading testimonials...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Testimonial Management</h2>
        <Button onClick={fetchTestimonials} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
          />
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {filteredTestimonials.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No testimonials found.
          </div>
        ) : (
          filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-card p-6 rounded-xl cyber-border"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{testimonial.client_name}</h3>
                    {getStatusBadge(testimonial.status)}
                    {testimonial.featured && (
                      <Badge variant="outline" className="text-cyber-green border-cyber-green">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-2">
                    {testimonial.client_title && `${testimonial.client_title} `}
                    {testimonial.client_company && `at ${testimonial.client_company}`}
                  </div>
                  
                  {testimonial.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(testimonial.rating)}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({testimonial.rating}/5)
                      </span>
                    </div>
                  )}
                  
                  {testimonial.service_type && (
                    <Badge variant="secondary" className="mb-2">
                      {testimonial.service_type}
                    </Badge>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {new Date(testimonial.created_at).toLocaleDateString()}
                </div>
              </div>

              <blockquote className="text-muted-foreground mb-4 italic">
                "{testimonial.testimonial_text}"
              </blockquote>

              {testimonial.project_description && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-1">Project Description:</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.project_description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {testimonial.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateTestimonialStatus(testimonial.id, 'approved')}
                      className="bg-cyber-green hover:bg-cyber-green/80"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateTestimonialStatus(testimonial.id, 'rejected')}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
                
                {testimonial.status === 'approved' && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateTestimonialStatus(testimonial.id, 'approved', !testimonial.featured)}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      {testimonial.featured ? 'Unfeature' : 'Feature'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateTestimonialStatus(testimonial.id, 'rejected')}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
                
                {testimonial.status === 'rejected' && (
                  <Button
                    size="sm"
                    onClick={() => updateTestimonialStatus(testimonial.id, 'approved')}
                    className="bg-cyber-green hover:bg-cyber-green/80"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteTestimonial(testimonial.id)}
                  className="text-red-500 border-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonialManagement;
