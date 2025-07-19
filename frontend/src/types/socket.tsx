// types/socket.ts
export interface ServerToClientEvents {
    userJoined: (userId: number) => void;
    userLeft: (userId: number) => void;
  }
  
  export interface ClientToServerEvents {
    sendMessage: (message: string) => void;
  }
  