
"use client";

import Link from "next/link";
import { Droplet, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/register", label: "Register Donor" },
  { href: "/search", label: "Find Blood" },
  { href: "/blood-drives", label: "Blood Drives" },
  { href: "/blog", label: "Blog" },
  { href: "/emergency", label: "Emergency" },
  { href: "/reminder", label: "Donation Reminder" },
  // { href: "/admin", label: "Admin" }, // Placeholder for admin section
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Droplet size={32} />
          <span className="text-2xl font-bold">BloodConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map((item) => (
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
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
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
                <nav className="flex-grow p-4 space-y-2">
                  {navItems.map((item) => (
                     <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "block px-3 py-2 rounded-md text-base font-medium",
                            pathname === item.href
                              ? "bg-primary/10 text-primary"
                              : "text-foreground/80 hover:bg-accent/10 hover:text-primary"
                          )}
                        >
                          {item.label}
                        </Link>
                     </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
