// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  userJoined: (userId: number) => void;
  userLeft: (userId: number) => void;
}

interface ClientToServerEvents {
  sendMessage: (message: string) => void;
}

// Export a function that returns a connected socket
export const createSocket = (
    userId: number
  ): Socket<ServerToClientEvents, ClientToServerEvents> =>
    io("http://localhost:5000", {
      path: "/socket.io",
      transports: ["websocket"],
      autoConnect: true,
      withCredentials: true,
      query: {
        userId: userId.toString(), // 💡 must be string
      },
    });
  
