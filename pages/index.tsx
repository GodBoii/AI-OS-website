import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const features = [
    { 
      title: 'Multi-Agent Architecture', 
      desc: 'Specialized AI agents for coding, research, finance, and creative tasks working together seamlessly.', 
      emoji: '🧠', 
      bgColor: 'bg-blue-600' 
    },
    { 
      title: 'True Cross-Platform', 
      desc: 'The only AI solution with full feature parity across Android, iOS, Windows, and macOS.', 
      emoji: '🌐', 
      bgColor: 'bg-purple-600' 
    },
    { 
       title: 'Deep Integrations', 
       desc: 'Seamless connections with GitHub, Google Suite, and your file system that other AI tools can\'t match.', 
       emoji: '🔄', 
       bgColor: 'bg-green-600' 
     },
    { 
      title: 'Workflow Automation', 
      desc: 'Connect multiple AI agents in automated chains to accomplish complex tasks no other tool can handle.', 
      emoji: '⚙️', 
      bgColor: 'bg-orange-600' 
    },
    { 
      title: 'Stateful Sandbox', 
      desc: 'Persistent execution environment with long-term memory for complex, multi-session projects.', 
      emoji: '📦', 
      bgColor: 'bg-teal-600' 
    },
    { 
      title: 'Privacy-First Design', 
      desc: 'Local processing for sensitive operations with enterprise-grade security and data control.', 
      emoji: '🔒', 
      bgColor: 'bg-red-600' 
    }
  ];

  const downloads = [
    { platform: 'Windows', emoji: '🪟', desc: 'Windows 10/11' },
    { platform: 'macOS', emoji: '🍎', desc: 'macOS 10.15+' },
    { platform: 'Linux', emoji: '🐧', desc: 'Ubuntu, Debian, etc.' },
    { platform: 'Android', emoji: '📱', desc: 'Android 10+' },
    { platform: 'iOS', emoji: '📲', desc: 'iOS 14+' }
  ];

  const competitiveAdvantages = [
    {
      competitor: 'Perplexity AI',
      advantages: [
        'Beyond just search - we execute tasks while they only answer questions',
        'Development capabilities with code execution they lack',
        'More free capabilities without a subscription wall',
        'Multi-agent architecture vs their single-purpose assistant'
      ]
    },
    {
      competitor: 'Claude',
      advantages: [
        'Multiple specialized agents vs one general assistant',
        'True mobile-first experience vs their limited mobile apps',
        'Deep tool integrations beyond their basic connections',
        'Sandbox execution environment they don\'t offer'
      ]
    },
    {
      competitor: 'Coding Tools',
      advantages: [
        'Business context with research and investment agents',
        'Mobile development capabilities they don\'t have',
        'Accessible AI for non-technical users',
        'Integrated workflow instead of switching between tools'
      ]
    }
  ];
  
  const testimonials = [
    {
      quote: "Aetheria AI replaced 5 different AI subscriptions for our team. The workflow automation is a game-changer.",
      name: "Sarah Chen",
      title: "CTO, TechVentures"
    },
    {
      quote: "As an investor, I love how the research agent connects with the financial analysis agent to give me comprehensive insights.",
      name: "Michael Rodriguez",
      title: "Investment Analyst"
    },
    {
      quote: "The cross-platform experience is seamless. I start work on my phone and continue on desktop without missing a beat.",
      name: "Priya Sharma",
      title: "Product Designer"
    }
  ];

  return (
    <>
      <Head>
        <title>Aetheria AI - Intelligent OS Companion</title>
        <meta name="description" content="Aetheria AI provides an intelligent companion for your computing needs" />
      </Head>
      
      <main>
        <section className="bg-gradient-to-b from-gray-900 to-black text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
              The Operating System for AI Workflows
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Aetheria AI is the only platform that connects specialized AI agents across all your devices.
              Replace 5-10 different AI subscriptions with one unified solution.
            </p>
            
            <div className="max-w-3xl mx-auto glass-effect rounded-xl p-6 mb-10">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">For Users</h3>
                  <p className="text-gray-300">Seamless AI workflows across all your devices</p>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">For Investors</h3>
                  <p className="text-gray-300">The platform strategy no competitor can match</p>
                </div>
              </div>
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
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <img src="/app-home-page.png" alt="Aetheria AI Desktop Preview" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Unfair Advantages</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our multi-agent architecture creates capabilities no single-purpose AI tool can match
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
        
        {/* Platform Strategy Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">The Platform Strategy</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                While competitors focus on single use cases, we're creating the platform that connects everything
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-500">For Users</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">→</span>
                      <span>Replace multiple AI subscriptions with one solution</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">→</span>
                      <span>Seamless experience across all devices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">→</span>
                      <span>Connect specialized agents for complex workflows</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">→</span>
                      <span>Privacy-first with local execution options</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-500">For Investors</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">→</span>
                      <span>Agent marketplace with network effects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">→</span>
                      <span>Platform lock-in through workflow creation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">→</span>
                      <span>Multiple monetization channels</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">→</span>
                      <span>Defensible position as the OS for AI workflows</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Download Aetheria AI</h2>
            <p className="text-xl text-gray-400 mb-12">The only AI solution with true cross-platform capabilities</p>
            
            <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {downloads.map((item, i) => (
                <div key={i} className="p-6 glass-effect rounded-xl hover:bg-white/10 transition-all transform hover:scale-105">
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

        {/* Competitive Advantages Section */}
        <section id="advantages" className="py-20 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Aetheria AI?</h2>
              <p className="text-xl text-gray-400">The unified platform that replaces 5-10 different AI subscriptions</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {competitiveAdvantages.map((item, i) => (
                <div key={i} className="glass-effect rounded-xl p-8 h-full">
                  <h3 className="text-2xl font-bold mb-6 text-center">vs. {item.competitor}</h3>
                  <ul className="text-left space-y-4 mb-8">
                    {item.advantages.map((advantage, j) => (
                      <li key={j} className="flex items-start">
                        <span className="text-green-400 mr-2 mt-1">✓</span> 
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Users Say</h2>
              <p className="text-xl text-gray-400">Join thousands of satisfied users and investors</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((item, i) => (
                <div key={i} className="glass-effect rounded-xl p-8 text-center">
                  <div className="text-4xl text-gray-500 mb-6">❝</div>
                  <p className="text-lg mb-6 italic">"{item.quote}"</p>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-gray-400 text-sm">{item.title}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/auth/signup" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 inline-block">
                Join Them Today
              </Link>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
            <p className="text-xl text-gray-400 mb-12">The developer behind Aetheria AI</p>
            
            <div className="max-w-3xl mx-auto glass-effect rounded-xl p-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
                  <img src="/Prajwal.jpg" alt="Prajwal" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Prajwal</h3>
                <p className="text-gray-400 mb-6 max-w-2xl">
                  I'm a passionate developer focused on creating intelligent software solutions that enhance productivity and user experience. 
                  Aetheria AI represents my vision for the future of computing where artificial intelligence seamlessly integrates with our daily workflows.
                </p>
                <div className="flex space-x-6">
                  <a href="https://github.com/GodBoii" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/prajwal_._7/?hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}