import React from 'react';
import { Page } from '../types';

interface INeedHelpPageProps {
  onNavigate: (page: Page) => void;
}

const INeedHelpPage: React.FC<INeedHelpPageProps> = ({ onNavigate }) => {
  const faqs = [
    {
      q: "I've been scammed. What should I do first?",
      a: "First, cease all contact with the suspected scammer. Do not send any more money. Gather all evidence you have, including chat logs, payment receipts, and any documents they sent you. Report the incident to your local law enforcement or cybercrime division. Sharing your story here can also help warn others."
    },
    {
      q: "How can I verify if a company is legitimate?",
      a: "Check for official registration on government websites of the country they operate in. Look for a physical office address and verify it. Be wary of companies that only use mobile numbers or free email addresses (like Gmail, Yahoo). Ask for references and check their online reviews on multiple platforms, not just their own website."
    },
    {
      q: "What are common red flags of a visa scam?",
      a: "Guaranteed job offers or visas, requests for large upfront payments before any services are rendered, pressure to make quick decisions, unprofessional communication with spelling/grammar errors, and requests for payment through untraceable methods like wire transfers or gift cards are all major red flags."
    },
    {
      q: "Is the information on this site 100% accurate?",
      a: "This is a community-driven platform. While we encourage users to submit proof, we cannot independently verify every claim. The lists should be used as a primary reference and a starting point for your own due diligence. Always do your own research before making any financial commitments."
    }
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
           <button onClick={() => onNavigate('Home')} className="text-sm text-red-600 hover:text-red-500 mb-6">&larr; Back to Home</button>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              I Need Help
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Information and resources to help you navigate your situation safely.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-red-600 text-lg">{faq.q}</h3>
                  <p className="mt-2 text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
             <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
             <p className="mt-4 text-gray-600">If you have technical issues with the website or want to report a submission, please contact us at:</p>
             <a href="mailto:support@globalscamalerts.dev" className="mt-4 inline-block text-lg font-medium text-red-600 hover:text-red-500">
                support@globalscamalerts.dev
             </a>
             <p className="mt-2 text-sm text-gray-500">(Please note: We are not a legal body and cannot offer legal advice or recover lost funds.)</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default INeedHelpPage;