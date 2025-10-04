'use client';

import { ExternalLink, ArrowRight, Shield, TrendingUp, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeOnScroll from "@/components/FadeOnScroll";
import { useEffect, useState } from "react";
import { validatorConfig, getValidatorFee } from '@/lib/validator-config';

const Delegator = () => {
  const [validatorFee, setValidatorFee] = useState(validatorConfig.validatorFee);

  useEffect(() => {
    document.title = "How to Delegate (Staking Guide) - ChainInfra";
    
    // Fetch dynamic validator fee
    const fetchFee = async () => {
      const fee = await getValidatorFee();
      setValidatorFee(fee);
    };
    fetchFee();
  }, []);

  const delegationSteps = [
    {
      step: "1",
      title: "Install WebAuth Wallet",
      description: "Install and set up your WebAuth wallet for Metal Blockchain",
      action: "Install Wallet"
    },
    {
      step: "2", 
      title: "Fund your wallet with $METAL",
      description: "Transfer METAL tokens to your WebAuth wallet",
      action: "Fund Wallet"
    },
    {
      step: "3",
      title: "Open Metal Explorer",
      description: "Open Metal Explorer and search ChainInfra (or use the button below)",
      action: "Open Explorer"
    },
    {
      step: "4",
      title: "Click Delegate, enter amount",
      description: "Click Delegate, enter amount and confirm the transaction",
      action: "Delegate Now"
    },
    {
      step: "5",
      title: "Confirm the transaction",
      description: "Confirm the transaction – rewards accrue automatically to your wallet",
      action: "Confirm"
    }
  ];


  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-cyber-green" />,
      title: "Metal Delegation Security",
      description: "Specialized Metal Blockchain nodes with multi-signature protection. Zero delegation-related security incidents since launch."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-cyber-blue" />,
      title: "Consistent Metal Returns", 
      description: "Average 8-12% annual returns for Metal delegation. All reward calculations publicly trackable on Metal blockchain."
    },
    {
      icon: <Clock className="h-6 w-6 text-cyber-purple" />,
      title: "99.97% Delegation Uptime",
      description: "Ensures consistent reward distribution for Metal delegators. 24/7 Metal network monitoring with instant alerts."
    },
    {
      icon: <Users className="h-6 w-6 text-cyber-green" />,
      title: "Metal Governance Participation",
      description: "Participate in Metal Blockchain governance decisions. Vote on Metal network proposals and earn additional rewards."
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
              <span className="text-cyber-blue">Metal Delegation Services</span>
            </h1>
          </div>
          <p className="text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            For Metal token holders seeking secure delegation and consistent returns
          </p>
          
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Delegate your METAL tokens to ChainInfra's Metal Blockchain validator for secure, 
                transparent blockchain infrastructure with professional-grade reliability.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Current Validator Fee:</strong> {validatorFee}% (subject to change)
              </p>
            </div>
          </FadeOnScroll>
        </div>

        {/* Metal Delegation Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              How to Delegate $METAL
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple steps to delegate your METAL tokens to ChainInfra's validator
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 rounded-lg bg-cyber-blue/10 mb-4">
                  <Shield className="h-8 w-8 text-cyber-blue" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-cyber-blue">Delegate $METAL</h3>
                <p className="text-muted-foreground mb-6">
                  Delegate your METAL tokens to ChainInfra's Metal Blockchain validator
                </p>
                <a 
                  href={validatorConfig.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white hover:shadow-2xl hover:shadow-cyber-blue/30 transition-all duration-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Delegate $METAL
                  </Button>
                </a>
              </div>
              
              <div className="space-y-4">
                {delegationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-background/50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyber-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* Benefits Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Why Choose ChainInfra?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional blockchain infrastructure with proven reliability
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
            {benefits.map((benefit, index) => (
              <FadeOnScroll key={index}>
                <div className="bg-gradient-card p-6 rounded-lg cyber-border hover:shadow-lg hover:shadow-cyber-blue/10 transition-all duration-300 text-center h-full flex flex-col">
                  <div className="inline-flex p-3 rounded-lg bg-cyber-blue/10 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </FadeOnScroll>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-32">
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-2xl p-8 border border-yellow-500/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-yellow-600">Important Notes</h3>
                <div className="space-y-4 text-left max-w-4xl mx-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      <strong>Validator Fee:</strong> Current fee is {validatorFee}% but may change based on network conditions and validator performance.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      <strong>Rewards:</strong> Delegation and staking rewards are distributed automatically based on validator/BP performance.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      <strong>Undelegation:</strong> METAL delegation can be undelegated, but there may be a waiting period before tokens are available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* CTA Section */}
        <div className="mb-32">
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Delegating?</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join ChainInfra for secure, transparent blockchain infrastructure with professional-grade reliability.
              </p>
              
              <div className="flex justify-center">
                <a 
                  href={validatorConfig.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white hover:shadow-2xl hover:shadow-cyber-blue/30 transition-all duration-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Delegate $METAL
                  </Button>
                </a>
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* What is Metal Delegation */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              What is Metal Delegation?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding how Metal Blockchain delegation works
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyber-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-cyber-blue font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-cyber-blue">Delegate Your Tokens</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        You delegate your $METAL tokens to our validator while maintaining full ownership. 
                        Your tokens never leave your wallet - you can undelegate at any time.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyber-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-cyber-green font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-cyber-green">Earn Rewards</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Our validator produces blocks and earns rewards. We take a small fee (currently {validatorFee}%) 
                        and distribute the remaining rewards to all delegators proportionally.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyber-purple/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-cyber-purple font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-cyber-purple">Support the Network</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        By delegating to us, you help secure the Metal Blockchain network and participate 
                        in governance decisions that shape the network's future.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyber-pink/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-cyber-pink font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-cyber-pink">Monitor Performance</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Track your delegation performance, rewards, and validator status through 
                        our live monitoring dashboard and Metal Blockchain explorer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeOnScroll>
        </div>

        {/* Risk Disclosure */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Important Risk Information
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the risks and responsibilities of blockchain delegation
            </p>
          </div>
          
          <FadeOnScroll>
            <div className="bg-gradient-card p-8 rounded-xl cyber-border">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-500 font-bold text-sm">!</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-red-400">Investment Risks</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Blockchain delegation involves inherent risks including but not limited to validator downtime, 
                        network slashing, and market volatility. Past performance does not guarantee future results.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-yellow-500 font-bold text-sm">⚠</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-yellow-400">Technical Risks</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Validator operations may experience technical issues, maintenance downtime, or network 
                        disruptions that could affect delegation rewards and validator performance.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-500 font-bold text-sm">ℹ</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-blue-400">Your Responsibilities</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        You are responsible for understanding the delegation process, monitoring your delegation, 
                        and making informed decisions about your blockchain investments.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-500 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-green-400">Our Commitment</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We maintain 99.97% uptime, transparent operations, and regular communication about 
                        validator performance and any issues that may affect delegators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-background/50 rounded-lg border border-yellow-500/20">
                <p className="text-sm text-yellow-400 text-center">
                  <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute 
                  financial advice. Always conduct your own research and consider your risk tolerance before delegating.
                </p>
              </div>
            </div>
          </FadeOnScroll>
        </div>
      </div>
    </div>
  );
};

export default Delegator;