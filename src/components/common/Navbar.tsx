import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Palette, UserCircle, LogOut, AlertTriangle } from 'lucide-react';
import { TraditionalLogoBadge, BorderBand } from './Motifs';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, artist, signOut, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Logo: go to the top of the home page
  const handleLogoClick = () => {
    setIsOpen(false);
    if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // "Explore Artisans": go to the artist filter area on the home page
  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === '/') {
      document
        .getElementById('artist-filters')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/#artist-filters');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 relative transition-all duration-300 ${
        isScrolled
          ? 'shadow-md shadow-oxblood/25'
          : ''
      }`}
      style={{
        backgroundImage: "url('/images/textures/paper-texture.png')",
        backgroundSize: '380px auto',
        backgroundPosition: '0 0',
      }}
    >
      {/* Warm Oxblood Overlay (78% - 86% opacity) for high-contrast legible nav text */}
      <div className="absolute inset-0 bg-gradient-to-r from-oxblood/92 via-oxblood/82 to-oxblood/92 pointer-events-none" />

      {/* Top Tone-on-Tone Jaali Lattice Rule */}
      <div className="relative z-10">
        <BorderBand className="w-full h-1.5 opacity-70" tone="gold" />
      </div>

      {!isConfigured && (
        <div className="relative z-10 bg-turmeric/20 border-b border-turmeric/35 px-4 py-1.5 text-xs text-ivory flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-turmeric flex-shrink-0" />
          <span>
            <strong>Supabase Setup Required:</strong> Add credentials to <code className="bg-oxblood/80 px-1 py-0.5 rounded border border-turmeric/40 text-turmeric">.env</code>. See <code className="bg-oxblood/80 px-1 py-0.5 rounded border border-turmeric/40 text-turmeric">SETUP.md</code>.
          </span>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-15' : 'h-18'
          }`}
        >
          {/* Logo & Wordmark in Display Font */}
          <Link
            to="/"
            className="group focus:outline-none transition-transform hover:scale-[1.02]"
            onClick={handleLogoClick}
          >
            <TraditionalLogoBadge isLight={true} size={isScrolled ? 'sm' : 'md'} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.14em] font-medium">
            <Link
              to="/#artist-filters"
              onClick={handleExploreClick}
              className="text-ivory/85 hover:text-turmeric transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-turmeric after:transition-all"
            >
              Explore Artisans
            </Link>
            <Link
              to="/about"
              className="text-ivory/85 hover:text-turmeric transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-turmeric after:transition-all"
            >
              About &amp; Ethics
            </Link>

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-turmeric/30">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-ivory/10 border border-turmeric/35 text-ivory hover:border-turmeric hover:bg-ivory/15 transition shadow-2xs normal-case text-xs font-semibold"
                >
                  <Palette className="w-3.5 h-3.5 text-turmeric" />
                  <span>{artist ? artist.name : 'Artisan Studio'}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 text-ivory/70 hover:text-turmeric rounded-lg transition cursor-pointer"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-stitched-madder inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold normal-case tracking-normal shadow-sm touch-target cursor-pointer"
              >
                <UserCircle className="w-4 h-4 text-turmeric" />
                <span>Artisan Studio Sign In</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg border border-turmeric/35 text-ivory hover:bg-ivory/10 touch-target flex items-center justify-center focus:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-5 h-5 text-turmeric" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean slide-down menu) */}
      {isOpen && (
        <div className="md:hidden relative z-20 border-t border-turmeric/25 bg-oxblood/98 backdrop-blur-md px-5 pt-4 pb-6 space-y-3.5 text-ivory">
          <Link
            to="/#artist-filters"
            onClick={handleExploreClick}
            className="block text-xs uppercase tracking-widest font-medium py-2 hover:text-turmeric transition border-b border-turmeric/15"
          >
            Explore Artisans
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block text-xs uppercase tracking-widest font-medium py-2 hover:text-turmeric transition border-b border-turmeric/15"
          >
            About &amp; Cultural Ethics
          </Link>

          {user ? (
            <div className="pt-2 space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-turmeric bg-ivory/10 border border-turmeric/30"
              >
                <Palette className="w-4 h-4" />
                <span>{artist ? artist.name : 'Artisan Studio'}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider text-ivory/75 hover:text-turmeric text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="btn-stitched-madder w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-semibold"
              >
                <UserCircle className="w-4 h-4 text-turmeric" />
                <span>Artisan Studio Sign In</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
