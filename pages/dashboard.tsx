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
          <div className="w-20 h-20 border-8 border-black border-t-neo-lime rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono uppercase tracking-widest text-sm animate-pulse">Initializing...</p>
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
        <title>DASHBOARD // Aetheria AI</title>
        <link rel="icon" href="/icon.ico" />
        <meta name="description" content="Aetheria AI user dashboard — downloads, usage telemetry, and account management." />
      </Head>

      <div className="bg-neo-bg min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 py-12">

          {/* ── Page Header ─────────────────────────────────────────────────── */}
          <div className="mb-12 border-l-8 border-black pl-6 flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-5xl md:text-6xl font-black uppercase mb-2">Command Center</h1>
              <p className="text-xl font-mono text-gray-600">
                Welcome back, <span className="font-bold text-black">{displayName}</span>.
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="btn-brutal bg-white border-2 border-black hover:bg-black hover:text-white text-sm uppercase self-end"
            >
              Sign Out
            </button>
          </div>

          {/* ── Top Row: Identity | Downloads | Subscription ───────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Identity Card */}
            <div className="card-brutal bg-white group hover:bg-black hover:text-white transition-colors">
              <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black group-hover:border-white pb-2">
                Identity
              </h3>
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
                  <span className="text-xs uppercase font-bold text-gray-500 group-hover:text-gray-400">Auth Method</span>
                  <p className="font-bold uppercase">
                    {user?.email ? '✓ Email' : '✓ OAuth'}
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 group-hover:text-gray-400">Status</span>
                  <p className="text-neo-lime font-bold uppercase bg-black group-hover:bg-neo-lime group-hover:text-black inline-block px-2">
                    Active Agent
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-500 group-hover:text-gray-400">User ID</span>
                  <p className="text-xs break-all opacity-50">{user?.id}</p>
                </div>
              </div>
            </div>

            {/* Downloads Card */}
            <div className="card-brutal bg-neo-yellow">
              <h3 className="text-2xl font-black uppercase mb-2 border-b-4 border-black pb-2">Binaries</h3>
              <p className="font-mono mb-4 text-sm bg-white border border-black inline-block px-2">
                Latest: v1.2.21
              </p>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handleDownload(platform)}
                    disabled={!platform.available}
                    className={`w-full py-3 border-2 border-black font-bold uppercase shadow-brutal-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-3 ${
                      platform.available
                        ? 'bg-white hover:bg-black hover:text-white'
                        : 'bg-gray-300 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-xl">{platform.emoji}</span>
                    <span className="text-left">
                      <span className="block text-sm">{platform.available ? `Get for ${platform.name}` : `${platform.name} // Locked`}</span>
                      <span className="block text-[10px] font-mono font-normal opacity-70">{platform.desc}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription / Access Level Card */}
            <div className="card-brutal bg-neo-pink">
              <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-2">Access Level</h3>

              {profileLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="w-8 h-8 border-4 border-black border-t-white rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-3">

                  {/* ── FREE tier ─────────────────────────────────────────── */}
                  <div className={`border-2 border-black p-4 relative transition-all ${
                    profile.plan_type === 'free'
                      ? 'bg-neo-lime shadow-brutal-sm'
                      : 'bg-white opacity-70 hover:opacity-100'
                  }`}>
                    {profile.plan_type === 'free' && (
                      <div className="absolute -top-3 -right-3 bg-black text-neo-lime px-2 py-1 text-xs font-bold uppercase">
                        ✓ Active
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black uppercase text-lg">Free</span>
                      <span className="font-mono font-bold text-sm">₹0/mo</span>
                    </div>
                    <p className="font-mono text-xs text-gray-600 mb-3">50,000 tokens/day</p>
                    {profile.plan_type === 'free' ? (
                      <div className="w-full py-2 bg-black text-neo-lime font-bold uppercase text-center text-xs tracking-widest">
                        Current Plan
                      </div>
                    ) : (
                      <button
                        onClick={() => window.open('https://aetheriai.online/#pricing', '_blank')}
                        className="w-full py-2 border-2 border-black hover:bg-black hover:text-white font-bold uppercase transition-colors text-sm"
                      >
                        Downgrade
                      </button>
                    )}
                  </div>

                  {/* ── PRO tier ──────────────────────────────────────────── */}
                  <div className={`border-2 border-black p-4 relative transition-all ${
                    profile.plan_type === 'pro'
                      ? 'bg-neo-lime shadow-brutal-sm'
                      : 'bg-white opacity-90 hover:opacity-100'
                  }`}>
                    {profile.plan_type !== 'pro' && (
                      <div className="absolute -top-3 -right-3 bg-black text-white px-2 py-1 text-xs font-bold uppercase transform rotate-12">
                        Popular
                      </div>
                    )}
                    {profile.plan_type === 'pro' && (
                      <div className="absolute -top-3 -right-3 bg-black text-neo-lime px-2 py-1 text-xs font-bold uppercase">
                        ✓ Active
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black uppercase text-lg">Pro</span>
                      <span className="font-mono font-bold text-sm">₹428/mo</span>
                    </div>
                    <p className="font-mono text-xs text-gray-600 mb-3">5,000,000 tokens/month</p>
                    {profile.plan_type === 'pro' ? (
                      <div className="w-full py-2 bg-black text-neo-lime font-bold uppercase text-center text-xs tracking-widest">
                        Current Plan
                      </div>
                    ) : profile.plan_type === 'free' ? (
                      <button
                        onClick={() => window.open('https://aetheriai.online/#pricing', '_blank')}
                        className="w-full py-2 bg-black text-white hover:bg-gray-800 font-bold uppercase transition-colors text-sm"
                      >
                        Upgrade to Pro
                      </button>
                    ) : (
                      <button
                        onClick={() => window.open('https://aetheriai.online/#pricing', '_blank')}
                        className="w-full py-2 border-2 border-black hover:bg-black hover:text-white font-bold uppercase transition-colors text-sm"
                      >
                        Downgrade to Pro
                      </button>
                    )}
                  </div>

                  {/* ── ELITE tier ────────────────────────────────────────── */}
                  <div className={`border-2 border-black p-4 relative transition-all ${
                    profile.plan_type === 'elite'
                      ? 'bg-neo-lime shadow-brutal-sm'
                      : 'bg-white opacity-70 hover:opacity-100'
                  }`}>
                    {profile.plan_type === 'elite' && (
                      <div className="absolute -top-3 -right-3 bg-black text-neo-lime px-2 py-1 text-xs font-bold uppercase">
                        ✓ Active
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black uppercase text-lg">Elite</span>
                      <span className="font-mono font-bold text-sm">₹4,428/mo</span>
                    </div>
                    <p className="font-mono text-xs text-gray-600 mb-3">50,000,000 tokens/month</p>
                    {profile.plan_type === 'elite' ? (
                      <div className="w-full py-2 bg-black text-neo-lime font-bold uppercase text-center text-xs tracking-widest">
                        Current Plan
                      </div>
                    ) : (
                      <button
                        onClick={() => window.open('https://aetheriai.online/#pricing', '_blank')}
                        className="w-full py-2 bg-black text-white hover:bg-gray-800 font-bold uppercase transition-colors text-sm"
                      >
                        Upgrade to Elite
                      </button>
                    )}
                  </div>

                  {/* ── Renewal date (if subscribed) ─────────────────────── */}
                  {profile.current_period_end && profile.plan_type !== 'free' && (
                    <p className="font-mono text-[10px] text-center text-gray-700 pt-1">
                      Renews {new Date(profile.current_period_end).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                  )}

                </div>
              )}
            </div>
          </div>

          {/* ── Usage Telemetry Section ──────────────────────────────────────── */}
          <div className="mt-12">
            <div className="flex flex-wrap gap-4 mb-6 items-center">
              <div>
                <h2 className="text-3xl font-black uppercase">System Telemetry</h2>
                <p className="font-mono text-xs text-gray-500 mt-1">
                  Powered by Convex — real-time token usage from Aetheria AI
                </p>
              </div>
              {/* Period Selector */}
              <div className="flex space-x-2 bg-white border-2 border-black p-1 ml-auto">
                {(['7days', '30days', '90days', 'all'] as TimePeriod[]).map((period) => (
                  <button
                    key={period}
                    id={`period-${period}`}
                    onClick={() => setTimePeriod(period)}
                    className={`px-4 py-2 text-xs font-bold uppercase transition-colors ${
                      timePeriod === period ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'
                    }`}
                  >
                    {period === 'all' ? 'All Time' : period}
                  </button>
                ))}
              </div>
              <button
                onClick={fetchConvexUsage}
                disabled={usageLoading}
                className="px-4 py-2 border-2 border-black font-bold text-xs uppercase hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                title="Refresh data"
              >
                {usageLoading ? '⟳ Syncing...' : '⟳ Refresh'}
              </button>
            </div>

            {usageError ? (
              <div className="card-brutal bg-red-50 border-red-400">
                <h3 className="text-xl font-black text-red-600 mb-3 uppercase">Telemetry Error</h3>
                <div className="font-mono p-4 border-2 border-red-400 bg-white mb-4 text-red-600 text-sm">
                  <p><strong>Error:</strong> {usageError}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    Make sure CONVEX_URL is set correctly in .env.local.
                  </p>
                </div>
                <button
                  onClick={fetchConvexUsage}
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
    </Layout>
  );
}