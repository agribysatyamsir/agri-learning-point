import React, { useRef, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  goldAccent?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className,
  goldAccent = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Controlled subtle tilt (max 4.5 degrees)
    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={twMerge(
        clsx(
          'relative rounded-xl p-6 bg-slate-900/90 border transition-all duration-300 card-3d overflow-hidden',
          goldAccent 
            ? 'border-amber-500/20 hover:border-amber-500/40 card-3d-gold' 
            : 'border-slate-800 hover:border-emerald-500/30',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
