'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';
import MobileNavigation from '@/components/mobile-navigation';
import HealthStatus from '@/components/health-status';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, MapPin, Link as LinkIcon } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <HealthStatus />
      
      <div className="max-w-6xl mx-auto flex">
        <Navigation />
        
        <main className="flex-1 max-w-2xl border-r border-border/50 min-h-screen">
          <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 p-4">
            <h1 className="text-xl font-bold">Profile</h1>
          </div>

          <div className="pb-20 md:pb-0">
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            
            {/* Profile Info */}
            <div className="p-4">
              <div className="flex items-end justify-between -mt-16 mb-4">
                <Avatar className="h-32 w-32 border-4 border-background">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="text-2xl">{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="mb-4">
                  Edit profile
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold">{user.username}</h2>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
                
                <p className="text-sm">
                  Building amazing things with code. Passionate about web development and creating beautiful user experiences.
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LinkIcon className="h-4 w-4" />
                    <span className="text-blue-500">yourwebsite.com</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>Joined January 2024</span>
                  </div>
                </div>
                
                <div className="flex space-x-4 text-sm">
                  <div>
                    <span className="font-bold">1,234</span>
                    <span className="text-muted-foreground ml-1">Following</span>
                  </div>
                  <div>
                    <span className="font-bold">5,678</span>
                    <span className="text-muted-foreground ml-1">Followers</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-border/50">
              <div className="flex space-x-8 px-4">
                <button className="py-4 border-b-2 border-primary text-sm font-medium">
                  Posts
                </button>
                <button className="py-4 text-sm font-medium text-muted-foreground hover:text-foreground">
                  Replies
                </button>
                <button className="py-4 text-sm font-medium text-muted-foreground hover:text-foreground">
                  Media
                </button>
                <button className="py-4 text-sm font-medium text-muted-foreground hover:text-foreground">
                  Likes
                </button>
              </div>
            </div>
            
            {/* Posts */}
            <div className="p-4">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts yet</p>
              </div>
            </div>
          </div>
        </main>

        <aside className="hidden lg:block w-80 p-4">
          <div className="bg-muted/30 rounded-2xl p-4">
            <h3 className="font-bold text-lg mb-3">You might like</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Vue.js</p>
                    <p className="text-sm text-muted-foreground">@vuejs</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Follow</Button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <MobileNavigation />
    </div>
  );
}