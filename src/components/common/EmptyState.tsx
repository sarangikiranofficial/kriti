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
    <div className="relative border border-turmeric/35 bg-weave-pattern rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm my-6 overflow-hidden">
      <CornerOrnament className="absolute top-3 left-3 w-5 h-5 opacity-40 text-madder-red" />
      <CornerOrnament className="absolute bottom-3 right-3 w-5 h-5 rotate-180 opacity-40 text-madder-red" />

      <div className="w-14 h-14 mx-auto rounded-full bg-ivory border border-turmeric/40 flex items-center justify-center text-madder-red mb-4 shadow-2xs">
        {icon || <Sparkles className="w-6 h-6 text-turmeric" />}
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-madder-red mb-2">
        {title}
      </h3>
      <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
        {description}
      </p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-stitched-madder inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wide shadow-sm touch-target cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
