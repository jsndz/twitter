"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { getTweets, Tweet } from "@/lib/api";
import TweetCard from "@/components/tweet-card";
import TweetComposer from "@/components/tweet-composer";
import Navigation from "@/components/navigation";
import MobileNavigation from "@/components/mobile-navigation";
import HealthStatus from "@/components/health-status";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoadingTweets, setIsLoadingTweets] = useState(true);
  const [showComposer, setShowComposer] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      loadTweets();
    }
  }, [user]);

  const loadTweets = async () => {
    try {
      setIsLoadingTweets(true);
      const fetchedTweets = await getTweets();

      setTweets(fetchedTweets);
    } catch (error) {
      console.error("Failed to load tweets:", error);
    } finally {
      setIsLoadingTweets(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTweets();
    setIsRefreshing(false);
  };

  const handleTweetUpdate = (updatedTweet: Tweet) => {
    setTweets((prev) =>
      prev.map((tweet) => (tweet.id === updatedTweet.id ? updatedTweet : tweet))
    );
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
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Home</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hover:bg-muted/50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>

          {/* Desktop Tweet Composer */}
          <div className="hidden md:block border-b border-border/50 p-4">
            <Button
              onClick={() => setShowComposer(true)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              What's happening?
            </Button>
          </div>

          {/* Tweets Feed */}
          <div className="pb-20 md:pb-0">
            {isLoadingTweets ? (
              <div className="space-y-4 p-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex space-x-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : tweets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No tweets yet. Be the first to post!
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {tweets.map((tweet) => (
                  <TweetCard
                    key={tweet.id}
                    tweet={tweet}
                    onUpdate={handleTweetUpdate}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-80 p-4">
          <div className="bg-muted/30 rounded-2xl p-4 mb-4">
            <h3 className="font-bold text-lg mb-3">What's happening</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-muted-foreground">Trending in Technology</p>
                <p className="font-medium">Next.js 14</p>
                <p className="text-muted-foreground">42.1K posts</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Trending</p>
                <p className="font-medium">React Server Components</p>
                <p className="text-muted-foreground">28.3K posts</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <MobileNavigation />

      <TweetComposer
        isOpen={showComposer}
        onClose={() => setShowComposer(false)}
        onTweetCreated={loadTweets}
      />
    </div>
  );
}
