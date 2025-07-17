"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Home, Search, Bell, Mail, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import TweetComposer from "./tweet-composer";

export default function MobileNavigation() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [showComposer, setShowComposer] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/explore" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Mail, label: "Messages", href: "/messages" },
  ];

  if (!user) return null;

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 px-4 py-2">
        <div className="flex items-center justify-between">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn("p-3", pathname === item.href && "text-primary")}
              >
                <item.icon className="h-6 w-6" />
              </Button>
            </Link>
          ))}
          <Button
            size="sm"
            className="p-3 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setShowComposer(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      <TweetComposer
        isOpen={showComposer}
        onClose={() => setShowComposer(false)}
      />
    </>
  );
}
