'use client';

import { Shield, Globe, Users, CheckCircle, ExternalLink, Copy, MapPin, Mail, Network, Award, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    },
    {
      name: "AtomicAssets API",
      url: process.env.NEXT_PUBLIC_XPR_ATOMICASSETS_API_ENDPOINT || "https://xpr-atomic.chaininfra.net",
      description: "AtomicAssets indexer API for NFT and token queries on XPR mainnet",
      icon: <Globe className="h-6 w-6 text-cyber-green" />
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Logo + Header */}
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
        <FadeOnScroll>
          <div className="bg-gradient-card p-8 rounded-xl cyber-border mb-32">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <Award className="h-8 w-8 mx-auto text-cyber-blue mb-3" />
                <h3 className="text-xl font-bold mb-1">Name</h3>
                <p className="text-cyber-blue font-mono">{operatorInfo.name}</p>
              </div>
              <div>
                <MapPin className="h-8 w-8 mx-auto text-cyber-green mb-3" />
                <h3 className="text-xl font-bold mb-1">Location</h3>
                <p className="text-cyber-green font-mono">{operatorInfo.location}</p>
              </div>
              <div>
                <Mail className="h-8 w-8 mx-auto text-cyber-purple mb-3" />
                <h3 className="text-xl font-bold mb-1">Contact</h3>
                <a 
                  href={`mailto:${operatorInfo.contact.email}`}
                  className="text-cyber-purple hover:text-cyber-blue transition-colors"
                >
                  {operatorInfo.contact.email}
                </a>
              </div>
              <div>
                <Users className="h-8 w-8 mx-auto text-cyber-pink mb-3" />
                <h3 className="text-xl font-bold mb-1">Owner</h3>
                <p className="text-cyber-pink font-mono">Luc</p>
              </div>
            </div>
          </div>
        </FadeOnScroll>

        {/* Mission */}
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
                <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-cyber-blue/30 transition-all duration-500 h-full flex flex-col">
                  <div className="mb-6">{principle.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow text-base">
                    {principle.description}
                  </p>
                </div>
              </FadeOnScroll>
            ))}
          </div>
        </div>

        {/* Endpoints Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">XPR Endpoints</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Direct access to our XPR blockchain infrastructure endpoints
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Testnet */}
            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-xl cyber-border">
                <h3 className="text-2xl font-bold text-cyber-blue mb-4 text-center">XPR Testnet</h3>
                {xprTestnetEndpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {endpoint.icon}
                      <span className="text-sm font-semibold text-foreground">{endpoint.name}:</span>
                      <span
                        className="text-sm font-mono text-cyber-blue ml-2 break-all cursor-pointer hover:text-cyber-green transition-colors"
                        onClick={() => window.open(endpoint.url, '_blank')}
                      >
                        {endpoint.url}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(endpoint.url, `testnet-${endpoint.name}`)}
                      className="flex-shrink-0 p-2 hover:bg-cyber-blue/10"
                    >
                      <Copy className="w-4 h-4 text-cyber-blue" />
                    </Button>
                  </div>
                ))}
              </div>
            </FadeOnScroll>

            {/* Mainnet */}
            <FadeOnScroll>
              <div className="bg-gradient-card p-6 rounded-xl cyber-border">
                <h3 className="text-2xl font-bold text-cyber-purple mb-4 text-center">XPR Mainnet</h3>
                {xprMainnetEndpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {endpoint.icon}
                      <span className="text-sm font-semibold text-foreground">{endpoint.name}:</span>
                      <span
                        className="text-sm font-mono text-cyber-purple ml-2 break-all cursor-pointer hover:text-cyber-pink transition-colors"
                        onClick={() => window.open(endpoint.url, '_blank')}
                      >
                        {endpoint.url}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(endpoint.url, `mainnet-${endpoint.name}`)}
                      className="flex-shrink-0 p-2 hover:bg-cyber-purple/10"
                    >
                      <Copy className="w-4 h-4 text-cyber-purple" />
                    </Button>
                  </div>
                ))}
              </div>
            </FadeOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockProducer;
