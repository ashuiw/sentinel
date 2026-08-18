import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Plus,
  Server,
  XCircle,
} from "lucide-react";
import Link from "next/link";

const monitors = [
  {
    name: "sentinel.dev",
    url: "https://sentinel.dev",
    type: "HTTP",
    status: "up",
    response: "124 ms",
    uptime: "99.99%",
  },
  {
    name: "api.sentinel.dev",
    url: "https://api.sentinel.dev",
    type: "HTTP",
    status: "up",
    response: "186 ms",
    uptime: "99.97%",
  },
  {
    name: "Minecraft Server",
    url: "mc.example.com:25565",
    type: "TCP",
    status: "up",
    response: "32 ms",
    uptime: "100.00%",
  },
  {
    name: "Database",
    url: "db.example.com:5432",
    type: "TCP",
    status: "down",
    response: "Timeout",
    uptime: "98.21%",
  },
];

const responseData = [
  130, 142, 125, 170, 155, 140, 175, 210, 185, 160, 145, 130, 138, 150,
  135, 142, 128, 125, 138, 150, 145, 160, 142, 135,
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-sm text-zinc-500">Tuesday, August 18</p>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Good afternoon, Ashu.
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Here's what's happening with your services.
          </p>
        </div>

        <Link
          href="/monitors/new"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          <Plus size={16} />
          Add Monitor
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Monitors"
          value="24"
          description="4 added this month"
          icon={Activity}
        />

        <StatCard
          title="Online"
          value="23"
          description="95.8% of monitors"
          icon={CheckCircle2}
          positive
        />

        <StatCard
          title="Current Uptime"
          value="99.98%"
          description="Across all monitors"
          icon={ArrowUpRight}
          positive
        />

        <StatCard
          title="Active Incidents"
          value="1"
          description="Needs attention"
          icon={AlertCircle}
          warning
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-zinc-800 bg-[#0d0d0f]">
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <div>
              <h2 className="font-medium text-white">Response time</h2>
              <p className="mt-0.5 text-xs text-zinc-500">
                Average response time · Last 24 hours
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Clock3 size={14} />
              <span>148 ms avg</span>
            </div>
          </div>

          <div className="h-[260px] p-5">
            <ResponseChart />
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-[#0d0d0f]">
          <div className="border-b border-zinc-800 px-5 py-4">
            <h2 className="font-medium text-white">Current incidents</h2>
            <p className="mt-0.5 text-xs text-zinc-500">
              Services that need attention
            </p>
          </div>

          <div className="p-5">
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-red-500/10 p-1.5 text-red-400">
                  <XCircle size={16} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-200">
                    Database
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    TCP connection timed out on port 5432.
                  </p>

                  <p className="mt-2 text-[11px] text-red-400">
                    Started 8 minutes ago
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/incidents"
              className="mt-4 flex items-center justify-center gap-1 text-xs text-zinc-500 hover:text-zinc-200"
            >
              View all incidents
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-800 bg-[#0d0d0f]">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div>
            <h2 className="font-medium text-white">Monitors</h2>
            <p className="mt-0.5 text-xs text-zinc-500">
              Overview of your monitored services
            </p>
          </div>

          <Link
            href="/monitors"
            className="text-xs text-zinc-400 hover:text-white"
          >
            View all
          </Link>
        </div>

        <div className="divide-y divide-zinc-800">
          {monitors.map((monitor) => (
            <MonitorRow key={monitor.name} monitor={monitor} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  positive,
  warning,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  positive?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#0d0d0f] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{title}</p>

        <div
          className={`rounded-lg p-2 ${
            positive
              ? "bg-emerald-500/10 text-emerald-400"
              : warning
                ? "bg-amber-500/10 text-amber-400"
                : "bg-zinc-800 text-zinc-400"
          }`}
        >
          <Icon size={17} />
        </div>
      </div>

      <p className="mt-4 text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-zinc-500">{description}</p>
    </div>
  );
}

function MonitorRow({
  monitor,
}: {
  monitor: (typeof monitors)[number];
}) {
  const isUp = monitor.status === "up";

  return (
    <div className="flex flex-col gap-3 px-5 py-4 transition hover:bg-zinc-900/50 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`relative flex h-2.5 w-2.5 shrink-0 rounded-full ${
            isUp ? "bg-emerald-400" : "bg-red-400"
          }`}
        >
          {isUp && (
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-30" />
          )}
        </span>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-zinc-200">
            {monitor.name}
          </p>

          <p className="truncate text-xs text-zinc-600">
            {monitor.url}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-6 sm:flex">
        <div className="text-left sm:w-20">
          <p className="text-[10px] uppercase tracking-wide text-zinc-600">
            Type
          </p>
          <p className="mt-1 text-xs text-zinc-400">{monitor.type}</p>
        </div>

        <div className="text-left sm:w-20">
          <p className="text-[10px] uppercase tracking-wide text-zinc-600">
            Response
          </p>
          <p
            className={`mt-1 text-xs ${
              isUp ? "text-zinc-300" : "text-red-400"
            }`}
          >
            {monitor.response}
          </p>
        </div>

        <div className="text-left sm:w-20">
          <p className="text-[10px] uppercase tracking-wide text-zinc-600">
            Uptime
          </p>
          <p className="mt-1 text-xs text-zinc-300">{monitor.uptime}</p>
        </div>
      </div>
    </div>
  );
}

function ResponseChart() {
  const width = 1000;
  const height = 220;
  const max = 250;

  const points = responseData
    .map((value, index) => {
      const x = (index / (responseData.length - 1)) * width;
      const y = height - (value / max) * height;

      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <div className="h-full w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a1a1aa" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#a1a1aa" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4].map((line) => {
          const y = (height / 4) * line;

          return (
            <line
              key={line}
              x1="0"
              y1={y}
              x2={width}
              y2={y}
              stroke="#27272a"
              strokeWidth="1"
            />
          );
        })}

        <polygon points={areaPoints} fill="url(#chartGradient)" />

        <polyline
          points={points}
          fill="none"
          stroke="#d4d4d8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}