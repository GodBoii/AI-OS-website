import React, { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ─── Types ────────────────────────────────────────────────────────────────────

/** One row from Convex usage_daily table */
export type ConvexDailyRow = {
  _id: string;
  user_id: string;
  day_key: string;          // "2026-05-04"
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  first_event_at_ms: number;
  last_event_at_ms: number;
  created_at_ms: number;
  updated_at_ms: number;
};

/** Lifetime totals from Convex */
export type ConvexLifetime = {
  user_id: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  updated_at_ms: number | null;
  window_count: number;
  usage_source: string;
};

export type ConvexUsageData = {
  daily: ConvexDailyRow[];
  lifetime: ConvexLifetime;
  _error?: string;
};

type TimePeriod = '7days' | '30days' | '90days' | 'all';
type ChartMode = 'bar' | 'line';

interface UsageCardProps {
  usageData: ConvexUsageData | null;
  isLoading: boolean;
  timePeriod: TimePeriod;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number): string => n.toLocaleString();

const fmtK = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
};

const fmtDate = (dayKey: string): string => {
  // dayKey is "YYYY-MM-DD" — parse safely in UTC to avoid timezone shifts
  const [y, m, d] = dayKey.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

const filterByPeriod = (rows: ConvexDailyRow[], period: TimePeriod): ConvexDailyRow[] => {
  if (period === 'all') return rows;
  const days = period === '7days' ? 7 : period === '30days' ? 30 : 90;
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - days);
  const cutoffKey = cutoff.toISOString().slice(0, 10);
  return rows.filter(r => r.day_key >= cutoffKey);
};

// ─── Component ────────────────────────────────────────────────────────────────

const UsageCard: React.FC<UsageCardProps> = ({ usageData, isLoading, timePeriod }) => {
  const [chartMode, setChartMode] = useState<ChartMode>('bar');

  // Filter daily rows by selected time period, ascending by date for chart
  const chartRows = useMemo(() => {
    if (!usageData?.daily) return [];
    return filterByPeriod(usageData.daily, timePeriod)
      .slice() // copy to avoid mutating
      .sort((a, b) => a.day_key.localeCompare(b.day_key));
  }, [usageData, timePeriod]);

  // For table: newest first
  const tableRows = useMemo(() => [...chartRows].reverse(), [chartRows]);

  // Period totals
  const periodTotals = useMemo(() => {
    return chartRows.reduce(
      (acc, r) => ({
        input: acc.input + r.input_tokens,
        output: acc.output + r.output_tokens,
        total: acc.total + r.total_tokens,
      }),
      { input: 0, output: 0, total: 0 }
    );
  }, [chartRows]);

  // Lifetime data
  const lifetime = usageData?.lifetime;

  // Chart labels
  const labels = chartRows.map(r => fmtDate(r.day_key));

  // ── Chart Data ──────────────────────────────────────────────────────────────
  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Input Tokens',
        data: chartRows.map(r => r.input_tokens),
        backgroundColor: 'rgba(59, 130, 246, 0.2)',   // primary with opacity
        borderColor: '#3b82f6',
        borderWidth: 2,
        fill: chartMode === 'line',
        tension: 0.4,
      },
      {
        label: 'Output Tokens',
        data: chartRows.map(r => r.output_tokens),
        backgroundColor: 'rgba(168, 85, 247, 0.2)',  // accent with opacity
        borderColor: '#a855f7',
        borderWidth: 2,
        fill: chartMode === 'line',
        tension: 0.4,
      },
      {
        label: 'Total Tokens',
        data: chartRows.map(r => r.total_tokens),
        backgroundColor: 'rgba(16, 185, 129, 0.2)',   // emerald with opacity
        borderColor: '#10b981',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  }), [chartRows, chartMode, labels]);

  // ── Chart Options ───────────────────────────────────────────────────────────
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: {
        stacked: false,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#9ca3af', font: { family: 'JetBrains Mono', size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: {
          color: '#9ca3af',
          font: { family: 'JetBrains Mono', size: 11 },
          callback: (v) => fmtK(Number(v)),
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb',
          font: { family: 'Inter', weight: 'bold' as const, size: 12 },
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        titleFont: { family: 'Inter', weight: 'bold' as const },
        bodyFont: { family: 'JetBrains Mono' },
        padding: 12,
        callbacks: {
          label: ctx => ` ${ctx.dataset.label}: ${fmt(ctx.parsed.y)}`,
        },
      },
    },
  };

  // ── Loading State ───────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="bg-surface-light/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
        <h3 className="text-xl font-bold mb-4 text-white">Usage Metrics</h3>
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-primary rounded-full animate-spin shadow-glow-sm" />
          <p className="font-mono text-sm tracking-widest text-primary/70 animate-pulse uppercase">Fetching telemetry...</p>
        </div>
      </div>
    );
  }

  // ── No Data State ───────────────────────────────────────────────────────────
  const hasData = chartRows.length > 0;

  return (
    <div className="bg-surface border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[50px] rounded-full pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
        <h3 className="text-xl font-bold flex items-center gap-3 text-white">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          Usage Telemetry <span className="text-gray-500 font-mono text-sm ml-2">v2</span>
        </h3>
        {usageData?._error && (
          <span className="text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Partial data: {usageData._error}
          </span>
        )}
      </div>

      {/* ── Lifetime Stats ───────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase text-gray-500 mb-4 tracking-widest">Lifetime Total</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/10 transition-colors">
            <span className="text-xs font-bold uppercase block text-primary mb-2 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Input
            </span>
            <span className="text-2xl md:text-3xl font-mono font-bold text-white">{fmtK(lifetime?.input_tokens ?? 0)}</span>
            <span className="text-xs font-mono text-gray-500 block mt-1">{fmt(lifetime?.input_tokens ?? 0)}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/10 transition-colors">
            <span className="text-xs font-bold uppercase block text-accent mb-2 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Output
            </span>
            <span className="text-2xl md:text-3xl font-mono font-bold text-white">{fmtK(lifetime?.output_tokens ?? 0)}</span>
            <span className="text-xs font-mono text-gray-500 block mt-1">{fmt(lifetime?.output_tokens ?? 0)}</span>
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 md:p-5 shadow-glow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-[20px] rounded-full pointer-events-none"></div>
            <span className="text-xs font-bold uppercase block text-emerald-400 mb-2 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> Total
            </span>
            <span className="text-2xl md:text-3xl font-mono font-bold text-white">{fmtK(lifetime?.total_tokens ?? 0)}</span>
            <span className="text-xs font-mono text-primary/60 block mt-1">{fmt(lifetime?.total_tokens ?? 0)}</span>
          </div>
        </div>
      </div>

      {/* ── Period Summary ───────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase text-gray-500 mb-4 tracking-widest flex items-center gap-2">
          Period: <span className="text-gray-300">{timePeriod === 'all' ? 'All Time' : timePeriod}</span>
          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">{chartRows.length} days active</span>
        </p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Input', val: periodTotals.input, color: 'text-primary', bgLine: 'bg-primary' },
            { label: 'Output', val: periodTotals.output, color: 'text-accent', bgLine: 'bg-accent' },
            { label: 'Total', val: periodTotals.total, color: 'text-emerald-400', bgLine: 'bg-emerald-400' },
          ].map(({ label, val, color, bgLine }) => (
            <div key={label} className="bg-surface-light border border-white/5 rounded-xl p-4 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-0.5 ${bgLine} opacity-50`}></div>
              <span className="text-[10px] font-bold uppercase block text-gray-400 mb-1">{label}</span>
              <span className={`text-xl font-mono font-bold ${color}`}>{fmtK(val)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Chart ─────────────────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="font-semibold text-sm text-white">Daily Token Velocity</span>
          <div className="flex bg-black/50 p-1 rounded-lg border border-white/10">
            {(['bar', 'line'] as ChartMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setChartMode(mode)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                  chartMode === mode ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="h-52 sm:h-72 bg-black/30 border border-white/5 rounded-xl p-3 md:p-4 backdrop-blur-sm">
          {hasData ? (
            chartMode === 'bar' ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <Line data={chartData as any} options={chartOptions as any} />
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500">
              <svg className="w-12 h-12 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              <p className="font-semibold text-sm">No data for this period</p>
              <p className="font-mono text-xs">Use the AI-OS app to generate usage data.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Daily Breakdown ────────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <h4 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
          Daily Breakdown
        </h4>

        {tableRows.length === 0 ? (
          <div className="bg-black/20 border border-white/5 rounded-xl p-8 text-center">
            <p className="font-mono text-sm text-gray-500">No usage records found for this period.</p>
          </div>
        ) : (
          <>
            {/* Mobile card list (hidden on sm+) */}
            <div className="sm:hidden space-y-2">
              {tableRows.map((row) => {
                const pct = row.total_tokens > 0
                  ? Math.round((row.input_tokens / row.total_tokens) * 100)
                  : 50;
                return (
                  <div key={row._id} className="bg-surface-light border border-white/5 rounded-xl p-3.5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-xs font-bold text-white">{fmtDate(row.day_key)}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{row.day_key}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center mb-2.5">
                      <div>
                        <p className="text-[10px] uppercase text-primary font-bold tracking-wider mb-0.5">In</p>
                        <p className="font-mono text-xs text-gray-300">{fmtK(row.input_tokens)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-accent font-bold tracking-wider mb-0.5">Out</p>
                        <p className="font-mono text-xs text-gray-300">{fmtK(row.output_tokens)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-emerald-400 font-bold tracking-wider mb-0.5">Total</p>
                        <p className="font-mono text-xs font-bold text-white">{fmtK(row.total_tokens)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden flex">
                        <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                        <div className="h-full bg-accent flex-1" />
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono w-8 text-right">{pct}% in</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop table (hidden on mobile) */}
            <div className="hidden sm:block overflow-x-auto bg-surface-light border border-white/10 rounded-xl">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="bg-black/50 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="py-4 px-5 text-left font-semibold">Date</th>
                    <th className="py-4 px-5 text-right font-semibold">
                      <span className="text-primary flex items-center justify-end gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Input</span>
                    </th>
                    <th className="py-4 px-5 text-right font-semibold">
                      <span className="text-accent flex items-center justify-end gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Output</span>
                    </th>
                    <th className="py-4 px-5 text-right font-semibold">
                      <span className="text-emerald-400 flex items-center justify-end gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> Total</span>
                    </th>
                    <th className="py-4 px-5 text-right font-semibold text-gray-500">Ratio In/Out</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {tableRows.map((row) => {
                    const pct = row.total_tokens > 0
                      ? Math.round((row.input_tokens / row.total_tokens) * 100)
                      : 50;
                    return (
                      <tr
                        key={row._id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-5 text-left font-medium whitespace-nowrap text-white">
                          {fmtDate(row.day_key)}
                          <span className="text-[10px] text-gray-500 ml-3">{row.day_key}</span>
                        </td>
                        <td className="py-3 px-5 text-right text-gray-400">
                          {fmt(row.input_tokens)}
                        </td>
                        <td className="py-3 px-5 text-right text-gray-400">
                          {fmt(row.output_tokens)}
                        </td>
                        <td className="py-3 px-5 text-right font-bold text-white">
                          {fmt(row.total_tokens)}
                        </td>
                        <td className="py-3 px-5">
                          <div className="flex items-center justify-end gap-3">
                            <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden flex">
                              <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                              <div className="h-full bg-accent flex-1" />
                            </div>
                            <span className="text-[10px] text-gray-500 w-6 text-right">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-black/60 font-bold text-xs uppercase tracking-wider">
                    <td className="py-4 px-5 text-gray-400">Period Total</td>
                    <td className="py-4 px-5 text-right text-primary">
                      {fmt(periodTotals.input)}
                    </td>
                    <td className="py-4 px-5 text-right text-accent">
                      {fmt(periodTotals.output)}
                    </td>
                    <td className="py-4 px-5 text-right text-emerald-400">
                      {fmt(periodTotals.total)}
                    </td>
                    <td className="py-4 px-5" />
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsageCard;