import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User, Palette, MessageSquare, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ProfileEditor } from '../components/dashboard/ProfileEditor';
import { ArtworkManager } from '../components/dashboard/ArtworkManager';
import { EnquiriesInbox } from '../components/dashboard/EnquiriesInbox';
import { CornerOrnament } from '../components/common/Motifs';

type DashboardTab = 'profile' | 'artworks' | 'enquiries';

export const DashboardPage: React.FC = () => {
  const { user, artist, loading, isConfigured } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>(artist ? 'artworks' : 'profile');

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-charcoal/60 text-sm">
        Opening your artist studio...
      </div>
    );
  }

  // Redirect unauthenticated visitors to login
  if (!user && isConfigured) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Studio Header */}
      <div className="relative bg-ivory border border-turmeric/35 rounded-2xl p-6 sm:p-8 mb-8 shadow-xs frame-mat">
        <CornerOrnament className="absolute top-2 left-2 w-6 h-6 opacity-30 text-oxblood" />
        <CornerOrnament className="absolute bottom-2 right-2 w-6 h-6 rotate-180 opacity-30 text-oxblood" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta font-serif">
              Artist Studio &amp; Portfolio Dashboard
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-normal text-oxblood mt-1">
              {artist ? `Namaskaram, ${artist.name}` : 'Welcome, Artist'}
            </h1>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-1 font-serif">
              {artist
                ? `${artist.art_form} • ${artist.location_state}`
                : 'Complete your profile to generate your public portfolio URL'}
            </p>
          </div>

          {artist && (
            <a
              href={`/a/${artist.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-stitched-madder inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm touch-target"
            >
              <span>View Public Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5 text-turmeric" />
            </a>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 border-b border-turmeric/25 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('artworks')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition touch-target whitespace-nowrap font-serif ${
              activeTab === 'artworks'
                ? 'border-madder-red text-madder-red bg-paper/60 rounded-t-lg'
                : 'border-transparent text-charcoal/70 hover:text-oxblood'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Artworks Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition touch-target whitespace-nowrap font-serif ${
              activeTab === 'profile'
                ? 'border-madder-red text-madder-red bg-paper/60 rounded-t-lg'
                : 'border-transparent text-charcoal/70 hover:text-oxblood'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile &amp; Biography</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition touch-target whitespace-nowrap font-serif ${
              activeTab === 'enquiries'
                ? 'border-madder-red text-madder-red bg-paper/60 rounded-t-lg'
                : 'border-transparent text-charcoal/70 hover:text-oxblood'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enquiries &amp; Commissions</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="bg-warm-ivory border border-terracotta/20 rounded-2xl p-6 sm:p-8 shadow-xs">
        {activeTab === 'profile' && <ProfileEditor />}

        {activeTab === 'artworks' && <ArtworkManager />}

        {activeTab === 'enquiries' && <EnquiriesInbox />}
      </div>
    </div>
  );
};
