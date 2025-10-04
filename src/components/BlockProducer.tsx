'use client';

import { Shield, Globe, Users, CheckCircle, ExternalLink, Copy, MapPin, Mail, Network, Award, Activity } from "lucide-react";
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
    location: "Minnesota, US",
    contact: {
      email: validatorConfig.contactEmails.primary,
      telegram: validatorConfig.socialLinks.telegram,
      twitter: validatorConfig.socialLinks.twitter
    }
  };

  const missionPrinciples = [
    {
      icon: <Shield className="h-8 w-8 text-cyber-green" />,
      title: "XPR Network Security",
      description: "Specialized XPR Network block production with advanced security protocols. Protecting XPR network integrity and transaction processing."
    },
    {
      icon: <Activity className="h-8 w-8 text-cyber-blue" />,
      title: "XPR Block Production Transparency",
      description: "Real-time XPR block production metrics and performance data. Open communication about XPR network maintenance and updates."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-cyber-purple" />,
      title: "XPR Network Monitoring",
      description: "Live XPR Network block production data publicly verifiable through XPR blockchain explorers and specialized monitoring tools."
    },
    {
      icon: <Users className="h-8 w-8 text-cyber-pink" />,
      title: "XPR Governance Participation",
      description: "Active XPR Network governance participation. Vote on XPR proposals and contribute to XPR ecosystem development."
    }
  ];

  const xprTestnetEndpoints = [
    {
      name: "API",
      url: process.env.NEXT_PUBLIC_XPR_TESTNET_API_ENDPOINT || "https://testnet-api.chaininfra.net",
      description: "REST API for XPR testnet blockchain data and chain information",
      icon: <Globe className="h-6 w-6 text-cyber-blue" />
    },
    {
      name: "P2P",
      url: process.env.NEXT_PUBLIC_XPR_TESTNET_P2P_ENDPOINT || "p2p-testnet.chaininfra.net:9876",
      description: "Peer-to-peer network endpoint for XPR testnet node communication",
      icon: <Network className="h-6 w-6 text-cyber-green" />
    }
  ];

  const xprMainnetEndpoints = [
    {
      name: "API",
      url: process.env.NEXT_PUBLIC_XPR_MAINNET_API_ENDPOINT || "https://mainnet-api.chaininfra.net",
      description: "REST API for XPR mainnet blockchain data and chain information",
      icon: <Globe className="h-6 w-6 text-cyber-purple" />
    },
    {
      name: "P2P",
      url: process.env.NEXT_PUBLIC_XPR_MAINNET_P2P_ENDPOINT || "p2p-mainnet.chaininfra.net:9876",
      description: "Peer-to-peer network endpoint for XPR mainnet node communication",
      icon: <Network className="h-6 w-6 text-cyber-pink" />
    }
  ];


  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Logo Section */}
        <div className="text-center mb-32">
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
                <span className="text-cyber-blue">XPR Block Producer</span>
              </h1>
              <p className="text-2xl text-cyber-green font-mono mb-2">
                For XPR Network governance participation and block production
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Specialized XPR Network block production with advanced security protocols
              </p>
            </div>
          </FadeOnScroll>
        </div>

        {/* Operator Info */}
        <div className="mb-32">
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
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-lg bg-cyber-pink/10 mb-4">
                    <Users className="h-8 w-8 text-cyber-pink" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Owner</h3>
                  <p className="text-lg text-cyber-pink font-mono">Luc</p>
                </div>
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* Ownership Disclosure */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Ownership Disclosure
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete transparency about our company structure and operations
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center mb-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    ChainInfra is operated by <strong className="text-cyber-blue">Leenoh Financing LLC</strong>, a Minnesota-registered company, and managed by <strong className="text-cyber-green">Luc</strong>.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-background/50 p-6 rounded-lg border border-cyber-blue/20">
                      <h3 className="text-xl font-bold mb-4 text-cyber-blue flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Operations
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We operate a professional Metal Blockchain validator and serve as an XPR Network Block Producer (BP) with a focus on reliability, security, and community impact.
                      </p>
                    </div>
                    
                    <div className="bg-background/50 p-6 rounded-lg border border-cyber-green/20">
                      <h3 className="text-xl font-bold mb-4 text-cyber-green flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Funding & Operations
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We are funded solely by our own company resources, with no external investors or third-party financial dependencies that could create conflicts of interest.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-background/50 p-6 rounded-lg border border-cyber-purple/20">
                      <h3 className="text-xl font-bold mb-4 text-cyber-purple flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Experience
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Our team combines deep blockchain expertise with enterprise-grade infrastructure management. Since 2023, we've successfully operated validator nodes for Metal Blockchain and XPR Network, supporting delegators and maintaining <strong className="text-cyber-purple">&gt;99.9% uptime</strong>.
                      </p>
                    </div>
                    
                    <div className="bg-background/50 p-6 rounded-lg border border-cyber-pink/20">
                      <h3 className="text-xl font-bold mb-4 text-cyber-pink flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Commitment to the Community
                      </h3>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>We prioritize:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Security-first operations</strong> – following industry best practices and continuous monitoring.</li>
                          <li><strong>Transparency</strong> – publicly verifiable metrics and open communication with delegators.</li>
                          <li><strong>Ecosystem growth</strong> – contributing to education, governance, and network stability.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* Mission & Principles */}
        <div className="mb-32">
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

        {/* XPR Endpoints */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              XPR Endpoints
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Direct access to our XPR blockchain infrastructure endpoints for network connectivity and data access
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* XPR Testnet Column */}
            <FadeOnScroll>
              <div className="space-y-4">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-cyber-blue mb-2">XPR Testnet</h3>
                  <p className="text-muted-foreground">Test network endpoints for development and testing</p>
                </div>
                
                <div className="bg-gradient-card p-6 rounded-xl cyber-border">
                  {xprTestnetEndpoints.map((endpoint, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {endpoint.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-foreground">{endpoint.name}:</span>
                          {endpoint.name === 'API' ? (
                            <span 
                              className="text-sm font-mono text-cyber-blue ml-2 break-all cursor-pointer hover:text-cyber-green transition-colors"
                              onClick={() => window.open(endpoint.url, '_blank')}
                              title="Click to open in new tab"
                            >
                              {endpoint.url}
                            </span>
                          ) : (
                            <span className="text-sm font-mono text-cyber-blue ml-2 break-all">
                              {endpoint.url}
                            </span>
                          )}
                        </div>
                      </div>
                      {endpoint.name === 'API' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(endpoint.url, `testnet-${endpoint.name}`)}
                          className="flex-shrink-0 p-2 hover:bg-cyber-blue/10"
                        >
                          <Copy className="w-4 h-4 text-cyber-blue" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeOnScroll>

            {/* XPR Mainnet Column */}
            <FadeOnScroll>
              <div className="space-y-4">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-cyber-purple mb-2">XPR Mainnet</h3>
                  <p className="text-muted-foreground">Production network endpoints for live operations</p>
                </div>
                
                <div className="bg-gradient-card p-6 rounded-xl cyber-border">
                  {xprMainnetEndpoints.map((endpoint, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {endpoint.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-foreground">{endpoint.name}:</span>
                          {endpoint.name === 'API' ? (
                            <span 
                              className="text-sm font-mono text-cyber-purple ml-2 break-all cursor-pointer hover:text-cyber-pink transition-colors"
                              onClick={() => window.open(endpoint.url, '_blank')}
                              title="Click to open in new tab"
                            >
                              {endpoint.url}
                            </span>
                          ) : (
                            <span className="text-sm font-mono text-cyber-purple ml-2 break-all">
                              {endpoint.url}
                            </span>
                          )}
                        </div>
                      </div>
                      {endpoint.name === 'API' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(endpoint.url, `mainnet-${endpoint.name}`)}
                          className="flex-shrink-0 p-2 hover:bg-cyber-purple/10"
                        >
                          <Copy className="w-4 h-4 text-cyber-purple" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeOnScroll>
          </div>
        </div>

        {/* Vote for Us */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Vote for Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Support ChainInfra as your XPR Network Block Producer
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border text-center">
              <div className="mb-8">
                <div className="inline-flex p-4 rounded-lg bg-cyber-green/10 mb-4">
                  <Activity className="h-8 w-8 text-cyber-green" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Support ChainInfra</h3>
                <p className="text-muted-foreground mb-6">
                  Help us maintain secure and reliable block production infrastructure for the XPR Network
                </p>
              </div>
              
              <Button
                variant="default"
                size="lg"
                onClick={() => window.open(process.env.NEXT_PUBLIC_VOTE_URL || 'https://explorer.xprnetwork.org/vote?producers=chaininfra', '_blank')}
                className="bg-cyber-green hover:bg-cyber-green/90 text-white px-8 py-3"
              >
                <Activity className="w-5 h-5 mr-2" />
                Vote Now
              </Button>
            </div>
          </FadeOnScroll>
        </div>

        {/* Social Links */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Connect With Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Block production support and XPR Network technical discussions
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
                    <p className="text-sm text-muted-foreground">{operatorInfo.contact.email}</p>
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
                  <svg className="h-6 w-6 text-cyber-blue group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
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
