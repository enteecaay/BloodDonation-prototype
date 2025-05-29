
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "understanding-blood-types",
    title: "Understanding Blood Types: A Comprehensive Guide",
    excerpt: "Learn about the different blood types (A, B, AB, O) and Rh factors, and why they matter for donation and transfusion.",
    content: `Blood, a vital fluid, is not all the same. Understanding blood types is crucial for safe transfusions and effective medical treatments. The most well-known blood group system is the ABO system, which classifies blood into four main types: A, B, AB, and O. This classification is based on the presence or absence of specific antigens (substances that can trigger an immune response) on the surface of red blood cells.

### Antigens and Antibodies
- **Type A blood** has A antigens on red blood cells and B antibodies in the plasma.
- **Type B blood** has B antigens on red blood cells and A antibodies in the plasma.
- **Type AB blood** has both A and B antigens on red blood cells but neither A nor B antibodies in the plasma. This makes them universal plasma donors but universal red cell recipients.
- **Type O blood** has neither A nor B antigens on red blood cells but has both A and B antibodies in the plasma. This makes them universal red cell donors.

### The Rh Factor
Another important factor is the Rh system, which determines if a blood type is positive (+) or negative (-). This is based on the presence or absence of the RhD antigen. If the RhD antigen is present, the blood type is Rh-positive. If it's absent, the blood type is Rh-negative. For example, A+ blood has A antigens and the RhD antigen.

### Importance in Transfusions
Matching blood types is critical for transfusions. If a patient receives incompatible blood, their immune system will attack the transfused red blood cells, leading to potentially life-threatening reactions. This is why O-negative blood is often called the "universal donor" type for red blood cells, as it can generally be given to patients of any blood type in emergencies. Conversely, AB-positive individuals are "universal recipients" for red blood cells.

Understanding your blood type is not only important for medical reasons but also empowers you as a potential blood donor. Knowing your type helps blood banks manage their supplies effectively and ensures that the right blood is available for patients in need.
`,
    author: "Dr. Emily Carter",
    publishDate: "2024-07-15",
    imageUrl: "https://placehold.co/800x450.png?text=Blood+Cells",
    tags: ["Blood Types", "Donation Basics", "Medical Science"]
  },
  {
    id: "2",
    slug: "benefits-of-donating-blood",
    title: "The Surprising Health Benefits of Donating Blood",
    excerpt: "Discover how donating blood not only saves lives but can also offer health benefits to the donor.",
    content: `Donating blood is an altruistic act that has a profound impact on the lives of others. But did you know that it can also offer several health benefits to the donor? While the primary motivation for donation should always be to help those in need, these potential perks are a welcome bonus.

### Reduced Iron Levels
For individuals with high iron stores (hemochromatosis or simply higher than average iron), donating blood can help reduce excess iron. High iron levels can contribute to oxidative stress and may increase the risk of certain conditions like heart disease and liver problems. Regular donation helps maintain healthy iron levels.

### Mini Health Check-up
Before you donate blood, you undergo a mini health screening. This includes checking your temperature, pulse, blood pressure, and hemoglobin levels. This free check-up can sometimes reveal underlying health issues that you might not be aware of, prompting further investigation by your doctor.

### Improved Cardiovascular Health
Some studies suggest that regular blood donation may be associated with a lower risk of heart attacks and strokes. This could be linked to the reduction of iron levels, as excess iron can contribute to the thickening of blood and an increased risk of cardiovascular events.

### Stimulates Blood Cell Production
After donating blood, your body works to replenish the lost blood. This process stimulates the production of new blood cells, which can help keep your blood system efficient and healthy.

### Psychological Benefits
The act of giving and knowing you've helped save lives can provide a significant psychological boost. It can reduce stress, improve emotional well-being, and foster a sense of connection to your community.

While these benefits are noteworthy, the most significant reward of donating blood is the knowledge that you've made a life-saving difference.
`,
    author: "John Appleseed",
    publishDate: "2024-07-22",
    imageUrl: "https://placehold.co/800x450.png?text=Healthy+Heart",
    tags: ["Health", "Wellness", "Donation Impact", "Lifestyle"]
  },
  {
    id: "3",
    slug: "what-to-expect-donation-process",
    title: "What to Expect: Your First Blood Donation",
    excerpt: "A step-by-step guide to the blood donation process, from registration to post-donation care.",
    content: `Donating blood for the first time can seem daunting, but it's a simple and safe process. Knowing what to expect can help ease any anxieties and make your experience a positive one. Here’s a step-by-step guide:

### Before You Donate
1.  **Eligibility Check:** Ensure you meet the basic eligibility criteria (age, weight, general health).
2.  **Hydrate and Eat:** Drink plenty of water and have a healthy meal before your appointment. Avoid fatty foods.
3.  **Bring ID:** You'll need a valid photo ID.

### At the Donation Center
1.  **Registration:** You'll fill out a confidential medical history questionnaire. This helps ensure that donating is safe for you and for the recipient.
2.  **Mini-Physical:** A staff member will check your temperature, pulse, blood pressure, and hemoglobin (iron) level.
3.  **The Donation:** If you pass the screening, you'll proceed to the donation area. A phlebotomist will clean an area on your arm and insert a sterile needle. The actual blood draw takes about 8-10 minutes, during which you'll donate about one pint of blood. You shouldn't feel significant pain, just a brief pinch.

### After Donation
1.  **Rest and Refreshments:** After donating, you'll rest for 10-15 minutes and enjoy some snacks and drinks provided by the center. This helps your body start to recover.
2.  **Post-Donation Care:**
    *   Drink extra fluids for the next 24-48 hours.
    *   Avoid strenuous physical activity or heavy lifting for the rest of the day.
    *   If you feel dizzy, lie down or sit with your head between your knees until the feeling passes.
    *   Keep the bandage on your arm for a few hours.

Your body will replace the lost plasma within 24 hours, and red blood cells are replaced within 4-6 weeks. You can typically donate whole blood every 56 days (8 weeks).

Congratulations on taking the step to become a blood donor! Your generosity is invaluable.
`,
    author: "Sarah Miller, RN",
    publishDate: "2024-07-29",
    imageUrl: "https://placehold.co/800x450.png?text=Blood+Donation+Chair",
    tags: ["Donation Process", "First-time Donor", "Tips"]
  },
];

export async function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = mockBlogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">The blog post you are looking for does not exist.</p>
        <Button asChild variant="outline">
          <Link href="/blog">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button asChild variant="outline" className="mb-8 group">
        <Link href="/blog">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </Button>

      <article>
        {post.imageUrl && (
          <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint="article illustration"
              priority
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-primary" />
            <span>Published on {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-primary" />
            <span>By {post.author}</span>
          </div>
        </div>

        {/* Using prose for Tailwind Typography styling for markdown-like content */}
        <div
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80 prose-strong:text-foreground/90"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
        />
        {/* A more robust solution would use a markdown parser if content was actual markdown */}

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border">
            <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
              <Tag size={20} />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
