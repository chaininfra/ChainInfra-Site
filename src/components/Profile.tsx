'use client';

import { ExternalLink, Mail, Linkedin, Award, Shield, TrendingUp, Clock, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeOnScroll from "@/components/FadeOnScroll";
import { useEffect, useState } from "react";
import { seoConfig } from '@/lib/seo-config';
import { validatorConfig, getValidatorFee } from '@/lib/validator-config';
import Link from 'next/link';

const Profile = () => {
  const [validatorFee, setValidatorFee] = useState(validatorConfig.validatorFee);

  useEffect(() => {
    document.title = "Company Profile – ChainInfra Infrastructure Services";

    // Fetch dynamic validator fee
    const fetchFee = async () => {
      const fee = await getValidatorFee();
      setValidatorFee(fee);
    };
    fetchFee();
  }, []);

  const infrastructureFeatures = [
    {
      name: "Producer + Hot Standby",
      icon: <Shield className="h-8 w-8 text-cyber-blue" />,
      description: "Producer + hot standby with automated failover, uptime target >99.9%."
    },
    {
      name: "High-Frequency CPUs",
      icon: <TrendingUp className="h-8 w-8 text-cyber-blue" />,
      description: "High-frequency CPUs (≥3.5 GHz), NVMe storage, 32–64 GB RAM."
    },
    {
      name: "Time-Sync & Observability",
      icon: <Clock className="h-8 w-8 text-cyber-blue" />,
      description: "Time-sync enforcement, observability, on-call rotations."
    },
    {
      name: "Hardened Security",
      icon: <Shield className="h-8 w-8 text-cyber-blue" />,
      description: "Hardened OS, firewalling, network segmentation, least-privilege access."
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
              <span className="text-cyber-blue">About ChainInfra</span>
            </h1>
          </div>
          <p className="text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Founded by Luc, We operate a professional Metal Blockchain validator and serve as an XPR Network Block Producer (BP). Our focus: reliability, security, and community impact..
          </p>

          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team combines deep blockchain expertise with enterprise-grade infrastructure management.
                We've successfully operated validator nodes since 2023, serving thousands of delegators across Metal Blockchain and XPR Network.
              </p>
            </div>
          </FadeOnScroll>
        </div>

        {/* Infrastructure & Operations */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Infrastructure & Operations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Technical specifications and operational excellence for reliable blockchain infrastructure
            </p>
          </div>

          {/* Technical Infrastructure */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-cyber-blue">
              Technical Infrastructure
            </h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
              {infrastructureFeatures.map((feature, index) => (
                <FadeOnScroll key={index}>
                  <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300 text-center h-full flex flex-col">
                    <div className="inline-flex p-3 rounded-lg bg-cyber-blue/10 mb-4">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-3">{feature.name}</h4>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </FadeOnScroll>
              ))}
            </div>
          </div>

          {/* Operational Excellence */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-cyber-green">
              Operational Excellence
            </h3>
            <FadeOnScroll>
              <div className="bg-gradient-card p-8 rounded-xl cyber-border">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-background/50 rounded-lg">
                    <div className="inline-flex p-4 rounded-lg bg-cyber-green/10 mb-4">
                      <Award className="h-8 w-8 text-cyber-green" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Global Locations</h4>
                    <p className="text-muted-foreground">Multiple data centers worldwide</p>
                  </div>

                  <div className="text-center p-6 bg-background/50 rounded-lg">
                    <div className="inline-flex p-4 rounded-lg bg-cyber-blue/10 mb-4">
                      <TrendingUp className="h-8 w-8 text-cyber-blue" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Uptime SLA</h4>
                    <p className="text-muted-foreground">99.9% uptime guarantee</p>
                  </div>

                  <div className="text-center p-6 bg-background/50 rounded-lg">
                    <div className="inline-flex p-4 rounded-lg bg-cyber-purple/10 mb-4">
                      <Shield className="h-8 w-8 text-cyber-purple" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Real-time Monitoring</h4>
                    <p className="text-muted-foreground">24/7 system monitoring</p>
                  </div>

                  <div className="text-center p-6 bg-background/50 rounded-lg">
                    <div className="inline-flex p-4 rounded-lg bg-cyber-pink/10 mb-4">
                      <Clock className="h-8 w-8 text-cyber-pink" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Automated Failover</h4>
                    <p className="text-muted-foreground">Instant redundancy switching</p>
                  </div>
                </div>
              </div>
            </FadeOnScroll>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="mb-32">
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Work With Us?</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Contact us for professional blockchain infrastructure services.
                Current validator fee: <strong>{validatorFee}%</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${validatorConfig.contactEmails.primary}`}
                  className="inline-block"
                >
                  <Button size="lg" className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white hover:shadow-2xl hover:shadow-cyber-blue/30 transition-all duration-300">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                </a>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue hover:text-white">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* Contact & Social Links */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Contact & Social
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              General inquiries, partnerships, and company information
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
      </div>
    </div>
  );
};

export default Profile;