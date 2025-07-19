// types/feeds.ts

export interface User {
    id: string;
    username: string;
    profilePicture: string;
    verified?: boolean;
    active_status?: string;
    // add more fields if needed
  }
  
  export type ReactionCount = { count: number };
  export interface Secret {
    id: number;
    user_id: number;
    username: string;
    verified: boolean;
    secret: string;
    profile_picture: string;
    timestamp: string;
    reactions: {
        like?: ReactionCount;
    laugh?: ReactionCount;
    hot?: ReactionCount;
    gasp?: ReactionCount;
    };
    commentsCount?: number;
    audioUrl?: string; // optional if type is audio
    // Add any other field you return from the server
  }
  
  export interface FeedData {
    user: User;
    secrets: Secret[];
  }
  