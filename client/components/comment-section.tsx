'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';
import { Comment, getComments, addComment, toggleLike } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface CommentSectionProps {
  tweetId: string;
}

export default function CommentSection({ tweetId }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(tweetId);
        setComments(fetchedComments);
      } catch (error) {
        toast.error('Failed to load comments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [tweetId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || isPosting) return;

    setIsPosting(true);
    try {
      const comment = await addComment(tweetId, newComment);
      setComments(prev => [...prev, comment]);
      setNewComment('');
    } catch (error) {
      toast.error('Failed to post comment');
    } finally {
      setIsPosting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!user) return;

    try {
      const liked = await toggleLike(commentId, 'comment');
      setComments(prev => 
        prev.map(comment => 
          comment.id === commentId
            ? {
                ...comment,
                liked,
                likes: liked ? comment.likes + 1 : comment.likes - 1
              }
            : comment
        )
      );
    } catch (error) {
      toast.error('Failed to like comment');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex space-x-3 animate-pulse">
            <div className="h-10 w-10 bg-muted rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      {user && (
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="flex space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Post your reply"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] border-none resize-none focus-visible:ring-0"
                maxLength={280}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!newComment.trim() || isPosting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isPosting ? 'Posting...' : 'Reply'}
            </Button>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex space-x-3 border-b border-border/50 pb-4"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author.avatar} alt={comment.author.username} />
              <AvatarFallback>{comment.author.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-sm">{comment.author.username}</span>
                <span className="text-muted-foreground text-sm">
                  · {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              
              <p className="text-sm mb-2 leading-relaxed">{comment.content}</p>
              
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "like-button p-1 -ml-1 hover:bg-red-500/10",
                  comment.liked && "liked"
                )}
                onClick={() => handleLikeComment(comment.id)}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={comment.liked ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart className={cn("h-4 w-4 mr-1", comment.liked && "fill-current")} />
                </motion.div>
                <span className="text-sm">{comment.likes}</span>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}