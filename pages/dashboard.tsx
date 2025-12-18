import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase, User, getCurrentSession } from '../lib/supabaseClient';
import UsageCard from '../components/UsageCard';
import Layout from '../components/Layout'; // Import Layout to ensure consistent header/footer

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

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [usageData, setUsageData] = useState<UsageResponse | null>(null);
  const [usageLoading, setUsageLoading] = useState(true);
  const [usageError, setUsageError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('7days');

  useEffect(() => {
    async function getUser() {
      console.log('Dashboard: Checking session...');
      const session = await getCurrentSession();
      console.log('Dashboard: Session check result:', session ? 'Session found' : 'No session');

      if (!session) {
        console.log('Dashboard: No session, redirecting to login...');
        return router.push('/auth/login');
      }

      console.log('Dashboard: Authenticated as', session.user.email);
      setUser(session.user);
      setToken(session.access_token);
      setLoading(false);
    }
    getUser();
  }, [router]);

  useEffect(() => {
    if (user && token) {
      fetchUsageData();
    }
  }, [user, token]);

  function fetchUsageData() {
    if (!user || !token) return;

    setUsageLoading(true);
    setUsageError(null);

    console.log('Fetching usage data for user:', user.id);

    fetch('/api/usage', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          console.log('Received usage data:', data);
          setUsageData(data);
        } else {
          const errorData = await response.json().catch(() => null);
          const errorText = errorData?.error || response.statusText;
          console.error('Failed to fetch usage data:', errorText);
          setUsageError(errorText || 'Failed to fetch usage data');
        }
      })
      .catch((error) => {
        console.error('Exception fetching usage data:', error);
        setUsageError('Error connecting to the server');
      })
      .finally(() => {
        setUsageLoading(false);
      });
  }

  const handleRetryFetch = () => {
    fetchUsageData();
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-neo-bg">
      <div className="w-20 h-20 border-8 border-black border-t-neo-lime rounded-full animate-spin"></div>
    </div>
  );

  const platforms = [
    {
      name: 'Windows',
      emoji: '🪟',
      desc: '64-bit installer (v1.1.5)',
      filename: 'Aetheria.AI.Setup.1.1.5.exe',
      path: 'https://github.com/GodBoii/AI-OS-website/releases/download/v1.1.5/Aetheria.AI.Setup.1.1.5.exe',
      available: true
    },
    {
      name: 'Linux',
      emoji: '🐧',
      desc: 'AppImage (v1.1.5)',
      filename: 'Aetheria.AI-1.1.5.AppImage',
      path: 'https://github.com/GodBoii/AI-OS-website/releases/download/v1.1.5/Aetheria.AI-1.1.5.AppImage',
      available: true
    },
    {
      name: 'iOS',
      emoji: '📲',
      desc: 'PWA Mobile',
      path: 'https://aetheria-ai-mobile.vercel.app/',
      available: true,
      isRedirect: true
    },
    {
      name: 'Android',
      emoji: '�',
      desc: 'PWA Mobile',
      path: 'https://aetheria-ai-mobile.vercel.app/',
      available: true,
      isRedirect: true
    },
    {
      name: 'macOS',
      emoji: '🍎',
      desc: 'Coming Soon',
      available: false
    }
  ];

  const handleDownload = (platform: any) => {
    if (!platform.available) return;

    if (platform.isRedirect) {
      window.open(platform.path, '_blank');
      return;
    }

    const link = document.createElement('a');
    link.href = platform.path;
    link.download = platform.filename || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTimePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period);
  };

  return (
    <Layout>
      <Head>
        <title>DASHBOARD // Aetheria AI</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <div className="bg-neo-bg min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-12 border-l-8 border-black pl-6">
            <h1 className="text-5xl md:text-6xl font-black uppercase mb-2">Command Center</h1>
            <p className="text-xl font-mono text-gray-600">Welcome back, Operator.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="card-brutal bg-white group hover:bg-black hover:text-white transition-colors">
              <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black group-hover:border-white pb-2">Identity</h3>
              <div className="space-y-4 font-mono">
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 group-hover:text-gray-400">Name</span>
                  <p className="font-bold text-lg">{user?.user_metadata?.name || 'Unknown'}</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 group-hover:text-gray-400">Email</span>
                  <p className="font-bold break-words">{user?.email}</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 group-hover:text-gray-400">Status</span>
                  <p className="text-neo-lime font-bold uppercase bg-black group-hover:bg-neo-lime group-hover:text-black inline-block px-2">Active Agent</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 group-hover:text-gray-400">User ID</span>
                  <p className="text-xs break-all opacity-50">{user?.id}</p>
                </div>
              </div>
            </div>

            {/* Download Card */}
            <div className="card-brutal bg-neo-yellow">
              <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Binaries</h3>
              <p className="font-mono mb-4 text-sm bg-white border border-black inline-block px-2">Latest Build: v1.1.5</p>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handleDownload(platform)}
                    className={`w-full py-3 border-2 border-black font-bold uppercase shadow-brutal-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center ${platform.available ? 'bg-white hover:bg-black hover:text-white' : 'bg-gray-300 opacity-50 cursor-not-allowed'}`}
                  >
                    <span className="mr-3 text-xl">{platform.emoji}</span>
                    <span>
                      {platform.available
                        ? `Get for ${platform.name}`
                        : `${platform.name} // Locked`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription Card */}
            <div className="card-brutal bg-neo-pink">
              <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Access Level</h3>
              <div className="space-y-4">
                <div className="bg-white border-2 border-black p-4 shadow-brutal-sm relative">
                  <div className="absolute -top-3 -right-3 bg-black text-white px-2 py-1 text-xs font-bold uppercase transform rotate-12">Recommended</div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-black uppercase text-xl">Pro</span>
                    <span className="font-mono font-bold">$19/mo</span>
                  </div>
                  <button className="w-full py-2 bg-black text-white hover:bg-gray-800 font-bold uppercase transition-colors">
                    Upgrade Access
                  </button>
                </div>

                <div className="bg-white border-2 border-black p-4 shadow-brutal-sm opacity-75 hover:opacity-100 transition-opacity">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-black uppercase text-xl">Enterprise</span>
                    <span className="font-mono font-bold">Custom</span>
                  </div>
                  <button className="w-full py-2 border-2 border-black hover:bg-black hover:text-white font-bold uppercase transition-colors">
                    Contact Command
                  </button>
                </div>
              </div>
            </div>

            {/* Usage Metrics Card - Takes full width */}
            <div className="col-span-1 md:col-span-3 mt-8">
              <div className="flex flex-wrap gap-4 mb-6 items-center">
                <h3 className="text-2xl font-black uppercase mr-auto">System Telemetry</h3>
                <div className="flex space-x-2 bg-white border-2 border-black p-1">
                  {(['7days', '30days', '90days', 'all'] as TimePeriod[]).map((period) => (
                    <button
                      key={period}
                      onClick={() => handleTimePeriodChange(period)}
                      className={`px-4 py-2 text-xs font-bold uppercase transition-colors ${timePeriod === period ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}
                    >
                      {period === 'all' ? 'All Time' : period}
                    </button>
                  ))}
                </div>
              </div>

              {usageError ? (
                <div className="card-brutal bg-red-100 border-red-500">
                  <h3 className="text-xl font-black text-red-600 mb-4 uppercase">System Error</h3>
                  <div className="font-mono p-4 border-2 border-red-500 bg-white mb-4 text-red-600">
                    <p><strong>Error Log:</strong> {usageError}</p>
                  </div>
                  <button
                    onClick={handleRetryFetch}
                    className="px-6 py-3 bg-red-500 text-white font-bold uppercase hover:bg-red-600 border-2 border-black shadow-brutal"
                  >
                    Retry Connection
                  </button>
                </div>
              ) : (
                <UsageCard
                  usageData={usageData}
                  isLoading={usageLoading}
                  timePeriod={timePeriod}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}