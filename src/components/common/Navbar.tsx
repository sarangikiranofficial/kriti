import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Palette, UserCircle, LogOut, AlertTriangle } from 'lucide-react';
import { BrandLogo, BorderBand } from './Motifs';
import { APP_CONFIG } from '../../config/appConfig';
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
    <header className="sticky top-0 z-40 bg-warm-ivory/95 backdrop-blur-md border-b border-terracotta/20 shadow-xs">
      {!isConfigured && (
        <div className="bg-turmeric/20 border-b border-turmeric/40 px-4 py-2 text-xs sm:text-sm text-indigo-ink flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-terracotta flex-shrink-0" />
          <span>
            <strong>Supabase Setup Required:</strong> Add your credentials to <code className="bg-warm-ivory px-1 rounded">.env</code>. See <code className="bg-warm-ivory px-1 rounded">SETUP.md</code> for instructions.
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none" onClick={() => setIsOpen(false)}>
            <BrandLogo className="w-9 h-9 transition-transform group-hover:scale-105" />
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-indigo-ink">
                {APP_CONFIG.name}
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-terracotta font-medium uppercase tracking-wider">
                {APP_CONFIG.shortTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-charcoal hover:text-madder-red transition py-1">
              Explore Artists
            </Link>
            <Link to="/about" className="text-charcoal hover:text-madder-red transition py-1">
              About &amp; Ethics
            </Link>

            {user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-terracotta/25">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-paper-cream border border-terracotta/30 text-indigo-ink hover:border-madder-red transition"
                >
                  <Palette className="w-4 h-4 text-madder-red" />
                  <span>{artist ? artist.name : 'Artist Studio'}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-charcoal/70 hover:text-madder-red rounded-lg transition"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-madder-red text-warm-ivory hover:bg-madder-red/90 transition shadow-xs"
              >
                <UserCircle className="w-4 h-4" />
                <span>Artist Sign In</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal hover:bg-paper-cream touch-target flex items-center justify-center focus:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-terracotta/20 bg-warm-ivory px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-charcoal hover:bg-paper-cream"
          >
            Explore Artists
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-charcoal hover:bg-paper-cream"
          >
            About &amp; Cultural Ethics
          </Link>

          {user ? (
            <div className="pt-2 border-t border-terracotta/20 space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-paper-cream text-indigo-ink font-medium border border-terracotta/30"
              >
                <Palette className="w-5 h-5 text-madder-red" />
                <span>{artist ? artist.name : 'Artist Studio'}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-madder-red font-medium hover:bg-paper-cream"
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
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-madder-red text-warm-ivory font-medium shadow-xs"
              >
                <UserCircle className="w-4 h-4" />
                <span>Artist Sign In / Onboarding</span>
              </Link>
            </div>
          )}
        </div>
      )}

      <BorderBand className="w-full h-1" />
    </header>
  );
};
