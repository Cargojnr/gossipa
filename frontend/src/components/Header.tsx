import React from "react"
import ThemeToggle from "./ThemeToggle"

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-[var(--body-bg)] shadow-md px-4 py-2 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <img src="/img/logo/main-logo.png" alt="Gossipa Logo" className="h-10 hidden md:block" />
      <img src="/img/logo/mobile-logo.png" alt="Gossipa Mobile Logo" className="h-10 md:hidden" />
    </div>

    <div className="flex items-center gap-4">
      <form className="hidden md:flex items-center relative" autoComplete="off">
        <input
          type="text"
          placeholder="Search"
          className="rounded-lg px-3 py-1 bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
        />
        <button type="submit" className="absolute right-2 top-1 text-gray-500">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      <a href="/notifications" className="relative">
        <i className="fas fa-bell fa-xl"></i>
        <span className="absolute -top-2 -right-2 text-xs bg-[var(--primary-color)] text-white rounded-full w-5 h-5 flex items-center justify-center">
          0
        </span>
      </a>

      <button className="avatar-profile thumb">
        <img
          src="/img/avatar-placeholder.png"
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover"
        />
      </button>
    </div>

    <div className="ml-4">
  <ThemeToggle />
</div>
  </header>

  )
}

export default Header