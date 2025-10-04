import { Search, Filter, Tag } from "lucide-react";

export default function BlogSkeleton() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In-depth security research, exploit development, and technical write-ups covering real-world penetration testing, red teaming operations, and phishing campaigns
          </p>
        </div>

        {/* Search and Filter Skeleton */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <div className="h-10 bg-muted/20 rounded-md border animate-pulse"></div>
            </div>
            <div className="h-10 w-32 bg-muted/20 rounded-md border animate-pulse"></div>
          </div>

          {/* Tag Filter Skeleton */}
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="flex items-center space-x-2 mr-4">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by tag:</span>
            </div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 bg-muted/20 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Results Count Skeleton */}
        <div className="mb-8">
          <div className="h-5 w-48 bg-muted/20 rounded animate-pulse"></div>
        </div>

        {/* Blog Posts Grid Skeleton */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              {/* Image skeleton */}
              <div className="aspect-video bg-muted/20 rounded-lg animate-pulse"></div>
              
              {/* Content skeleton */}
              <div className="space-y-2">
                <div className="h-6 bg-muted/20 rounded animate-pulse"></div>
                <div className="h-4 bg-muted/20 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted/20 rounded animate-pulse w-1/2"></div>
              </div>
              
              {/* Tags skeleton */}
              <div className="flex gap-2">
                <div className="h-5 w-12 bg-muted/20 rounded-full animate-pulse"></div>
                <div className="h-5 w-16 bg-muted/20 rounded-full animate-pulse"></div>
              </div>
              
              {/* Meta info skeleton */}
              <div className="flex justify-between items-center">
                <div className="h-4 w-20 bg-muted/20 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-muted/20 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
