import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase, User, getCurrentSession } from '../lib/supabaseClient';
import UsageCard, { ConvexUsageData } from '../components/UsageCard';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FaWindows, FaLinux, FaApple, FaAndroid } from 'react-icons/fa6';
import { ShieldCheck, DownloadCloud, Activity, Zap } from 'lucide-react';

type TimePeriod = '7days' | '30days' | '90days' | 'all';
type PlanType = 'free' | 'pro' | 'elite';

interface UserProfile {
  plan_type: PlanType;
  subscription_status: string;
  current_period_end: string | null;
  _error?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const [usageData, setUsageData] = useState<ConvexUsageData | null>(null);
  const [usageLoading, setUsageLoading] = useState(true);
  const [usageError, setUsageError] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('30days');

  const [profile, setProfile] = useState<UserProfile>({
    plan_type: 'free',
    subscription_status: 'none',
    current_period_end: null,
  });
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const session = await getCurrentSession();
      if (!session) {
        router.push('/auth/login');
        return;
      }
      setUser(session.user);
      setToken(session.access_token);
      setLoading(false);
    }
    getUser();
  }, [router]);

  useEffect(() => {
    if (user && token) {
      fetchConvexUsage();
      fetchProfile();
    }
  }, [user, token]);

  async function fetchProfile() {
    if (!token) return;
    setProfileLoading(true);
    try {
      const res = await fetch('/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Profile fetch failed');
      const data = await res.json();
      setProfile({
        plan_type: (data.plan_type ?? 'free') as PlanType,
        subscription_status: data.subscription_status ?? 'none',
        current_period_end: data.current_period_end ?? null,
        _error: data._error,
      });
    } catch (err: any) {
      console.error('[dashboard] profile fetch error:', err.message);
    } finally {
      setProfileLoading(false);
    }
  }

  async function fetchConvexUsage() {
    if (!token) return;
    setUsageLoading(true);
    setUsageError(null);
    try {
      const res = await fetch('/api/convex-usage?limit=90', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || 'Failed to fetch usage');
      }
      const data: ConvexUsageData = await res.json();
      setUsageData(data);
    } catch (err: any) {
      setUsageError(err.message || 'Error connecting to telemetry server');
    } finally {
      setUsageLoading(false);
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#020202]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/10 border-t-white/80 rounded-full animate-spin mx-auto mb-6" />
          <p className="font-mono text-white/50 text-xs uppercase tracking-widest animate-pulse">Initializing Workspace</p>
        </div>
      </div>
    );
  }

  const platforms = [
    {
      name: 'Windows',
      icon: <FaWindows className="w-5 h-5 text-[#00a4ef]/80" />,
      desc: '64-bit installer (v1.2.23)',
      filename: 'Aetheria.AI.Setup.1.2.23.exe',
      path: 'https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.23/Aetheria.AI.Setup.1.2.23.exe',
      available: true,
    },
    {
      name: 'Linux',
      icon: <FaLinux className="w-5 h-5 text-white/80" />,
      desc: 'AppImage (v1.2.0)',
      filename: 'Aetheria.AI-1.2.0.AppImage',
      path: 'https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.0/Aetheria.AI-1.2.0.AppImage',
      available: true,
    },
    {
      name: 'iOS / Android',
      icon: <FaAndroid className="w-5 h-5 text-emerald-500/80" />,
      desc: 'PWA Mobile',
      path: 'https://aetheria-ai-mobile.vercel.app/',
      available: true,
      isRedirect: true,
    },
    {
      name: 'macOS',
      icon: <FaApple className="w-5 h-5 text-white/40" />,
      desc: 'Coming Soon',
      available: false,
    },
  ];

  const handleDownload = (platform: (typeof platforms)[number]) => {
    if (!platform.available) return;
    if (platform.isRedirect) {
      window.open(platform.path, '_blank');
      return;
    }
    const link = document.createElement('a');
    link.href = platform.path!;
    link.download = platform.filename || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Operator';

  return (
    <Layout>
      <Head>
        <title>Dashboard | Aetheria AI</title>
        <meta name="description" content="Aetheria AI user dashboard — downloads, usage telemetry, and account management." />
      </Head>

      <div className="min-h-screen pb-24 relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-violet/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/[0.05] pb-8"
          >
            <div>
              <div className="text-[10px] text-white/30 font-mono tracking-widest uppercase flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
                SYSTEM: SECURE
              </div>
              <h1 className="text-4xl md:text-5xl font-medium text-white mb-2 tracking-tight">Command Center</h1>
              <p className="text-white/40 font-light tracking-wide">
                Welcome back, <span className="text-white/80">{displayName}</span>.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Identity Panel */}
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-4 h-4 text-white/50" />
                <h3 className="text-sm font-medium tracking-wide text-white/80">Identity</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-mono text-white/30 tracking-widest block mb-1">Name</span>
                  <p className="font-light text-white/80 text-sm">{user?.user_metadata?.name || 'Unknown'}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-white/30 tracking-widest block mb-1">Email</span>
                  <p className="font-light text-white/80 text-sm break-all">{user?.email}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/[0.05]">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-white/30 tracking-widest block mb-1">Auth Method</span>
                    <p className="font-light text-white/80 text-sm">{user?.email ? 'Email' : 'OAuth'}</p>
                  </div>
                  <div className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Binaries Panel */}
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <DownloadCloud className="w-4 h-4 text-white/50" />
                  <h3 className="text-sm font-medium tracking-wide text-white/80">Binaries</h3>
                </div>
                <span className="text-[10px] font-mono text-white/30 tracking-widest px-2 py-1 border border-white/10 rounded">v1.2.23</span>
              </div>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handleDownload(platform)}
                    disabled={!platform.available}
                    className={`w-full p-4 rounded-xl border flex items-center gap-4 text-left transition-all ${
                      platform.available
                        ? 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] group'
                        : 'border-transparent bg-transparent opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/[0.05] group-hover:bg-white/10 transition-colors">
                      {platform.icon}
                    </div>
                    <div className="flex-1">
                      <span className="block font-medium text-sm text-white/80">{platform.name}</span>
                      <span className="block text-xs font-light text-white/40 mt-0.5">{platform.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Access Level Panel */}
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <Zap className="w-4 h-4 text-white/50" />
                <h3 className="text-sm font-medium tracking-wide text-white/80">Access Level</h3>
              </div>

              {profileLoading ? (
                <div className="flex justify-center py-10">
                  <div className="w-5 h-5 border-2 border-white/10 border-t-white/50 rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Free Plan */}
                  <div className={`p-5 rounded-xl border transition-colors ${
                    profile.plan_type === 'free' ? 'border-white/20 bg-white/[0.03]' : 'border-white/[0.05] bg-transparent'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-white/90 font-medium mb-1">Free</h4>
                        <p className="text-xs font-light text-white/40">50k tokens/day</p>
                      </div>
                      {profile.plan_type === 'free' && (
                        <span className="text-[10px] font-mono text-white/50 border border-white/10 px-2 py-0.5 rounded tracking-widest">CURRENT</span>
                      )}
                    </div>
                    {profile.plan_type !== 'free' && (
                       <button 
                         onClick={() => window.open('https://aetheriai.online/#pricing', '_blank')}
                         className="w-full py-2 rounded-lg border border-white/10 text-xs text-white/50 hover:bg-white/5 hover:text-white transition-colors"
                       >
                         Downgrade
                       </button>
                    )}
                  </div>

                  {/* Pro Plan */}
                  <div className={`p-5 rounded-xl border relative transition-colors ${
                    profile.plan_type === 'pro' ? 'border-white/20 bg-white/[0.03]' : 'border-white/[0.05] bg-transparent'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-white/90 font-medium mb-1 flex items-center gap-2">
                          Pro
                          {profile.plan_type === 'free' && <span className="text-[9px] bg-white text-black px-1.5 py-0.5 rounded font-bold tracking-widest uppercase">Popular</span>}
                        </h4>
                        <p className="text-xs font-light text-white/40">5M tokens/mo</p>
                      </div>
                      {profile.plan_type === 'pro' && (
                        <span className="text-[10px] font-mono text-white/50 border border-white/10 px-2 py-0.5 rounded tracking-widest">CURRENT</span>
                      )}
                    </div>
                    {profile.plan_type === 'free' ? (
                       <button 
                         onClick={() => window.open('https://aetheriai.online/#pricing', '_blank')}
                         className="w-full py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                       >
                         Upgrade to Pro
                       </button>
                    ) : profile.plan_type !== 'pro' && (
                       <button 
                         onClick={() => window.open('https://aetheriai.online/#pricing', '_blank')}
                         className="w-full py-2 rounded-lg border border-white/10 text-xs text-white/50 hover:bg-white/5 hover:text-white transition-colors"
                       >
                         {profile.plan_type === 'elite' ? 'Downgrade' : 'Upgrade to Pro'}
                       </button>
                    )}
                  </div>

                  {/* Elite Plan */}
                  <div className={`p-5 rounded-xl border relative transition-colors ${
                    profile.plan_type === 'elite' ? 'border-white/20 bg-white/[0.03]' : 'border-white/[0.05] bg-transparent'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-white/90 font-medium mb-1 flex items-center gap-2">
                          Elite
                          {profile.plan_type !== 'elite' && <span className="text-[9px] border border-purple-500/30 bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded font-bold tracking-widest uppercase">High Capacity</span>}
                        </h4>
                        <p className="text-xs font-light text-white/40">50M tokens/mo</p>
                      </div>
                      {profile.plan_type === 'elite' && (
                        <span className="text-[10px] font-mono text-white/50 border border-white/10 px-2 py-0.5 rounded tracking-widest">CURRENT</span>
                      )}
                    </div>
                    {profile.plan_type !== 'elite' ? (
                       <button 
                         onClick={() => window.open('https://aetheriai.online/#pricing', '_blank')}
                         className="w-full py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                       >
                         Upgrade to Elite
                       </button>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Telemetry Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-white/[0.05]">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-white/50" />
                <div>
                  <h3 className="text-sm font-medium tracking-wide text-white/80">System Telemetry</h3>
                  <p className="text-xs font-light text-white/40 mt-1">Real-time token usage analytics</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex bg-white/[0.02] p-1 rounded-lg border border-white/[0.05]">
                  {(['7days', '30days', '90days', 'all'] as TimePeriod[]).map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimePeriod(period)}
                      className={`px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase rounded transition-all ${
                        timePeriod === period 
                          ? 'bg-white/10 text-white/90 shadow-sm' 
                          : 'text-white/30 hover:text-white/60'
                      }`}
                    >
                      {period === 'all' ? 'All' : period === '7days' ? '7D' : period === '30days' ? '30D' : '90D'}
                    </button>
                  ))}
                </div>
                <button
                  onClick={fetchConvexUsage}
                  disabled={usageLoading}
                  className="p-2 rounded-lg border border-white/10 text-white/30 hover:text-white/80 hover:bg-white/5 transition-all disabled:opacity-50"
                  title="Refresh data"
                >
                  <Activity className={`w-3 h-3 ${usageLoading ? 'animate-pulse' : ''}`} />
                </button>
              </div>
            </div>

            {usageError ? (
              <div className="p-8 text-center border border-red-500/10 bg-red-500/5 rounded-xl">
                <p className="text-red-400/80 text-sm mb-4">{usageError}</p>
                <button
                  onClick={fetchConvexUsage}
                  className="px-4 py-2 bg-red-500/10 text-red-400 text-xs font-mono tracking-widest uppercase rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            ) : (
              <div className="opacity-80 hover:opacity-100 transition-opacity duration-500">
                <UsageCard
                  usageData={usageData}
                  isLoading={usageLoading}
                  timePeriod={timePeriod}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}