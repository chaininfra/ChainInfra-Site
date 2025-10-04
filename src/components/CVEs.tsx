'use client';

import { Shield, ExternalLink, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeOnScroll from "@/components/FadeOnScroll";
import { useEffect } from "react";

const CVEs = () => {
  useEffect(() => {
    document.title = "RootSec - CVEs";
  }, []);
  const cves = [
    {
      id: "CVE-2024-1234",
      title: "Remote Code Execution in Web Framework",
      severity: "Critical",
      cvss: "9.8",
      description: "A critical vulnerability allowing remote code execution through improper input validation in a popular web framework.",
      discoveryDate: "2024-03-15",
      status: "Published",
      vendor: "Framework Inc."
    },
    {
      id: "CVE-2024-5678", 
      title: "SQL Injection in Enterprise Application",
      severity: "High",
      cvss: "8.1",
      description: "SQL injection vulnerability in enterprise software allowing unauthorized data access and modification.",
      discoveryDate: "2024-01-22",
      status: "Published", 
      vendor: "Enterprise Corp"
    },
    {
      id: "CVE-2023-9876",
      title: "Authentication Bypass in API Gateway",
      severity: "Medium",
      cvss: "6.5",
      description: "Authentication bypass vulnerability in API gateway allowing unauthorized access to protected endpoints.",
      discoveryDate: "2023-11-08",
      status: "Published",
      vendor: "API Systems Ltd"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "text-red-500 bg-red-500/10";
      case "High": return "text-orange-500 bg-orange-500/10";
      case "Medium": return "text-yellow-500 bg-yellow-500/10";
      case "Low": return "text-green-500 bg-green-500/10";
      default: return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
              CVE Discoveries
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Security vulnerabilities discovered and responsibly disclosed with published CVE identifiers.
            </p>
          </div>

          <div className="grid gap-6">
            {cves.map((cve, index) => (
              <FadeOnScroll key={index}>
                <div
                  className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex p-2 rounded-lg bg-cyber-blue/10">
                        <Shield className="h-5 w-5 text-cyber-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-cyber-green">{cve.id}</h3>
                        <h4 className="text-lg font-medium">{cve.title}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(cve.severity)}`}>
                        {cve.severity}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-cyber-pink/10 text-cyber-pink">
                        CVSS {cve.cvss}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{cve.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Discovered: {cve.discoveryDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        Vendor: {cve.vendor}
                      </span>
                    </div>
                    <span className="text-cyber-green">{cve.status}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="border-cyber-blue/30 hover:bg-cyber-blue/10">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View CVE Details
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:text-cyber-green">
                      Technical Analysis
                    </Button>
                  </div>
                </div>
              </FadeOnScroll>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Vulnerability research is an ongoing process. More discoveries are documented as they are responsibly disclosed.
            </p>
            <a 
              href="https://cve.mitre.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline" className="border-cyber-blue/30 hover:bg-cyber-blue/10">
                <ExternalLink className="h-4 w-4 mr-2" />
                Search MITRE CVE Database
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVEs;