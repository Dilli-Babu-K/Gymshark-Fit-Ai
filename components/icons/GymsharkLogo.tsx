import React from 'react';

const GymsharkLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gymshark Logo">
      <text x="0" y="30" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight="bold">GYMSHARK</text>
    </svg>
);

export default GymsharkLogo;