import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Palette, UserCircle, LogOut, AlertTriangle } from 'lucide-react';
import { TraditionalLogoBadge, BorderBand } from './Motifs';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, artist, signOut, isConfigured } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-warm-ivory/95 backdrop-blur-md border-b border-antique-gold/25 shadow-xs">
      {!isConfigured && (
        <div className="bg-antique-gold/15 border-b border-antique-gold/30 px-4 py-2 text-xs sm:text-sm text-indigo-ink flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-terracotta flex-shrink-0" />
          <span>
            <strong>Supabase Setup Required:</strong> Add your credentials to <code className="bg-rice-paper px-1 rounded border border-antique-gold/20">.env</code>. See <code className="bg-rice-paper px-1 rounded border border-antique-gold/20">SETUP.md</code> for instructions.
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Traditional Logo & Brand */}
          <Link to="/" className="group focus:outline-none" onClick={() => setIsOpen(false)}>
            <TraditionalLogoBadge className="transition-transform group-hover:scale-102" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link to="/" className="text-charcoal hover:text-deep-maroon transition py-1">
              Explore Artisans
            </Link>
            <Link to="/about" className="text-charcoal hover:text-deep-maroon transition py-1">
              About &amp; Cultural Ethics
            </Link>

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-antique-gold/30">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rice-paper border border-antique-gold/30 text-indigo-ink hover:border-deep-maroon transition shadow-2xs"
                >
                  <Palette className="w-4 h-4 text-deep-maroon" />
                  <span className="font-semibold">{artist ? artist.name : 'Artisan Studio'}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-charcoal/70 hover:text-deep-maroon rounded-lg transition"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-maroon text-rice-paper hover:bg-deep-maroon/90 border border-antique-gold/30 transition shadow-sm font-semibold"
              >
                <UserCircle className="w-4 h-4 text-antique-gold" />
                <span>Artisan Studio Sign In</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal hover:bg-rice-paper touch-target flex items-center justify-center focus:outline-none border border-antique-gold/20"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-antique-gold/20 bg-warm-ivory px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-charcoal hover:bg-rice-paper"
          >
            Explore Artisans
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-charcoal hover:bg-rice-paper"
          >
            About &amp; Cultural Ethics
          </Link>

          {user ? (
            <div className="pt-2 border-t border-antique-gold/20 space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-rice-paper text-indigo-ink font-medium border border-antique-gold/30"
              >
                <Palette className="w-5 h-5 text-deep-maroon" />
                <span>{artist ? artist.name : 'Artisan Studio'}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-deep-maroon font-medium hover:bg-rice-paper"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-deep-maroon text-rice-paper font-medium shadow-xs border border-antique-gold/30"
              >
                <UserCircle className="w-5 h-5 text-antique-gold" />
                <span>Artisan Studio Sign In</span>
              </Link>
            </div>
          )}
        </div>
      )}

      <BorderBand className="w-full h-1" />
    </header>
  );
};
