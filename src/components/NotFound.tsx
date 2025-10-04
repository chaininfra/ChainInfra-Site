'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from "react";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    document.title = "RootSec - Page Not Found";
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 cyber-border rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 cyber-border rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 cyber-border rounded-full animate-pulse delay-300"></div>
      </div>
      
      <div className="text-center max-w-lg mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl font-bold mb-4 glow-text bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
            404
          </h1>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyber-blue to-transparent mb-6"></div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-foreground">
          NOT FOUND
        </h2>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-2">
          The requested resource could not be found
        </p>
        <p className="text-sm text-muted-foreground/70 mb-8 font-mono">
          Error Code: HTTP_404_NOT_FOUND
        </p>
        
        <div className="space-y-4">
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 cyber-border rounded-lg bg-background/50 hover:bg-cyber-blue/10 text-cyber-blue hover:text-cyber-pink transition-all duration-300 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
