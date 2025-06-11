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
        borderColor = 'rgb(75, 192, 192)';
        backgroundColor = 'rgba(75, 192, 192, 0.2)';
        break;
      case 'output':
        tokenData = dailyData.map(day => day.output_tokens);
        borderColor = 'rgb(153, 102, 255)';
        backgroundColor = 'rgba(153, 102, 255, 0.2)';
        break;
      case 'total':
      default:
        tokenData = dailyData.map(day => day.total_tokens);
        borderColor = 'rgb(54, 162, 235)';
        backgroundColor = 'rgba(54, 162, 235, 0.2)';
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
          tension: 0.4,
        },
      ],
    };
  }, [dailyData, tokenType]);

  // Determine usage level for visual indicator
  const getUsageLevel = useMemo(() => {
    if (!filteredMetrics || filteredMetrics.request_count === 0) {
      return { color: 'bg-gray-400', text: 'No data' };
    }
    
    const requestCount = filteredMetrics.request_count;
    
    if (requestCount === 0) return { color: 'bg-gray-400', text: 'No usage' };
    if (requestCount < 5) return { color: 'bg-green-400', text: 'Low' };
    if (requestCount < 20) return { color: 'bg-blue-400', text: 'Moderate' };
    if (requestCount < 50) return { color: 'bg-yellow-400', text: 'High' };
    return { color: 'bg-purple-400', text: 'Intensive' };
  }, [filteredMetrics]);

  if (isLoading) {
    return (
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Usage Metrics</h3>
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-center text-gray-400 mt-4">Loading your usage data...</p>
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
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          callback: function(value) {
            if (typeof value === 'number') {
              return formatNumber(value);
            }
            return value;
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        callbacks: {
          label: function(context) {
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
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Usage Metrics</h3>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-400 mb-4">No usage data available for this time period</p>
            <p className="text-sm text-gray-500">Start using the application to generate usage data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Usage Metrics</h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Requests ({timePeriod === 'all' ? 'All Time' : timePeriod}):</span>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getUsageLevel.color} text-gray-800`}>
            {getUsageLevel.text}
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-3xl font-bold text-blue-400 mr-2">
            {formatNumber(filteredMetrics.request_count)}
          </span>
          <div className="h-2 flex-grow bg-gray-700 rounded-full overflow-hidden">
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
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Token Usage Over Time:</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => setTokenType('total')}
              className={`px-3 py-1 rounded-lg text-xs ${tokenType === 'total' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Total
            </button>
            <button 
              onClick={() => setTokenType('input')}
              className={`px-3 py-1 rounded-lg text-xs ${tokenType === 'input' ? 'bg-teal-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Input
            </button>
            <button 
              onClick={() => setTokenType('output')}
              className={`px-3 py-1 rounded-lg text-xs ${tokenType === 'output' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Output
            </button>
          </div>
        </div>
        <div className="h-64">
          {dailyData.length > 1 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Not enough data points to display a chart</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <span className="text-gray-400 text-sm">Input Tokens</span>
          <p className="font-medium">{formatNumber(filteredMetrics.input_tokens)}</p>
        </div>
        <div className="text-center">
          <span className="text-gray-400 text-sm">Output Tokens</span>
          <p className="font-medium">{formatNumber(filteredMetrics.output_tokens)}</p>
        </div>
        <div className="text-center">
          <span className="text-gray-400 text-sm">Total Tokens</span>
          <p className="font-medium">{formatNumber(filteredMetrics.total_tokens)}</p>
        </div>
      </div>

      {/* Usage Summary Table */}
      {dailyData.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3">Daily Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 text-left">Date</th>
                  <th className="py-2 text-right">Requests</th>
                  <th className="py-2 text-right">Input Tokens</th>
                  <th className="py-2 text-right">Output Tokens</th>
                  <th className="py-2 text-right">Total Tokens</th>
                </tr>
              </thead>
              <tbody>
                {dailyData.map((day) => (
                  <tr key={day.date} className="border-b border-gray-800">
                    <td className="py-2 text-left">{new Date(day.date).toLocaleDateString()}</td>
                    <td className="py-2 text-right">{formatNumber(day.request_count)}</td>
                    <td className="py-2 text-right">{formatNumber(day.input_tokens)}</td>
                    <td className="py-2 text-right">{formatNumber(day.output_tokens)}</td>
                    <td className="py-2 text-right">{formatNumber(day.total_tokens)}</td>
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