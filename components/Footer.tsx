import React from 'react';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { MailIcon } from './icons/MailIcon';
import { ShieldExclamationIcon } from './icons/ShieldExclamationIcon';
import { Page } from '../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        onNavigate(page);
    };

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <div className="flex justify-center md:justify-start items-center gap-2 mb-2">
                             <ShieldExclamationIcon className="h-6 w-6 text-red-500" />
                             <span className="font-bold text-lg text-gray-900">VisaScamAlerts</span>
                        </div>
                        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} VisaScamAlerts. All rights reserved.</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-gray-900 mb-2">Quick Links</p>
                        <div className="text-sm text-gray-500 space-x-2 sm:space-x-4">
                            <a href="#" onClick={(e) => handleNavClick(e, 'Home')} className="hover:text-red-500 transition-colors">Home</a>
                            <span className="text-gray-300">|</span>
                            <a href="#" onClick={(e) => handleNavClick(e, 'About Us')} className="hover:text-red-500 transition-colors">About Us</a>
                            <span className="text-gray-300">|</span>
                            <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
                             <span className="text-gray-300">|</span>
                            <a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a>
                             <span className="text-gray-300">|</span>
                            <a href="#" onClick={(e) => handleNavClick(e, 'I Need Help')} className="hover:text-red-500 transition-colors">Contact</a>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <a href="https://wa.me/919746109569" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors"><WhatsappIcon className="w-6 h-6"/></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors"><InstagramIcon className="w-6 h-6"/></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors"><FacebookIcon className="w-6 h-6"/></a>
                        <a href="mailto:info@visascamalerts.com" className="text-gray-400 hover:text-red-500 transition-colors"><MailIcon className="w-6 h-6"/></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;