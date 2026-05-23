import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import Layout from '../components/Layout';

export default function Changelog() {
  const [releases, setReleases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReleases() {
      try {
        const response = await fetch('https://api.github.com/repos/GodBoii/AI-OS-website/releases', {
          headers: {
            'Accept': 'application/vnd.github.v3.html+json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setReleases(data);
        } else {
          setError("Failed to load changelog data.");
        }
      } catch (err) {
        console.error("Error fetching releases:", err);
        setError("An error occurred while fetching changelog data.");
      } finally {
        setLoading(false);
      }
    }

    fetchReleases();
  }, []);

  return (
    <Layout>
      <SEO 
        title="Changelog | Aetheria AI"
        description="Track updates, features, improvements, and changes on the Aetheria AI operating system and workspace platform."
      />

      <div className="min-h-screen pt-8 pb-24 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
              <span className="flex w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Updates &amp; Releases
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white mb-4 md:mb-6">Changelog</h1>
            <p className="text-base md:text-xl text-gray-400">The latest updates, improvements, and new features for Aetheria AI.</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-400 bg-red-500/5 rounded-2xl border border-red-500/10 backdrop-blur-sm px-4">
              <p className="text-lg">{error}</p>
            </div>
          ) : releases.length === 0 ? (
            <div className="text-center py-20 text-gray-400 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm px-4">
              <p className="text-lg">No release information available at this time.</p>
            </div>
          ) : (
            <div className="space-y-8 md:space-y-12">
              {releases.map((release) => (
                <div key={release.id} className="relative">
                  {/* Mobile layout: stacked card with header */}
                  <div className="flex flex-col gap-4 md:hidden">
                    {/* Mobile release header */}
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)] flex-shrink-0"></div>
                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight">{release.name || release.tag_name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{new Date(release.published_at || release.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                        <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          {release.tag_name}
                        </div>
                      </div>
                    </div>
                    {/* Mobile content card */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5 shadow-xl">
                      <div 
                        className="markdown-content text-gray-300"
                        dangerouslySetInnerHTML={{ __html: release.body_html || release.body }}
                      />
                      <div className="mt-6 pt-4 border-t border-white/5">
                        <a 
                          href={release.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"
                        >
                          View on GitHub
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Desktop layout: two column timeline */}
                  <div className="hidden md:flex gap-12">
                    <div className="w-1/4 text-right shrink-0 relative">
                      {/* Timeline dot */}
                      <div className="absolute -right-6 top-2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)] z-10"></div>
                      
                      <h3 className="text-xl font-bold text-white">{release.name || release.tag_name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{new Date(release.published_at || release.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                      <div className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {release.tag_name}
                      </div>
                    </div>
                    
                    <div className="w-3/4 pb-12 border-l border-white/10 pl-12 relative">
                      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-xl hover:border-white/10 transition-colors">
                        <div 
                          className="markdown-content text-gray-300"
                          dangerouslySetInnerHTML={{ __html: release.body_html || release.body }}
                        />
                        
                        <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                          <a 
                            href={release.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"
                          >
                            View on GitHub
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <style jsx global>{`
          .markdown-content h1, .markdown-content h2, .markdown-content h3 {
            color: white;
            font-weight: bold;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
          }
          .markdown-content h1 { font-size: 1.5rem; }
          .markdown-content h2 { font-size: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.3em; }
          .markdown-content h3 { font-size: 1.1rem; }
          .markdown-content p {
            margin-bottom: 1em;
            line-height: 1.6;
          }
          .markdown-content ul {
            list-style-type: disc;
            padding-left: 1.25em;
            margin-bottom: 1em;
          }
          .markdown-content ol {
            list-style-type: decimal;
            padding-left: 1.25em;
            margin-bottom: 1em;
          }
          .markdown-content li {
            margin-bottom: 0.5em;
          }
          .markdown-content li > p {
            margin-bottom: 0.25em;
          }
          .markdown-content a {
            color: #a855f7;
            text-decoration: underline;
          }
          .markdown-content a:hover {
            color: #c084fc;
          }
          .markdown-content code {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 0.2em 0.4em;
            border-radius: 0.25rem;
            font-family: monospace;
            font-size: 0.875em;
            word-break: break-word;
          }
          .markdown-content pre {
            background-color: rgba(0, 0, 0, 0.4);
            padding: 1em;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin-bottom: 1em;
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .markdown-content pre code {
            background-color: transparent;
            padding: 0;
          }
          .markdown-content blockquote {
            border-left: 4px solid #a855f7;
            padding-left: 1em;
            color: #9ca3af;
            font-style: italic;
            margin-bottom: 1em;
          }
          .markdown-content img {
            max-width: 100%;
            border-radius: 0.5rem;
            margin: 1em 0;
          }
        `}</style>
      </div>
    </Layout>
  );
}
