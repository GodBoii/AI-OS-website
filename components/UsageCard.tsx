import React, { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define the RequestLog type
type RequestLog = {
  id: string;
  user_id: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  created_at: string;
};

// Define the API response type
type UsageResponse = {
  logs: RequestLog[];
  totalMetrics: {
    request_count: number;
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
};

// Define time period options
type TimePeriod = '7days' | '30days' | '90days' | 'all';

// Define token type options for the chart
type TokenType = 'total' | 'input' | 'output';

interface UsageCardProps {
  usageData: UsageResponse | null;
  isLoading: boolean;
  timePeriod: TimePeriod;
}

// Helper function to format numbers with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Group logs by day
const groupLogsByDay = (logs: RequestLog[]): Record<string, {
  date: string,
  total_tokens: number,
  input_tokens: number,
  output_tokens: number,
  request_count: number
}> => {
  const grouped: Record<string, {
    date: string,
    total_tokens: number,
    input_tokens: number,
    output_tokens: number,
    request_count: number
  }> = {};

  if (!logs || logs.length === 0) return grouped;

  logs.forEach(log => {
    // Format as YYYY-MM-DD
    const date = new Date(log.created_at).toISOString().split('T')[0];

    if (!grouped[date]) {
      grouped[date] = {
        date,
        total_tokens: 0,
        input_tokens: 0,
        output_tokens: 0,
        request_count: 0
      };
    }

    grouped[date].total_tokens += log.total_tokens || 0;
    grouped[date].input_tokens += log.input_tokens || 0;
    grouped[date].output_tokens += log.output_tokens || 0;
    grouped[date].request_count += 1;
  });

  return grouped;
};

// Filter logs by time period
const filterLogsByTimePeriod = (logs: RequestLog[], period: TimePeriod): RequestLog[] => {
  if (!logs || logs.length === 0) return [];
  if (period === 'all') return logs;

  const now = new Date();
  let cutoffDate: Date;

  switch (period) {
    case '7days':
      cutoffDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case '30days':
      cutoffDate = new Date(now.setDate(now.getDate() - 30));
      break;
    case '90days':
      cutoffDate = new Date(now.setDate(now.getDate() - 90));
      break;
    default:
      cutoffDate = new Date(now.setDate(now.getDate() - 7));
  }

  return logs.filter(log => new Date(log.created_at) >= cutoffDate);
};

const UsageCard: React.FC<UsageCardProps> = ({ usageData, isLoading, timePeriod }) => {
  // State for token type selection
  const [tokenType, setTokenType] = useState<TokenType>('total');

  // Filter logs by time period
  const filteredLogs = useMemo(() => {
    if (!usageData?.logs) return [];
    return filterLogsByTimePeriod(usageData.logs, timePeriod);
  }, [usageData, timePeriod]);

  // Group filtered logs by day
  const dailyData = useMemo(() => {
    const grouped = groupLogsByDay(filteredLogs);

    // Sort by date (ascending)
    return Object.values(grouped).sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [filteredLogs]);

  // Calculate metrics for the filtered period
  const filteredMetrics = useMemo(() => {
    if (filteredLogs.length === 0) {
      return {
        request_count: 0,
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0
      };
    }

    return {
      request_count: filteredLogs.length,
      input_tokens: filteredLogs.reduce((sum, log) => sum + (log.input_tokens || 0), 0),
      output_tokens: filteredLogs.reduce((sum, log) => sum + (log.output_tokens || 0), 0),
      total_tokens: filteredLogs.reduce((sum, log) => sum + (log.total_tokens || 0), 0)
    };
  }, [filteredLogs]);

  // Prepare chart data based on selected token type
  const chartData = useMemo(() => {
    const labels = dailyData.map(day => day.date);

    // Select data based on token type
    let tokenData: number[];
    let borderColor: string;
    let backgroundColor: string;

    switch (tokenType) {
      case 'input':
        tokenData = dailyData.map(day => day.input_tokens);
        borderColor = '#000000';
        backgroundColor = '#ccff00'; // neo-lime
        break;
      case 'output':
        tokenData = dailyData.map(day => day.output_tokens);
        borderColor = '#000000';
        backgroundColor = '#FF4D9B'; // neo-pink
        break;
      case 'total':
      default:
        tokenData = dailyData.map(day => day.total_tokens);
        borderColor = '#000000';
        backgroundColor = '#00ffff'; // neo-cyan
    }

    return {
      labels,
      datasets: [
        {
          label: `${tokenType.charAt(0).toUpperCase() + tokenType.slice(1)} Tokens`,
          data: tokenData,
          fill: true,
          backgroundColor,
          borderColor,
          borderWidth: 2,
          tension: 0, // Sharp lines for brutalism
        },
      ],
    };
  }, [dailyData, tokenType]);

  // Determine usage level for visual indicator
  const getUsageLevel = useMemo(() => {
    if (!filteredMetrics || filteredMetrics.request_count === 0) {
      return { color: 'bg-gray-200', text: 'No data' };
    }

    const requestCount = filteredMetrics.request_count;

    if (requestCount === 0) return { color: 'bg-gray-200', text: 'No usage' };
    if (requestCount < 5) return { color: 'bg-neo-lime', text: 'Low' };
    if (requestCount < 20) return { color: 'bg-neo-blue', text: 'Moderate' };
    if (requestCount < 50) return { color: 'bg-neo-yellow', text: 'High' };
    return { color: 'bg-neo-pink', text: 'Intensive' };
  }, [filteredMetrics]);

  if (isLoading) {
    return (
      <div className="card-brutal">
        <h3 className="text-xl font-black uppercase mb-4">Usage Metrics</h3>
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-center font-mono mt-4">SYNCING DATA...</p>
      </div>
    );
  }

  // Chart options
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#000000',
          font: { family: 'Space Grotesk', weight: 'bold' },
          callback: function (value) {
            if (typeof value === 'number') {
              return formatNumber(value);
            }
            return value;
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#000000',
          font: { family: 'Space Grotesk', weight: 'bold' }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#000000',
          font: { family: 'Space Grotesk', weight: 'bold' }
        }
      },
      tooltip: {
        backgroundColor: '#000000',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        titleFont: { family: 'Space Grotesk' },
        bodyFont: { family: 'JetBrains Mono' },
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatNumber(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

  // No data scenario
  if (!usageData || !usageData.logs || usageData.logs.length === 0) {
    return (
      <div className="card-brutal">
        <h3 className="text-xl font-black uppercase mb-4">Usage Metrics</h3>
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-400 bg-gray-50">
          <div className="text-center">
            <p className="font-bold uppercase mb-2">No Data Found</p>
            <p className="font-mono text-sm">Initialize system to generate telemetry.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-brutal">
      <h3 className="text-xl font-black uppercase mb-6 bg-black text-white inline-block px-2">Usage Telemetry</h3>

      <div className="mb-8 border-2 border-black p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold uppercase text-sm">Requests ({timePeriod === 'all' ? 'All Time' : timePeriod}):</span>
          <div className={`px-3 py-1 font-bold uppercase text-xs border border-black ${getUsageLevel.color} text-black`}>
            {getUsageLevel.text}
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-4xl font-black mr-4 font-mono">
            {formatNumber(filteredMetrics.request_count)}
          </span>
          <div className="h-4 flex-grow border-2 border-black bg-white rounded-none overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/stripe.png')] opacity-10"></div>
            <div
              className={`h-full ${getUsageLevel.color}`}
              style={{
                width: `${Math.min(100, (filteredMetrics.request_count / 50) * 100)}%`
              }}
            ></div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold uppercase text-sm">Token Velocity:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setTokenType('total')}
              className={`px-3 py-1 text-xs font-bold uppercase border-2 border-black transition-all ${tokenType === 'total' ? 'bg-black text-white' : 'bg-white hover:bg-gray-200'}`}
            >
              Total
            </button>
            <button
              onClick={() => setTokenType('input')}
              className={`px-3 py-1 text-xs font-bold uppercase border-2 border-black transition-all ${tokenType === 'input' ? 'bg-neo-lime text-black' : 'bg-white hover:bg-gray-200'}`}
            >
              Input
            </button>
            <button
              onClick={() => setTokenType('output')}
              className={`px-3 py-1 text-xs font-bold uppercase border-2 border-black transition-all ${tokenType === 'output' ? 'bg-neo-pink text-black' : 'bg-white hover:bg-gray-200'}`}
            >
              Output
            </button>
          </div>
        </div>
        <div className="h-64 border-2 border-black p-2 bg-white">
          {dailyData.length > 1 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="font-mono text-sm">INSUFFICIENT DATA POINTS</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="text-center border-2 border-neo-lime p-2 bg-black text-white">
          <span className="text-xs uppercase font-bold text-neo-lime">Input Tokens</span>
          <p className="font-mono font-bold text-lg">{formatNumber(filteredMetrics.input_tokens)}</p>
        </div>
        <div className="text-center border-2 border-neo-pink p-2 bg-black text-white">
          <span className="text-xs uppercase font-bold text-neo-pink">Output Tokens</span>
          <p className="font-mono font-bold text-lg">{formatNumber(filteredMetrics.output_tokens)}</p>
        </div>
        <div className="text-center border-2 border-neo-cyan p-2 bg-black text-white">
          <span className="text-xs uppercase font-bold text-neo-cyan">Total Tokens</span>
          <p className="font-mono font-bold text-lg">{formatNumber(filteredMetrics.total_tokens)}</p>
        </div>
      </div>

      {/* Usage Summary Table */}
      {dailyData.length > 0 && (
        <div className="mt-8 border-t-2 border-black pt-6">
          <h4 className="text-lg font-black uppercase mb-4">Daily Breakdown</h4>
          <div className="overflow-x-auto border-2 border-black">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="bg-black text-white text-xs uppercase">
                  <th className="py-2 px-3 text-left">Date</th>
                  <th className="py-2 px-3 text-right border-l border-gray-700">Reqs</th>
                  <th className="py-2 px-3 text-right border-l border-gray-700">In</th>
                  <th className="py-2 px-3 text-right border-l border-gray-700">Out</th>
                  <th className="py-2 px-3 text-right border-l border-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {dailyData.map((day) => (
                  <tr key={day.date} className="border-b border-black hover:bg-neo-yellow transition-colors">
                    <td className="py-2 px-3 text-left font-bold">{new Date(day.date).toLocaleDateString()}</td>
                    <td className="py-2 px-3 text-right border-l border-black">{formatNumber(day.request_count)}</td>
                    <td className="py-2 px-3 text-right border-l border-black">{formatNumber(day.input_tokens)}</td>
                    <td className="py-2 px-3 text-right border-l border-black">{formatNumber(day.output_tokens)}</td>
                    <td className="py-2 px-3 text-right border-l border-black">{formatNumber(day.total_tokens)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageCard; 