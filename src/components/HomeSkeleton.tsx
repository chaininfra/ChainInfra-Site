export default function HomeSkeleton() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section Skeleton */}
      <section className="container mx-auto px-4 pt-24 pb-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Content Skeleton */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-8 bg-muted/20 rounded animate-pulse w-3/4"></div>
                <div className="h-6 bg-muted/20 rounded animate-pulse w-1/2"></div>
              </div>
              
              <div className="space-y-2">
                <div className="h-4 bg-muted/20 rounded animate-pulse"></div>
                <div className="h-4 bg-muted/20 rounded animate-pulse w-4/5"></div>
                <div className="h-4 bg-muted/20 rounded animate-pulse w-3/4"></div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-32 bg-muted/20 rounded animate-pulse"></div>
                <div className="h-10 w-28 bg-muted/20 rounded animate-pulse"></div>
              </div>
            </div>
            
            {/* Right Content - Terminal Skeleton */}
            <div className="h-96 bg-muted/10 rounded-lg border animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section Skeleton */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted/20 rounded animate-pulse w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-muted/20 rounded animate-pulse w-96 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-video bg-muted/20 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-muted/20 rounded animate-pulse"></div>
                  <div className="h-4 bg-muted/20 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-muted/20 rounded animate-pulse w-1/2"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-12 bg-muted/20 rounded-full animate-pulse"></div>
                  <div className="h-5 w-16 bg-muted/20 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section Skeleton */}
      <section className="py-16 px-4 bg-muted/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted/20 rounded animate-pulse w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-muted/20 rounded animate-pulse w-80 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-video bg-muted/20 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-muted/20 rounded animate-pulse"></div>
                  <div className="h-4 bg-muted/20 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-muted/20 rounded animate-pulse w-1/2"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-12 bg-muted/20 rounded-full animate-pulse"></div>
                  <div className="h-5 w-16 bg-muted/20 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
