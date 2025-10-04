'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, User, Building, Mail, Calendar } from 'lucide-react';
import FadeOnScroll from '@/components/FadeOnScroll';

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
  status: string;
  featured: boolean;
  created_at: string;
}

interface TestimonialsProps {
  featuredOnly?: boolean;
  limit?: number;
}

const Testimonials = ({ featuredOnly = false, limit = 6 }: TestimonialsProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const params = new URLSearchParams();
        if (featuredOnly) {
          params.append('featured', 'true');
        } else {
          params.append('featured', 'false');
        }
        params.append('limit', limit.toString());

        const response = await fetch(`/api/testimonials?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }

        const data = await response.json();
        setTestimonials(data.data || []);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [featuredOnly, limit]);

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

  if (loading) {
    return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="bg-gradient-card p-6 rounded-xl cyber-border animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            <div className="h-3 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-4"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-8">
        <Quote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No testimonials available yet.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Be the first to share your experience with ChainInfra!
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <FadeOnScroll key={testimonial.id}>
          <div className="bg-gradient-card p-6 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 h-full flex flex-col group">
            {/* Quote Icon */}
            <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
              <Quote className="h-8 w-8 text-cyber-blue" />
            </div>

            {/* Rating */}
            {testimonial.rating && (
              <div className="flex items-center gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>
            )}

            {/* Testimonial Text */}
            <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-grow">
              "{testimonial.testimonial_text}"
            </blockquote>

            {/* Client Info */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyber-blue/20 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-cyber-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.client_name}
                  </h4>
                  {testimonial.client_title && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.client_title}
                    </p>
                  )}
                  {testimonial.client_company && (
                    <div className="flex items-center gap-1 mt-1">
                      <Building className="h-3 w-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {testimonial.client_company}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Type */}
              {testimonial.service_type && (
                <div className="mt-3">
                  <span className="inline-block bg-cyber-green/20 text-cyber-green text-xs px-2 py-1 rounded-full">
                    {testimonial.service_type}
                  </span>
                </div>
              )}
            </div>
          </div>
        </FadeOnScroll>
      ))}
    </div>
  );
};

export default Testimonials;
