import toast from "react-hot-toast";
import axios from "axios";

const apiURL = "http://localhost:8080/api/v1";

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

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await axios.get("http://localhost:8080/health");
    return response.data.message === "true";
  } catch {
    return false;
  }
}

export async function getTweets(): Promise<Tweet[]> {
  const response = await axios.get(`${apiURL}/tweet`);
  return response.data;
}

export async function getTweet(id: string): Promise<Tweet | null> {
  try {
    const response = await axios.get(`${apiURL}/tweet/${id}`);
    return response.data;
  } catch {
    return null;
  }
}

export async function createTweet(
  content: string,
  image?: string
): Promise<Tweet> {
  const token = localStorage.getItem("auth_token");

  if (!token) throw new Error("Not authenticated");

  try {
    const response = await axios.post(
      `${apiURL}/tweet`,
      { content, image },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Tweet posted!");
    return response.data;
  } catch (error) {
    toast.error("Failed to post tweet");
    throw error;
  }
}

export async function toggleLike(
  modelId: string,
  modelType: "tweet" | "comment"
): Promise<boolean> {
  const token = localStorage.getItem("auth_token");
  const userData = localStorage.getItem("user_data");

  if (!token || !userData) throw new Error("Not authenticated");

  const user = JSON.parse(userData);

  try {
    const response = await axios.post(
      `${apiURL}/likes/toggle?modelId=${modelId}&modelType=${modelType}`,
      { userId: user.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.liked;
  } catch (error) {
    toast.error("Failed to toggle like");
    throw error;
  }
}

export async function addComment(
  modelId: string,
  content: string
): Promise<Comment> {
  const token = localStorage.getItem("auth_token");

  if (!token) throw new Error("Not authenticated");

  try {
    const response = await axios.post(
      `${apiURL}/comment?modelId=${modelId}&modelType=tweet`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Comment added!");
    return response.data;
  } catch (error) {
    toast.error("Failed to add comment");
    throw error;
  }
}

export async function getComments(tweetId: string): Promise<Comment[]> {
  try {
    const response = await axios.get(`${apiURL}/comment/${tweetId}`);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch comments");
    return [];
  }
}
