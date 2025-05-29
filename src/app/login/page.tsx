
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
    photoURL: "https://placehold.co/100x100.png?text=JM"
  },
  {
    uid: "staff-001",
    email: "staff@example.com",
    displayName: "Sarah Staff",
    role: "staff",
    photoURL: "https://placehold.co/100x100.png?text=SS"
  },
  {
    uid: "admin-001",
    email: "admin@example.com",
    displayName: "Alex Admin",
    role: "admin",
    photoURL: "https://placehold.co/100x100.png?text=AA"
  },
];
// --- END DUMP DATA ---

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."), // Min 1 as we are using a dummy password
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
      authContext.loginWithDumpUser(foundUser);
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${foundUser.displayName}! (Dump Data Login)`,
      });
      const queryParams = new URLSearchParams(window.location.search);
      const redirectPath = queryParams.get("redirect");
      router.push(redirectPath || "/profile");
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
              (Using Dump Data - try member@example.com, staff@example.com, or admin@example.com with password: '{DUMMY_PASSWORD}')
            </span>
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
