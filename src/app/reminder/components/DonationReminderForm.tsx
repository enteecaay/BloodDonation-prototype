
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon, Mail, MessageSquare, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendDonationReminder, type SendDonationReminderInput, type SendDonationReminderOutput } from "@/ai/flows/donation-reminder";
import { Textarea } from "@/components/ui/textarea";


const reminderFormSchema = z.object({
  userName: z.string().min(2, "Donor's name is required."),
  email: z.string().email("Invalid email address."),
  phoneNumber: z.string().min(10, "Valid phone number is required.").regex(/^\+?[0-9\s-()]*$/, "Invalid phone number format."),
  lastDonationDate: z.date({
    required_error: "Last donation date is required.",
  }),
});

export default function DonationReminderForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [reminderOutput, setReminderOutput] = useState<SendDonationReminderOutput | null>(null);

  const form = useForm<z.infer<typeof reminderFormSchema>>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof reminderFormSchema>) {
    setIsLoading(true);
    setReminderOutput(null);

    const timeSinceLastDonation = differenceInDays(new Date(), values.lastDonationDate);
    if (timeSinceLastDonation < 0) {
        toast({
            title: "Invalid Date",
            description: "Last donation date cannot be in the future.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }

    const inputForAI: SendDonationReminderInput = {
      ...values,
      lastDonationDate: format(values.lastDonationDate, "yyyy-MM-dd"),
      timeSinceLastDonation,
    };

    try {
      const output = await sendDonationReminder(inputForAI);
      setReminderOutput(output);
      toast({
        title: "Reminders Generated!",
        description: "Personalized email and SMS content created successfully.",
      });
    } catch (error) {
      console.error("Error generating reminder:", error);
      toast({
        title: "Error Generating Reminder",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-primary">
            <Bot size={28}/> AI Reminder Generator
          </CardTitle>
          <CardDescription>
            Enter donor details to generate personalized reminder messages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Donor&apos;s Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Alex Donor" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donor&apos;s Email</FormLabel>
                      <FormControl><Input type="email" placeholder="alex.donor@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donor&apos;s Phone</FormLabel>
                      <FormControl><Input type="tel" placeholder="+1234567890" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="lastDonationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Last Donation Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The date the donor last made a blood donation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
                {isLoading ? "Generating..." : "Generate Reminders"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {reminderOutput && (
        <Card className="shadow-xl mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Generated Reminders</CardTitle>
            <CardDescription>Copy and use these personalized messages.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-primary"><Mail size={20}/> Email Content</h3>
              <Textarea readOnly value={reminderOutput.emailContent} rows={8} className="bg-secondary/30"/>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-primary"><MessageSquare size={20}/> SMS Content</h3>
              <Textarea readOnly value={reminderOutput.smsContent} rows={4} className="bg-secondary/30"/>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
