'use client';

import { Shield, Target, Users, Eye, Handshake } from 'lucide-react';

const CodeOfConduct = () => {
  const sections = [
    {
      icon: Target,
      title: "Mission",
      content: "Our mission, as a Block Producer for XPR ecosystem is to support this network, and to help maintain in a secure way. Our slogan is \"security is our priority\", so our main support will be to provide cybersecurity strategy to defend ecosystem from malicious attackers."
    },
    {
      icon: Shield,
      title: "Independence",
      content: "We will maintain full operational and financial independence. This includes no operational control by any outside investors. Everything is in posses of Alvosec - including servers, domains and other services."
    },
    {
      icon: Users,
      title: "Emergency Response",
      content: "Alvosec already has a dedicated team which will maintain infrastructure and monitor block production to ensure service availability 24/7. More about our technical approach will be described in block producer page."
    },
    {
      icon: Eye,
      title: "Transparency",
      content: "Transparency builds trust, and makes users feel safer in using any operational service. As a company, we are making a step further to encourage others to represent in a more professional way."
    },
    {
      icon: Handshake,
      title: "Cooperation",
      content: "We are open to all opportunities to cooperate with other global Block Producers, as long as they strive for improvement. We believe in the benefit of cooperation and teamwork to the whole ecosystem, as it improves technology that we stand behind."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Code of Conduct
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed">
              We have become a Block Producer for XPR network.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:gap-12">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-cyber-blue/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-cyber-blue" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-foreground mb-4">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Our Commitment
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              As a Block Producer for the XPR network, we are committed to maintaining the highest standards of security, 
              transparency, and operational excellence. Our code of conduct reflects our dedication to the ecosystem 
              and our responsibility to all stakeholders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;

