
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BloodDrive } from "@/types";

// Mock data - in a real app, this would be fetched based on ID
const mockBloodDrives: BloodDrive[] = [
  {
    id: "1",
    name: "Community Blood Drive - City Hall",
    date: "2024-08-15",
    time: "10:00 AM - 04:00 PM",
    location: "City Hall, 123 Main St, Springfield",
    description: "Join us for our monthly community blood drive. Every donation helps save lives. Refreshments will be provided. We aim to collect over 100 units of blood to support local hospitals. Please bring a valid ID. Appointments are encouraged but walk-ins are welcome based on availability.",
    imageUrl: "https://placehold.co/800x400.png?text=City+Hall+Drive"
  },
  {
    id: "2",
    name: "Red Cross University Drive",
    date: "2024-08-22",
    time: "09:00 AM - 03:00 PM",
    location: "Springfield University Campus Center",
    description: "Support the Red Cross by donating blood at Springfield University. Students and faculty welcome. This drive is crucial for maintaining blood supplies during the summer months. Special thank you gifts for the first 50 donors.",
    imageUrl: "https://placehold.co/800x400.png?text=University+Campus+Drive"
  },
   {
    id: "3",
    name: "Summer Blood Donation Fest",
    date: "2024-09-05",
    time: "11:00 AM - 05:00 PM",
    location: "Central Park Pavilion",
    description: "A fun-filled day with music, food, and the opportunity to give back. Bring your friends and family! We'll have live bands, food trucks, and activities for kids. Making donation a community celebration.",
    imageUrl: "https://placehold.co/800x400.png?text=Summer+Donation+Fest"
  },
];


export async function generateStaticParams() {
  return mockBloodDrives.map((drive) => ({
    id: drive.id,
  }));
}

export default function BloodDriveDetailsPage({ params }: { params: { id: string } }) {
  const drive = mockBloodDrives.find(d => d.id === params.id);

  if (!drive) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Blood Drive Not Found</h1>
        <p className="text-muted-foreground mb-6">The blood drive you are looking for does not exist or may have been removed.</p>
        <Button asChild variant="outline">
          <Link href="/blood-drives">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blood Drives
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="outline" className="mb-8">
        <Link href="/blood-drives">
          <ArrowLeft size={16} className="mr-2" />
          Back to All Blood Drives
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-xl">
        {drive.imageUrl && (
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={drive.imageUrl}
              alt={drive.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint="community event"
            />
          </div>
        )}
        <CardHeader className="pt-6">
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary">{drive.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6 text-lg">
            <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
              <CalendarDays size={24} className="text-primary shrink-0" />
              <div>
                <p className="font-semibold">Date</p>
                <p className="text-muted-foreground">{new Date(drive.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
              <Clock size={24} className="text-primary shrink-0" />
               <div>
                <p className="font-semibold">Time</p>
                <p className="text-muted-foreground">{drive.time}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg text-lg">
            <MapPin size={24} className="text-primary shrink-0 mt-1" />
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-muted-foreground">{drive.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-primary mb-3">Event Description</h3>
            <p className="text-foreground/80 whitespace-pre-line leading-relaxed">
              {drive.description}
            </p>
          </div>
          
          <div className="pt-4">
             <Button size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 px-8">
                Register for this Drive
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

