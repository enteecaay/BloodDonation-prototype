
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BloodDrive } from "@/types";

const mockBloodDrives: BloodDrive[] = [
  {
    id: "1",
    name: "Community Blood Drive - City Hall",
    date: "2024-08-15",
    time: "10:00 AM - 04:00 PM",
    location: "City Hall, 123 Main St, Springfield",
    description: "Join us for our monthly community blood drive. Every donation helps save lives. Refreshments will be provided.",
    imageUrl: "https://placehold.co/600x400.png?text=Blood+Drive+Event"
  },
  {
    id: "2",
    name: "Red Cross University Drive",
    date: "2024-08-22",
    time: "09:00 AM - 03:00 PM",
    location: "Springfield University Campus Center",
    description: "Support the Red Cross by donating blood at Springfield University. Students and faculty welcome.",
    imageUrl: "https://placehold.co/600x400.png?text=University+Drive"
  },
  {
    id: "3",
    name: "Summer Blood Donation Fest",
    date: "2024-09-05",
    time: "11:00 AM - 05:00 PM",
    location: "Central Park Pavilion",
    description: "A fun-filled day with music, food, and the opportunity to give back. Bring your friends and family!",
    imageUrl: "https://placehold.co/600x400.png?text=Summer+Fest"
  },
];


export default function BloodDrivesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-2 text-center">
        Upcoming Blood Drives
      </h1>
      <p className="text-lg text-foreground/80 mb-10 text-center max-w-2xl mx-auto">
        Find a blood drive event near you and schedule your donation. Your participation is crucial.
      </p>

      {mockBloodDrives.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg">
          No upcoming blood drives scheduled at the moment. Please check back soon.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBloodDrives.map((drive) => (
            <Card key={drive.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {drive.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={drive.imageUrl}
                    alt={drive.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="medical event"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl text-primary">{drive.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground pt-1">
                  {drive.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-primary" />
                  <span>{new Date(drive.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span>{drive.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>{drive.location}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {/* Link could go to a page with more details or an external registration */}
                  <Link href={`/blood-drives/${drive.id}`}>View Details & Register</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
