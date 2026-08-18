"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  ChevronDown,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Tag,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Monitors",
    href: "/monitors",
    icon: Activity,
  },
  {
    name: "Incidents",
    href: "/incidents",
    icon: AlertTriangle,
  },
  {
    name: "Status Pages",
    href: "/status-pages",
    icon: BarChart3,
  },
];

const secondaryNavigation = [
  {
    name: "Tags",
    href: "/tags",
    icon: Tag,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[250px] border-r border-zinc-800 bg-[#0d0d0f] transition-transform md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-5">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5"
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                <ShieldCheck size={19} strokeWidth={2.5} />
              </div>

              <span className="text-lg font-semibold tracking-tight">
                Sentinel
              </span>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white md:hidden"
            >
              <X size={18} />
            </button>
          </div>

          <div className="border-b border-zinc-800 p-4">
            <button className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-left hover:bg-zinc-800">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-700 text-xs font-semibold">
                  A
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    Personal Workspace
                  </p>
                  <p className="text-xs text-zinc-500">Free plan</p>
                </div>
              </div>

              <ChevronDown size={15} className="text-zinc-500" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-5">
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Monitor
            </p>

            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                    }`}
                  >
                    <Icon size={17} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <p className="mb-2 mt-7 px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Manage
            </p>

            <div className="space-y-1">
              {secondaryNavigation.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                    }`}
                  >
                    <Icon size={17} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-zinc-800 p-4">
            <div className="rounded-lg bg-zinc-900/70 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Monitors</span>
                <span className="text-xs font-medium text-zinc-200">
                  4 / 50
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[8%] rounded-full bg-zinc-300" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <MobileMenuTrigger onClick={() => setMobileOpen(true)} />
    </>
  );
}

function MobileMenuTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 left-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200 shadow-xl md:hidden"
      aria-label="Open menu"
    >
      <Activity size={19} />
    </button>
  );
}