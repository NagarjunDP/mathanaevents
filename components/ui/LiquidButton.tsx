"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  isExternal?: boolean;
}

export default function LiquidButton({ 
  children, 
  href, 
  isExternal,
  onClick,
  className = "",
  ...props 
}: LiquidButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsAnimating(false);
      
      if (onClick) {
        onClick(e);
      }
      
      if (href) {
        if (isExternal) {
          window.open(href, "_blank");
        } else {
          router.push(href);
        }
      }
    }, 1000);
  };

  return (
    <button 
      className={`liquid-btn ${className} ${isAnimating ? 'is-animating' : ''}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
