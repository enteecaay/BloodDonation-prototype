
"use client";

import Link from "next/link";
import { 
    Droplet, 
    Menu, 
    X, 
    UserCircle, 
    LogIn, 
    UserPlus, 
    LogOut, 
    LayoutDashboard, 
    ShieldCheck, 
    Activity,
    Siren,
    Mail,
    CalendarDays,
    FileText,
    Users,
    HeartHandshake,
    CalendarCheck,
    DatabaseZap,
    ClipboardList, // New for Admin Dashboard
    Building, // New for Manage Blood Units (Admin)
    UserCog // New for Manage Users (Admin)
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import type { Role } from "@/types";

// Define base navigation items
const baseNavItems = [
  { href: "/", label: "Home" },
  { href: "/blood-drives", label: "Blood Drives" },
  { href: "/blog", label: "Blog" },
];

// Define navigation items for different roles
const navItemsByRole: Record<Role | 'guest', Array<{ href: string; label: string; icon?: React.ReactNode }>> = {
  guest: [
    ...baseNavItems,
    { href: "/register", label: "Become a Donor", icon: <UserPlus size={16}/> }, // Guests prompted to login
  ],
  member: [
    ...baseNavItems,
    { href: "/register", label: "Donor Profile", icon: <UserCircle size={16}/> },
    { href: "/search", label: "Find Blood", icon: <Activity size={16}/> },
    { href: "/emergency", label: "Emergency Requests", icon: <Siren size={16}/> },
  ],
  staff: [
    ...baseNavItems,
    { href: "/search", label: "Find Blood", icon: <Activity size={16}/> },
    { href: "/emergency", label: "Emergency System", icon: <Siren size={16}/> },
    { href: "/reminder", label: "Donation Reminder", icon: <Mail size={16}/> },
    // Staff specific links (examples, actual pages need to be created)
    // { href: "/staff/manage-drives", label: "Manage Drives", icon: <CalendarDays size={16}/> },
    // { href: "/staff/manage-blogs", label: "Manage Blogs", icon: <FileText size={16}/> },
    // { href: "/staff/blood-units", label: "Blood Units (My Hospital)", icon: <Droplet size={16}/> },
  ],
  admin: [
    ...baseNavItems,
    { href: "/admin/dashboard", label: "Admin Dashboard", icon: <ClipboardList size={16}/> },
    { href: "/admin/users", label: "Manage Users", icon: <UserCog size={16}/> },
    { href: "/admin/blood-units", label: "Manage Blood Units", icon: <Building size={16}/> },
    { href: "/reminder", label: "Donation Reminder Tool", icon: <Mail size={16}/> },
    // { href: "/admin/manage-donations", label: "Manage Donations", icon: <HeartHandshake size={16}/> },
    // { href: "/admin/manage-all-blogs", label: "Manage All Blogs", icon: <LayoutDashboard size={16}/> },
    // { href: "/admin/manage-all-drives", label: "Manage All Drives", icon: <CalendarCheck size={16}/> },
  ],
};


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, role, loading, logout } = useAuth();

  const currentNavItems = navItemsByRole[role] || navItemsByRole.guest;

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Droplet size={32} />
          <span className="text-2xl font-bold">BloodConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {currentNavItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium",
                pathname === item.href
                  ? "text-primary hover:text-primary/90 bg-accent/20"
                  : "text-foreground/80 hover:text-primary/90 hover:bg-accent/10"
              )}
            >
              <Link href={item.href}>
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </Link>
            </Button>
          ))}
          {loading ? (
            <div className="w-20 h-8 bg-muted rounded animate-pulse"></div>
          ) : user ? (
            <>
              <Button variant="ghost" asChild className="text-sm font-medium text-foreground/80 hover:text-primary/90 hover:bg-accent/10">
                <Link href="/profile"><UserCircle size={16} className="mr-1.5"/> Profile</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={logout} className="text-sm">
                <LogOut size={16} className="mr-1.5"/> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-sm font-medium text-foreground/80 hover:text-primary/90 hover:bg-accent/10">
                <Link href="/login"><LogIn size={16} className="mr-1.5"/> Login</Link>
              </Button>
              {/* Signup button is intentionally removed based on previous request to use dump data */}
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          {loading ? (
             <div className="w-8 h-8 bg-muted rounded animate-pulse mr-2"></div>
          ) : user ? (
             <Button variant="ghost" size="icon" asChild className="mr-2">
                <Link href="/profile"><UserCircle size={20}/></Link>
             </Button>
          ) : null}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 flex justify-between items-center border-b">
                  <Link href="/" className="flex items-center gap-2 text-primary" onClick={() => setMobileMenuOpen(false)}>
                    <Droplet size={28} />
                    <span className="text-xl font-bold">BloodConnect</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X size={24} />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex-grow p-4 space-y-1">
                  {currentNavItems.map((item) => (
                     <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "block px-3 py-2.5 rounded-md text-base font-medium flex items-center",
                            pathname === item.href
                              ? "bg-primary/10 text-primary"
                              : "text-foreground/80 hover:bg-accent/10 hover:text-primary"
                          )}
                        >
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          {item.label}
                        </Link>
                     </SheetClose>
                  ))}
                </nav>
                <div className="p-4 border-t mt-auto">
                  {loading ? (
                     <div className="w-full h-10 bg-muted rounded animate-pulse"></div>
                  ) : user ? (
                    <Button variant="outline" onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full">
                       <LogOut size={16} className="mr-2"/> Logout
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <SheetClose asChild>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/login"><LogIn size={16} className="mr-2"/> Login</Link>
                        </Button>
                      </SheetClose>
                      {/* Signup button is intentionally removed */}
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
