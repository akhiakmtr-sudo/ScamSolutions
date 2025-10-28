import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://i.postimg.cc/B6pv8GsK/Global-Scam-Alret-20251028-105809-0000.png')` }}
      >
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

export default Hero;