'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  enableGlow?: boolean;
}

export function ParallaxCard({
  children,
  className = '',
  intensity = 15,
  enableGlow = true,
}: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    setRotateX(-yPct * intensity);
    setRotateY(xPct * intensity);

    if (enableGlow) {
      setGlarePosition({
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100,
        opacity: 0.25,
      });
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 ${className}`}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200,
          mass: 0.5,
        }}
        className="preserve-3d h-full w-full rounded-2xl relative"
      >
        {children}

        {enableGlow && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            style={{
              opacity: glarePosition.opacity,
              background: `radial-gradient(circle 250px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4), transparent 80%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
