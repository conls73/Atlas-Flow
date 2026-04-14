/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import { Mail, Phone, Camera, Key, ArrowRight, ExternalLink } from 'lucide-react';
import { ProfilePreview } from '../../components/ProfilePreview';

interface ProfileProps {
  params: {
    username: string;
  };
}

// Mock database fetch
function getAgentData(username: string) {
  return {
    name: "Alex Jensen",
    username: username,
    brokerage: "Atlas Realty",
    bio: "Helping you find your dream home in the city. Top 1% Producer. Let's make it happen.",
    avatar: "https://i.pravatar.cc/150?u=" + username,
    socials: [
      { id: 1, type: "email", url: "mailto:alex@example.com", icon: <Mail className="w-5 h-5" /> },
      { id: 2, type: "phone", url: "tel:+15551234567", icon: <Phone className="w-5 h-5" /> },
      { id: 3, type: "instagram", url: "#", icon: <Camera className="w-5 h-5" /> },
    ],
    links: [
      { id: 1, title: "Book a Showing", url: "#", icon: <Key className="w-4 h-4" /> },
      { id: 2, title: "Get a Free Home Valuation", url: "#", icon: <ArrowRight className="w-4 h-4" /> },
      { id: 3, title: "Download Buyer's Guide", url: "#", icon: <ExternalLink className="w-4 h-4" /> },
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
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
          "https://images.unsplash.com/photo-1600607687931-cecebd802404?w=600&q=80"
        ],
        status: "Active"
      },
      {
        id: 2,
        address: "89 Skyline Blvd",
        city: "Beverly Hills, CA",
        price: "$850,000",
        beds: 2,
        baths: 2,
        sqft: "1,500",
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80"
        ],
        status: "Pending"
      }
    ]
  };
}

export default function AgentProfile({ params }: ProfileProps) {
  const profile = getAgentData(params.username);

  return (
    <main className="min-h-screen bg-stone-50 selection:bg-emerald-200">
      <ProfilePreview profile={profile} />
    </main>
  );
}
