
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import type { BlogPost } from "@/types";

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "understanding-blood-types",
    title: "Understanding Blood Types: A Comprehensive Guide",
    excerpt: "Learn about the different blood types (A, B, AB, O) and Rh factors, and why they matter for donation and transfusion.",
    content: "Full content of the article about blood types...",
    author: "Dr. Emily Carter",
    publishDate: "2024-07-15",
    imageUrl: "https://placehold.co/600x400.png?text=Blood+Types",
    tags: ["Blood Types", "Donation Basics"]
  },
  {
    id: "2",
    slug: "benefits-of-donating-blood",
    title: "The Surprising Health Benefits of Donating Blood",
    excerpt: "Discover how donating blood not only saves lives but can also offer health benefits to the donor.",
    content: "Full content of the article about benefits of donation...",
    author: "John Appleseed",
    publishDate: "2024-07-22",
    imageUrl: "https://placehold.co/600x400.png?text=Donation+Benefits",
    tags: ["Health", "Wellness", "Donation Impact"]
  },
  {
    id: "3",
    slug: "what-to-expect-donation-process",
    title: "What to Expect: Your First Blood Donation",
    excerpt: "A step-by-step guide to the blood donation process, from registration to post-donation care.",
    content: "Full content of the article about the donation process...",
    author: "Sarah Miller, RN",
    publishDate: "2024-07-29",
    imageUrl: "https://placehold.co/600x400.png?text=Donation+Process",
    tags: ["Donation Process", "First-time Donor"]
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-2 text-center">
        Blood Donation Blog
      </h1>
      <p className="text-lg text-foreground/80 mb-10 text-center max-w-2xl mx-auto">
        Informative articles about blood donation, health, and the impact of your contribution.
      </p>

      {mockBlogPosts.length === 0 ? (
         <p className="text-center text-muted-foreground text-lg">
          No blog posts available at the moment. Please check back soon.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogPosts.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {post.imageUrl && (
                <Link href={`/blog/${post.slug}`} className="block relative h-48 w-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="medical article"
                  />
                </Link>
              )}
              <CardHeader>
                <Link href={`/blog/${post.slug}`}>
                  <CardTitle className="text-xl text-primary hover:text-primary/80 transition-colors">{post.title}</CardTitle>
                </Link>
                <div className="text-xs text-muted-foreground pt-1 space-x-4">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={14} />
                    {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User size={14} />
                    {post.author}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sm text-foreground/70 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="text-accent hover:text-accent/80 p-0">
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

