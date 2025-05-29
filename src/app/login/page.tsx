
"use client";

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { AuthUser } from "@/types";

// --- DUMP DATA FOR LOGIN ---
const DUMMY_PASSWORD = "password"; // Use a consistent password for all dump users for simplicity

const dumpUsers: AuthUser[] = [
  {
    uid: "member-001",
    email: "member@example.com",
    displayName: "John Member",
    role: "member",
    photoURL: "https://placehold.co/100x100.png?text=JM",
    lastLogin: "2024-07-28T10:00:00Z", 
    accountStatus: "active"
  },
   {
    uid: "member-002",
    email: "jane.donor@example.com",
    displayName: "Jane Donor",
    role: "member",
    photoURL: "https://placehold.co/100x100.png?text=JD",
    lastLogin: "2024-07-25T18:45:00Z",
    accountStatus: "active"
  },
  {
    uid: "member-003",
    email: "peter.lee@example.com",
    displayName: "Peter Lee",
    role: "member",
    photoURL: "https://placehold.co/100x100.png?text=PL",
    lastLogin: "2024-07-22T11:20:00Z",
    accountStatus: "suspended"
  },
  {
    uid: "staff-001",
    email: "staff@example.com",
    displayName: "Sarah Staff (City General)",
    role: "staff",
    photoURL: "https://placehold.co/100x100.png?text=SS",
    lastLogin: "2024-07-29T14:30:00Z",
    accountStatus: "active"
  },
  {
    uid: "staff-002",
    email: "county.staff@example.com",
    displayName: "Mike Chen (County Medical)",
    role: "staff",
    photoURL: "https://placehold.co/100x100.png?text=MC",
    lastLogin: "2024-07-29T08:00:00Z",
    accountStatus: "active"
  },
  {
    uid: "admin-001",
    email: "admin@example.com",
    displayName: "Alex Admin",
    role: "admin",
    photoURL: "https://placehold.co/100x100.png?text=AA",
    lastLogin: "2024-07-30T09:15:00Z",
    accountStatus: "active"
  },
];
// --- END DUMP DATA ---

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useAuth();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    
    const foundUser = dumpUsers.find(u => u.email === values.email);

    if (foundUser && values.password === DUMMY_PASSWORD) {
      if (foundUser.accountStatus === 'suspended') {
         toast({
          title: "Login Failed",
          description: "This account is currently suspended.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      authContext.loginWithDumpUser(foundUser);
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${foundUser.displayName}! (Dump Data Login)`,
      });
      const queryParams = new URLSearchParams(window.location.search);
      const redirectPath = queryParams.get("redirect");
      
      // Redirect based on role after login
      let destination = "/profile"; // Default redirect
      if (foundUser.role === 'admin') {
        destination = "/admin/dashboard";
      } else if (foundUser.role === 'staff') {
        // Staff might go to a specific staff dashboard or emergency page
        destination = "/emergency"; 
      }
      router.push(redirectPath || destination);

    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. (Hint: try 'password' for dump users)",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-15rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            <LogIn size={32} /> Login
          </CardTitle>
          <CardDescription>
            Access your BloodConnect account.
            <br />
            <span className="text-xs text-muted-foreground">
              (Using Dump Data - try an email from the list with password: '{DUMMY_PASSWORD}')
            </span>
            <ul className="text-xs text-muted-foreground/70 list-disc list-inside mt-1">
              <li>member@example.com</li>
              <li>staff@example.com</li>
              <li>admin@example.com</li>
            </ul>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
