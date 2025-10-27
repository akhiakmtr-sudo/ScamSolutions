import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://picsum.photos/1920/1080?grayscale&blur=1')` }}
      >
      </div>
    </div>
  );
};

export default Hero;