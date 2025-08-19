import React from "react";
import { cn } from "@/lib/utils";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

interface LayoutProps {
  children: React.ReactNode;
  userId?: number; // 💡 include userId prop
  profilePicture?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, userId, profilePicture }) => {
  return (
    <div className="main-background h-screen w-full flex flex-col relative bg-[var(--body-bg)] text-[var(--text-color)] transition-colors duration-300 overflow-hidden">
      {/* Ambient Blobs */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-[var(--primary-faded)] rounded-full blur-[120px] opacity-30 animate-pulse z-0" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-[var(--secondary-color)] rounded-full blur-[120px] opacity-20 animate-pulse z-0" />

      {/* Fixed layout body */}
      <div className="layout-container flex flex-1 gap-4 px-2 md:px-6 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="left-sidebar w-[250px] shrink-0">
          <LeftSidebar
            userId={userId}
            profilePicture={profilePicture}
            verified={true}
          />
        </aside>

        {/* Scrollable Main Content */}
        <main className="flex-1 max-w-5xl mx-auto px-2 md:px-4 overflow-y-auto h-screen pb-32">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar w-[280px] shrink-0">
          <RightSidebar userId={userId} />
        </aside>
      </div>
    </div>
  );
};


export default Layout;
