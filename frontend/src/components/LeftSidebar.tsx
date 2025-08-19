"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";

interface LeftSidebarProps {
  userId?: number;
  profilePicture?: string;
  verified: boolean;
}

const navItems = [
  { icon: "fa-home", label: "Home", href: "/feeds" },
  { icon: "fab fa-modx", label: "Explore", href: "/explore", badge: "New" },
  { icon: "fa-plus-circle", label: "Compose Gist", href: "/submit" },
  { icon: "fa-bell", label: "Notifications", href: "/notifications", count: 0 },
  { icon: "fa-bookmark", label: "Saved Gists", href: "/" },
  { icon: "fa-award", label: "Become a Chief", href: "/subscribe", verified: true },
  { icon: "fa-circle-user", label: "My Profile", href: "/profile" },
  { icon: "fa-comments", label: "AnonymousCity", href: "/chat", soon: true },
];

const LeftSidebar: React.FC<LeftSidebarProps> = ({ userId, profilePicture, verified }) => {
  return (
    <aside
  className="hidden lg:flex flex-col justify-between w-[260px] min-h-screen py-6 px-4 border-r border-muted transition-colors"
  style={{ backgroundColor: "var(--body-bg)", color: "var(--text-color)" }}
>

      <div className="space-y-6">
        <img
          src="/img/logo/main-logo.png"
          alt="Logo"
          width={140}
          height={40}
          className="mx-auto"
        />

        <ul className="space-y-2">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--hover-bg)]
 dark:hover:bg-zinc-800 transition`}
              >
                <i className={`fas ${item.icon}`} />
                <span>{item.label}</span>

                {item.badge && (
                  <span className="ml-auto text-xs text-primary font-medium">{item.badge}</span>
                )}

                {item.count !== undefined && (
                  <span className="ml-auto text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}

                {item.verified && verified && (
                  <img
                    src="/img/gossipa3.png"
                    alt="badge"
                    width={18}
                    height={18}
                    className="ml-1"
                  />
                )}

                {item.soon && (
                  <span className="ml-auto text-xs text-primary font-medium">Soon</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <ThemeToggle />

        <div className="flex flex-col gap-4">
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <img
              src={profilePicture || "/img/avatars/thumbs/sheep.jpg"}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            <p className="text-sm font-semibold truncate">
              @gossipa{userId}
              {verified && (
                <img
                  src="/img/gossipa3.png"
                  alt="verified"
                  width={16}
                  height={16}
                  className="inline-block ml-1"
                />
              )}
            </p>
          </div>

          {/* Messages Preview */}
          <button className="w-full text-left flex flex-col gap-1 px-3 py-3 rounded-lg hover:bg-[var(--hover-bg)]
 dark:hover:bg-zinc-800 transition">
            <span className="flex items-center gap-2 text-sm font-medium">
              <i className="fas fa-comments fa-lg" /> Messages
            </span>
            <ul className="flex items-center gap-2 mt-1">
              {[...Array(3)].map((_, idx) => (
                <li key={idx}>
                  <img
                    src={profilePicture || "/img/avatars/thumbs/sheep.jpg"}
                    alt="avatar"
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                </li>
              ))}
              <span className="ml-auto text-xs bg-zinc-300 dark:bg-zinc-700 px-2 rounded-full text-gray-800 dark:text-gray-200">
                127+
              </span>
            </ul>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
