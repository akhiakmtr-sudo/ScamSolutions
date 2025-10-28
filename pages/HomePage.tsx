import React from 'react';
import Hero from '../components/Hero';
import ForCompaniesForm from '../components/ForCompaniesForm';
import { MOCK_CONSULTANCIES } from '../constants';
import { Consultancy, ConsultancyStatus, Page } from '../types';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { ShieldExclamationIcon } from '../components/icons/ShieldExclamationIcon';
import { WhatsappIcon } from '../components/icons/WhatsappIcon';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { MailIcon } from '../components/icons/MailIcon';


interface HomePageProps {
  onNavigate: (page: Page) => void;
  onSelectConsultancy: (consultancy: Consultancy) => void;
  onRequestAuthentication: (page: Page) => void;
  isAuthenticated: boolean;
  currentPage: Page;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectConsultancy, onRequestAuthentication, isAuthenticated, currentPage }) => {
  const recentListings = MOCK_CONSULTANCIES
    .filter(c => c.submissionStatus === 'approved')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Stay Informed. Stay Safe.</h1>
            <p className="text-gray-600 mt-2">Browse our community-driven database of visa consultancies before you proceed.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button 
              onClick={() => onNavigate('Scammers List')} 
              className="bg-red-100 text-red-700 font-bold py-3 px-6 rounded-lg hover:bg-red-200 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <ShieldExclamationIcon className="w-5 h-5" />
              View Scammers List
            </button>
            <button 
              onClick={() => onNavigate('Trusted Firms')} 
              className="bg-green-100 text-green-700 font-bold py-3 px-6 rounded-lg hover:bg-green-200 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <ShieldCheckIcon className="w-5 h-5" />
              View Trusted Firms
            </button>
          </div>
        </div>

        <div className="mt-16">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">Recently Reported & Listed</h2>
            <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {recentListings.map(item => (
                  <li key={item.id} className="py-4 flex items-center justify-between flex-wrap gap-4">
                    <a href="#" onClick={(e) => { e.preventDefault(); onSelectConsultancy(item); }} className="font-semibold text-gray-700 hover:text-red-600">{item.name}</a>
                    {item.status === ConsultancyStatus.Scammer ? (
                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                         <ShieldExclamationIcon className="w-4 h-4 mr-1.5" />
                         SCAM
                       </span>
                    ) : (
                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                         <ShieldCheckIcon className="w-4 h-4 mr-1.5" />
                         TRUSTED
                       </span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="text-center mt-6">
                <button
                  onClick={() => onNavigate('All Reports')}
                  className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  See More &rarr;
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">How to Spot a Fake Consultancy</h2>
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-gray-600">
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg border border-gray-200">
                  <p className="mb-4">
                    Scammers often create convincing schemes involving fake employment visas, money laundering, and even sexual exploitation under the guise of job offers. Being vigilant is your first line of defense.
                  </p>
                  <ul className="space-y-3 list-disc list-inside text-gray-500">
                    <li><strong>Guaranteed Visas:</strong> No one can guarantee a visa. It's a government decision.</li>
                    <li><strong>Upfront Fees:</strong> Be wary of large fees before any real service or documentation.</li>
                    <li><strong>Unprofessional Communication:</strong> Poor grammar, emails from public domains (Gmail, Yahoo).</li>
                    <li><strong>Pressure Tactics:</strong> Urgency to pay money or make a decision immediately.</li>
                    <li><strong>Vague Details:</strong> Lack of a physical office address or proper registration details.</li>
                  </ul>
                </div>
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg border border-gray-200">
                   <h3 className="font-bold text-lg text-gray-900 mb-4">Verification Steps:</h3>
                   <ol className="space-y-3 list-decimal list-inside text-gray-500">
                     <li>Verify the company's registration on official government websites.</li>
                     <li>Check for online reviews on multiple independent platforms.</li>
                     <li>Ask for references of past successful clients and contact them.</li>
                     <li>Never share your original passport or documents before verifying legitimacy.</li>
                     <li>Use secure payment methods and always get a receipt.</li>
                   </ol>
                </div>
              </div>
              <div className="text-center mt-12">
                  <p className="text-gray-400 mb-4">Still unsure? Contact us for guidance.</p>
                  <div className="flex justify-center items-center gap-6">
                    <a href="https://wa.me/919746109569" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110"><WhatsappIcon className="w-8 h-8"/></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110"><InstagramIcon className="w-8 h-8"/></a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110"><FacebookIcon className="w-8 h-8"/></a>
                    <a href="mailto:info@globalscamalerts.com" className="text-gray-400 hover:text-red-500 transition-colors"><MailIcon className="w-8 h-8"/></a>
                  </div>
              </div>
            </section>
        </div>
      </div>
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ForCompaniesForm isAuthenticated={isAuthenticated} onRequestAuthentication={onRequestAuthentication} currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;