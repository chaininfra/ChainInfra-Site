import { Metadata } from 'next';
import { Shield, Users, CheckCircle, Activity, MapPin, Mail, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeOnScroll from "@/components/FadeOnScroll";
import EndpointStatusCard from '@/components/EndpointStatusCard';
import Image from 'next/image';

const validatorConfig = {
  contactEmails: { primary: 'contact@chaininfra.net' },
  socialLinks: {
    telegram: 'https://t.me/chaininfra',
    twitter: 'https://twitter.com/lilreom'
  }
};

export default function BlockProducerPage() {
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

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* --- Header --- */}
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

        {/* --- Operator Info --- */}
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

        {/* --- Mission & Principles --- */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Mission & Principles</h2>
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

        {/* --- Live Endpoint Status Cards --- */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Live Endpoint Status
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time monitoring of ChainInfra's XPR Network and AtomicAssets infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EndpointStatusCard
              name="Mainnet BP"
              type="Mainnet Block Producer"
              endpoint="https://api.chaininfra.net"
              healthPath="/v1/chain/get_info"
            />
            <EndpointStatusCard
              name="Testnet BP"
              type="Testnet Block Producer"
              endpoint="https://testnet-api.chaininfra.net"
              healthPath="/v1/chain/get_info"
            />
            <EndpointStatusCard
              name="Mainnet AtomicAssets API"
              type="Mainnet AtomicAssets API"
              endpoint="https://xpr-atomic.chaininfra.net"
              healthPath="/health"
            />
          </div>
        </div>

        {/* --- Vote for Us --- */}
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

        {/* --- Social Links --- */}
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
}