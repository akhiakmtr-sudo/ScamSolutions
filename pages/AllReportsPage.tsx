import React, { useState, useRef } from 'react';
import { MOCK_CONSULTANCIES } from '../constants';
import { Consultancy, Page, ConsultancyStatus } from '../types';
import ConsultancyCard from '../components/ConsultancyCard';
import ForCompaniesForm from '../components/ForCompaniesForm';

interface AllReportsPageProps {
  onSelectConsultancy: (consultancy: Consultancy) => void;
  onNavigate: (page: Page) => void;
  onRequestAuthentication: (page: Page) => void;
  isAuthenticated: boolean;
  currentPage: Page;
}

const AllReportsPage: React.FC<AllReportsPageProps> = ({ onSelectConsultancy, onNavigate, onRequestAuthentication, isAuthenticated, currentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'scammer' | 'trusted'>('all');
  const companiesFormRef = useRef<HTMLDivElement>(null);

  const handleReportFalseAllegationClick = () => {
    companiesFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const allApprovedReports = MOCK_CONSULTANCIES.filter(c => c.submissionStatus === 'approved');

  const filteredReports = allApprovedReports.filter(
    (c) => {
      if (filter === 'scammer' && c.status !== ConsultancyStatus.Scammer) return false;
      if (filter === 'trusted' && c.status !== ConsultancyStatus.Trusted) return false;
      return c.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getFilterButtonClasses = (buttonFilter: typeof filter) => {
    if (filter === buttonFilter) {
      if (buttonFilter === 'scammer') return 'bg-red-600 text-white border-red-600';
      if (buttonFilter === 'trusted') return 'bg-green-600 text-white border-green-600';
      return 'bg-gray-800 text-white border-gray-800';
    }
    return 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300';
  };

  return (
    <>
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => onNavigate('Home')} className="text-sm text-red-600 hover:text-red-500 mb-6">&larr; Back to Home</button>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              All Reports
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              A complete list of all community-reported consultancies. Use the filters to narrow your search.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onRequestAuthentication('Share Experience')}
                className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md"
              >
                Report My Experience
              </button>
              <button
                onClick={handleReportFalseAllegationClick}
                className="bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300 border border-gray-300"
              >
                Report a False Allegation
              </button>
            </div>

            {/* Search and Filter */}
            <div className="mt-12 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search by company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all mb-4"
              />
              <div className="flex justify-center gap-2 sm:gap-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors border ${getFilterButtonClasses('all')}`}
                >
                  All ({allApprovedReports.length})
                </button>
                <button
                  onClick={() => setFilter('scammer')}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors border ${getFilterButtonClasses('scammer')}`}
                >
                  Scammers ({allApprovedReports.filter(c => c.status === ConsultancyStatus.Scammer).length})
                </button>
                <button
                  onClick={() => setFilter('trusted')}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors border ${getFilterButtonClasses('trusted')}`}
                >
                  Trusted ({allApprovedReports.filter(c => c.status === ConsultancyStatus.Trusted).length})
                </button>
              </div>
            </div>
          </div>

          {filteredReports.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReports.map((consultancy) => (
                <div key={consultancy.id} onClick={() => onSelectConsultancy(consultancy)} className="cursor-pointer">
                  <ConsultancyCard consultancy={consultancy} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-500">No reports found matching your search and filter criteria.</p>
            </div>
          )}
        </div>
      </div>
      <div ref={companiesFormRef} className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ForCompaniesForm isAuthenticated={isAuthenticated} onRequestAuthentication={onRequestAuthentication} currentPage={currentPage} />
        </div>
      </div>
    </>
  );
};

export default AllReportsPage;