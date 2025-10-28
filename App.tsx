import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ScammersListPage from './pages/ScammersListPage';
import TrustedFirmsPage from './pages/TrustedFirmsPage';
import INeedHelpPage from './pages/INeedHelpPage';
import ShareExperiencePage from './pages/ShareExperiencePage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AllReportsPage from './pages/AllReportsPage';
import LoginPage from './pages/LoginPage';
import { type Page, type Consultancy, type User } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [selectedConsultancy, setSelectedConsultancy] = useState<Consultancy | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [postLoginNavigateTo, setPostLoginNavigateTo] = useState<Page | null>(null);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedConsultancy(null);
    window.scrollTo(0, 0);
  };
  
  const handleSelectConsultancy = (consultancy: Consultancy) => {
    setSelectedConsultancy(consultancy);
    window.scrollTo(0, 0);
  }

  const handleBackToList = () => {
    setSelectedConsultancy(null);
  }

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'user') {
      if (postLoginNavigateTo) {
          navigate(postLoginNavigateTo);
          setPostLoginNavigateTo(null);
      } else {
          navigate('Home');
      }
    }
  };

  const handleLogout = () => {
      setCurrentUser(null);
      navigate('Home');
  };
  
  const requestAuthentication = (targetPage: Page) => {
      if (currentUser) {
          navigate(targetPage);
      } else {
          setPostLoginNavigateTo(targetPage);
          navigate('Login');
      }
  };

  if (currentUser?.role === 'admin') {
      return <AdminDashboardPage user={currentUser} onLogout={handleLogout} />;
  }

  const renderPage = () => {
    if (selectedConsultancy) {
      return <CompanyDetailPage consultancy={selectedConsultancy} onBack={handleBackToList} />;
    }

    switch (currentPage) {
      case 'Home':
        return <HomePage onNavigate={navigate} onSelectConsultancy={handleSelectConsultancy} onRequestAuthentication={requestAuthentication} isAuthenticated={!!currentUser} currentPage={currentPage} />;
      case 'About Us':
        return <AboutUsPage onNavigate={navigate} />;
      case 'Scammers List':
        return <ScammersListPage onSelectConsultancy={handleSelectConsultancy} onNavigate={navigate} />;
      case 'Trusted Firms':
        return <TrustedFirmsPage onSelectConsultancy={handleSelectConsultancy} onNavigate={navigate} />;
      case 'I Need Help':
        return <INeedHelpPage onNavigate={navigate} />;
      case 'Share Experience':
        return <ShareExperiencePage onFormSubmit={() => navigate('Home')} onNavigate={navigate} />;
      case 'All Reports':
        return <AllReportsPage onSelectConsultancy={handleSelectConsultancy} onNavigate={navigate} onRequestAuthentication={requestAuthentication} isAuthenticated={!!currentUser} currentPage={currentPage} />;
      case 'Login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} onSelectConsultancy={handleSelectConsultancy} onRequestAuthentication={requestAuthentication} isAuthenticated={!!currentUser} currentPage={currentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header 
        onNavigate={navigate} 
        currentPage={currentPage}
        isAuthenticated={!!currentUser}
        onLogout={handleLogout}
        onLoginClick={() => navigate('Login')}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;