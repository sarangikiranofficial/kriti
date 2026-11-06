import React from 'react';
import { Sparkles } from 'lucide-react';
import { CornerOrnament } from './Motifs';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
}) => {
  return (
    <div className="relative border border-terracotta/25 bg-warm-ivory rounded-xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm my-6">
      <CornerOrnament className="absolute top-2 left-2 w-5 h-5 opacity-40" />
      <CornerOrnament className="absolute bottom-2 right-2 w-5 h-5 rotate-180 opacity-40" />

      <div className="w-14 h-14 mx-auto rounded-full bg-paper-cream border border-terracotta/30 flex items-center justify-center text-madder-red mb-4">
        {icon || <Sparkles className="w-6 h-6" />}
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-indigo-ink mb-2">
        {title}
      </h3>
      <p className="text-charcoal/75 text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
        {description}
      </p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-madder-red text-warm-ivory font-medium hover:bg-madder-red/90 transition shadow-sm touch-target"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
