'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Image, X } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { createTweet } from '@/lib/api';
import toast from 'react-hot-toast';

interface TweetComposerProps {
  isOpen: boolean;
  onClose: () => void;
  onTweetCreated?: () => void;
}

export default function TweetComposer({ isOpen, onClose, onTweetCreated }: TweetComposerProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user || isPosting) return;

    setIsPosting(true);
    try {
      await createTweet(content, image || undefined);
      setContent('');
      setImage(null);
      onTweetCreated?.();
      onClose();
    } catch (error) {
      toast.error('Failed to post tweet');
    } finally {
      setIsPosting(false);
    }
  };

  const canPost = content.trim().length > 0 && content.length <= 280;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Compose Tweet</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatar} alt={user?.username} />
              <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <Textarea
                placeholder="What's happening?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] border-none resize-none text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                maxLength={280}
                autoFocus
              />
              
              <AnimatePresence>
                {image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative mt-4 rounded-2xl overflow-hidden"
                  >
                    <img
                      src={image}
                      alt="Upload preview"
                      className="w-full h-auto max-h-96 object-cover"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 rounded-full p-1 h-8 w-8"
                      onClick={() => setImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-blue-500/10 hover:text-blue-500"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${content.length > 260 ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {280 - content.length}
                </span>
                {content.length > 0 && (
                  <div className="w-6 h-6 rounded-full border-2 border-muted relative">
                    <div
                      className={`absolute inset-0 rounded-full transition-all ${
                        content.length > 260 ? 'bg-red-500' : 'bg-primary'
                      }`}
                      style={{
                        transform: `rotate(${(content.length / 280) * 360}deg)`,
                        transformOrigin: 'center',
                        clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)'
                      }}
                    />
                  </div>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={!canPost || isPosting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isPosting ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}