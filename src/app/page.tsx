
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Users, CalendarDays, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="absolute inset-0 opacity-50">
           <Image
            src="https://placehold.co/1200x600.png"
            alt="Blood donation background"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="community help"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Droplet size={64} className="mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Connect. Donate. Save Lives.
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-3xl mx-auto">
            BloodConnect is a dedicated platform to bridge the gap between blood donors and those in urgent need. Join our community and make a difference.
          </p>
          <div className="space-x-0 space-y-4 md:space-y-0 md:space-x-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
              <Link href="/register">Become a Donor</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary px-8 py-6 text-lg">
              <Link href="/search">Find Blood</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">How We Help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Users className="text-primary" />}
              title="Donor Registration"
              description="Easily register as a blood donor and manage your availability."
              link="/register"
              linkText="Register Now"
            />
            <FeatureCard
              icon={<Search className="text-primary" />}
              title="Find Donors"
              description="Quickly search for available blood donors by type and location."
              link="/search"
              linkText="Search Donors"
            />
            <FeatureCard
              icon={<CalendarDays className="text-primary" />}
              title="Blood Drives"
              description="Stay updated on upcoming blood donation drives near you."
              link="/blood-drives"
              linkText="View Schedule"
            />
            <FeatureCard
              icon={<Droplet className="text-primary" />}
              title="Emergency Requests"
              description="Post and view urgent requests for blood in critical situations."
              link="/emergency"
              linkText="See Requests"
            />
          </div>
        </div>
      </section>

      {/* Impact Section */}
       <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Doctor with patient"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="medical care"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary mb-6">Your Donation Matters</h2>
              <p className="text-foreground/80 mb-4">
                Every pint of blood donated can save up to three lives. From accident victims to patients undergoing surgery or battling chronic illnesses, your contribution provides a lifeline.
              </p>
              <p className="text-foreground/80 mb-6">
                BloodConnect facilitates this life-saving process by ensuring that safe blood is available to those who need it, when they need it.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/blog">Learn More About Donation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

function FeatureCard({ icon, title, description, link, linkText }: FeatureCardProps) {
  return (
    <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
          {React.cloneElement(icon as React.ReactElement, { size: 32 })}
        </div>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <Button variant="link" asChild className="text-accent hover:text-accent/80">
          <Link href={link}>{linkText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
