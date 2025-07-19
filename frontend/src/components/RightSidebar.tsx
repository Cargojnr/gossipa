import React from 'react';
import LiveSearch from './LiveSearch';
import ChiefGossipaCard from './ChiefGossipa';
import MeetTheChiefs from './MeetTheChiefs';

interface RightSidebarProps {
  userId: number;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ userId }) => {
  return (
    <aside className="right-sidebar top-4 w-[280px] hidden lg:block space-y-6 text-[var(--text-color)]">
      {/* Live Search */}
      <div className="p-4 bg-[var(--container-bg)] rounded-xl shadow-sm transition-colors duration-300">
        <LiveSearch />
      </div>

      {/* Category Navigation */}
      <div className="p-4 bg-[var(--container-bg)] rounded-xl shadow-sm transition-colors duration-300">
        <ul className="flex justify-between text-sm font-medium">
          {["Trending", "Hot", "Loud"].map((tab, i) => (
            <li
              key={tab}
              className={`cursor-pointer px-3 py-1 rounded-full transition-all ${
                i === 0
                  ? "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300"
                  : "text-gray-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Chief Gossipa Highlight */}
      <div className="p-4 bg-gradient-to-br from-violet-100 via-pink-50 to-fuchsia-100 dark:from-zinc-800 dark:to-zinc-900 rounded-xl shadow-md transition-colors duration-300">
        <ChiefGossipaCard />
      </div>

      {/* Meet the Chiefs */}
      {userId && (
        <div className="p-4 bg-[var(--container-bg)] rounded-xl shadow-sm transition-colors duration-300">
          <MeetTheChiefs userId={userId} />
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-center text-[var(--text-muted)] pt-6">
        <p className="space-x-2">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span>&middot;</span>
          <span className="hover:underline cursor-pointer">Terms of Use</span>
          <span>&middot;</span>
          <span className="hover:underline cursor-pointer">Community Guidelines</span>
        </p>
        <p className="mt-3 text-[11px]">
          &copy; {new Date().getFullYear()} <span className="text-violet-600 font-semibold">@Gossipa</span> Co. All rights reserved.
        </p>
      </div>
    </aside>
  );
};

export default RightSidebar;
