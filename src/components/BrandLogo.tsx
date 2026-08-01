import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 40, className = '' }) => (
  <img
    src="/gymsetu-logo.png"
    alt="GymSetu logo"
    width={size}
    height={size}
    className={`shrink-0 object-contain ${className}`}
  />
);
