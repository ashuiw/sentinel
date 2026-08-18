"use client";

import {
  Bell,
  Menu,
  Plus,
  Search,
  UserCircle,
} from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-800 bg-[#09090b]/90 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <button
          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white md:hidden"
          aria-label="Menu"
        >
          <Menu size={19} />
        </button>

        <div className="hidden items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 sm:flex sm:w-[280px]">
          <Search size={16} className="text-zinc-500" />

          <input
            type="text"
            placeholder="Search monitors..."
            className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
          />

          <kbd className="hidden rounded border border-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-500 lg:block">
            /
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-zinc-200 sm:flex">
          <Plus size={16} />
          Add Monitor
        </button>

        <button
          className="relative rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={18} />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-zinc-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700">
            <UserCircle size={20} className="text-zinc-300" />
          </div>
        </button>
      </div>
    </header>
  );
}