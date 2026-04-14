/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { Mail, Phone, Camera, Key, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

export function ListingCard({ listing }: { listing: any }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  return (
    <a 
      href="#" 
      className="w-full bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 group flex flex-col"
    >
      <div className="relative h-64 overflow-hidden bg-stone-100">
        <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-bold text-stone-800 rounded-full shadow-sm">
          {listing.status}
        </div>
        <img 
          src={listing.images[currentIdx]} 
          alt={listing.address} 
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        {listing.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
              {listing.images.map((_: any, i: number) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white'}`} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow justify-between bg-white z-10 relative">
        <div className="mb-2">
          <p className="text-2xl font-bold text-emerald-700 mb-1.5">{listing.price}</p>
          <p className="text-lg font-semibold text-stone-800 truncate">{listing.address}</p>
          <p className="text-sm text-stone-500 mt-1.5 flex items-center font-medium">
            <span>{listing.beds} Beds</span>
            <span className="mx-2 text-stone-300">&bull;</span>
            <span>{listing.baths} Baths</span>
            <span className="mx-2 text-stone-300">&bull;</span>
            <span>{listing.sqft} Sq.Ft.</span>
          </p>
        </div>
        <p className="text-xs font-bold text-stone-400 uppercase tracking-wider truncate">{listing.city}</p>
      </div>
    </a>
  );
}

export function ProfilePreview({ profile }: { profile: any }) {
  if (!profile) return null;

  return (
    <div className="w-full h-full bg-stone-50 overflow-y-auto hidden-scrollbar relative flex flex-col">
      <div className="max-w-xl mx-auto px-4 py-12 sm:py-16 w-full flex-grow">
        
        <header className="flex flex-col items-center text-center mb-10">
          <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden ring-4 ring-white shadow-xl shadow-emerald-900/5">
            <img 
              src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.name}&background=10b981&color=fff`} 
              alt={profile.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-1">{profile.name}</h1>
          <p className="text-sm font-medium text-emerald-600 mb-3">{profile.brokerage}</p>
          <p className="text-stone-600 max-w-sm text-sm sm:text-base leading-relaxed">{profile.bio}</p>
        </header>

        {profile.socials && profile.socials.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {profile.socials.filter((s: any) => s.isActive !== false).map((social: any) => {
              let IconTag = ExternalLink;
              if (social.type === 'email') IconTag = Mail;
              if (social.type === 'phone') IconTag = Phone;
              if (social.type === 'instagram') IconTag = Camera;
              
              return (
                <a 
                  key={social.id}
                  href={social.url}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-stone-600 shadow-sm border border-stone-200 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
                >
                  {social.icon ? social.icon : <IconTag className="w-5 h-5" />}
                </a>
              );
            })}
          </div>
        )}

        {profile.listings && profile.listings.length > 0 && (
          <section className="mb-10">
            <h2 className="text-sm font-bold tracking-wider text-stone-400 uppercase ml-2 mb-4">Featured Listings</h2>
            <div className="flex flex-col gap-6">
              {profile.listings.map((listing: any) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        )}

        {profile.links && profile.links.length > 0 && (
          <section className="flex flex-col gap-3 mb-10">
            {profile.links.filter((l: any) => l.isActive !== false).map((link: any) => (
              <a
                key={link.id}
                href={link.url}
                className="group relative flex items-center p-3.5 sm:p-4 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-none items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:scale-110 transition-transform duration-300">
                  {link.icon ? link.icon : <ArrowRight className="w-4 h-4" />}
                </div>
                <span className="flex-1 text-center font-semibold text-stone-800 pr-10 text-sm sm:text-base">
                  {link.title}
                </span>
              </a>
            ))}
          </section>
        )}

      </div>
      <footer className="py-8 text-center mt-auto">
        <a href="/" className="text-xs font-semibold text-stone-400 hover:text-stone-600 transition-colors">
          Powered by AgentLink
        </a>
      </footer>
    </div>
  );
}
