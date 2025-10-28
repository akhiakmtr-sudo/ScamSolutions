import React, { useState, useEffect, useRef } from 'react';
// import { API } from 'aws-amplify';
// import { listConsultancys } from '../graphql/queries';
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
  const [allReports, setAllReports] = useState<Consultancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const companiesFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAllReports = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // --- Backend Integration Placeholder ---
        // const filter = { submissionStatus: { eq: 'approved' } };
        // const response = await API.graphql({ query: listConsultancys, variables: { filter } });
        // setAllReports(response.data.listConsultancys.items);
        console.log("Fetching all reports...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAllReports([]);
      } catch (err) {
        console.error("Error fetching all reports:", err);
        setError("Failed to load reports. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllReports();
  }, []);

  const handleReportFalseAllegationClick = () => {
    companiesFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredReports = allReports.filter(
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
  
  const renderContent = () => {
    if (isLoading) {
        return <div className="text-center py-16 text-gray-500">Loading reports...</div>;
    }
    if (error) {
        return <div className="text-center py-16 text-red-500">{error}</div>;
    }
    if (filteredReports.length > 0) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {filteredReports.map((consultancy) => (
                <div key={consultancy.id} onClick={() => onSelectConsultancy(consultancy)} className="cursor-pointer">
                  <ConsultancyCard consultancy={consultancy} />
                </div>
              ))}
            </div>
        );
    }
    return (
        <div className="text-center py-16 bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg mt-12">
            <p className="text-gray-500">No reports found matching your search and filter criteria.</p>
        </div>
    );
  };

  return (
    <div>
      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg">
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
                    All ({allReports.length})
                  </button>
                  <button
                    onClick={() => setFilter('scammer')}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors border ${getFilterButtonClasses('scammer')}`}
                  >
                    Scammers ({allReports.filter(c => c.status === ConsultancyStatus.Scammer).length})
                  </button>
                  <button
                    onClick={() => setFilter('trusted')}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors border ${getFilterButtonClasses('trusted')}`}
                  >
                    Trusted ({allReports.filter(c => c.status === ConsultancyStatus.Trusted).length})
                  </button>
                </div>
              </div>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
      <div ref={companiesFormRef} className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ForCompaniesForm isAuthenticated={isAuthenticated} onRequestAuthentication={onRequestAuthentication} currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
};

export default AllReportsPage;
