import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase, User, getCurrentSession } from '../lib/supabaseClient';
import UsageCard, { ConvexUsageData } from '../components/UsageCard';
import Layout from '../components/Layout';

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

  // Profile / plan state
  const [profile, setProfile] = useState<UserProfile>({
    plan_type: 'free',
    subscription_status: 'none',
    current_period_end: null,
  });
  const [profileLoading, setProfileLoading] = useState(true);

  // ── Auth Gate ──────────────────────────────────────────────────────────────
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

  // ── Fetch Convex Usage + Profile ──────────────────────────────────────────
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
      // Leave the default 'free' so the UI still renders
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

  // ── Logout ─────────────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  // ── Loading Screen ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neo-bg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin mx-auto mb-6 shadow-glow" />
          <p className="font-mono text-primary text-sm uppercase tracking-widest animate-pulse">Initializing Workspace</p>
        </div>
      </div>
    );
  }

  // ── Platform Download Config ───────────────────────────────────────────────
  const platforms = [
    {
      name: 'Windows',
      emoji: '🪟',
      desc: '64-bit installer (v1.2.21)',
      filename: 'Aetheria.AI.Setup.1.2.21.exe',
      path: 'https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.21/Aetheria.AI.Setup.1.2.21.exe',
      available: true,
    },
    {
      name: 'Linux',
      emoji: '🐧',
      desc: 'AppImage (v1.2.0)',
      filename: 'Aetheria.AI-1.2.0.AppImage',
      path: 'https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.0/Aetheria.AI-1.2.0.AppImage',
      available: true,
    },
    {
      name: 'iOS / Android',
      emoji: '📲',
      desc: 'PWA Mobile',
      path: 'https://aetheria-ai-mobile.vercel.app/',
      available: true,
      isRedirect: true,
    },
    {
      name: 'macOS',
      emoji: '🍎',
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

  const displayName =
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Operator';

  return (
    <Layout>
      <Head>
        <title>Dashboard | Aetheria AI</title>
        <link rel="icon" href="/icon.ico" />
        <meta name="description" content="Aetheria AI user dashboard — downloads, usage telemetry, and account management." />
      </Head>

      <div className="bg-neo-bg min-h-screen pb-20 relative overflow-hidden pt-6 md:pt-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 relative z-10">

          {/* ── Page Header ─────────────────────────────────────────────────── */}
          <div className="mb-8 md:mb-12 flex flex-wrap justify-between items-start gap-3 md:gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2 text-white">Command Center</h1>
              <p className="text-base md:text-lg text-gray-400">
                Welcome back, <span className="text-primary font-semibold">{displayName}</span>.
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 md:px-6 py-2 rounded-lg font-medium text-red-400 hover:text-white hover:bg-red-500/20 transition-all border border-red-500/30 text-sm md:text-base"
            >
              Sign Out
            </button>
          </div>

          {/* ── Top Row: Identity | Downloads | Subscription ───────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Identity Card */}
            <div className="card-brutal p-5 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white">Identity</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <span className="text-xs uppercase font-semibold text-gray-500 tracking-wider">Name</span>
                  <p className="font-medium text-gray-200 mt-1">{user?.user_metadata?.name || 'Unknown'}</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-gray-500 tracking-wider">Email</span>
                  <p className="font-medium text-gray-200 mt-1 break-all">{user?.email}</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-gray-500 tracking-wider">Auth Method</span>
                  <p className="font-medium text-gray-200 mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {user?.email ? 'Email' : 'OAuth'}
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-gray-500 tracking-wider">Status</span>
                  <p className="text-emerald-400 font-medium text-sm mt-1 bg-emerald-400/10 inline-flex items-center gap-2 px-2 py-1 rounded border border-emerald-400/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Active Agent
                  </p>
                </div>
              </div>
            </div>

            {/* Downloads Card */}
            <div className="card-brutal p-5 md:p-8">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Binaries</h3>
                </div>
                <span className="text-xs font-mono bg-white/10 text-gray-300 px-2 py-1 rounded border border-white/10">v1.2.21</span>
              </div>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handleDownload(platform)}
                    disabled={!platform.available}
                    className={`w-full p-3 rounded-xl border transition-all flex items-center gap-4 text-left ${
                      platform.available
                        ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 group text-white'
                        : 'border-white/5 bg-transparent opacity-50 cursor-not-allowed text-gray-500'
                    }`}
                  >
                    <span className="text-2xl bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">{platform.emoji}</span>
                    <span className="flex-1">
                      <span className="block font-semibold text-sm">{platform.available ? `Download for ${platform.name}` : `${platform.name} (Locked)`}</span>
                      <span className="block text-xs opacity-60 mt-0.5">{platform.desc}</span>
                    </span>
                    {platform.available && (
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription / Access Level Card */}
            <div className="card-brutal p-5 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white">Access Level</h3>
              </div>

              {profileLoading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="w-8 h-8 border-2 border-white/10 border-t-primary rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* ── FREE tier ─────────────────────────────────────────── */}
                  <div className={`rounded-xl border p-5 relative transition-all ${
                    profile.plan_type === 'free'
                      ? 'bg-primary/10 border-primary/30 shadow-glow-sm'
                      : 'bg-surface border-white/10 hover:border-white/20 opacity-60 hover:opacity-100'
                  }`}>
                    {profile.plan_type === 'free' && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Active
                      </div>
                    )}
                    <div className="flex flex-col mb-4">
                      <span className="font-bold text-lg text-white">Free</span>
                      <span className="text-gray-400 text-sm mt-1">₹0/mo • 50k tokens/day</span>
                    </div>
                    {profile.plan_type === 'free' ? (
                      <div className="w-full py-2 bg-primary/20 text-primary font-semibold rounded text-center text-sm border border-primary/20">
                        Current Plan
                      </div>
                    ) : (
                      <button
                        onClick={() => window.open('https://aetheriai.online/#pricing', '_blank')}
                        className="w-full py-2 rounded border border-white/20 text-gray-300 hover:bg-white/10 hover:text-white font-medium transition-colors text-sm"
                      >
                        Downgrade
                      </button>
                    )}
                  </div>

                  {/* ── PRO tier ──────────────────────────────────────────── */}
                  <div className={`rounded-xl border p-5 relative transition-all ${
                    profile.plan_type === 'pro'
                      ? 'bg-primary/10 border-primary/30 shadow-glow-sm'
                      : 'bg-surface border-white/10 hover:border-white/20'
                  }`}>
                    {profile.plan_type !== 'pro' && (
                      <div className="absolute -top-3 right-4 bg-primary text-white px-3 py-0.5 rounded-full text-xs font-bold tracking-wider">
                        POPULAR
                      </div>
                    )}
                    {profile.plan_type === 'pro' && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Active
                      </div>
                    )}
                    <div className="flex flex-col mb-4">
                      <span className="font-bold text-lg text-white">Pro</span>
                      <span className="text-gray-400 text-sm mt-1">₹428/mo • 5M tokens/mo</span>
                    </div>
                    {profile.plan_type === 'pro' ? (
                      <div className="w-full py-2 bg-primary/20 text-primary font-semibold rounded text-center text-sm border border-primary/20">
                        Current Plan
                      </div>
                    ) : profile.plan_type === 'free' ? (
                      <button
                        onClick={() => window.open('https://aetheriai.online/#pricing', '_blank')}
                        className="w-full py-2 rounded bg-white text-black hover:bg-gray-200 font-semibold transition-colors text-sm"
                      >
                        Upgrade to Pro
                      </button>
                    ) : (
                      <button
                        onClick={() => window.open('https://aetheriai.online/#pricing', '_blank')}
                        className="w-full py-2 rounded border border-white/20 text-gray-300 hover:bg-white/10 hover:text-white font-medium transition-colors text-sm"
                      >
                        Downgrade to Pro
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Usage Telemetry Section ──────────────────────────────────────── */}
          <div className="mt-6 md:mt-8">
            <div className="card-brutal p-5 md:p-8">
              <div className="flex flex-wrap gap-4 md:gap-6 mb-6 md:mb-8 items-end justify-between border-b border-white/10 pb-4 md:pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">System Telemetry</h2>
                  </div>
                  <p className="text-sm text-gray-400">
                    Real-time token usage analytics powered by Convex.
                  </p>
                </div>

                <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                  {/* Period Selector */}
                  <div className="flex bg-surface-light p-1 rounded-lg border border-white/5">
                    {(['7days', '30days', '90days', 'all'] as TimePeriod[]).map((period) => (
                      <button
                        key={period}
                        id={`period-${period}`}
                        onClick={() => setTimePeriod(period)}
                        className={`px-2.5 md:px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                          timePeriod === period 
                            ? 'bg-white/10 text-white shadow-sm' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {period === 'all' ? 'All' : period === '7days' ? '7D' : period === '30days' ? '30D' : '90D'}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={fetchConvexUsage}
                    disabled={usageLoading}
                    className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
                    title="Refresh data"
                  >
                    <svg className={`w-4 h-4 ${usageLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  </button>
                </div>
              </div>

              {usageError ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-red-400 mb-2">Telemetry Error</h3>
                  <p className="text-gray-300 text-sm max-w-md mb-6">{usageError}</p>
                  <button
                    onClick={fetchConvexUsage}
                    className="px-6 py-2 bg-red-500/20 text-red-400 font-medium rounded-lg hover:bg-red-500/30 border border-red-500/30 transition-all"
                  >
                    Retry Connection
                  </button>
                </div>
              ) : (
                <div className="opacity-90 hover:opacity-100 transition-opacity">
                  <UsageCard
                    usageData={usageData}
                    isLoading={usageLoading}
                    timePeriod={timePeriod}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}