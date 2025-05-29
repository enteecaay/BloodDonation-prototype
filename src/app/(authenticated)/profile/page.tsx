
"use client";

import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, LogOut } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading profile...</div>;
  }

  if (!user) {
    // This should be handled by the AuthenticatedLayout, but as a safeguard:
    return <div className="container mx-auto px-4 py-12 text-center">Please log in to view your profile.</div>;
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
              <AvatarFallback className="text-3xl bg-secondary text-secondary-foreground">
                {getInitials(user.displayName)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-bold text-primary">{user.displayName || "User Profile"}</CardTitle>
            <CardDescription className="text-lg">Manage your BloodConnect account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                <User size={20} className="text-primary" />
                <span className="font-medium">Name:</span>
                <span>{user.displayName || "Not set"}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                <Mail size={20} className="text-primary" />
                <span className="font-medium">Email:</span>
                <span>{user.email || "Not set"}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                <Shield size={20} className="text-primary" />
                <span className="font-medium">Role:</span>
                <span className="capitalize">{user.role}</span>
              </div>
            </div>

            {user.role === 'member' && (
                 <Button asChild className="w-full bg-accent hover:bg-accent/80 text-accent-foreground">
                    <Link href="/register">Manage Donor Profile</Link>
                 </Button>
            )}
            {/* Add more role-specific links here, e.g., for staff or admin dashboards */}
            {/* 
            {user.role === 'staff' && (
                 <Button asChild className="w-full">
                    <Link href="/staff/dashboard">Staff Dashboard</Link>
                 </Button>
            )}
            {user.role === 'admin' && (
                 <Button asChild className="w-full">
                    <Link href="/admin/dashboard">Admin Dashboard</Link>
                 </Button>
            )}
            */}
            
            <Button onClick={logout} variant="outline" className="w-full">
              <LogOut size={16} className="mr-2" /> Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
