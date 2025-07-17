"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { Tweet, toggleLike } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

interface TweetCardProps {
  tweet: Tweet;
  onUpdate?: (updatedTweet: Tweet) => void;
  showThread?: boolean;
}

export default function TweetCard({
  tweet,
  onUpdate,
  showThread = false,
}: TweetCardProps) {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const [localTweet, setLocalTweet] = useState(tweet);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || isLiking) return;

    setIsLiking(true);
    try {
      const liked = await toggleLike(localTweet.id, "tweet");
      const updatedTweet = {
        ...localTweet,
        liked,
        likes: liked ? localTweet.likes + 1 : localTweet.likes - 1,
      };
      setLocalTweet(updatedTweet);
      onUpdate?.(updatedTweet);
    } catch (error) {
      toast.error("Failed to like tweet");
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // This would typically scroll to comment section or open comment modal
  };

  const handleRetweet = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast("Retweet functionality coming soon!");
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.share?.({
      text: localTweet.content,
      url: `${window.location.origin}/tweet/${localTweet.id}`,
    }) || toast("Share functionality coming soon!");
  };

  const TweetContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="tweet-card p-4 cursor-pointer"
    >
      <div className="flex space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={localTweet.author.avatar}
            alt={localTweet.author.username}
          />
          <AvatarFallback>
            {localTweet.author.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-sm">
              {localTweet.author.username}
            </span>
            <span className="text-muted-foreground text-sm">
              ·{" "}
              {formatDistanceToNow(new Date(localTweet.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>

          <p className="text-sm mb-3 leading-relaxed">{localTweet.content}</p>

          {localTweet.image && (
            <div className="mb-3 rounded-2xl overflow-hidden">
              <img
                src={localTweet.image}
                alt="Tweet image"
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-between text-muted-foreground max-w-md">
            <Button
              variant="ghost"
              size="sm"
              className="comment-button p-2 -ml-2 hover:bg-blue-500/10"
              onClick={handleComment}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">{localTweet.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="retweet-button p-2 hover:bg-green-500/10"
              onClick={handleRetweet}
            >
              <Repeat2 className="h-4 w-4 mr-1" />
              <span className="text-sm">{localTweet.retweets}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "like-button p-2 hover:bg-red-500/10",
                localTweet.liked && "liked"
              )}
              onClick={handleLike}
              disabled={isLiking}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={localTweet.liked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 mr-1",
                    localTweet.liked && "fill-current"
                  )}
                />
              </motion.div>
              <span className="text-sm">{localTweet.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="share-button p-2 hover:bg-blue-500/10"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return showThread ? (
    <TweetContent />
  ) : (
    <Link href={`/tweet/${localTweet.id}`}>
      <TweetContent />
    </Link>
  );
}
