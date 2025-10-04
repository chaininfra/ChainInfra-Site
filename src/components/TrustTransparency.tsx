'use client';

import { Shield, Eye, Users, Mail, Instagram, ExternalLink, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeOnScroll from "@/components/FadeOnScroll";
import { useEffect } from "react";
import { validatorConfig } from '@/lib/validator-config';

const TrustTransparency = () => {
  useEffect(() => {
    document.title = "Transparency & Connection - ChainInfra";
  }, []);

  const principles = [
    {
      icon: <Shield className="h-8 w-8 text-cyber-green" />,
      title: "Security-First",
      description: "We prioritize security in all operations, implementing industry best practices and continuous monitoring to protect delegator assets and validator infrastructure."
    },
    {
      icon: <Eye className="h-8 w-8 text-cyber-blue" />,
      title: "Open Communication",
      description: "Transparent communication about validator performance, maintenance activities, and any issues that may affect delegators or stakers."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-cyber-purple" />,
      title: "Public Verification",
      description: "All metrics, performance data, and operational status are publicly verifiable through blockchain explorers and monitoring dashboards."
    }
  ];

  const commitments = [
    {
      title: "99.97% Verified Uptime",
      description: "Independently verified uptime over 12 months through third-party monitoring across multiple blockchain networks."
    },
    {
      title: "Publicly Auditable Metrics",
      description: "All performance data publicly accessible and independently verifiable through blockchain explorers and monitoring tools."
    },
    {
      title: "Transparent Fee Calculations",
      description: "All fee structures publicly auditable with open-source calculation methods. No hidden costs or surprise fees."
    },
    {
      title: "Multi-Chain Governance Participation",
      description: "Active participation in Metal Blockchain and XPR Network governance. All votes publicly recorded and documented."
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
              <span className="text-cyber-blue">Trust & Transparency</span>
            </h1>
          </div>
          <p className="text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Verification and compliance for all blockchain operations
          </p>
          
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Connect with ChainInfra through multiple channels and verify our profile on the Metal Blockchain Explorer. 
                We believe in complete transparency and open communication with our community.
              </p>
            </div>
          </FadeOnScroll>
        </div>

        {/* Principles Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Our Principles
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Security-first, open communication, and public verification
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <FadeOnScroll key={index}>
                <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 h-full flex flex-col group">
                  {/* Icon */}
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {principle.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-cyber-blue transition-colors duration-300">
                    {principle.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed flex-grow text-base">
                    {principle.description}
                  </p>
                </div>
              </FadeOnScroll>
            ))}
          </div>
        </div>

        {/* Commitments Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Our Commitments
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              What we promise to our delegators and stakers
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <FadeOnScroll key={index}>
                <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-cyber-green mt-1" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{commitment.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{commitment.description}</p>
                    </div>
                  </div>
                </div>
              </FadeOnScroll>
            ))}
          </div>
        </div>

        {/* Contact & Social Links */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Contact & Social Links
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with ChainInfra across multiple channels
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <a
                  href={`mailto:${validatorConfig.contactEmails.primary}`}
                  className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-cyber-blue/10 transition-colors"
                >
                  <Mail className="h-6 w-6 text-cyber-blue" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-muted-foreground">{validatorConfig.contactEmails.primary}</div>
                  </div>
                </a>

                <a
                  href={validatorConfig.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-cyber-blue/10 transition-colors"
                >
                  <svg className="h-6 w-6 text-cyber-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <div>
                    <div className="font-semibold">Twitter</div>
                    <div className="text-sm text-muted-foreground">@lilreom</div>
                  </div>
                </a>

                <a
                  href={validatorConfig.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-cyber-blue/10 transition-colors"
                >
                  <svg className="h-6 w-6 text-cyber-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  <div>
                    <div className="font-semibold">Telegram</div>
                    <div className="text-sm text-muted-foreground">@chaininfra</div>
                  </div>
                </a>

              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* Verification Links */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Verify Our Operations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Public verification of our validator and Block Producer operations
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <FadeOnScroll>
              <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 text-center h-full flex flex-col">
                <div className="inline-flex p-4 rounded-lg bg-cyber-blue/10 mb-6">
                  <ExternalLink className="h-8 w-8 text-cyber-blue" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Metal Explorer</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Verify our validator information, delegation data, and performance metrics on the official Metal Blockchain Explorer.
                </p>
                <a 
                  href={validatorConfig.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white hover:shadow-2xl hover:shadow-cyber-blue/30 transition-all duration-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Explorer
                  </Button>
                </a>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-green/20 transition-all duration-500 text-center h-full flex flex-col">
                <div className="inline-flex p-4 rounded-lg bg-cyber-green/10 mb-6">
                  <Award className="h-8 w-8 text-cyber-green" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Validator ID</h3>
                <p className="text-muted-foreground mb-6">
                  Our validator node ID for verification and delegation purposes.
                </p>
                <div className="bg-background/50 rounded-lg p-4 mb-6 flex-grow">
                  <code className="text-sm font-mono text-cyber-blue break-all">
                    {validatorConfig.validatorId}
                  </code>
                </div>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10 hover:border-cyber-green hover:text-white"
                  onClick={() => navigator.clipboard.writeText(validatorConfig.validatorId)}
                >
                  Copy Validator ID
                </Button>
              </div>
            </FadeOnScroll>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mb-32">
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Trust Indicators</h3>
                <p className="text-muted-foreground">Key metrics that demonstrate our reliability and transparency</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-cyber-blue mb-2">99.9%+</div>
                  <div className="text-sm text-muted-foreground">Uptime Target</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-cyber-green mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-cyber-purple mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Transparency</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-cyber-blue mb-2">0</div>
                  <div className="text-sm text-muted-foreground">Hidden Fees</div>
                </div>
              </div>
            </div>
          </FadeOnScroll>
        </div>
      </div>
    </div>
  );
};

export default TrustTransparency;