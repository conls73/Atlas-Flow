"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link2 } from 'lucide-react';

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0052FF] text-white selection:bg-white selection:text-[#0052FF] font-sans overflow-hidden hidden-scrollbar relative flex flex-col">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-[1400px] mx-auto w-full z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0052FF] shadow-md">
            <Link2 className="w-5 h-5 stroke-[3]" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white drop-shadow-sm">AgentLink</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="font-semibold text-lg text-white hover:text-blue-200 transition-colors hidden sm:block">Log in</a>
          <a href="#" className="font-bold bg-white text-[#0052FF] px-6 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg">Sign up free</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-6 pt-12 pb-32 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 min-h-[85vh] flex-grow z-10">
        
        {/* Left Side: Copy & CTA */}
        <div className="flex-1 lg:max-w-2xl w-full flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-6xl sm:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tighter text-white mb-8 leading-[0.95]">
            Everything you sell. In one link.
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100/90 mb-12 font-medium max-w-xl leading-relaxed">
            Join the top 1% of producers. One intelligent link to showcase your listings, capture buyer leads, and grow your real estate brand.
          </p>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (username) router.push(`/builder?username=${username}`);
            }} 
            className="flex flex-col sm:flex-row gap-4 w-full max-w-xl"
          >
            <div className="flex items-center bg-white rounded-lg px-5 py-4 flex-1 shadow-inner focus-within:ring-4 focus-within:ring-white/50 transition-all">
              <span className="text-stone-400 font-bold text-lg">agentlink.com/</span>
              <input 
                type="text" 
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-stone-900 font-bold focus:outline-none text-lg ml-1 bg-transparent placeholder:font-medium placeholder:text-stone-300"
              />
            </div>
            <button type="submit" className="bg-white hover:bg-blue-50 text-[#0052FF] font-extrabold px-10 py-4 rounded-lg transition-colors text-lg whitespace-nowrap shadow-xl">
              Claim your Link
            </button>
          </form>
          
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <p className="text-blue-200/80 font-medium tracking-wide">It’s free, and takes less than a minute.</p>
            <a href="/alexjensen" className="px-5 py-2.5 rounded-full border border-white/30 text-white font-bold hover:bg-white/10 hover:border-white transition-all whitespace-nowrap shadow-sm">
              See Live Demo
            </a>
          </div>
        </div>

        {/* Right Side: Demo Mockup */}
        <div className="flex-1 w-full flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="relative w-[360px] h-[760px] bg-[#0A0B0D] rounded-[3.5rem] p-4 shadow-2xl shadow-black/40 border-4 border-[#0A0B0D]/80 rotate-2 hover:rotate-0 transition-transform duration-500">
            {/* Phone Hardware Details (Dynamic Island) */}
            <div className="absolute top-0 inset-x-0 h-12 bg-transparent z-20 flex justify-center pt-5 pointer-events-none">
              <div className="w-[110px] h-[32px] bg-black rounded-full flex items-center justify-end px-3 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#0A0B0D] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"></div>
              </div> 
            </div>
            {/* Screen Content via Iframe to the demo we built! */}
            <div className="w-full h-full bg-stone-50 rounded-[2.75rem] overflow-hidden relative shadow-inner pt-12">
              <iframe 
                src="/alexjensen" 
                title="Agent Link Demo Profile"
                className="w-full h-full border-0 absolute bottom-0 left-0 rounded-b-[2.75rem] bg-stone-50"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Footer Link */}
      <div className="w-full text-center pb-8 z-10 animate-in fade-in duration-1000 delay-500">
        <a href="https://conls73.github.io/Atlas-Flow/" className="text-blue-300 hover:text-white text-sm font-semibold transition-colors">
          &larr; Back to Atlas Flow
        </a>
      </div>
    </main>
  );
}
