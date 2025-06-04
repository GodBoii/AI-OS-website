import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const features = [
    { 
      title: 'AI-Powered Automation', 
      desc: 'Let AI handle repetitive tasks while you focus on what matters most.', 
      emoji: '🧠', 
      bgColor: 'bg-blue-600' 
    },
    { 
      title: 'Lightning Fast', 
      desc: 'Optimized performance with intelligent resource management.', 
      emoji: '⚡', 
      bgColor: 'bg-purple-600' 
    },
    { 
      title: 'Secure & Private', 
      desc: 'Advanced security with privacy-first architecture.', 
      emoji: '🔒', 
      bgColor: 'bg-green-600' 
    }
  ];

  const downloads = [
    { platform: 'Windows', emoji: '🪟', desc: 'Windows 10/11' },
    { platform: 'macOS', emoji: '🍎', desc: 'macOS 10.15+' },
    { platform: 'Linux', emoji: '🐧', desc: 'Ubuntu, Debian, etc.' }
  ];

  const plans = [
    {
      name: 'Free',
      price: '0',
      features: [
        'Basic AI features',
        'Core automation tools',
        'Community support'
      ],
      buttonClass: 'border-2 border-gray-600 hover:border-gray-500',
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '19',
      features: [
        'Advanced AI capabilities',
        'Priority support',
        'Custom workflows',
        'Team collaboration'
      ],
      buttonClass: 'bg-blue-600 hover:bg-blue-700',
      buttonText: 'Choose Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '99',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee'
      ],
      buttonClass: 'bg-purple-600 hover:bg-purple-700',
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <>
      <Head>
        <title>AI-OS - Intelligent OS Companion</title>
        <meta name="description" content="AI-OS provides an intelligent companion for your computing needs" />
      </Head>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center hero-pattern">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="float-animation">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Welcome to AI-OS
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              The next generation operating system powered by artificial intelligence.
              Experience computing like never before with intelligent automation and seamless workflows.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/auth/signup" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 glow-animation">
              Get Started Free
            </Link>
            <Link href="#download" className="px-8 py-4 border-2 border-white/30 hover:border-white/50 rounded-xl text-lg font-semibold transition-all transform hover:scale-105">
              Download Now
            </Link>
          </div>
          
          {/* Demo Screenshot */}
          <div className="relative mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-8 glass-effect">
              <div className="bg-gray-800 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <p className="text-gray-400">AI-OS Desktop Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover the intelligent features that make AI-OS the future of computing
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="glass-effect rounded-xl p-8 text-center transform hover:scale-105 transition-all">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full mx-auto mb-6 flex items-center justify-center`}>
                  <span className="text-2xl">{feature.emoji}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Download AI-OS</h2>
          <p className="text-xl text-gray-400 mb-12">Available for all major platforms</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {downloads.map((item, i) => (
              <div key={i} className="p-8 glass-effect rounded-xl hover:bg-white/10 transition-all transform hover:scale-105">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{item.platform}</h3>
                <p className="text-gray-400 mb-4">{item.desc}</p>
                <Link href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors inline-block">
                  Download
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Plan</h2>
            <p className="text-xl text-gray-400">Start free, upgrade when you need more power</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div key={i} className={`glass-effect rounded-xl p-8 text-center ${plan.popular ? 'border-2 border-blue-500 relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 px-4 py-1 rounded-full text-sm">
                    Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">${plan.price}<span className="text-lg text-gray-400">/month</span></div>
                <ul className="text-left space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center"><span className="text-green-400 mr-2">✓</span> {feature}</li>
                  ))}
                </ul>
                <Link href="/auth/signup" className={`w-full py-3 rounded-lg transition-colors block ${plan.buttonClass}`}>
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 