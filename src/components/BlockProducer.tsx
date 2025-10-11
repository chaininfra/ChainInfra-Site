'use client';

import EndpointStatusCard from '@/components/EndpointStatusCard';
import { Button } from '@/components/ui/button';
import { Mail, Twitter, Send } from 'lucide-react'; // 🔹 fixed import (Send instead of Telegram)

export default function BlockProducer() {
  return (
    <div className="min-h-screen py-24 px-6 text-center">
      {/* --- Header / Hero --- */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white glow-text">
        ChainInfra Block Producer
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-16">
        Secure, transparent, and community-driven block production for the XPR Network.
      </p>

      {/* --- Mission & Principles --- */}
      <section className="mb-24">
        <h2 className="text-4xl font-bold mb-10">Mission & Principles</h2>
        <p className="text-muted-foreground mb-12">
          Our commitment to secure, transparent, and community-focused block production.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          <div className="bg-gradient-card p-6 rounded-xl cyber-border max-w-md">
            <h3 className="text-2xl font-semibold mb-3 text-cyber-green">XPR Network Security</h3>
            <p className="text-muted-foreground">
              Optimized and Secure block production powered by enterprise-grade monitoring and
              redundant processing.
            </p>
          </div>
          <div className="bg-gradient-card p-6 rounded-xl cyber-border max-w-md">
            <h3 className="text-2xl font-semibold mb-3 text-cyber-blue">
              XPR Block Production Transparency
            </h3>
            <p className="text-muted-foreground">
              Real-time node data, production metrics, and network statistics for public oversight.
            </p>
          </div>
          <div className="bg-gradient-card p-6 rounded-xl cyber-border max-w-md">
            <h3 className="text-2xl font-semibold mb-3 text-cyber-purple">XPR Network Monitoring</h3>
            <p className="text-muted-foreground">
              Real-time API status, P2P synchronization, and chain uptime tracking with automated
              alerting systems.
            </p>
          </div>
          <div className="bg-gradient-card p-6 rounded-xl cyber-border max-w-md">
            <h3 className="text-2xl font-semibold mb-3 text-cyber-pink">
              XPR Governance Participation
            </h3>
            <p className="text-muted-foreground">
              Active role in XPR proposals, technical upgrades, and ecosystem development.
            </p>
          </div>
        </div>
      </section>

      {/* --- Live Endpoint Status (moved higher) --- */}
      <section className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyber-green drop-shadow-[0_0_10px_rgba(0,255,150,0.4)]">
            Live Endpoint Status
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time monitoring of ChainInfra’s XPR Network and AtomicAssets infrastructure.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          <EndpointStatusCard
            name="Mainnet BP"
            type="Mainnet Block Producer"
            endpoint="https://api.chaininfra.net/health"
          />
          <EndpointStatusCard
            name="Testnet BP"
            type="Testnet Block Producer"
            endpoint="https://testnet-api.chaininfra.net/health"
          />
          <EndpointStatusCard
            name="Mainnet AtomicAssets API"
            type="Mainnet AtomicAssets API"
            endpoint="https://xpr-atomic.chaininfra.net/health"
            version="1.3.24"
          />
        </div>
      </section>

      {/* --- Vote for Us --- */}
      <section className="mb-32" id="vote">
        <h2 className="text-4xl font-bold mb-8">Vote for Us</h2>
        <p className="text-muted-foreground mb-12">
          Support ChainInfra as your XPR Network Block Producer.
        </p>
        <div className="bg-gradient-card p-6 rounded-xl cyber-border max-w-lg mx-auto">
          <h3 className="text-2xl font-semibold mb-3 text-cyber-green">
            Support ChainInfra
          </h3>
          <p className="text-muted-foreground mb-6">
            Help us maintain secure and reliable global infrastructure for the XPR Network.
          </p>
          <Button
            asChild
            className="bg-cyber-green hover:bg-cyber-green/90 text-black px-8 py-2 rounded-md font-semibold"
          >
            <a
              href="https://webauth.com/vote?producer=chaininfra"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vote Now
            </a>
          </Button>
        </div>
      </section>

      {/* --- Connect With Us --- */}
      <section className="mb-24">
        <h2 className="text-4xl font-bold mb-8">Connect With Us</h2>
        <p className="text-muted-foreground mb-12">
          Block production support and XPR Network technical discussions.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="mailto:info@chaininfra.net"
            className="flex items-center gap-2 bg-gradient-card px-5 py-3 rounded-xl cyber-border hover:scale-105 transition-transform"
          >
            <Mail className="h-5 w-5 text-cyber-green" />
            info@chaininfra.net
          </a>

          <a
            href="https://twitter.com/lilreom"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-card px-5 py-3 rounded-xl cyber-border hover:scale-105 transition-transform"
          >
            <Twitter className="h-5 w-5 text-cyber-blue" />
            @lilreom
          </a>

          <a
            href="https://t.me/chaininfra"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-card px-5 py-3 rounded-xl cyber-border hover:scale-105 transition-transform"
          >
            <Send className="h-5 w-5 text-cyber-purple" /> {/* replaced Telegram with Send */}
            @chaininfra
          </a>
        </div>
      </section>
    </div>
  );
}
