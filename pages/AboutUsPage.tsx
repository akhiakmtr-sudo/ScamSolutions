import React from 'react';
import { ShieldExclamationIcon } from '../components/icons/ShieldExclamationIcon';
import { Page } from '../types';

interface AboutUsPageProps {
  onNavigate: (page: Page) => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-lg">
          <button onClick={() => onNavigate('Home')} className="text-sm text-red-600 hover:text-red-500 mb-6">&larr; Back to Home</button>
          <div className="text-center">
           <ShieldExclamationIcon className="mx-auto h-16 w-16 text-red-500" />
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Our Mission: Protecting Your Dreams
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Global Scam Alerts was born from a simple yet powerful idea: to create a safe, transparent community for individuals seeking opportunities abroad.
            </p>
          </div>
          <div className="mt-16 text-left space-y-8 text-gray-600">
            <p>
              The journey to work or study in a new country is filled with hope and excitement. Unfortunately, it's also a path where malicious actors prey on the dreams of the ambitious. Fake job offers, fraudulent visa promises, and exorbitant hidden fees have shattered countless aspirations and caused immense financial and emotional distress.
            </p>
            <p>
              We believe in the power of shared knowledge. Our platform is dedicated to two core objectives:
            </p>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50/80 backdrop-blur-md rounded-lg border border-red-200">
                <h3 className="font-bold text-red-700 text-lg">Expose Scammers</h3>
                <p className="mt-2">By providing a platform for users to anonymously share their negative experiences, complete with evidence, we aim to build a comprehensive, searchable database of fraudulent consultancies. This collective intelligence helps others avoid the same pitfalls.</p>
              </div>
               <div className="p-6 bg-gray-50/80 backdrop-blur-md rounded-lg border border-green-200">
                <h3 className="font-bold text-green-700 text-lg">Highlight Trustworthy Firms</h3>
                <p className="mt-2">It's equally important to recognize the good players. We feature and verify registered, trustworthy companies that have a proven track record of success and ethical practices. When you find a firm on our 'Trusted' list, you can proceed with greater confidence.</p>
              </div>
            </div>
            <p>
              Your story matters. Every report filed, every trusted firm recommended, strengthens our community and makes the path safer for the next person. Together, we can build a wall of awareness that scammers can't penetrate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;