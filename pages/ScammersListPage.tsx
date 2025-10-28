import React, { useState } from 'react';
import { MOCK_CONSULTANCIES } from '../constants';
import { Consultancy, ConsultancyStatus, Page } from '../types';
import ConsultancyCard from '../components/ConsultancyCard';

interface ScammersListPageProps {
  onSelectConsultancy: (consultancy: Consultancy) => void;
  onNavigate: (page: Page) => void;
}

const ScammersListPage: React.FC<ScammersListPageProps> = ({ onSelectConsultancy, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const scammers = MOCK_CONSULTANCIES.filter(
    (c) => c.status === ConsultancyStatus.Scammer &&
           c.submissionStatus === 'approved' &&
           c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg">
          <button onClick={() => onNavigate('Home')} className="text-sm text-red-600 hover:text-red-500 mb-6">&larr; Back to Home</button>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-red-600 sm:text-5xl">
              Scammer & Fraud Alert List
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              A community-reported list of consultancies involved in fraudulent activities. Search by name to check before you engage.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search for a company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {scammers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {scammers.map((consultancy) => (
              <div key={consultancy.id} onClick={() => onSelectConsultancy(consultancy)} className="cursor-pointer">
                <ConsultancyCard consultancy={consultancy} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-100/80 backdrop-blur-md rounded-lg mt-12">
            <p className="text-gray-500">No scammers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScammersListPage;