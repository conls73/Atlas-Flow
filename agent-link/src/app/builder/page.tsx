/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProfilePreview } from '../../../src/components/ProfilePreview';
import { Plus, Trash2, Link2, MonitorSmartphone, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableLinkItem({ link, updateLink, removeLink }: { link: any, updateLink: any, removeLink: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  const isActive = link.isActive !== false;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`bg-stone-50 p-5 rounded-2xl border ${isDragging ? 'border-[#0052FF] shadow-xl scale-[1.02]' : 'border-stone-200'} transition-shadow flex gap-4 group relative ${!isActive ? 'opacity-60 saturate-50' : ''}`}
    >
      {/* Drag Handle */}
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-stone-300 hover:text-stone-500 transition-colors flex items-center">
        <GripVertical className="w-6 h-6" />
      </div>
      
      <div className="flex-1 flex flex-col gap-3 min-w-0 pr-10">
        <div className="absolute top-5 right-14">
          {/* Toggle Switch */}
          <button 
            onClick={() => updateLink(link.id, 'isActive', !isActive)}
            className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${isActive ? 'bg-[#0052FF]' : 'bg-stone-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isActive ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>

        <button onClick={() => removeLink(link.id)} className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-colors p-1.5 bg-white rounded-lg border border-stone-200 opacity-0 md:group-hover:opacity-100 shadow-sm">
          <Trash2 className="w-4 h-4" />
        </button>
        
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">Link Title</label>
          <input type="text" value={link.title} onChange={e => updateLink(link.id, 'title', e.target.value)} className="w-full bg-transparent border-b-2 border-stone-200 focus:border-[#0052FF] focus:outline-none transition-colors font-bold text-stone-900 pb-1" />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">Destination URL</label>
          <input type="text" value={link.url} onChange={e => updateLink(link.id, 'url', e.target.value)} className="w-full bg-transparent border-b-2 border-stone-200 focus:border-[#0052FF] focus:outline-none transition-colors text-sm text-stone-600 font-medium pb-1" />
        </div>
      </div>
    </div>
  );
}

function BuilderDashboard() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username') || 'yourname';

  const [profile, setProfile] = useState({
    name: "Alex Jensen",
    username: username,
    brokerage: "Atlas Realty",
    bio: "Helping you find your dream home in the city. Top 1% Producer. Let's make it happen.",
    avatar: "https://i.pravatar.cc/150?u=" + username,
    socials: [
      { id: 1, type: "email", url: "mailto:alex@example.com", isActive: true },
      { id: 2, type: "phone", url: "tel:+15551234567", isActive: true },
      { id: 3, type: "instagram", url: "#", isActive: true },
    ],
    links: [
      { id: 1, title: "Book a Showing", url: "#", isActive: true },
      { id: 2, title: "Get a Free Home Valuation", url: "#", isActive: true },
      { id: 3, title: "Download Buyer's Guide", url: "#", isActive: true },
    ],
    listings: [
      {
        id: 1,
        address: "123 Emerald Ave",
        city: "Los Angeles, CA",
        price: "$1,250,000",
        beds: 4,
        baths: 3,
        sqft: "3,200",
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
        ],
        status: "Active"
      }
    ]
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
        // Require dragging 5px before drag event triggers so it doesn't conflict with clicking inputs
        activationConstraint: { distance: 5 }, 
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndLink = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setProfile((prev) => {
        const oldIndex = prev.links.findIndex(l => l.id === active.id);
        const newIndex = prev.links.findIndex(l => l.id === over.id);
        const newLinks = [...prev.links];
        const [moved] = newLinks.splice(oldIndex, 1);
        newLinks.splice(newIndex, 0, moved);
        return { ...prev, links: newLinks };
      });
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const addLink = () => {
    setProfile({
      ...profile,
      links: [...profile.links, { id: Date.now(), title: "New Custom Link", url: "https://", isActive: true }]
    });
  };

  const updateLink = (id: number, field: string, value: any) => {
    setProfile({
      ...profile,
      links: profile.links.map(l => l.id === id ? { ...l, [field]: value } : l)
    });
  };

  const removeLink = (id: number) => {
    setProfile({ ...profile, links: profile.links.filter(l => l.id !== id) });
  };

  const addSocial = () => {
    setProfile({
      ...profile,
      socials: [...profile.socials, { id: Date.now(), type: "instagram", url: "https://", isActive: true }]
    });
  };

  const updateSocial = (id: number, field: string, value: any) => {
    setProfile({
      ...profile,
      socials: profile.socials.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const removeSocial = (id: number) => {
    setProfile({ ...profile, socials: profile.socials.filter(s => s.id !== id) });
  };

  return (
    <div className="fixed inset-0 bg-stone-50 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* LEFT COLUMN - CONTROLS */}
      <div className="w-full md:w-1/2 lg:w-[60%] h-full overflow-y-auto bg-stone-50 md:bg-white border-r border-stone-200 relative z-10">
        <div className="max-w-3xl mx-auto px-6 py-12">
          
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-[#0052FF] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/10 hover:scale-105 transition-transform">
                  <Link2 className="w-6 h-6 stroke-[2.5]" />
               </div>
               <div>
                 <h1 className="text-2xl font-black tracking-tight text-stone-900">Dashboard</h1>
                 <p className="text-stone-500 font-medium text-sm">Customize your agentlink.com/{username}</p>
               </div>
            </div>
            <button className="bg-[#0052FF] text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-blue-700 transition-colors hidden sm:block">
              Save
            </button>
          </div>

          <section className="bg-white p-6 sm:p-8 rounded-[2rem] border border-stone-200 shadow-sm mb-8">
            <h2 className="text-lg font-black text-stone-900 mb-6">Profile Settings</h2>
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Avatar URL</label>
                <input type="text" name="avatar" value={profile.avatar} onChange={handleProfileChange} className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#0052FF] focus:bg-white transition-all font-medium text-stone-900" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Name</label>
                  <input type="text" name="name" value={profile.name} onChange={handleProfileChange} className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#0052FF] focus:bg-white transition-all font-bold text-stone-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Brokerage</label>
                  <input type="text" name="brokerage" value={profile.brokerage} onChange={handleProfileChange} className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#0052FF] focus:bg-white transition-all font-semibold text-stone-900" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Bio</label>
                <textarea name="bio" value={profile.bio} onChange={handleProfileChange} rows={3} className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#0052FF] focus:bg-white transition-all resize-none text-stone-900" />
              </div>
            </div>
          </section>

          {/* Links Section using DndKit */}
          <section className="mb-8 bg-white p-6 sm:p-8 rounded-[2rem] border border-stone-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-lg font-black text-stone-900">Action Links</h2>
              <button onClick={addLink} className="w-full sm:w-auto flex justify-center items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-900 px-5 py-2.5 rounded-full font-bold text-sm transition-colors shadow-sm">
                <Plus className="w-4 h-4 stroke-[3]" /> Add Link
              </button>
            </div>
            
            <div className="flex flex-col gap-4 relative">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndLink}>
                <SortableContext items={profile.links.map(l => l.id)} strategy={verticalListSortingStrategy}>
                  {profile.links.map(link => (
                    <SortableLinkItem key={link.id} link={link} updateLink={updateLink} removeLink={removeLink} />
                  ))}
                </SortableContext>
              </DndContext>
              {profile.links.length === 0 && <p className="text-center text-stone-400 font-medium py-10 border-2 border-dashed border-stone-200 rounded-2xl">Drop some links here for your clients!</p>}
            </div>
          </section>

          {/* Socials Section */}
          <section className="bg-white p-6 sm:p-8 rounded-[2rem] border border-stone-200 shadow-sm mb-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-stone-900">Social Accounts</h2>
              <button onClick={addSocial} className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-900 px-5 py-2.5 rounded-full font-bold text-sm transition-colors shadow-sm">
                <Plus className="w-4 h-4 stroke-[3]" /> Add Social
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {profile.socials.map(social => (
                <div key={social.id} className={`bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 transition-opacity duration-300 relative ${social.isActive === false ? 'opacity-50 saturate-50' : ''}`}>
                  
                  <div className="w-full flex-1 flex gap-3 pr-16 sm:pr-0">
                    <select value={social.type} onChange={e => updateSocial(social.id, 'type', e.target.value)} className="bg-white border border-stone-200 rounded-xl px-2 py-2.5 text-sm font-bold text-stone-700 outline-none focus:border-[#0052FF]">
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="twitter">X</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                    <input type="text" value={social.url} onChange={e => updateSocial(social.id, 'url', e.target.value)} className="flex-1 min-w-0 px-3 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0052FF] transition-colors text-sm font-semibold" placeholder="https://" />
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end absolute top-4 right-4 sm:relative sm:top-0 sm:right-0">
                     {/* Toggle Switch */}
                     <button 
                        onClick={() => updateSocial(social.id, 'isActive', social.isActive === false ? true : false)}
                        className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${social.isActive !== false ? 'bg-[#0052FF]' : 'bg-stone-300'}`}
                      >
                       <div className={`w-4 h-4 bg-white rounded-full transition-transform ${social.isActive !== false ? 'translate-x-4' : 'translate-x-0'}`} />
                     </button>
                     <button title="Delete Social" onClick={() => removeSocial(social.id)} className="p-2.5 bg-white text-stone-400 border border-stone-200 rounded-xl hover:text-red-500 hover:border-red-200 transition-colors flex-none">
                       <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              ))}
              {profile.socials.length === 0 && <p className="text-center text-stone-400 font-medium py-10 border-2 border-dashed border-stone-200 rounded-2xl">No socials mapped.</p>}
            </div>
          </section>

        </div>
      </div>

      {/* RIGHT COLUMN - PREVIEW */}
      <div className="hidden md:flex w-1/2 lg:w-[40%] h-full bg-stone-100 border-l border-stone-200 items-center justify-center relative p-8 shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.05)] z-0">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-2.5 bg-white rounded-full shadow-sm border border-stone-200 font-bold text-sm text-stone-700">
           <MonitorSmartphone className="w-4 h-4 text-[#0052FF]" /> Live Link Preview
        </div>
        <div className="relative w-[360px] h-[760px] bg-[#0A0B0D] rounded-[3.5rem] p-3 shadow-2xl border border-stone-300 transform scale-95 origin-center">
          <div className="absolute top-0 inset-x-0 h-10 bg-transparent z-20 flex justify-center pt-4 pointer-events-none">
            <div className="w-[110px] h-[30px] bg-black rounded-full flex items-center justify-end px-3 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]">
               <div className="w-2 h-2 rounded-full bg-[#0A0B0D] shadow-inner"></div>
            </div> 
          </div>
          <div className="w-full h-full bg-stone-50 rounded-[2.75rem] overflow-hidden relative shadow-inner pt-10">
            <div className="w-full h-[calc(100%+2rem)] -mt-4 bg-stone-50 pb-10">
               <ProfilePreview profile={profile} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-stone-400 font-semibold bg-stone-50">Loading Builder Interface...</div>}>
      <BuilderDashboard />
    </Suspense>
  )
}
