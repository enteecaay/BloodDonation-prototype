
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { bloodTypes, type Donor } from "@/types";
import { Search, UserCircle, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const searchSchema = z.object({
  bloodType: z.enum(bloodTypes as [string, ...string[]], {
    required_error: "Please select a blood type.",
  }),
  location: z.string().min(2, "Location must be at least 2 characters.").max(100),
});

// Mock donor data
const mockDonors: Donor[] = [
  { id: "1", name: "Alice Smith", email: "alice@example.com", phone: "555-1234", bloodType: "O+", location: "Springfield", availability: ["regular", "emergency"] },
  { id: "2", name: "Bob Johnson", email: "bob@example.com", phone: "555-5678", bloodType: "A+", location: "Shelbyville", availability: ["regular"] },
  { id: "3", name: "Carol Williams", email: "carol@example.com", phone: "555-8765", bloodType: "B-", location: "Springfield", availability: ["emergency"] },
  { id: "4", name: "David Brown", email: "david@example.com", phone: "555-4321", bloodType: "AB+", location: "Capital City", availability: ["regular"] },
];

export default function DonorSearchClient() {
  const [searchResults, setSearchResults] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      location: "",
    },
  });

  function onSubmit(values: z.infer<typeof searchSchema>) {
    setIsLoading(true);
    console.log("Searching for:", values); // Replace with actual search logic

    // Simulate API call
    setTimeout(() => {
      const results = mockDonors.filter(
        (donor) =>
          donor.bloodType === values.bloodType &&
          donor.location.toLowerCase().includes(values.location.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
      if (results.length === 0) {
        toast({
            title: "No Donors Found",
            description: "Try broadening your search criteria.",
            variant: "default"
        });
      }
    }, 1000);
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-primary">
            <Search size={28}/> Search Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Type Needed</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bloodTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>General Location (City/Area)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Springfield" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
                {isLoading ? "Searching..." : "Search Donors"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Search Results</CardTitle>
            <CardDescription>Found {searchResults.length} donor(s) matching your criteria.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {searchResults.map((donor) => (
              <Card key={donor.id} className="bg-secondary/30 p-4">
                <div className="flex items-start space-x-4">
                    <UserCircle size={40} className="text-primary mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-primary">{donor.name}</h3>
                        <p className="text-sm text-muted-foreground">Blood Type: <span className="font-medium text-foreground">{donor.bloodType}</span></p>
                        <div className="mt-2 space-y-1 text-sm">
                            <p className="flex items-center gap-2"><MapPin size={14} className="text-muted-foreground"/>{donor.location}</p>
                            <p className="flex items-center gap-2"><Mail size={14} className="text-muted-foreground"/>{donor.email}</p>
                            <p className="flex items-center gap-2"><Phone size={14} className="text-muted-foreground"/>{donor.phone}</p>
                        </div>
                        <p className="text-xs mt-2 text-muted-foreground">Availability: {donor.availability.join(", ")}</p>
                    </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

