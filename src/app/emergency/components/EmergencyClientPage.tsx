
"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { bloodTypes, type EmergencyRequest } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, ListChecks, Siren, ShieldAlert, UserCircle, Hospital, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';


const requestFormSchema = z.object({
  patientName: z.string().min(2, "Patient name is required."),
  bloodType: z.enum(bloodTypes as [string, ...string[]], {
    required_error: "Please select the required blood type.",
  }),
  hospital: z.string().min(3, "Hospital name is required."),
  contactPerson: z.string().min(2, "Contact person name is required."),
  contactNumber: z.string().min(10, "Valid contact number is required.").regex(/^\+?[0-9\s-()]*$/, "Invalid phone number format."),
  message: z.string().min(10, "Please provide a brief message (at least 10 characters).").max(500, "Message is too long."),
});

// Mock emergency requests
const initialMockRequests: EmergencyRequest[] = [
  { id: "er1", patientName: "Jane Doe", bloodType: "O-", hospital: "City General Hospital", contactPerson: "John Doe", contactNumber: "555-0001", message: "Urgent need for O-negative blood for emergency surgery.", status: "active", requestedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: "er2", patientName: "Mike Ross", bloodType: "AB+", hospital: "County Medical Center", contactPerson: "Rachel Zane", contactNumber: "555-0002", message: "Patient requires AB+ plasma due to a rare condition. Please help if you can.", status: "active", requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: "er3", patientName: "Lisa Ray", bloodType: "A+", hospital: "St. Luke's Hospital", contactPerson: "Mark Ray", contactNumber: "555-0003", message: "Looking for A+ blood for a scheduled operation. Any help appreciated.", status: "fulfilled", requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
];


export default function EmergencyClientPage() {
  const [requests, setRequests] = useState<EmergencyRequest[]>(initialMockRequests);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof requestFormSchema>>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      patientName: "",
      hospital: "",
      contactPerson: "",
      contactNumber: "",
      message: "",
    },
  });

  function onSubmitRequest(values: z.infer<typeof requestFormSchema>) {
    const newRequest: EmergencyRequest = {
      id: `er${Date.now()}`,
      ...values,
      status: "active",
      requestedAt: new Date().toISOString(),
    };
    setRequests(prev => [newRequest, ...prev]);
    toast({
      title: "Emergency Request Submitted",
      description: "Your request has been posted. We hope you find help soon.",
      variant: "default",
    });
    form.reset();
  }

  const activeRequests = requests.filter(req => req.status === 'active');

  return (
    <div className="space-y-12">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-destructive">
            <Siren size={28} /> Post an Urgent Request
          </CardTitle>
          <CardDescription>
            If you are facing an emergency, fill this form. Your request will be visible to potential donors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitRequest)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient's Full Name</FormLabel>
                      <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Blood Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger></FormControl>
                        <SelectContent>{bloodTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="hospital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital Name & City</FormLabel>
                    <FormControl><Input placeholder="e.g., City General Hospital, Springfield" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person's Name</FormLabel>
                      <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person's Phone</FormLabel>
                      <FormControl><Input type="tel" placeholder="(123) 456-7890" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brief Message / Situation</FormLabel>
                    <FormControl><Textarea placeholder="Briefly describe the situation and urgency..." {...field} rows={4} /></FormControl>
                    <FormDescription>Max 500 characters.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground text-lg py-6">
                <AlertTriangle size={20} className="mr-2" /> Submit Urgent Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-primary">
            <ListChecks size={28}/> Active Emergency Requests
          </CardTitle>
          <CardDescription>
            View current urgent needs. If you can help, please contact the person listed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeRequests.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No active emergency requests at this time.</p>
          ) : (
            <div className="space-y-6">
              {activeRequests.map((req) => (
                <Card key={req.id} className="bg-background border-l-4 border-destructive p-4 shadow-md">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left">
                       <ShieldAlert size={40} className="text-destructive mb-2"/>
                       <p className="text-xl font-bold text-destructive">{req.bloodType}</p>
                       <p className="text-xs text-muted-foreground">Needed</p>
                       <Badge variant="destructive" className="mt-2">URGENT</Badge>
                    </div>
                    <div className="md:w-3/4 space-y-2">
                      <h3 className="text-lg font-semibold text-primary">{req.patientName}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2"><Hospital size={16}/>At: <span className="text-foreground">{req.hospital}</span></p>
                      <p className="text-sm text-foreground/90 leading-relaxed">{req.message}</p>
                      <div className="text-xs text-muted-foreground pt-2 border-t border-border/50 mt-2">
                        <p className="flex items-center gap-2"><UserCircle size={14}/>Contact: {req.contactPerson}</p>
                        <p className="flex items-center gap-2"><Phone size={14}/>Phone: {req.contactNumber}</p>
                        <p>Posted: {formatDistanceToNow(new Date(req.requestedAt), { addSuffix: true })}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

