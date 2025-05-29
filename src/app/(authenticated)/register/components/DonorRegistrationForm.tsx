
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";
import { bloodTypes, type Donor } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

const availabilityOptions = [
  { id: "regular", label: "Available for regular donations" },
  { id: "emergency", label: "Available for emergency calls" },
] as const;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").regex(/^\+?[0-9\s-()]*$/, "Invalid phone number format."),
  bloodType: z.enum(bloodTypes as [string, ...string[]], {
    required_error: "Please select a blood type.",
  }),
  location: z.string().min(2, "Location must be at least 2 characters.").max(100),
  availability: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one availability option.",
  }),
});

export default function DonorRegistrationForm() {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingDonor, setIsFetchingDonor] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      availability: [],
    },
  });

  useEffect(() => {
    if (user && !authLoading) {
      // Pre-fill form with AuthUser data if available
      form.reset({
        name: user.displayName || "",
        email: user.email || "",
        phone: "", // Phone not in AuthUser by default
        location: "",
        availability: [],
      });

      // Fetch existing donor data if any
      const fetchDonorData = async () => {
        setIsFetchingDonor(true);
        const donorDocRef = doc(db, "donors", user.uid);
        const donorDocSnap = await getDoc(donorDocRef);
        if (donorDocSnap.exists()) {
          const donorData = donorDocSnap.data() as Donor;
          form.reset({ // Reset with donor-specific data
            name: donorData.name || user.displayName || "",
            email: donorData.email || user.email || "",
            phone: donorData.phone || "",
            bloodType: donorData.bloodType,
            location: donorData.location || "",
            availability: donorData.availability || [],
          });
        }
        setIsFetchingDonor(false);
      };
      fetchDonorData();
    }
  }, [user, authLoading, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to register as a donor.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);

    const donorData: Donor = {
      id: user.uid, // Use Firebase Auth UID as Donor ID
      userId: user.uid,
      ...values,
    };

    try {
      const donorDocRef = doc(db, "donors", user.uid);
      await setDoc(donorDocRef, donorData, { merge: true }); // Use merge to update if exists
      toast({
        title: "Profile Saved!",
        description: `Thank you, ${values.name}, your donor information has been saved.`,
        variant: "default",
      });
    } catch (error: any) {
      console.error("Error saving donor data:", error);
      toast({
        title: "Save Failed",
        description: error.message || "Could not save your donor information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  if (authLoading || isFetchingDonor) {
    return <Card className="shadow-xl p-6"><CardContent>Loading donor form...</CardContent></Card>;
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
          <UserPlus size={28}/> Donor Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your blood type" />
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
                  <FormDescription>
                    This helps us find donors in specific areas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availability"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Availability</FormLabel>
                    <FormDescription>
                      How would you like to contribute?
                    </FormDescription>
                  </div>
                  {availabilityOptions.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="availability"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(
                                        (field.value || []).filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
             <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
                <Save size={18} className="mr-2"/> {isSubmitting ? "Saving..." : "Save Donor Profile"}
              </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
