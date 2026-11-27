import { useState } from "react";
import {
  BarController, BarElement, CategoryScale, Chart as ChartJS, Legend,
  LinearScale, LineController, LineElement, PointElement, Tooltip,
  type ChartData, type ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import styles from "../styles/surface.module.css";

ChartJS.register(
  BarController, BarElement, CategoryScale, Legend, LinearScale,
  LineController, LineElement, PointElement, Tooltip,
);

const metrics = [
  { key: "input_tokens", label: "Input", color: "#aebfff" },
  { key: "output_tokens", label: "Output", color: "#d6adff" },
  { key: "total_tokens", label: "Total", color: "#f1e8ff" },
] as const;

type Tokens = Record<(typeof metrics)[number]["key"], number>;
export type ConvexUsageData = {
  daily: (Tokens & { _id: string; day_key: string })[];
  lifetime: Tokens;
  _error?: string;
};
export type TimePeriod = "7days" | "30days" | "90days" | "all";
type ChartMode = "bar" | "line";

const quantity = new Intl.NumberFormat();
const compactQuantity = new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 });
const day = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", timeZone: "UTC" });
const formatDay = (value: string) => {
  const timestamp = new Date(value + "T00:00:00Z");
  return Number.isNaN(timestamp.getTime()) ? value : day.format(timestamp);
};

const chartOptions: ChartOptions<ChartMode> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  interaction: { mode: "index", intersect: false },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#bdbbd0", maxTicksLimit: 10 } },
    y: { beginAtZero: true, grid: { color: "#2a2a42" }, ticks: {
      color: "#bdbbd0",
      callback: (value) => compactQuantity.format(Number(value)),
    } },
  },
  plugins: { legend: { labels: { color: "#e2dcef", boxWidth: 9, usePointStyle: true } } },
};

export default function UsageCard({ usageData, timePeriod }: {
  usageData: ConvexUsageData;
  timePeriod: TimePeriod;
}) {
  const [mode, setMode] = useState<ChartMode>("bar");
  const cutoff = new Date();
  const days = timePeriod === "7days" ? 7 : timePeriod === "30days" ? 30 : 90;
  cutoff.setUTCDate(cutoff.getUTCDate() - (days - 1));
  const firstDate = cutoff.toISOString().slice(0, 10);
  const rows = usageData.daily.filter((row) => timePeriod === "all" || row.day_key >= firstDate)
    .sort((a, b) => a.day_key.localeCompare(b.day_key));
  const totals = rows.reduce<Tokens>((sum, row) => ({
    input_tokens: sum.input_tokens + row.input_tokens,
    output_tokens: sum.output_tokens + row.output_tokens,
    total_tokens: sum.total_tokens + row.total_tokens,
  }), { input_tokens: 0, output_tokens: 0, total_tokens: 0 });

  const chart: ChartData<ChartMode> = {
    labels: rows.map((row) => formatDay(row.day_key)),
    datasets: metrics.map(({ key, label, color }) => ({
      label,
      data: rows.map((row) => row[key]),
      borderColor: color,
      backgroundColor: color + "50",
      borderWidth: 2,
      tension: .25,
      pointRadius: rows.length > 30 ? 0 : 2,
    })),
  };

  return (
    <div className={styles.metrics}>
      {usageData._error && <p role="status">Some usage data is unavailable.</p>}
      <dl aria-label="Selected period totals">
        {metrics.map(({ key, label }) => (
          <div className={styles.metric} key={key}><dt>{label} in period</dt><dd>{quantity.format(totals[key])}</dd></div>
        ))}
      </dl>
      {rows.length ? (
        <>
          <div className={styles.panelHeader}>
            <h3>Daily activity</h3>
            <div className={styles.filters} role="group" aria-label="Chart type">
              <button type="button" aria-pressed={mode === "bar"} onClick={() => setMode("bar")}>Bars</button>
              <button type="button" aria-pressed={mode === "line"} onClick={() => setMode("line")}>Lines</button>
            </div>
          </div>
          <div className={styles.chart}>
            <Chart type={mode} data={chart} options={chartOptions} role="img" aria-label="Daily input, output, and total token usage. See the daily breakdown below." />
          </div>
          <div className={styles.tableBox} tabIndex={0} role="region" aria-label="Daily token breakdown">
            <table>
              <caption className="sr-only">Daily token breakdown</caption>
              <thead><tr><th scope="col">Date</th>{metrics.map(({ key, label }) => <th scope="col" key={key}>{label}</th>)}</tr></thead>
              <tbody>{rows.slice().reverse().map((row) => (
                <tr key={row._id}>
                  <th scope="row"><time dateTime={row.day_key}>{formatDay(row.day_key)}</time></th>
                  {metrics.map(({ key }) => <td key={key}>{quantity.format(row[key])}</td>)}
                </tr>
              ))}</tbody>
            </table>
          </div>
        </>
      ) : <p className={styles.empty}>No usage in this period. Activity appears here after you use the Aetheria app.</p>}
      <dl aria-label="Lifetime totals">
        {metrics.map(({ key, label }) => (
          <div className={styles.metric} key={key}><dt>Lifetime {label.toLowerCase()}</dt><dd>{quantity.format(usageData.lifetime[key])}</dd></div>
        ))}
      </dl>
    </div>
  );
}
