import React from 'react';

export const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} aria-label="Instagram" role="img" viewBox="0 0 24 24">
        <defs>
            <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="5%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
        </defs>
        <rect width="100%" height="100%" rx="6" fill="url(#instagram-gradient)" />
        <path fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM16.5 7.5h.01" />
        <rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke="white" strokeWidth="2" />
    </svg>
);