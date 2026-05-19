import React, { useState } from 'react';

const IntegrationsAccordion = ({ 
  title, 
  subtitle, 
  items, 
  reverse 
}: {
  title: React.ReactNode;
  subtitle: string;
  items: any[];
  reverse?: boolean;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(false);

  return (
    <div className={`py-12 md:py-24 grid lg:grid-cols-2 gap-8 md:gap-16 items-center`}>
      {/* Text Column */}
      <div className={`flex flex-col justify-center ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white leading-[1.1] tracking-tight">
          {title}
        </h2>
        <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-12 leading-relaxed">
          {subtitle}
        </p>

        <div className="mb-4 pl-2">
          <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Details</span>
        </div>
        <div className="border-t border-white/10">
          {items.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border-b border-white/10 cursor-pointer transition-colors ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="flex justify-between items-center p-6">
                  <div className="flex items-center gap-4">
                    <span className={`text-lg font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {item.title}
                    </span>
                  </div>
                  <span className={`text-2xl transition-transform duration-300 ${isActive ? 'rotate-45 text-white' : 'text-gray-500'}`}>
                    +
                  </span>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 text-gray-400 text-base leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Column */}
      <div 
        className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-surface-light border border-white/5 shadow-2xl group cursor-crosshair ${reverse ? 'lg:order-1 order-first' : 'lg:order-2'}`}
        onMouseEnter={() => setHoveredImage(true)}
        onMouseLeave={() => setHoveredImage(false)}
      >
        {/* Toggle Hint overlay */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-medium text-white tracking-wide">Hovering</span>
          <div className="flex gap-1 ml-2">
            <span className={`w-1.5 h-1.5 rounded-full transition-colors ${!hoveredImage ? 'bg-primary' : 'bg-white/30'}`}></span>
            <span className={`w-1.5 h-1.5 rounded-full transition-colors ${hoveredImage ? 'bg-primary' : 'bg-white/30'}`}></span>
          </div>
        </div>

        {items.map((item, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-500 ${activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <img 
              src={item.img1} 
              alt={item.title} 
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${hoveredImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
            />
            <img 
              src={item.img2} 
              alt={item.title + ' hover'} 
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${hoveredImage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ForYouSection = () => {
  const devItems = [
    {
      title: "GitHub Integration",
      desc: "Autonomously review PRs, manage issues, and commit code directly from your workspace without leaving the context.",
      img1: encodeURI("/for you/ChatGPT Image May 18, 2026, 09_00_26 PM.png"),
      img2: encodeURI("/for you/ChatGPT Image May 18, 2026, 09_02_22 PM.png"),
    },
    {
      title: "Vercel Deployments",
      desc: "Deploy applications, provision custom subdomains automatically, and stream logs directly back into your workflow.",
      img1: encodeURI("/for you/ChatGPT Image May 18, 2026, 08_59_17 PM.png"),
      img2: encodeURI("/for you/ChatGPT Image May 18, 2026, 08_59_21 PM.png"),
    },
    {
      title: "Supabase DB",
      desc: "Manage schemas, read rows, and provision cloud databases via natural language chat interactions.",
      img1: encodeURI("/for you/Gemini_Generated_Image_8bdt7h8bdt7h8bdt.png"),
      img2: encodeURI("/for you/Gemini_Generated_Image_er12xcer12xcer12.png"),
    }
  ];

  const opsItems = [
    {
      title: "Gmail Sync",
      desc: "Draft intelligent responses and summarize lengthy email threads instantly, keeping your inbox at zero.",
      img1: encodeURI("/for you/ChatGPT Image May 17, 2026, 07_10_50 PM.png"),
      img2: encodeURI("/for you/ChatGPT Image May 18, 2026, 08_58_56 PM.png"),
    },
    {
      title: "Google Drive",
      desc: "Instantly locate and organize files with natural language queries, turning your drive into an accessible brain.",
      img1: encodeURI("/for you/ChatGPT Image May 18, 2026, 08_59_02 PM.png"),
      img2: encodeURI("/for you/ChatGPT Image May 18, 2026, 08_59_07 PM.png"),
    },
    {
      title: "Google Sheets",
      desc: "Analyze data, generate charts, and automate data entry pipelines across your organization securely.",
      img1: encodeURI("/for you/Gemini_Generated_Image_n5t5zzn5t5zzn5t5.png"),
      img2: encodeURI("/for you/Gemini_Generated_Image_qa6u7bqa6u7bqa6u.png"),
    },
    {
      title: "WhatsApp Business",
      desc: "Connect your intelligence directly to your chats. Monitor, summarize, and reply to messages in real-time.",
      img1: encodeURI("/for you/ChatGPT Image May 18, 2026, 08_59_12 PM.png"),
      img2: encodeURI("/for you/ChatGPT Image May 18, 2026, 08_59_17 PM (1).png"),
    }
  ];

  return (
    <section className="bg-neo-bg min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <IntegrationsAccordion 
          title={<>Write code,<br/>ship faster.</>}
          subtitle="Glide between writing code, managing issues, and deploying applications. Aetheria natively connects to your developer ecosystem."
          items={devItems}
          reverse={false}
        />

        <div className="w-full h-px bg-white/5 my-8"></div>

        <IntegrationsAccordion 
          title={<>Automate your<br/>daily grind.</>}
          subtitle="Instantly capture notes, analyze data, and manage communications without ever leaving your workspace."
          items={opsItems}
          reverse={true}
        />
      </div>
    </section>
  );
};

export default ForYouSection;
