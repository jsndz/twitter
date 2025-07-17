import toast from 'react-hot-toast';

export interface Tweet {
  id: string;
  content: string;
  image?: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  likes: number;
  comments: number;
  retweets: number;
  liked: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  likes: number;
  liked: boolean;
  createdAt: string;
}

// Mock data for demo
const mockTweets: Tweet[] = [
  {
    id: '1',
    content: 'Just shipped a new feature! 🚀 The team worked incredibly hard to make this happen. Excited to see how users respond to it.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop',
    author: {
      id: '1',
      username: 'john_dev',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    likes: 42,
    comments: 12,
    retweets: 8,
    liked: false,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    content: 'Beautiful sunset today! Nature never fails to amaze me. Sometimes we need to take a step back and appreciate the simple things in life.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    author: {
      id: '2',
      username: 'sarah_photos',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e8df83?w=100&h=100&fit=crop&crop=face'
    },
    likes: 128,
    comments: 24,
    retweets: 15,
    liked: true,
    createdAt: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    content: 'Working on a new design system for our app. The attention to detail required is insane but so worth it. Good design is invisible until it\'s not there.',
    author: {
      id: '3',
      username: 'design_mike',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    likes: 67,
    comments: 18,
    retweets: 22,
    liked: false,
    createdAt: '2024-01-15T08:45:00Z'
  }
];

const mockComments: Comment[] = [
  {
    id: '1',
    content: 'This looks amazing! Great work 👏',
    author: {
      id: '4',
      username: 'alex_user',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    likes: 5,
    liked: false,
    createdAt: '2024-01-15T10:35:00Z'
  },
  {
    id: '2',
    content: 'Can\'t wait to try this out! When will it be available?',
    author: {
      id: '5',
      username: 'emma_dev',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    likes: 3,
    liked: true,
    createdAt: '2024-01-15T10:40:00Z'
  }
];

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch('/api/v1/health');
    return response.ok;
  } catch (error) {
    // Mock online status for demo
    return true;
  }
}

export async function getTweets(): Promise<Tweet[]> {
  // Mock API call - replace with actual API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTweets);
    }, 500);
  });
}

export async function getTweet(id: string): Promise<Tweet | null> {
  // Mock API call - replace with actual API
  return new Promise((resolve) => {
    setTimeout(() => {
      const tweet = mockTweets.find(t => t.id === id);
      resolve(tweet || null);
    }, 300);
  });
}

export async function createTweet(content: string, image?: string): Promise<Tweet> {
  const token = localStorage.getItem('auth_token');
  const userData = localStorage.getItem('user_data');
  
  if (!token || !userData) {
    throw new Error('Not authenticated');
  }

  try {
    const response = await fetch('/api/v1/tweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content, image })
    });

    if (!response.ok) {
      // Mock successful tweet creation for demo
      const user = JSON.parse(userData);
      const newTweet: Tweet = {
        id: Date.now().toString(),
        content,
        image,
        author: {
          id: user.id,
          username: user.username,
          avatar: user.avatar
        },
        likes: 0,
        comments: 0,
        retweets: 0,
        liked: false,
        createdAt: new Date().toISOString()
      };
      
      mockTweets.unshift(newTweet);
      toast.success('Tweet posted!');
      return newTweet;
    }

    const data = await response.json();
    toast.success('Tweet posted!');
    return data;
  } catch (error) {
    toast.error('Failed to post tweet');
    throw error;
  }
}

export async function toggleLike(modelId: string, modelType: 'tweet' | 'comment'): Promise<boolean> {
  const token = localStorage.getItem('auth_token');
  
  if (!token) {
    throw new Error('Not authenticated');
  }

  try {
    const response = await fetch('/api/v1/likes/toggle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ modelId, modelType })
    });

    if (!response.ok) {
      // Mock successful like toggle for demo
      if (modelType === 'tweet') {
        const tweet = mockTweets.find(t => t.id === modelId);
        if (tweet) {
          tweet.liked = !tweet.liked;
          tweet.likes += tweet.liked ? 1 : -1;
          return tweet.liked;
        }
      }
      return false;
    }

    const data = await response.json();
    return data.liked;
  } catch (error) {
    toast.error('Failed to toggle like');
    throw error;
  }
}

export async function addComment(modelId: string, content: string): Promise<Comment> {
  const token = localStorage.getItem('auth_token');
  const userData = localStorage.getItem('user_data');
  
  if (!token || !userData) {
    throw new Error('Not authenticated');
  }

  try {
    const response = await fetch(`/api/v1/comment?modelId=${modelId}&modelType=tweet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });

    if (!response.ok) {
      // Mock successful comment creation for demo
      const user = JSON.parse(userData);
      const newComment: Comment = {
        id: Date.now().toString(),
        content,
        author: {
          id: user.id,
          username: user.username,
          avatar: user.avatar
        },
        likes: 0,
        liked: false,
        createdAt: new Date().toISOString()
      };
      
      mockComments.push(newComment);
      
      // Update comment count on tweet
      const tweet = mockTweets.find(t => t.id === modelId);
      if (tweet) {
        tweet.comments += 1;
      }
      
      toast.success('Comment added!');
      return newComment;
    }

    const data = await response.json();
    toast.success('Comment added!');
    return data;
  } catch (error) {
    toast.error('Failed to add comment');
    throw error;
  }
}

export async function getComments(tweetId: string): Promise<Comment[]> {
  // Mock API call - replace with actual API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockComments);
    }, 300);
  });
}