"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Shield, Target, Search, Code, Terminal, User, Globe, Mail, Wifi, Eye, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import BlogCard from "@/components/BlogCard";
import WebsiteSchema from "@/components/WebsiteSchema";
import { getFeaturedBlogPosts, getRecentBlogPosts } from "@/services/blogService";
import type { BlogPost } from "@/data/blogPosts";
import FadeOnScroll from "@/components/FadeOnScroll";

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
  
  const fullText = "> Welcome to ChainInfra Terminal\n> Metal Blockchain Validator & Block Producer\n> Infrastructure: Multi-node setup with 99.9% uptime target\n> Services: Delegation, Staking, Live Metrics\n> Type 'help' to see available commands";
  
  const commands = {
    help: () => {
      return [
        "=== ChainInfra Terminal ===",
        "",
        "Available commands:",
        "  help              - Show this help message",
        "  profile           - View validator profile & infrastructure",
        "  delegator         - View delegation guide & staking info",
        "  blog              - View cybersecurity blog posts",
        "  live              - View live blockchain data & metrics",
        "  trust             - View trust & transparency info",
        "  admin             - Access admin dashboard",
        "  clear             - Clear terminal history",
        "",
        "Navigation commands (Unix-style):",
        "  cd profile        - Navigate to profile page",
        "  cd delegator      - Navigate to delegator page", 
        "  cd blog           - Navigate to blog page",
        "  cd live           - Navigate to live data page",
        "  cd trust          - Navigate to trust page",
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
    blog: () => {
      router.push('/blog');
      return ["Opening blog posts..."];
    },
    "cd blog": () => {
      router.push('/blog');
      return ["Navigating to blog page..."];
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
    const commandOutput: string[] = [];
    
    // Handle blog tag filtering
    if (trimmedCmd.startsWith('blogs ')) {
      const tag = cmd.substring(6).trim();
      if (tag) {
        router.push(`/blog?tag=${encodeURIComponent(tag)}`);
        commandOutput.push(`Filtering blogs by tag: ${tag}`);
      } else {
        commandOutput.push("Usage: blogs <tag>");
        commandOutput.push("Available tags: " + allTags.join(', '));
      }
    } else if (commands[trimmedCmd as keyof typeof commands]) {
      const result = commands[trimmedCmd as keyof typeof commands]();
      commandOutput.push(...result);
    } else {
      commandOutput.push(`Command not found: ${cmd}`);
      commandOutput.push("Type 'help' to see available commands.");
    }
    
    if (commandOutput.length > 0) {
      setCommandHistory(prev => {
        const newHistory = [...prev, `$ ${cmd}`, ...commandOutput, ""];
        // Auto-scroll to bottom after updating history
        setTimeout(() => {
          if (terminalHistoryRef.current) {
            terminalHistoryRef.current.scrollTop = terminalHistoryRef.current.scrollHeight;
          }
        }, 0);
        return newHistory;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      // Handle tab completion for "blogs " command
      if (input.toLowerCase().startsWith('blogs ')) {
        const partial = input.substring(6).toLowerCase();
        const matches = allTags.filter(tag => 
          tag.toLowerCase().includes(partial)
        );
        
        if (matches.length > 0) {
          setAutocompleteOptions(matches);
          setShowAutocomplete(true);
          setSelectedAutocomplete(0);
        }
      } else if (input.toLowerCase() === 'blogs') {
        setInput('blogs ');
        setAutocompleteOptions(allTags);
        setShowAutocomplete(true);
        setSelectedAutocomplete(0);
      } else if (input.toLowerCase() === 'cd') {
        setInput('cd ');
        setAutocompleteOptions(['profile', 'delegator', 'blog', 'live', 'trust', 'admin']);
        setShowAutocomplete(true);
        setSelectedAutocomplete(0);
      } else if (input.toLowerCase().startsWith('cd ')) {
        const partial = input.substring(3).toLowerCase();
        const matches = ['profile', 'delegator', 'blog', 'live', 'trust', 'admin'].filter(cmd => 
          cmd.toLowerCase().startsWith(partial)
        );
        
        if (matches.length > 0) {
          setAutocompleteOptions(matches);
          setShowAutocomplete(true);
          setSelectedAutocomplete(0);
        }
      } else {
        // General command autocomplete
        const availableCommands = ['help', 'profile', 'delegator', 'blog', 'live', 'trust', 'admin', 'clear', 'cd', 'pwd'];
        const matches = availableCommands.filter(cmd => 
          cmd.toLowerCase().startsWith(input.toLowerCase())
        );
        
        if (matches.length > 0) {
          setAutocompleteOptions(matches);
          setShowAutocomplete(true);
          setSelectedAutocomplete(0);
        }
      }
    } else if (e.key === 'Enter') {
      if (showAutocomplete && autocompleteOptions.length > 0) {
        const selectedOption = autocompleteOptions[selectedAutocomplete];
        if (input.toLowerCase().startsWith('blogs ')) {
          setInput(`blogs ${selectedOption}`);
        } else if (input.toLowerCase().startsWith('cd ')) {
          setInput(`cd ${selectedOption}`);
        } else {
          setInput(selectedOption);
        }
        setShowAutocomplete(false);
      } else {
        executeCommand(input);
        setInput("");
        setShowAutocomplete(false);
      }
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false);
    } else if (showAutocomplete) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const newSelected = selectedAutocomplete < autocompleteOptions.length - 1 ? selectedAutocomplete + 1 : 0;
        setSelectedAutocomplete(newSelected);
        // Scroll selected item into view
        setTimeout(() => {
          if (autocompleteRef.current) {
            const selectedElement = autocompleteRef.current.children[newSelected] as HTMLElement;
            selectedElement?.scrollIntoView({ block: 'nearest' });
          }
        }, 0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newSelected = selectedAutocomplete > 0 ? selectedAutocomplete - 1 : autocompleteOptions.length - 1;
        setSelectedAutocomplete(newSelected);
        // Scroll selected item into view
        setTimeout(() => {
          if (autocompleteRef.current) {
            const selectedElement = autocompleteRef.current.children[newSelected] as HTMLElement;
            selectedElement?.scrollIntoView({ block: 'nearest' });
          }
        }, 0);
      }
    }
  };

  // Handle input changes for real-time filtering
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
    
    // If autocomplete is showing and user is typing, filter in real-time
    if (showAutocomplete) {
      if (newInput.toLowerCase().startsWith('blogs ')) {
        const partial = newInput.substring(6).toLowerCase();
        const matches = allTags.filter(tag => 
          tag.toLowerCase().startsWith(partial)
        );
        
        if (matches.length > 0) {
          setAutocompleteOptions(matches);
          setSelectedAutocomplete(0);
        } else {
          setShowAutocomplete(false);
        }
      } else if (newInput.toLowerCase().startsWith('cd ')) {
        const partial = newInput.substring(3).toLowerCase();
        const matches = ['profile', 'delegator', 'blog', 'live', 'trust', 'admin'].filter(cmd => 
          cmd.toLowerCase().startsWith(partial)
        );
        
        if (matches.length > 0) {
          setAutocompleteOptions(matches);
          setSelectedAutocomplete(0);
        } else {
          setShowAutocomplete(false);
        }
      } else {
        // General command filtering
        const availableCommands = ['help', 'profile', 'delegator', 'blog', 'live', 'trust', 'admin', 'clear', 'cd', 'pwd'];
        const matches = availableCommands.filter(cmd => 
          cmd.toLowerCase().startsWith(newInput.toLowerCase())
        );
        
        if (matches.length > 0) {
          setAutocompleteOptions(matches);
          setSelectedAutocomplete(0);
        } else {
          setShowAutocomplete(false);
        }
      }
    }
  };

  const handleAutocompleteClick = (option: string) => {
    if (input.toLowerCase().startsWith('blogs ')) {
      setInput(`blogs ${option}`);
    } else if (input.toLowerCase().startsWith('cd ')) {
      setInput(`cd ${option}`);
    } else {
      setInput(option);
    }
    setShowAutocomplete(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTerminalClick = () => {
    if (isTypingComplete && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="bg-code-bg border border-code-border rounded-lg p-3 sm:p-4 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl cursor-text relative"
      onClick={handleTerminalClick}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-cyber-green"></div>
        <span className="text-xs text-muted-foreground ml-2">terminal — leenohs@validator:~#</span>
      </div>
      
      <div 
        ref={terminalHistoryRef}
        className="font-mono text-sm text-cyber-green whitespace-pre-line max-h-64 overflow-y-auto"
      >
        {currentText}
        {!isTypingComplete && <span className="animate-pulse">|</span>}
        
        {/* Command History */}
        {commandHistory.map((line, index) => (
          <div key={index} className={line.startsWith('$') ? 'text-cyber-blue' : 'text-cyber-green'}>
            {line}
          </div>
        ))}
      </div>
      
      {isTypingComplete && (
        <div className="relative">
          <div className="font-mono text-sm text-cyber-green flex items-center mt-2">
            <span className="mr-2 text-cyber-blue">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-cyber-green flex-1"
              placeholder="type 'help' for commands..."
              autoComplete="off"
            />
            <span className="animate-pulse">|</span>
          </div>
          
          {/* Autocomplete Dropdown */}
          {showAutocomplete && autocompleteOptions.length > 0 && (
            <div 
              ref={autocompleteRef}
              className="absolute top-full left-6 mt-1 bg-code-bg border border-cyber-blue/30 rounded-lg shadow-lg z-50 max-h-32 overflow-y-auto min-w-48"
            >
              {autocompleteOptions.map((option, index) => (
                <div
                  key={option}
                  className={`px-3 py-1 text-sm font-mono cursor-pointer transition-colors ${
                    index === selectedAutocomplete 
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
      )}
    </div>
  );
};

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [featured, recent] = await Promise.all([
          getFeaturedBlogPosts(),
          getRecentBlogPosts(6)
        ]);
        setFeaturedPosts(featured.slice(0, 3));
        setRecentPosts(recent.slice(0, 3));
        setAllPosts(recent); // Use recent posts for terminal autocomplete
      } catch (error) {
        console.error('Failed to fetch blog data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogData();
  }, []);

  useEffect(() => {
    document.title = "RootSec - Cybersecurity Research & Penetration Testing";
  }, []);

  // Get all unique blog tags for autocomplete
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags))).sort();

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
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
                  Secure, transparent, and community-focused blockchain infrastructure. Delegate your $METAL to our Metal Blockchain validator or stake $XPR for our Block Producer using WebAuth.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://explorer.metalblockchain.org/validators/NodeID-eLiuwZsfPBud7FKK6zDfwDwU7Utwn3tH"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white hover:shadow-2xl hover:shadow-cyber-blue/30 transition-all duration-300 w-full sm:w-auto">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Delegate $METAL
                    </Button>
                  </a>
                  <Button variant="outline" size="lg" className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue hover:text-white w-full sm:w-auto" disabled>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Stake $XPR (Coming Soon)
                  </Button>
                </div>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10 hover:border-cyber-green hover:text-white w-full sm:w-auto">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Build a Metal Node
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
      {/* Value Cards Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Shield className="h-6 w-6 text-cyber-green" />
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose ChainInfra?</h2>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Shield,
                title: "Reliability & Security",
                description: "Multi-node redundancy, automated failover, hardened configs, continuous monitoring."
              },
              {
                icon: Eye,
                title: "Transparent Operations", 
                description: "Public metrics & explorer verification, clear docs, real-time status."
              },
              {
                icon: Users,
                title: "Community First",
                description: "Active participation in governance, education, and ecosystem support."
              }
            ].map((item, index) => (
              <FadeOnScroll key={index}>
                <div
                  className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300"
                >
                  <div className="inline-flex p-3 rounded-lg bg-cyber-blue/10 mb-4">
                    <item.icon className="h-6 w-6 text-cyber-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </FadeOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-cyber-blue mb-2">99.9%+</div>
                  <div className="text-lg text-muted-foreground">Uptime Target</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-cyber-green mb-2">24/7</div>
                  <div className="text-lg text-muted-foreground">Monitoring</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-cyber-purple mb-2">100%</div>
                  <div className="text-lg text-muted-foreground">Transparency</div>
                </div>
              </div>
            </div>
          </FadeOnScroll>
        </div>
      </section>
      {/* Latest Research */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Latest News</h2>
            <Link href="/blog" className="text-cyber-green hover:text-cyber-green/80 transition-colors">
              View all posts →
            </Link>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyber-blue mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading latest posts...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <FadeOnScroll key={post.id}>
                  <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-cyber-blue/10 text-cyber-blue">
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs text-muted-foreground ml-auto">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 hover:text-cyber-blue transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Link 
                      href={`/blog/${post.id}`}
                      className="text-cyber-green hover:text-cyber-green/80 transition-colors"
                    >
                      Read full analysis →
                    </Link>
                  </div>
                </FadeOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;