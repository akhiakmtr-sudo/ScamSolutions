import React, { useState, useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports';

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

// Configure AWS Amplify
Amplify.configure(awsExports);

// A simplified check for admin role.
// In a real app, you'd use Cognito Groups.
const ADMIN_EMAIL = 'admin@globalscamalerts.dev';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [selectedConsultancy, setSelectedConsultancy] = useState<Consultancy | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [postLoginNavigateTo, setPostLoginNavigateTo] = useState<Page | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      }
      setIsAuthLoading(false);
    };
    checkUser();
  }, []);

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
    if (user.attributes.email !== ADMIN_EMAIL) {
      if (postLoginNavigateTo) {
          navigate(postLoginNavigateTo);
          setPostLoginNavigateTo(null);
      } else {
          navigate('Home');
      }
    }
  };

  const handleLogout = async () => {
      try {
        await Auth.signOut();
        setCurrentUser(null);
        navigate('Home');
      } catch (error) {
        console.error('Error signing out: ', error);
      }
  };
  
  const requestAuthentication = (targetPage: Page) => {
      if (currentUser) {
          navigate(targetPage);
      } else {
          setPostLoginNavigateTo(targetPage);
          navigate('Login');
      }
  };

  if (isAuthLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
            <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
      );
  }

  if (currentUser?.attributes.email === ADMIN_EMAIL) {
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
    <div className="min-h-screen flex flex-col">
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
