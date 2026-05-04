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
        backgroundColor: 'rgba(204, 255, 0, 0.85)',   // neo-lime
        borderColor: '#000000',
        borderWidth: 2,
        fill: chartMode === 'line',
        tension: 0.35,
      },
      {
        label: 'Output Tokens',
        data: chartRows.map(r => r.output_tokens),
        backgroundColor: 'rgba(255, 77, 155, 0.85)',  // neo-pink
        borderColor: '#000000',
        borderWidth: 2,
        fill: false,
        tension: 0.35,
      },
      {
        label: 'Total Tokens',
        data: chartRows.map(r => r.total_tokens),
        backgroundColor: 'rgba(0, 255, 255, 0.85)',   // neo-cyan
        borderColor: '#000000',
        borderWidth: 2,
        fill: false,
        tension: 0.35,
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
        grid: { color: 'rgba(0,0,0,0.07)' },
        ticks: { color: '#000', font: { family: 'JetBrains Mono', size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.07)' },
        ticks: {
          color: '#000',
          font: { family: 'JetBrains Mono', size: 11 },
          callback: (v) => fmtK(Number(v)),
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#000',
          font: { family: 'Space Grotesk', weight: 'bold' as const, size: 12 },
          boxWidth: 14,
          boxHeight: 14,
        },
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#ccff00',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        titleFont: { family: 'Space Grotesk', weight: 'bold' as const },
        bodyFont: { family: 'JetBrains Mono' },
        callbacks: {
          label: ctx => ` ${ctx.dataset.label}: ${fmt(ctx.parsed.y)}`,
        },
      },
    },
  };

  // ── Loading State ───────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="card-brutal">
        <h3 className="text-xl font-black uppercase mb-4">Usage Metrics</h3>
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="w-12 h-12 border-4 border-black border-t-neo-lime rounded-full animate-spin" />
          <p className="font-mono text-sm uppercase tracking-widest animate-pulse">Fetching telemetry...</p>
        </div>
      </div>
    );
  }

  // ── No Data State ───────────────────────────────────────────────────────────
  const hasData = chartRows.length > 0;

  return (
    <div className="card-brutal space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-black uppercase bg-black text-neo-lime inline-block px-3 py-1">
          Usage Telemetry // Convex
        </h3>
        {usageData?._error && (
          <span className="text-xs font-mono text-orange-600 border border-orange-400 bg-orange-50 px-2 py-1">
            ⚠ Partial data: {usageData._error}
          </span>
        )}
      </div>

      {/* ── Lifetime Stats ───────────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-black uppercase text-gray-500 mb-3 tracking-widest">Lifetime Total</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="border-2 border-black p-3 bg-neo-lime">
            <span className="text-[10px] font-black uppercase block text-gray-700">Input</span>
            <span className="text-2xl font-mono font-black">{fmtK(lifetime?.input_tokens ?? 0)}</span>
            <span className="text-[10px] font-mono text-gray-600 block">{fmt(lifetime?.input_tokens ?? 0)}</span>
          </div>
          <div className="border-2 border-black p-3 bg-neo-pink">
            <span className="text-[10px] font-black uppercase block text-gray-700">Output</span>
            <span className="text-2xl font-mono font-black">{fmtK(lifetime?.output_tokens ?? 0)}</span>
            <span className="text-[10px] font-mono text-gray-600 block">{fmt(lifetime?.output_tokens ?? 0)}</span>
          </div>
          <div className="border-2 border-black p-3 bg-black text-white">
            <span className="text-[10px] font-black uppercase block text-neo-cyan">Total</span>
            <span className="text-2xl font-mono font-black text-neo-lime">{fmtK(lifetime?.total_tokens ?? 0)}</span>
            <span className="text-[10px] font-mono text-gray-400 block">{fmt(lifetime?.total_tokens ?? 0)}</span>
          </div>
        </div>
      </div>

      {/* ── Period Summary ───────────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-black uppercase text-gray-500 mb-3 tracking-widest">
          Period: {timePeriod === 'all' ? 'All Time' : timePeriod} ({chartRows.length} days active)
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Input', val: periodTotals.input, color: 'border-neo-lime' },
            { label: 'Output', val: periodTotals.output, color: 'border-neo-pink' },
            { label: 'Total', val: periodTotals.total, color: 'border-neo-cyan' },
          ].map(({ label, val, color }) => (
            <div key={label} className={`border-2 ${color} p-3 bg-white`}>
              <span className="text-[10px] font-black uppercase block text-gray-500">{label}</span>
              <span className="text-xl font-mono font-black">{fmtK(val)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Chart ─────────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="font-bold uppercase text-sm">Daily Token Velocity</span>
          <div className="flex gap-2">
            {(['bar', 'line'] as ChartMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setChartMode(mode)}
                className={`px-3 py-1 text-xs font-bold uppercase border-2 border-black transition-all ${
                  chartMode === mode ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 border-2 border-black p-3 bg-white">
          {hasData ? (
            chartMode === 'bar' ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <Line data={chartData as any} options={chartOptions as any} />
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <span className="text-5xl">📊</span>
              <p className="font-bold uppercase text-sm">No data for this period</p>
              <p className="font-mono text-xs text-gray-500">Use the AI-OS app to generate usage data.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Daily Breakdown Table ────────────────────────────────────────────── */}
      <div>
        <h4 className="text-lg font-black uppercase mb-4 border-b-4 border-black pb-2">
          Daily Breakdown
        </h4>

        {tableRows.length === 0 ? (
          <div className="border-2 border-dashed border-gray-400 p-8 text-center">
            <p className="font-mono text-sm text-gray-500">No usage records found for this period.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border-2 border-black">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="bg-black text-white text-xs uppercase">
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-right border-l border-gray-700">
                    <span className="text-neo-lime">Input</span>
                  </th>
                  <th className="py-3 px-4 text-right border-l border-gray-700">
                    <span className="text-neo-pink">Output</span>
                  </th>
                  <th className="py-3 px-4 text-right border-l border-gray-700">
                    <span className="text-neo-cyan">Total</span>
                  </th>
                  <th className="py-3 px-4 text-right border-l border-gray-700">% In/Out</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, idx) => {
                  const pct = row.total_tokens > 0
                    ? Math.round((row.input_tokens / row.total_tokens) * 100)
                    : 50;
                  return (
                    <tr
                      key={row._id}
                      className={`border-b border-black hover:bg-neo-yellow transition-colors cursor-default ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="py-2 px-4 text-left font-bold whitespace-nowrap">
                        {fmtDate(row.day_key)}
                        <span className="text-[10px] text-gray-400 ml-2">{row.day_key}</span>
                      </td>
                      <td className="py-2 px-4 text-right border-l border-gray-200">
                        {fmt(row.input_tokens)}
                      </td>
                      <td className="py-2 px-4 text-right border-l border-gray-200">
                        {fmt(row.output_tokens)}
                      </td>
                      <td className="py-2 px-4 text-right border-l border-gray-200 font-bold">
                        {fmt(row.total_tokens)}
                      </td>
                      <td className="py-2 px-4 border-l border-gray-200">
                        {/* Mini ratio bar */}
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 flex-1 border border-black overflow-hidden flex">
                            <div className="h-full bg-neo-lime" style={{ width: `${pct}%` }} />
                            <div className="h-full bg-neo-pink flex-1" />
                          </div>
                          <span className="text-[10px] whitespace-nowrap">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-black text-white font-bold text-xs uppercase">
                  <td className="py-2 px-4">Period Total</td>
                  <td className="py-2 px-4 text-right border-l border-gray-700 text-neo-lime">
                    {fmt(periodTotals.input)}
                  </td>
                  <td className="py-2 px-4 text-right border-l border-gray-700 text-neo-pink">
                    {fmt(periodTotals.output)}
                  </td>
                  <td className="py-2 px-4 text-right border-l border-gray-700 text-neo-cyan">
                    {fmt(periodTotals.total)}
                  </td>
                  <td className="py-2 px-4 border-l border-gray-700" />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsageCard;