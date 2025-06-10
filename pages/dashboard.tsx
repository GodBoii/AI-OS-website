import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase, User } from '../lib/supabaseClient';
import UsageCard from '../components/UsageCard';

// Define the UsageMetrics type
type UsageMetrics = {
  id: string;
  user_id: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  request_count: number;
  updated_at: string;
  created_at: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [usageMetrics, setUsageMetrics] = useState<UsageMetrics | null>(null);
  const [usageLoading, setUsageLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return router.push('/auth/login');
      setUser(session.user);
      setToken(session.access_token);
      setLoading(false);
    }
    getUser();
  }, [router]);

  useEffect(() => {
    async function fetchUsageMetrics() {
      if (!user || !token) return;
      
      try {
        // Try to fetch from API first
        const response = await fetch('/api/usage', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUsageMetrics(data);
        } else {
          // Fallback to direct Supabase query if API fails
          console.warn('API request failed, falling back to direct query');
          const { data, error } = await supabase
            .from('usage_metrics')
            .select('*')
            .eq('user_id', user.id)
            .single();
            
          if (error) {
            console.error('Error fetching usage metrics:', error);
          } else {
            setUsageMetrics(data);
          }
        }
      } catch (error) {
        console.error('Exception fetching usage metrics:', error);
      } finally {
        setUsageLoading(false);
      }
    }
    
    if (user && token) {
      fetchUsageMetrics();
    }
  }, [user, token]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen hero-pattern">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const platforms = [
    { 
      name: 'Windows', 
      emoji: '🪟', 
      desc: '64-bit installer',
      filename: 'AI-OS Setup 1.0.0.exe',
      path: 'https://github.com/GodBoii/AI-OS-website/releases/download/v1.0.0/AI-OS.Setup.1.0.1.exe',
      available: true
    },
    { 
      name: 'macOS', 
      emoji: '🍎', 
      desc: 'Universal (Intel/Apple Silicon)',
      filename: '',
      path: '',
      available: false
    },
    { 
      name: 'Linux', 
      emoji: '🐧', 
      desc: 'AppImage',
      filename: '',
      path: '',
      available: false
    }
  ];

  const handleDownload = (platform: typeof platforms[0]) => {
    if (!platform.available) return;
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = platform.path;
    link.download = platform.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Head>
        <title>Dashboard - AI-OS</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <div className="pt-20 min-h-screen hero-pattern">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome to your Dashboard</h1>
            <p className="text-gray-400 text-base sm:text-lg">Manage your AI-OS experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Profile Card */}
            <div className="glass-effect rounded-xl p-4 sm:p-6 w-full">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Profile Information</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <span className="text-gray-400">Name:</span>
                  <p className="font-medium break-words">{user?.user_metadata?.name || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-gray-400">Email:</span>
                  <p className="font-medium break-words">{user?.email}</p>
                </div>
                <div>
                  <span className="text-gray-400">Plan:</span>
                  <p className="text-green-400 font-medium">Free</p>
                </div>
                <div>
                  <span className="text-gray-400">Joined:</span>
                  <p>{new Date(user?.created_at || '').toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}</p>
                </div>
              </div>
            </div>
            
            {/* Download Card */}
            <div className="glass-effect rounded-xl p-4 sm:p-6 w-full">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Download AI-OS</h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Latest version: v1.0.0</p>
              <div className="space-y-2 sm:space-y-3">
                {platforms.map((platform) => (
                  <button 
                    key={platform.name} 
                    onClick={() => handleDownload(platform)}
                    className={`w-full py-2 ${platform.available ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'} rounded-lg transition-colors transform hover:scale-105 flex items-center justify-center text-sm sm:text-base`}
                  >
                    <span className="mr-2">{platform.emoji}</span>
                    <span>
                      {platform.available 
                        ? `Download for ${platform.name}` 
                        : `${platform.name} - Coming Soon`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Subscription Card */}
            <div className="glass-effect rounded-xl p-4 sm:p-6 w-full">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Subscription</h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Upgrade to unlock premium features</p>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <span className="font-semibold">Pro</span>
                    <span className="text-blue-400">$19/month</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-gray-300 space-y-1 mb-3 sm:mb-4">
                    <li>✓ Advanced AI capabilities</li>
                    <li>✓ Priority support</li>
                    <li>✓ Custom workflows</li>
                  </ul>
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors transform hover:scale-105 text-xs sm:text-base">
                    Upgrade to Pro
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-lg p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <span className="font-semibold">Enterprise</span>
                    <span className="text-purple-400">Custom pricing</span>
                  </div>
                  <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors transform hover:scale-105 text-xs sm:text-base">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>

            {/* Usage Metrics Card - Takes full width */}
            <div className="col-span-1 md:col-span-3 mt-4 sm:mt-6">
              <UsageCard metrics={usageMetrics} isLoading={usageLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}