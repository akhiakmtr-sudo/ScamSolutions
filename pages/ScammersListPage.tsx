import React, { useState, useEffect } from 'react';
// import { API } from 'aws-amplify';
// import { listConsultancys } from '../graphql/queries';
import { Consultancy, ConsultancyStatus, Page } from '../types';
import ConsultancyCard from '../components/ConsultancyCard';

interface ScammersListPageProps {
  onSelectConsultancy: (consultancy: Consultancy) => void;
  onNavigate: (page: Page) => void;
}

const ScammersListPage: React.FC<ScammersListPageProps> = ({ onSelectConsultancy, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allScammers, setAllScammers] = useState<Consultancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchScammers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // --- Backend Integration Placeholder ---
        // const filter = {
        //   status: { eq: ConsultancyStatus.Scammer },
        //   submissionStatus: { eq: 'approved' }
        // };
        // const response = await API.graphql({ query: listConsultancys, variables: { filter } });
        // setAllScammers(response.data.listConsultancys.items);
        console.log("Fetching scammers...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAllScammers([]);
      } catch (err) {
        console.error("Error fetching scammers:", err);
        setError("Failed to load scammers list. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchScammers();
  }, []);

  const filteredScammers = allScammers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-16 text-gray-500">Loading scammers list...</div>;
    }
    if (error) {
      return <div className="text-center py-16 text-red-500">{error}</div>;
    }
    if (filteredScammers.length > 0) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredScammers.map((consultancy) => (
            <div key={consultancy.id} onClick={() => onSelectConsultancy(consultancy)} className="cursor-pointer">
              <ConsultancyCard consultancy={consultancy} />
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="text-center py-16 bg-gray-100/80 backdrop-blur-md rounded-lg mt-12">
        <p className="text-gray-500">No scammers found matching your search.</p>
      </div>
    );
  };

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
        {renderContent()}
      </div>
    </div>
  );
};

export default ScammersListPage;
