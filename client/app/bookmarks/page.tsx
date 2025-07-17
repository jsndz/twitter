'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';
import MobileNavigation from '@/components/mobile-navigation';
import HealthStatus from '@/components/health-status';
import { Bookmark } from 'lucide-react';

export default function BookmarksPage() {
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
            <h1 className="text-xl font-bold">Bookmarks</h1>
          </div>

          <div className="pb-20 md:pb-0">
            <div className="text-center py-12">
              <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Save posts for later</h3>
              <p className="text-muted-foreground">
                Bookmark posts to easily find them again in the future.
              </p>
            </div>
          </div>
        </main>

        <aside className="hidden lg:block w-80 p-4">
          <div className="bg-muted/30 rounded-2xl p-4">
            <h3 className="font-bold text-lg mb-3">About bookmarks</h3>
            <p className="text-sm text-muted-foreground">
              Only you can see your bookmarks. Bookmark posts by clicking the bookmark icon.
            </p>
          </div>
        </aside>
      </div>

      <MobileNavigation />
    </div>
  );
}