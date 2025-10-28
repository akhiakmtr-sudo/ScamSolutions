import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://i.postimg.cc/MTM86C64/bee8254cf1d3d2e138adc4d320e30663-1.jpg')` }}
      >
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

export default Hero;