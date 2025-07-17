'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { getTweet, Tweet } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import TweetCard from '@/components/tweet-card';
import CommentSection from '@/components/comment-section';
import Navigation from '@/components/navigation';
import MobileNavigation from '@/components/mobile-navigation';
import HealthStatus from '@/components/health-status';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TweetPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [isLoadingTweet, setIsLoadingTweet] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user && id) {
      loadTweet();
    }
  }, [user, id]);

  const loadTweet = async () => {
    try {
      setIsLoadingTweet(true);
      const fetchedTweet = await getTweet(id as string);
      setTweet(fetchedTweet);
    } catch (error) {
      console.error('Failed to load tweet:', error);
    } finally {
      setIsLoadingTweet(false);
    }
  };

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
          {/* Header */}
          <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 p-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="hover:bg-muted/50"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-bold">Post</h1>
            </div>
          </div>

          {/* Tweet Content */}
          <div className="pb-20 md:pb-0">
            {isLoadingTweet ? (
              <div className="p-4 space-y-4">
                <div className="flex space-x-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            ) : tweet ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TweetCard
                  tweet={tweet}
                  onUpdate={setTweet}
                  showThread={true}
                />
                
                {/* Comments Section */}
                <div className="border-t border-border/50 p-4">
                  <h3 className="font-bold text-lg mb-4">Replies</h3>
                  <CommentSection tweetId={tweet.id} />
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Tweet not found</p>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-80 p-4">
          <div className="bg-muted/30 rounded-2xl p-4">
            <h3 className="font-bold text-lg mb-3">Related</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-muted-foreground">People also talking about</p>
                <p className="font-medium">#WebDevelopment</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Trending</p>
                <p className="font-medium">#NextJS</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <MobileNavigation />
    </div>
  );
}