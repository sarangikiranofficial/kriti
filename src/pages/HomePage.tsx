import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Palette, MapPin, ArrowRight, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AbstractHeroPattern, CornerOrnament } from '../components/common/Motifs';
import { EmptyState } from '../components/common/EmptyState';
import { APP_CONFIG } from '../config/appConfig';
import type { Artist } from '../types/database.types';

export const HomePage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('artists')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setArtists(data as Artist[]);
        }
      } catch {
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-paper-cream border-b border-terracotta/20 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-40">
          <AbstractHeroPattern />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-warm-ivory border border-terracotta/30 text-madder-red mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ART//CODE Hackathon • From Craft to Click</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-indigo-ink tracking-tight leading-tight">
            Every Traditional Craft <br className="hidden sm:inline" />
            Has a Sacred Story.
          </h1>

          <p className="mt-4 text-base sm:text-xl text-charcoal/80 max-w-2xl mx-auto leading-relaxed">
            {APP_CONFIG.description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-madder-red text-warm-ivory font-semibold text-sm hover:bg-madder-red/90 transition shadow-sm touch-target"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Your Artist Portfolio</span>
            </Link>

            <a
              href="#artists-section"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-warm-ivory border border-terracotta/30 text-indigo-ink font-semibold text-sm hover:border-madder-red transition shadow-2xs touch-target"
            >
              <Palette className="w-4 h-4 text-terracotta" />
              <span>Discover Living Traditions</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Artists Section (Strictly zero fake data; queries real DB) */}
      <section id="artists-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-indigo-ink">
            Traditional Indian Artists
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1.5">
            Discover masters of folk, tribal, and classical Indian crafts and their cultural stories.
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-charcoal/60 text-sm">
            Discovering traditional artists...
          </div>
        ) : artists.length === 0 ? (
          <EmptyState
            title="No Artists Yet"
            description="Be the first traditional artist to create your digital portfolio, record your cultural story, and share your craft with patrons worldwide."
            actionText="Create First Portfolio"
            onAction={() => window.location.href = '/login'}
            icon={<Palette className="w-6 h-6" />}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <Link
                key={artist.id}
                to={`/a/${artist.slug}`}
                className="group relative bg-warm-ivory border border-terracotta/25 rounded-2xl p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <CornerOrnament className="absolute top-2 left-2 w-4 h-4 opacity-30" />
                <CornerOrnament className="absolute bottom-2 right-2 w-4 h-4 rotate-180 opacity-30" />

                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full border border-terracotta/30 overflow-hidden bg-paper-cream flex-shrink-0">
                      {artist.portrait_url ? (
                        <img
                          src={artist.portrait_url}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-serif font-bold text-lg text-madder-red bg-terracotta/10">
                          {artist.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-bold text-indigo-ink group-hover:text-madder-red transition">
                        {artist.name}
                      </h3>
                      {artist.name_regional && (
                        <p className="text-xs text-terracotta font-medium">
                          {artist.name_regional}
                        </p>
                      )}
                      <span className="inline-block mt-1 text-[11px] font-semibold text-charcoal/80 bg-paper-cream border border-terracotta/20 px-2 py-0.5 rounded-full">
                        {artist.art_form}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-charcoal/75 line-clamp-3 leading-relaxed mb-4">
                    {artist.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-terracotta/15 flex items-center justify-between text-xs text-charcoal/70">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-madder-red" />
                    <span>{artist.location_state}</span>
                  </span>
                  <span className="flex items-center gap-1 text-madder-red font-medium group-hover:translate-x-0.5 transition-transform">
                    <span>View Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
