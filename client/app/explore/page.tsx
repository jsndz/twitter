'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';
import MobileNavigation from '@/components/mobile-navigation';
import HealthStatus from '@/components/health-status';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ExplorePage() {
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Twitter"
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="p-4 space-y-6">
            <div className="bg-muted/30 rounded-2xl p-4">
              <h2 className="font-bold text-lg mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Trending for you
              </h2>
              <div className="space-y-3">
                <div className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                  <p className="text-sm text-muted-foreground">Trending in Technology</p>
                  <p className="font-medium">Next.js 14</p>
                  <p className="text-sm text-muted-foreground">42.1K posts</p>
                </div>
                <div className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                  <p className="text-sm text-muted-foreground">Trending in Web Dev</p>
                  <p className="font-medium">React Server Components</p>
                  <p className="text-sm text-muted-foreground">28.3K posts</p>
                </div>
                <div className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                  <p className="text-sm text-muted-foreground">Trending</p>
                  <p className="font-medium">Tailwind CSS</p>
                  <p className="text-sm text-muted-foreground">19.8K posts</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-2xl p-4">
              <h2 className="font-bold text-lg mb-4">Who to follow</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">React</p>
                      <p className="text-sm text-muted-foreground">@reactjs</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Follow</Button>
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Next.js</p>
                      <p className="text-sm text-muted-foreground">@nextjs</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Follow</Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="hidden lg:block w-80 p-4">
          <div className="bg-muted/30 rounded-2xl p-4">
            <h3 className="font-bold text-lg mb-3">What's happening</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-muted-foreground">Live on Twitter</p>
                <p className="font-medium">JavaScript Conference 2024</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Trending in Sports</p>
                <p className="font-medium">World Cup</p>
                <p className="text-muted-foreground">1.2M posts</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <MobileNavigation />
    </div>
  );
}