'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { seoConfig } from '@/lib/seo-config';
import { validatorConfig } from '@/lib/validator-config';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Add a small delay to prevent immediate closing when clicking the button
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Services", path: "/services" },
    { name: "Delegator", path: "/delegator" },
    { name: "Block Producer", path: "/block-producer" },
    { name: "Trust & Transparency", path: "/trust-transparency" },
    { name: "Code of Conduct", path: "/code-of-conduct" },
    { name: "Live Data", path: "/live_data" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border/50 shadow-lg' : 'bg-background/80 backdrop-blur-sm border-b border-border'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image 
                src="/logo.svg"
                alt="ChainInfra Logo"
                width={80}
                height={80}
                className="group-hover:opacity-90 transition-opacity"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              {navItems.map((item) => {
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`px-2 py-1 text-sm transition-colors duration-200 ${
                      isActive(item.path)
                        ? "text-cyber-blue"
                        : "text-muted-foreground hover:text-cyber-blue"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href={seoConfig.socialLinks.x} target="_blank" rel="noopener noreferrer" className="hover:text-cyber-blue transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href={validatorConfig.socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-cyber-blue transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-foreground hover:text-cyber-blue hover:bg-cyber-blue/10 z-50"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border bg-background/95 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block px-3 py-2 text-sm transition-colors rounded-md mx-2 ${
                    isActive(item.path)
                      ? "text-cyber-blue bg-cyber-blue/10"
                      : "text-muted-foreground hover:text-cyber-blue hover:bg-cyber-blue/5"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            
            {/* Mobile Social Links */}
            <div className="pt-4 border-t border-border/50 mt-4 mx-2">
              <div className="flex items-center justify-center space-x-4">
                <a 
                  href={seoConfig.socialLinks.x} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-cyber-blue transition-colors p-2 rounded-md hover:bg-cyber-blue/5"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href={validatorConfig.socialLinks.telegram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-cyber-blue transition-colors p-2 rounded-md hover:bg-cyber-blue/5"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;