'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';
import MobileNavigation from '@/components/mobile-navigation';
import HealthStatus from '@/components/health-status';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, UserPlus, Repeat2 } from 'lucide-react';

export default function NotificationsPage() {
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

  const notifications = [
    {
      id: '1',
      type: 'like',
      user: {
        username: 'john_dev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      content: 'liked your post',
      timestamp: '2h'
    },
    {
      id: '2',
      type: 'follow',
      user: {
        username: 'sarah_photos',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e8df83?w=100&h=100&fit=crop&crop=face'
      },
      content: 'followed you',
      timestamp: '4h'
    },
    {
      id: '3',
      type: 'comment',
      user: {
        username: 'design_mike',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      content: 'replied to your post',
      timestamp: '1d'
    },
    {
      id: '4',
      type: 'retweet',
      user: {
        username: 'alex_user',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
      },
      content: 'retweeted your post',
      timestamp: '2d'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-blue-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      case 'retweet':
        return <Repeat2 className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HealthStatus />
      
      <div className="max-w-6xl mx-auto flex">
        <Navigation />
        
        <main className="flex-1 max-w-2xl border-r border-border/50 min-h-screen">
          <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 p-4">
            <h1 className="text-xl font-bold">Notifications</h1>
          </div>

          <div className="pb-20 md:pb-0">
            {notifications.map((notification) => (
              <div key={notification.id} className="border-b border-border/50 p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={notification.user.avatar} alt={notification.user.username} />
                    <AvatarFallback>{notification.user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{notification.user.username}</span>
                      {' '}
                      <span className="text-muted-foreground">{notification.content}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="hidden lg:block w-80 p-4">
          <div className="bg-muted/30 rounded-2xl p-4">
            <h3 className="font-bold text-lg mb-3">Settings</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">Push notifications</p>
              <p className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">Email notifications</p>
              <p className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">Notification filters</p>
            </div>
          </div>
        </aside>
      </div>

      <MobileNavigation />
    </div>
  );
}