'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';
import MobileNavigation from '@/components/mobile-navigation';
import HealthStatus from '@/components/health-status';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MessageCircle } from 'lucide-react';

export default function MessagesPage() {
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

  const conversations = [
    {
      id: '1',
      user: {
        username: 'john_dev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      lastMessage: 'Hey! How are you doing?',
      timestamp: '2h',
      unread: true
    },
    {
      id: '2',
      user: {
        username: 'sarah_photos',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e8df83?w=100&h=100&fit=crop&crop=face'
      },
      lastMessage: 'Thanks for the follow!',
      timestamp: '1d',
      unread: false
    },
    {
      id: '3',
      user: {
        username: 'design_mike',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      lastMessage: 'Check out this design',
      timestamp: '2d',
      unread: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HealthStatus />
      
      <div className="max-w-6xl mx-auto flex">
        <Navigation />
        
        <main className="flex-1 max-w-2xl border-r border-border/50 min-h-screen">
          <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 p-4">
            <h1 className="text-xl font-bold mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for people and groups"
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="pb-20 md:pb-0">
            {conversations.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Welcome to your inbox!</h3>
                <p className="text-muted-foreground">
                  Drop a line, share posts and more with private conversations between you and others on X.
                </p>
                <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Write a message
                </Button>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div key={conversation.id} className="border-b border-border/50 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.user.avatar} alt={conversation.user.username} />
                      <AvatarFallback>{conversation.user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{conversation.user.username}</span>
                        <span className="text-sm text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className={`text-sm mt-1 truncate ${conversation.unread ? 'font-medium' : 'text-muted-foreground'}`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && (
                      <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        <aside className="hidden lg:block w-80 p-4">
          <div className="bg-muted/30 rounded-2xl p-4">
            <h3 className="font-bold text-lg mb-3">Message requests</h3>
            <p className="text-sm text-muted-foreground">
              You don't have any message requests.
            </p>
          </div>
        </aside>
      </div>

      <MobileNavigation />
    </div>
  );
}