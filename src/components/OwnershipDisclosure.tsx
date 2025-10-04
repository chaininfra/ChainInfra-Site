'use client';

import { Shield, Globe, Server, Users, CheckCircle, ExternalLink, Copy, MapPin, Mail, MessageCircle, Network, Award, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeOnScroll from "@/components/FadeOnScroll";
import { useEffect, useState } from "react";
import { validatorConfig } from '@/lib/validator-config';
import Image from 'next/image';

const BlockProducer = () => {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Block Producer - ChainInfra | XPR Network";
  }, []);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const operatorInfo = {
    name: "ChainInfra",
    location: "Global Infrastructure",
    contact: {
      email: "info@chaininfra.net",
      telegram: validatorConfig.socialLinks.telegram,
      twitter: validatorConfig.socialLinks.twitter
    }
  };

  const missionPrinciples = [
    {
      icon: <Shield className="h-8 w-8 text-cyber-green" />,
      title: "Security-First Operations",
      description: "We prioritize security in all block production activities, implementing industry best practices and continuous monitoring to protect the network and user assets."
    },
    {
      icon: <Activity className="h-8 w-8 text-cyber-blue" />,
      title: "Transparent Communication",
      description: "Open and honest communication about block production performance, maintenance activities, and any issues that may affect the network or stakers."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-cyber-purple" />,
      title: "Publicly Verifiable Metrics",
      description: "All block production metrics, performance data, and operational status are publicly verifiable through blockchain explorers and monitoring dashboards."
    },
    {
      icon: <Users className="h-8 w-8 text-cyber-pink" />,
      title: "Community Engagement & Governance",
      description: "Active participation in XPR Network governance and community discussions to support ecosystem development and network improvements."
    }
  ];

  const publicEndpoints = [
    {
      name: "API Endpoint",
      url: "https://testnet-api.chaininfra.net/v1/chain/get_info",
      description: "REST API for blockchain data and chain information",
      icon: <Globe className="h-6 w-6 text-cyber-blue" />
    },
    {
      name: "P2P Endpoint",
      url: "p2p-testnet.chaininfra.net:9876",
      description: "Peer-to-peer network endpoint for node communication",
      icon: <Network className="h-6 w-6 text-cyber-green" />
    }
  ];


  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Logo Section */}
        <div className="text-center mb-20">
          <FadeOnScroll>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 mb-6">
                <Image 
                  src="/logo.svg"
                  alt="ChainInfra Logo"
                  width={128}
                  height={128}
                  className="w-32 h-32"
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold glow-text mb-4">
                <span className="text-cyber-blue">ChainInfra</span>
              </h1>
              <p className="text-2xl text-cyber-green font-mono mb-2">
                XPR Network Block Producer
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Secure, transparent, and community-focused block production infrastructure
              </p>
            </div>
          </FadeOnScroll>
        </div>

        {/* Operator Info */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Operator Information
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Block producer details and contact information
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border">
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-lg bg-cyber-blue/10 mb-4">
                    <Award className="h-8 w-8 text-cyber-blue" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Name</h3>
                  <p className="text-lg text-cyber-blue font-mono">{operatorInfo.name}</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-lg bg-cyber-green/10 mb-4">
                    <MapPin className="h-8 w-8 text-cyber-green" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Location</h3>
                  <p className="text-lg text-cyber-green font-mono">{operatorInfo.location}</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-lg bg-cyber-purple/10 mb-4">
                    <Mail className="h-8 w-8 text-cyber-purple" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Contact</h3>
                  <div className="space-y-2">
                    <a 
                      href={`mailto:${operatorInfo.contact.email}`}
                      className="block text-cyber-purple hover:text-cyber-blue transition-colors"
                    >
                      {operatorInfo.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* Mission & Principles */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Mission & Principles
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to secure, transparent, and community-focused block production
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            {missionPrinciples.map((principle, index) => (
              <FadeOnScroll key={index}>
                <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 h-full flex flex-col group">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {principle.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-cyber-blue transition-colors duration-300">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow text-base">
                    {principle.description}
                  </p>
                </div>
              </FadeOnScroll>
            ))}
          </div>
        </div>

        {/* Public Endpoints */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Public Endpoints
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              API and P2P endpoints for network connectivity and data access
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            {publicEndpoints.map((endpoint, index) => (
              <FadeOnScroll key={index}>
                <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      {endpoint.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-2">{endpoint.name}</h3>
                      <p className="text-muted-foreground mb-4">{endpoint.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-background/50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono text-cyber-blue break-all">
                      {endpoint.url}
                    </code>
                  </div>
                  
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(endpoint.url, endpoint.name)}
                      className="flex-1 border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied === endpoint.name ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(endpoint.url, '_blank')}
                      className="flex-1 border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open
                    </Button>
                  </div>
                </div>
              </FadeOnScroll>
            ))}
          </div>
        </div>

        {/* Profile JSON */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Profile JSON
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete block producer profile and technical specifications
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border text-center">
              <div className="mb-6">
                <div className="inline-flex p-4 rounded-lg bg-cyber-blue/10 mb-4">
                  <Server className="h-8 w-8 text-cyber-blue" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Block Producer Profile</h3>
                <p className="text-muted-foreground mb-4">
                  Complete technical specifications and operational details
                </p>
              </div>
              
              <div className="bg-background/50 rounded-lg p-4 mb-6">
                <code className="text-sm font-mono text-cyber-blue break-all">
                  https://chaininfra.net/testnet.json
                </code>
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard("https://chaininfra.net/testnet.json", "Profile JSON")}
                  className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied === "Profile JSON" ? 'Copied!' : 'Copy URL'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://chaininfra.net/testnet.json", '_blank')}
                  className="border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View JSON
                </Button>
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* Social Links */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Connect With Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated and engage with our community
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border">
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
                <a 
                  href={`mailto:${operatorInfo.contact.email}`}
                  className="flex items-center gap-4 p-6 bg-background/50 rounded-lg hover:bg-cyber-blue/10 transition-all duration-300 group"
                >
                  <Mail className="h-6 w-6 text-cyber-blue group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex-grow">
                    <h3 className="font-semibold mb-1 group-hover:text-cyber-blue transition-colors duration-300">
                      Email
                    </h3>
                    <p className="text-sm text-muted-foreground">Primary contact</p>
                  </div>
                </a>
                
                <a 
                  href={operatorInfo.contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-background/50 rounded-lg hover:bg-cyber-blue/10 transition-all duration-300 group"
                >
                  <svg className="h-6 w-6 text-cyber-blue group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <div className="flex-grow">
                    <h3 className="font-semibold mb-1 group-hover:text-cyber-blue transition-colors duration-300">
                      Twitter
                    </h3>
                    <p className="text-sm text-muted-foreground">@lilreom</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-cyber-blue transition-colors duration-300" />
                </a>
                
                <a 
                  href={operatorInfo.contact.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-background/50 rounded-lg hover:bg-cyber-blue/10 transition-all duration-300 group"
                >
                  <MessageCircle className="h-6 w-6 text-cyber-blue group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex-grow">
                    <h3 className="font-semibold mb-1 group-hover:text-cyber-blue transition-colors duration-300">
                      Telegram
                    </h3>
                    <p className="text-sm text-muted-foreground">@chaininfra</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-cyber-blue transition-colors duration-300" />
                </a>
              </div>
            </div>
          </FadeOnScroll>
        </div>
      </div>
    </div>
  );
};

export default BlockProducer;
