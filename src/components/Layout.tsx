import Navbar from "./Navbar";


const Layout = () => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <Navbar />
      <main className="relative z-10 flex-1 pt-16">
        
      </main>
      <footer className="border-t border-border/60 py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 leenohs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;