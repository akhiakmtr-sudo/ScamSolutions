import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { type Page } from '../types';
import { ShieldExclamationIcon } from './icons/ShieldExclamationIcon';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';


interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  isAuthenticated: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, isAuthenticated, onLogout, onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = (page: Page) => 
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      currentPage === page
        ? 'bg-red-600 text-white'
        : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
    }`;
    
  const primaryButtonClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-red-600 text-white hover:bg-red-700";
  const secondaryButtonClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 text-gray-600 hover:bg-gray-100/50";
  
  const mobilePrimaryButtonClasses = `block w-full text-left ${primaryButtonClasses}`;
  const mobileSecondaryButtonClasses = `block w-full text-left ${secondaryButtonClasses}`;

  const AuthButtons = () => (
     <>
      {isAuthenticated ? (
        <button onClick={onLogout} className={primaryButtonClasses}>Logout</button>
      ) : (
        <div className="flex items-center space-x-1">
            <button onClick={onLoginClick} className={secondaryButtonClasses}>Login</button>
            <button onClick={onLoginClick} className={primaryButtonClasses}>Sign Up</button>
        </div>
      )}
    </>
  );

  const MobileAuthButtons = () => (
     <>
      {isAuthenticated ? (
        <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className={mobilePrimaryButtonClasses}>Logout</button>
      ) : (
        <div className="space-y-2">
           <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className={mobileSecondaryButtonClasses}>Login</button>
           <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className={mobilePrimaryButtonClasses}>Sign Up</button>
        </div>
      )}
    </>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-lg ${isScrolled ? 'shadow-sm border-b border-gray-200' : 'border-b border-transparent'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" onClick={() => onNavigate('Home')} className="flex-shrink-0 flex items-center gap-2 text-gray-900">
              <ShieldExclamationIcon className="h-8 w-8 text-red-500" />
              <span className="font-bold text-xl">Global Scam Alerts</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.name as Page);
                  }}
                  className={navLinkClasses(link.name as Page)}
                >
                  {link.name}
                </a>
              ))}
              <AuthButtons />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-gray-100/50 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-200/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.name as Page);
                  setIsMenuOpen(false);
                }}
                className={`block ${navLinkClasses(link.name as Page)}`}
              >
                {link.name}
              </a>
            ))}
             <div className="pt-2">
              <MobileAuthButtons />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;