'use client';

import { Github, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FadeOnScroll from "@/components/FadeOnScroll";
import { useEffect } from "react";

const Tools = () => {
  useEffect(() => {
    document.title = "RootSec - Tools";
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-4xl">
            Open-source security tools and utilities developed to assist with penetration testing, vulnerability 
            research, and security assessments.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* r00tsec Knowledge Base */}
          <FadeOnScroll>
            <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300 h-full flex flex-col">
              {/* Header with Tool name and Tool badge */}
              <div className="flex items-start justify-between mb-4">
                <a 
                  href="https://github.com/r0otsec/KB" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-cyber-blue transition-colors cursor-pointer">Knowledge Base</h3>
                </a>
                <Badge variant="outline" className="bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30">
                  Repository
                </Badge>
              </div>

              <div className="flex-1">
                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Collection of penetration testing methodologies, security research notes, proof-of-concept exploits, 
                  and custom tools developed for security assessments and vulnerability research.
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Features:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-cyber-blue mr-2">•</span>
                      Penetration testing methodologies and checklists
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-blue mr-2">•</span>
                      Custom security tools and scripts
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-blue mr-2">•</span>
                      Vulnerability research and proof-of-concepts
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-blue mr-2">•</span>
                      Security assessment templates and reports
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <a 
                  href="https://github.com/r0otsec/KB" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button 
                    variant="outline" 
                    className="cyber-border border-cyber-green/50 hover:bg-cyber-green/10 hover:border-cyber-green text-cyber-green"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </a>
                <a 
                  href="https://github.com/r0otsec/KB/archive/refs/heads/main.zip" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button 
                    variant="outline" 
                    className="cyber-border border-cyber-blue/50 hover:bg-cyber-blue/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </a>
              </div>
            </div>
          </FadeOnScroll>

          {/* LureKit Tool */}
          <FadeOnScroll>
            <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300 h-full flex flex-col">
              {/* Header with Tool name and Tool badge */}
              <div className="flex items-start justify-between mb-4">
                <a 
                  href="https://github.com/JonnyPake/LureKit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-cyber-blue transition-colors cursor-pointer">LureKit (In Development)</h3>
                </a>
                <Badge variant="outline" className="bg-cyber-pink/10 text-cyber-pink border-cyber-pink/30">
                  Tool
                </Badge>
              </div>

              <div className="flex-1">
                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Advanced phishing framework designed for sophisticated social engineering campaigns and security 
                  awareness training. Provides comprehensive tools for creating, managing, and analyzing phishing simulations.
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Features:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-cyber-blue mr-2">•</span>
                      Template-based phishing campaign generation
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-blue mr-2">•</span>
                      Real-time campaign tracking and analytics
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-blue mr-2">•</span>
                      Credential harvesting and data collection
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-blue mr-2">•</span>
                      Comprehensive reporting and metrics
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <a 
                  href="https://github.com/JonnyPake/LureKit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button 
                    variant="outline" 
                    className="cyber-border border-cyber-green/50 hover:bg-cyber-green/10 hover:border-cyber-green text-cyber-green"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </a>
                <a 
                  href="https://github.com/JonnyPake/LureKit/archive/refs/heads/main.zip" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button 
                    variant="outline" 
                    className="cyber-border border-cyber-blue/50 hover:bg-cyber-blue/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </a>
              </div>
            </div>
          </FadeOnScroll>
        </div>
      </div>
    </div>
  );
};

export default Tools;