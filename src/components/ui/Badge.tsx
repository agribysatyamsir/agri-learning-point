import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'gold' | 'slate' | 'blue' | 'rose';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-semibold rounded-full uppercase tracking-wider select-none';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const variantClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    gold: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    slate: 'bg-slate-800 text-slate-300 border border-slate-700',
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
    rose: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
  };

  return (
    <span className={twMerge(clsx(baseClasses, sizeClasses[size], variantClasses[variant], className))} {...props}>
      {children}
    </span>
  );
};
