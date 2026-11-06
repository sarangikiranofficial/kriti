import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { BrandLogo, CornerOrnament, GeometricDivider } from '../components/common/Motifs';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, signInWithMagicLink, isConfigured } = useAuth();
  const { showToast } = useToast();

  // If already logged in, redirect directly to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.trim()) {
      showToast('Please enter your email address.', 'error');
      return;
    }

    setIsLoading(true);
    const { error } = await signInWithMagicLink(email.trim());
    setIsLoading(false);

    if (error) {
      showToast(error.message, 'error');
    } else {
      setSubmitted(true);
      showToast('Magic link sent to your email!', 'success');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-paper-grain">
      <div className="relative max-w-md w-full bg-warm-ivory border border-terracotta/30 rounded-2xl p-8 sm:p-10 shadow-md">
        <CornerOrnament className="absolute top-3 left-3 w-6 h-6 opacity-40" />
        <CornerOrnament className="absolute bottom-3 right-3 w-6 h-6 rotate-180 opacity-40" />

        <div className="text-center mb-8">
          <BrandLogo className="w-14 h-14 mx-auto mb-3" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-indigo-ink">
            Artist Studio Login
          </h1>
          <p className="text-sm text-charcoal/70 mt-1.5">
            Create or manage your professional online portfolio and cultural stories
          </p>
        </div>

        {!isConfigured && (
          <div className="mb-6 p-4 rounded-lg bg-turmeric/15 border border-turmeric/40 text-xs text-indigo-ink leading-relaxed">
            <strong>Backend configuration missing:</strong> Please add your Supabase project keys to <code className="bg-warm-ivory px-1 py-0.5 rounded">.env</code> as detailed in <code className="bg-warm-ivory px-1 py-0.5 rounded">SETUP.md</code> to enable live authentication.
          </div>
        )}

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-leaf-green/15 text-leaf-green flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-xl font-bold text-indigo-ink">
              Check Your Email
            </h2>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              We sent a password-free sign-in link to:
              <br />
              <strong className="text-indigo-ink font-semibold">{email}</strong>
            </p>
            <p className="text-xs text-charcoal/60">
              Click the link in your email on this device to open your Artist Studio.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-madder-red hover:underline font-medium"
              >
                Use a different email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-indigo-ink mb-1.5">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. artist@kalakatha.art"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-terracotta/30 bg-paper-cream focus:bg-warm-ivory focus:ring-2 focus:ring-madder-red focus:border-transparent outline-none transition text-sm text-charcoal"
                />
              </div>
              <p className="text-xs text-charcoal/60 mt-1.5">
                No passwords to remember. We send a secure 1-click login link.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isConfigured}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-madder-red text-warm-ivory font-medium hover:bg-madder-red/90 transition shadow-sm touch-target disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <span>Sending magic link...</span>
              ) : (
                <>
                  <span>Send Magic Sign-In Link</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <GeometricDivider className="my-6" />

        <div className="text-center text-xs text-charcoal/60">
          <p>
            Traditional artists retain 100% ownership of their work and data. Free and open platform.
          </p>
        </div>
      </div>
    </div>
  );
};
