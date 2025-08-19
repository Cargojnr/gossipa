import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createSocket } from "../lib/socket";
import type { ServerToClientEvents, ClientToServerEvents } from "@/types/socket";
import type { Socket } from "socket.io-client";

type User = {
  id: number;
  profile_picture: string;
  verified: boolean;
};

const MeetTheChiefs = ({ userId }: { userId: number }) => {
  const [users, setUsers] = useState<User[]>([]);
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

  useEffect(() => {
    const fetchInitialUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/active-users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };

    fetchInitialUsers();

    const socket = createSocket(userId);
    socketRef.current = socket;

    socket.emit("sendMessage", "hi");

    socket.on("userJoined", async (joinedUserId: number) => {
      try {
        const res = await fetch(`/user/${joinedUserId}`);
        const user = await res.json();
        setUsers((prev) => (prev.some((u) => u.id === user.id) ? prev : [...prev, user]));
      } catch (err) {
        console.error("User fetch error:", err);
      }
    });

    socket.on("userLeft", (leftUserId: number) => {
      setUsers((prev) => prev.filter((u) => u.id !== leftUserId));
    });

    return () => {
      socket.disconnect();
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, [userId]);

  return (
    <div className="aside-2 mb-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <center>
          <h4 className="user-count font-medium text-sm text-[var(--text-muted)]">
            <button className="dot w-2 h-2 bg-[var(--secondary-color)] rounded-full animate-ping-once mr-1" />
            Meet The Chiefs : <span id="activeCount">{users.length}</span>
          </h4>
        </center>

        <ul className="nav user-list mt-4 space-y-2">
          <AnimatePresence initial={false}>
            {users.map((user) => (
              <motion.li
                key={user.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="nav-item flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--card-bg)] transition"
              >
                <img
                  src={user.profile_picture}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="text-xs text-[var(--text-color)] flex items-center gap-1">
                  @amebo{user.id}
                  {user.verified && (
                    <img
                      src="/img/gossipa3.png"
                      alt="Verified"
                      className="w-4 h-4"
                    />
                  )}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    </div>
  );
};

export default MeetTheChiefs;
