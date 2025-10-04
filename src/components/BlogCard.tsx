import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  newest?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="group cyber-border hover:shadow-lg hover:shadow-cyber-blue/20 transition-all duration-300 bg-gradient-card h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {post.featured && (
              <Badge variant="secondary" className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
                Featured
              </Badge>
            )}
            {post.newest && (
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                Newest
              </Badge>
            )}
          </div>
        </div>
        
        <Link href={`/blog/${post.id}`}>
          <h3 className="text-lg sm:text-xl font-semibold group-hover:text-cyber-blue transition-colors cursor-pointer">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            {post.excerpt}
          </p>

          <div className="flex items-start space-x-2 mb-4">
            <Tag className="h-4 w-4 text-muted-foreground mt-1" />
            <div className="flex flex-wrap gap-2 max-w-[calc(100%-2rem)]">
              {post.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-border hover:border-cyber-blue/50 hover:text-cyber-blue transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 4}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-auto">
          <Link
            href={`/blog/${post.id}`}
            className="flex items-center space-x-1 text-cyber-blue hover:text-cyber-pink transition-colors text-sm font-medium"
          >
            <span>Read more</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;