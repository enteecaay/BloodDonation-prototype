
"use client";

import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, UserCog, Building, AlertTriangle, LineChart, Users, Droplet, HeartHandshake, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from 'react';

export default function AdminDashboardPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (role !== 'admin' || !user)) {
      router.push('/login?redirect=/admin/dashboard'); // Or a generic unauthorized page
    }
  }, [user, role, loading, router]);

  if (loading || role !== 'admin' || !user) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading or unauthorized...</div>;
  }

  const summaryStats = [
    { title: "Total Users", value: "150", icon: <Users className="text-primary" />, color: "text-primary" },
    { title: "Active Donors", value: "85", icon: <HeartHandshake className="text-green-500" />, color: "text-green-500" },
    { title: "Blood Units (All Hospitals)", value: "1200", icon: <Droplet className="text-destructive" />, color: "text-destructive" },
    { title: "Pending Staff Requests", value: "3", icon: <UserPlus className="text-orange-500" />, color: "text-orange-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-3">
            <ClipboardList size={36} /> Admin Dashboard
          </h1>
          <p className="text-lg text-foreground/80">
            Oversee and manage all aspects of the BloodConnect platform.
          </p>
        </div>

        {/* Quick Stats - Placeholder */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {summaryStats.map(stat => (
            <Card key={stat.title} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                {React.cloneElement(stat.icon as React.ReactElement, { size: 20, className: stat.color })}
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <p className="text-xs text-muted-foreground">Mock data</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-accent">
                <UserCog size={28}/> User Management
              </CardTitle>
              <CardDescription>
                View user profiles, manage roles, and oversee donation histories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/admin/users">Go to User Management</Link>
              </Button>
               <p className="text-xs text-muted-foreground mt-3">Reports: User activity, role distribution (TBD).</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl hover:shadow-2xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-accent">
                <Building size={28}/> Blood Unit Inventory
              </CardTitle>
              <CardDescription>
                Monitor blood unit levels across all registered hospitals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/admin/blood-units">Go to Blood Unit Management</Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">Reports: Stock levels by type, hospital utilization (TBD).</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl hover:shadow-2xl transition-shadow md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                <LineChart size={28}/> Platform Analytics & Reports (Placeholder)
              </CardTitle>
              <CardDescription>
                Access detailed reports on donations, requests, and system health.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This section will provide comprehensive reports and analytics, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                <li>Donation trends over time.</li>
                <li>Emergency request fulfillment rates.</li>
                <li>Donor demographics and activity.</li>
                <li>System performance and health metrics.</li>
              </ul>
              <Button variant="outline" className="mt-4 w-full" disabled>
                View Full Analytics (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
