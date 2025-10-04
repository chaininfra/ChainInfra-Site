'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Shield, Server, Code, Users, ArrowRight, ExternalLink, CheckCircle, Cpu, HardDrive, Wifi, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import FadeOnScroll from '@/components/FadeOnScroll';
import { useEffect } from 'react';
import { validatorConfig } from '@/lib/validator-config';
import TestimonialForm from '@/components/TestimonialForm';

const Services = () => {
  useEffect(() => {
    document.title = "Professional Blockchain Infrastructure Services - ChainInfra";
  }, []);

  const services = [
    {
      icon: Server,
      title: "Multi-Blockchain Node Setup",
      description: "MetalGo, XPR Network, and other blockchain protocols. OS hardening, configuration, pruning strategies",
      color: "cyber-blue"
    },
    {
      icon: Code,
      title: "Cross-Chain Observability",
      description: "Universal monitoring for Metal, XPR, and other networks. Prometheus exporters, Grafana dashboards, alerting",
      color: "cyber-purple"
    },
    {
      icon: Users,
      title: "Multi-Chain Operations",
      description: "Blockchain-agnostic upgrade procedures, backups/restore, incident response across multiple networks",
      color: "cyber-blue"
    },
    {
      icon: CheckCircle,
      title: "Cost/Capacity Guidance",
      description: "sizing, cloud vs. bare-metal tradeoffs",
      color: "cyber-green"
    }
  ];

  const hardwareSpecs = [
    {
      component: "CPU",
      spec: validatorConfig.minimumSpecs.cpu,
      icon: <Cpu className="h-6 w-6 text-cyber-green" />
    },
    {
      component: "RAM",
      spec: validatorConfig.minimumSpecs.ram,
      icon: <Server className="h-6 w-6 text-cyber-blue" />
    },
    {
      component: "Storage",
      spec: validatorConfig.minimumSpecs.storage,
      icon: <HardDrive className="h-6 w-6 text-cyber-purple" />
    },
    {
      component: "Network",
      spec: validatorConfig.minimumSpecs.network,
      icon: <Wifi className="h-6 w-6 text-cyber-green" />
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Header */}
        <div className="text-center mb-32">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shield className="h-10 w-10 text-cyber-green" />
            <h1 className="text-5xl md:text-6xl font-bold glow-text">
              <span className="text-cyber-blue">Build With ChainInfra</span>
            </h1>
          </div>
          <p className="text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
          We help teams stand up Metal Blockchain validator nodes—from hardware sizing to secure production rollout.
          </p>
          
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Professional Metal Blockchain infrastructure services with end-to-end setup, 
                high availability design, comprehensive monitoring, and operational playbooks.
              </p>
            </div>
          </FadeOnScroll>
        </div>

        {/* Why Choose ChainInfra Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Why Choose ChainInfra
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our unique advantages and proven track record in blockchain infrastructure
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border mb-16">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-cyber-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-cyber-blue">Proven Security</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Zero security incidents since 2023. Multi-signature protection, 
                    hardware security modules, and comprehensive audit trails.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-cyber-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-cyber-green">99.97% Uptime</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Industry-leading uptime with redundant infrastructure across 
                    multiple data centers and automated failover systems.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-cyber-purple" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-cyber-purple">Expert Team</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Founded by Luc with deep blockchain expertise. Team includes 
                    former enterprise infrastructure engineers and blockchain developers.
                  </p>
                </div>
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* What We Deliver Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              What We Deliver
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
            {services.map((service, index) => (
              <FadeOnScroll key={index}>
                <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 h-full flex flex-col group">
                  {/* Icon */}
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className={`h-8 w-8 text-${service.color}`} /> 
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-cyber-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed flex-grow text-base">
                    {service.description}
                  </p>
                </div>
              </FadeOnScroll>
            ))}
          </div>
        </div>

        {/* Hardware Specifications for Service Delivery */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Hardware Specifications for Service Delivery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Minimum specifications we use to ensure reliable Metal Blockchain validator node deployment
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {hardwareSpecs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-4 p-6 bg-background/50 rounded-lg">
                    <div className="flex-shrink-0">
                      {spec.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{spec.component}</h3>
                      <p className="text-muted-foreground">{spec.spec}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Service Delivery Details */}
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-background/30 rounded-lg">
                  <Clock className="h-8 w-8 text-cyber-green mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Setup Time</h4>
                  <p className="text-sm text-muted-foreground">24-48 hours</p>
                </div>
                <div className="text-center p-4 bg-background/30 rounded-lg">
                  <Shield className="h-8 w-8 text-cyber-blue mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Support Level</h4>
                  <p className="text-sm text-muted-foreground">24/7 monitoring</p>
                </div>
                <div className="text-center p-4 bg-background/30 rounded-lg">
                  <Server className="h-8 w-8 text-cyber-purple mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Redundancy</h4>
                  <p className="text-sm text-muted-foreground">Multi-node setup</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  <strong>Uptime Target:</strong> {validatorConfig.minimumSpecs.uptime}
                </p>
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* Important Notice */}
        <div className="mb-32">
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-2xl p-8 border border-yellow-500/20">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-600">Important</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We do not offer BP creation services. BP operations are specialized and typically reserved for experienced operators; we provide general guidance only.
                  </p>
                </div>
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* Contact Form Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Request a Metal Node Build
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to build your Metal Blockchain validator? Get in touch with our team for a consultation.
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border">
              <form 
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data = Object.fromEntries(formData.entries());
                  
                  try {
                    console.log('📤 Form data being sent:', data);
                    
                    const response = await fetch('/api/contact', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data),
                    });
                    
                    console.log('📥 Response status:', response.status);
                    const responseData = await response.json();
                    console.log('📥 Response data:', responseData);
                    
                    if (response.ok) {
                      alert('Request submitted successfully! We will contact you soon.');
                      (e.target as HTMLFormElement).reset();
                    } else {
                      alert(`Failed to submit request: ${responseData.error || 'Unknown error'}`);
                    }
                  } catch (error) {
                    console.error('Form submission error:', error);
                    alert('Failed to submit request. Please try again.');
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Your full name"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="your.email@example.com"
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input 
                    id="organization" 
                    name="organization" 
                    placeholder="Your organization or company"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project-type">Project Type *</Label>
                  <select 
                    id="project-type" 
                    name="project-type"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    required
                  >
                    <option value="">Select project type</option>
                    <option value="validator">Metal Blockchain Validator</option>
                    <option value="consultation">Infrastructure Consultation</option>
                    <option value="monitoring">Monitoring & Observability Setup</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeline">Expected Timeline</Label>
                  <select 
                    id="timeline" 
                    name="timeline"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="2-3-months">2-3 months</option>
                    <option value="3-plus-months">3+ months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                
                
                <div className="space-y-2">
                  <Label htmlFor="requirements">Project Requirements *</Label>
                  <Textarea 
                    id="requirements" 
                    name="requirements" 
                    placeholder="Describe your project requirements, infrastructure needs, and any specific goals..."
                    rows={6}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additional-info">Additional Information</Label>
                  <Textarea 
                    id="additional-info" 
                    name="additional-info" 
                    placeholder="Any additional information, questions, or specific concerns..."
                    rows={4}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white hover:shadow-2xl hover:shadow-cyber-blue/30 transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Send Request
                  </Button>
                  <a 
                    href={validatorConfig.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue hover:text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Delegate $METAL (Explorer)
                    </Button>
                  </a>
                </div>
              </form>
            </div>
          </FadeOnScroll>
        </div>

        {/* Testimonial Submission Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Share Your Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have you worked with ChainInfra? We'd love to hear about your experience and share it with others.
            </p>
          </div>
          
          <TestimonialForm />
        </div>

        {/* Process Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A structured approach to building your Metal Blockchain validator infrastructure
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Initial assessment of your requirements and infrastructure needs"
              },
              {
                step: "02", 
                title: "Planning",
                description: "Detailed project plan with timeline and resource allocation"
              },
              {
                step: "03",
                title: "Implementation",
                description: "Node setup, configuration, and security implementation"
              },
              {
                step: "04",
                title: "Support",
                description: "Ongoing monitoring, maintenance, and technical support"
              }
            ].map((step, index) => (
              <FadeOnScroll key={index}>
                <div className="text-center">
                  <div className="text-6xl font-bold text-cyber-blue mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </FadeOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;