'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Send, CheckCircle } from 'lucide-react';
import FadeOnScroll from '@/components/FadeOnScroll';

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    client_title: '',
    client_company: '',
    client_email: '',
    testimonial_text: '',
    rating: 0,
    service_type: '',
    project_description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          client_name: '',
          client_title: '',
          client_company: '',
          client_email: '',
          testimonial_text: '',
          rating: 0,
          service_type: '',
          project_description: ''
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to submit testimonial: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isActive = starValue <= (hoveredStar || formData.rating);
      
      return (
        <button
          key={i}
          type="button"
          className={`transition-colors duration-200 ${
            isActive ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-400`}
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          <Star className="h-6 w-6 fill-current" />
        </button>
      );
    });
  };

  if (isSubmitted) {
    return (
      <FadeOnScroll>
        <div className="bg-gradient-card p-8 rounded-xl cyber-border text-center">
          <CheckCircle className="h-16 w-16 text-cyber-green mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4 text-cyber-green">Thank You!</h3>
          <p className="text-muted-foreground mb-6">
            Your testimonial has been submitted successfully. We'll review it and publish it if approved.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"
          >
            Submit Another Testimonial
          </Button>
        </div>
      </FadeOnScroll>
    );
  }

  return (
    <FadeOnScroll>
      <div className="bg-gradient-card p-8 rounded-xl cyber-border">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
          <p className="text-muted-foreground">
            Help others learn about our services by sharing your experience with ChainInfra.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="client_name">Name *</Label>
              <Input
                id="client_name"
                name="client_name"
                placeholder="Your full name"
                value={formData.client_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_email">Email *</Label>
              <Input
                id="client_email"
                name="client_email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.client_email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="client_title">Job Title</Label>
              <Input
                id="client_title"
                name="client_title"
                placeholder="e.g., CTO, DevOps Engineer"
                value={formData.client_title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_company">Company</Label>
              <Input
                id="client_company"
                name="client_company"
                placeholder="Your company name"
                value={formData.client_company}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Service Information */}
          <div className="space-y-2">
            <Label htmlFor="service_type">Service Type</Label>
            <select
              id="service_type"
              name="service_type"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              value={formData.service_type}
              onChange={handleInputChange}
            >
              <option value="">Select service type</option>
              <option value="validator-setup">Validator Node Setup</option>
              <option value="monitoring">Monitoring & Observability</option>
              <option value="consultation">Infrastructure Consultation</option>
              <option value="operations">Operations Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating (Optional)</Label>
            <div className="flex items-center gap-2">
              {renderStars()}
              {formData.rating > 0 && (
                <span className="text-sm text-muted-foreground ml-2">
                  {formData.rating} out of 5 stars
                </span>
              )}
            </div>
          </div>

          {/* Testimonial Text */}
          <div className="space-y-2">
            <Label htmlFor="testimonial_text">Your Testimonial *</Label>
            <Textarea
              id="testimonial_text"
              name="testimonial_text"
              placeholder="Tell us about your experience with ChainInfra. What did we do well? How did our services help you?"
              rows={6}
              value={formData.testimonial_text}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="project_description">Project Description (Optional)</Label>
            <Textarea
              id="project_description"
              name="project_description"
              placeholder="Briefly describe the project or work we did for you..."
              rows={4}
              value={formData.project_description}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white hover:shadow-2xl hover:shadow-cyber-blue/30 transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Testimonial
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </FadeOnScroll>
  );
};

export default TestimonialForm;
