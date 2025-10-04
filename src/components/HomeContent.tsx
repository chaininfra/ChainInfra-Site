"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, ShieldCheck, Scale, Users, ExternalLink, ArrowRight, Eye, Zap, Heart, Quote } from 'lucide-react';
import FadeOnScroll from '@/components/FadeOnScroll';
import WebsiteSchema from '@/components/WebsiteSchema';
import Testimonials from '@/components/Testimonials';
import { validatorConfig } from '@/lib/validator-config';

interface HomeContentProps { }

export default function HomeContent({ }: HomeContentProps) {
  // Get all unique blog tags for autocomplete
  const allTags: string[] = [];

  // Terminal component with all the interactive logic
  const TerminalWindow = ({ allTags }: { allTags: string[] }) => {
    const router = useRouter();
    const [currentText, setCurrentText] = useState("");
    const [input, setInput] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
    const [selectedAutocomplete, setSelectedAutocomplete] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalHistoryRef = useRef<HTMLDivElement>(null);
    const autocompleteRef = useRef<HTMLDivElement>(null);

    const fullText = "> Welcome to ChainInfra Terminal\n> Metal Blockchain Validator & XPR Block Producer\n> Infrastructure: Multi-node setup with 99.9% uptime target\n> Services: Delegation, Staking, Live Metrics\n> Type 'help' to see available commands";

    const commands = {
      help: () => {
        return [
          "=== ChainInfra Terminal ===",
          "",
          "Available commands:",
          "  help              - Show this help message",
          "  profile           - View validator profile & infrastructure",
          "  delegator         - View delegation guide & staking info",
          "  services          - View Metal node building services",
          "  live              - View live blockchain data & metrics",
          "  trust             - View trust & transparency info",
          "  blog              - View blockchain insights & validator updates",
          "  admin             - Access admin dashboard",
          "  clear             - Clear terminal history",
          "",
          "Navigation commands (Unix-style):",
          "  cd profile        - Navigate to profile page",
          "  cd delegator      - Navigate to delegator page",
          "  cd services       - Navigate to services page",
          "  cd live           - Navigate to live data page",
          "  cd trust          - Navigate to trust page",
          "  cd blog           - Navigate to blog page",
          "  cd admin          - Navigate to admin page",
          "",
          "Special features:",
          "  Press TAB         - Auto-complete commands",
          "  Use arrow keys    - Navigate autocomplete options",
          "  Type 'cd' + TAB   - See available pages",
          "  pwd               - Show current location",
          "",
          "Examples:",
          "  > profile         (direct navigation)",
          "  > cd profile      (Unix-style navigation)",
          "  > help            (show this help)",
          "",
          "Pro tip: Both direct commands and 'cd' commands work!"
        ];
      },
      profile: () => {
        router.push('/profile');
        return ["Opening validator profile..."];
      },
      "cd profile": () => {
        router.push('/profile');
        return ["Navigating to profile page..."];
      },
      delegator: () => {
        router.push('/delegator');
        return ["Opening delegation guide..."];
      },
      "cd delegator": () => {
        router.push('/delegator');
        return ["Navigating to delegator page..."];
      },
      services: () => {
        router.push('/services');
        return ["Opening Metal node building services..."];
      },
      "cd services": () => {
        router.push('/services');
        return ["Navigating to services page..."];
      },
      live: () => {
        router.push('/live_data');
        return ["Opening live blockchain data..."];
      },
      "cd live": () => {
        router.push('/live_data');
        return ["Navigating to live data page..."];
      },
      trust: () => {
        router.push('/trust-transparency');
        return ["Opening trust & transparency..."];
      },
      "cd trust": () => {
        router.push('/trust-transparency');
        return ["Navigating to trust page..."];
      },
      blog: () => {
        router.push('/blog');
        return ["Opening blockchain insights & validator updates..."];
      },
      "cd blog": () => {
        router.push('/blog');
        return ["Navigating to blog page..."];
      },
      admin: () => {
        router.push('/admin');
        return ["Opening admin dashboard..."];
      },
      "cd admin": () => {
        router.push('/admin');
        return ["Navigating to admin page..."];
      },
      clear: () => {
        setCommandHistory([]);
        return [];
      },
      pwd: () => {
        return ["/home/validator"];
      }
    };

    useEffect(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setCurrentText(fullText.slice(0, index + 1));
          index++;
        } else {
          setIsTypingComplete(true);
          clearInterval(timer);
        }
      }, 30);

      return () => clearInterval(timer);
    }, []);

    const executeCommand = (cmd: string) => {
      const trimmedCmd = cmd.trim().toLowerCase();


      const command = commands[trimmedCmd as keyof typeof commands];
      if (command) {
        return command();
      }

      return [`Command not found: ${trimmedCmd}. Type 'help' for available commands.`];
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && input.trim()) {
        const output = executeCommand(input);
        setCommandHistory(prev => [...prev, `$ ${input}`, ...output]);
        setInput("");
        setShowAutocomplete(false);
        e.preventDefault();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        if (input.toLowerCase() === 'cd') {
          setInput('cd ');
          setAutocompleteOptions(['profile', 'delegator', 'services', 'live', 'trust', 'blog', 'admin']);
          setShowAutocomplete(true);
          setSelectedAutocomplete(0);
        } else if (input.toLowerCase().startsWith('cd ')) {
          const partial = input.substring(3).toLowerCase();
          const matches = ['profile', 'delegator', 'services', 'live', 'trust', 'blog', 'admin'].filter(cmd =>
            cmd.toLowerCase().startsWith(partial)
          );

          if (matches.length > 0) {
            setAutocompleteOptions(matches);
            setShowAutocomplete(true);
            setSelectedAutocomplete(0);
          }
        } else {
          // General command autocomplete
          const availableCommands = ['help', 'profile', 'delegator', 'services', 'live', 'trust', 'blog', 'admin', 'clear', 'cd', 'pwd'];
          const matches = availableCommands.filter(cmd =>
            cmd.toLowerCase().startsWith(input.toLowerCase())
          );

          if (matches.length > 0) {
            setAutocompleteOptions(matches);
            setShowAutocomplete(true);
            setSelectedAutocomplete(0);
          }
        }
      } else if (e.key === 'ArrowDown' && showAutocomplete) {
        e.preventDefault();
        setSelectedAutocomplete(prev =>
          prev < autocompleteOptions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp' && showAutocomplete) {
        e.preventDefault();
        setSelectedAutocomplete(prev =>
          prev > 0 ? prev - 1 : autocompleteOptions.length - 1
        );
      }
    };

    const handleAutocompleteClick = (option: string) => {
      setInput(option);
      setShowAutocomplete(false);
      inputRef.current?.focus();
    };

    useEffect(() => {
      if (terminalHistoryRef.current) {
        terminalHistoryRef.current.scrollTop = terminalHistoryRef.current.scrollHeight;
      }
    }, [commandHistory]);

    useEffect(() => {
      if (showAutocomplete && autocompleteRef.current) {
        autocompleteRef.current.scrollIntoView({ block: 'nearest' });
      }
    }, [selectedAutocomplete]);

    return (
      <div className="bg-black border border-cyber-blue/30 rounded-lg p-4 w-full max-w-md font-mono text-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-cyber-green ml-2">terminal</span>
        </div>

        <div
          ref={terminalHistoryRef}
          className="h-64 overflow-y-auto mb-3 text-cyber-green"
        >
          <div className="whitespace-pre-wrap mb-2">{currentText}</div>
          {commandHistory.map((line, index) => (
            <div key={index} className="mb-1">
              {line}
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="flex items-center">
            <span className="text-cyber-green mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowAutocomplete(false)}
              className="flex-1 bg-transparent text-white outline-none"
              placeholder={isTypingComplete ? "Type a command..." : ""}
              disabled={!isTypingComplete}
            />
          </div>

          {showAutocomplete && autocompleteOptions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-gray-900 border border-cyber-blue/30 rounded mt-1 max-h-32 overflow-y-auto">
              {autocompleteOptions.map((option, index) => (
                <div
                  key={option}
                  ref={index === selectedAutocomplete ? autocompleteRef : null}
                  className={`px-3 py-1 text-sm font-mono cursor-pointer transition-colors ${index === selectedAutocomplete
                      ? 'bg-cyber-blue/20 text-cyber-blue'
                      : 'text-cyber-green hover:bg-cyber-green/10'
                    }`}
                  onClick={() => handleAutocompleteClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      <WebsiteSchema />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 pb-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 glow-text">
                  ChainInfra
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-cyber-green font-mono mb-6">
                  Metal Blockchain Validator & XPR Block Producer
                </p>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Secure, transparent, and community-focused blockchain infrastructure. Delegate your $METAL to our Metal Blockchain validator or stake $XPR for our Block Producer using WebAuth.
                </p>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/delegator">
                  <Button size="lg" className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white hover:shadow-2xl hover:shadow-cyber-blue/30 transition-all duration-300 w-full sm:w-auto">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Delegate $METAL
                  </Button>
                </Link>
                <Link href="/block-producer">
                  <Button size="lg" className="bg-gradient-to-r from-cyber-green to-cyber-blue text-white hover:shadow-2xl hover:shadow-cyber-green/30 transition-all duration-300 w-full sm:w-auto">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Stake $XPR
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue hover:text-white w-full sm:w-auto">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Terminal */}
            <div className="flex justify-center lg:justify-end">
              <TerminalWindow allTags={allTags} />
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Why Blockchain Technology?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Blockchain technology is transforming how people transact and engage globally by delivering secure, transparent and verifiable interactions
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Security",
                description: "Tamper-proof transactions with cryptographic security",
                color: "cyber-green"
              },
              {
                icon: Eye,
                title: "Transparency",
                description: "Transparent, verifiable operations for all participants",
                color: "cyber-blue"
              },
              {
                icon: Zap,
                title: "Efficiency",
                description: "Improved efficiency in business operations and processes",
                color: "cyber-purple"
              },
              {
                icon: Heart,
                title: "Trust",
                description: "Building trust through technology and community",
                color: "cyber-pink"
              }
            ].map((item, index) => (
              <FadeOnScroll key={index}>
                <div className="bg-gradient-card p-6 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 text-center group h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className={`h-12 w-12 text-${item.color} mx-auto`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyber-blue transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm flex-grow">
                    {item.description}
                  </p>
                </div>
              </FadeOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Value Cards Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Why Choose ChainInfra
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core values and commitments to the blockchain community
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            <FadeOnScroll>
              <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 text-center group h-full flex flex-col">
                {/* Icon */}
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-12 w-12 text-cyber-green mx-auto" /> 
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-cyber-blue transition-colors duration-300">
                  Reliability & Security
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Multi-node redundancy, automated failover, hardened configs, and continuous monitoring ensure maximum uptime and security for your blockchain operations.
                </p>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 text-center group h-full flex flex-col">
                {/* Icon */}
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-12 w-12 text-cyber-blue mx-auto" /> 
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-cyber-blue transition-colors duration-300">
                  Transparent Operations
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Public metrics & explorer verification, clear documentation, and real-time status updates ensure complete transparency in all our operations.
                </p>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 text-center group h-full flex flex-col">
                {/* Icon */}
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-12 w-12 text-cyber-pink mx-auto" /> 
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-cyber-blue transition-colors duration-300">
                  Community First
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Active participation in governance, comprehensive education resources, and dedicated ecosystem support to help the community thrive.
                </p>
              </div>
            </FadeOnScroll>
          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Operating Principles
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparency, accountability, and governance
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <FadeOnScroll>
              <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-cyber-blue">
                  One Active Producer
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  One active producer at a time (safe rotation via standby).
                </p>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-green/20 transition-all duration-500 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-cyber-green">
                  Public Accountability
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Public accountability through explorer + live metrics.
                </p>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-purple/20 transition-all duration-500 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-cyber-purple">
                  Transparent Governance
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Transparent, community-aligned decision making.
                </p>
              </div>
            </FadeOnScroll>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Quote className="h-10 w-10 text-cyber-green" />
              <h2 className="text-4xl md:text-5xl font-bold glow-text">
                What Our Clients Say
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from teams who have worked with ChainInfra to build their blockchain infrastructure
            </p>
          </div>
          
          <Testimonials featuredOnly={false} limit={50} />
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            Metrics Strip
          </h2>
        </div>
        <div className="max-w-6xl mx-auto">
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-cyber-blue mb-2">99.9%+</div>
                  <div className="text-lg text-muted-foreground">Uptime Target</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-cyber-green mb-2">24/7</div>
                  <div className="text-lg text-muted-foreground">Monitoring</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-cyber-purple mb-2">100%</div>
                  <div className="text-lg text-muted-foreground">Transparency</div>
                </div>
              </div>
            </div>
          </FadeOnScroll>
        </div>
      </section>

    </div>
  );
}