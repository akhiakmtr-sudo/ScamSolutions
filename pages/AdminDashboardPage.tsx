import React, { useState } from 'react';
import { User, Consultancy, CompanyQuery, SubmissionStatus } from '../types';
import { MOCK_CONSULTANCIES, MOCK_COMPANY_QUERIES } from '../constants';
import { ShieldExclamationIcon } from '../components/icons/ShieldExclamationIcon';
import AdminSubmissionDetailModal from '../components/AdminSubmissionDetailModal';
import AdminCompanyQueryDetailModal from '../components/AdminCompanyQueryDetailModal';

interface AdminDashboardPageProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState<'submissions' | 'queries'>('submissions');
    const [submissions, setSubmissions] = useState<Consultancy[]>(MOCK_CONSULTANCIES);
    const [queries, setQueries] = useState<CompanyQuery[]>(MOCK_COMPANY_QUERIES);

    const [selectedSubmission, setSelectedSubmission] = useState<Consultancy | null>(null);
    const [selectedQuery, setSelectedQuery] = useState<CompanyQuery | null>(null);

    const pendingSubmissions = submissions.filter(s => s.submissionStatus === 'pending');
    const pendingQueries = queries.filter(q => q.status === 'pending');

    const handleUpdateStatus = (id: number, newStatus: SubmissionStatus) => {
        setSubmissions(submissions.map(s => s.id === id ? { ...s, submissionStatus: newStatus } : s));
        setSelectedSubmission(null);
    };

    const handleResolveQuery = (id: number) => {
        setQueries(queries.map(q => q.id === id ? { ...q, status: 'approved' } : q)); // 'approved' as resolved
        setSelectedQuery(null);
    };

    const tabClasses = (tabName: 'submissions' | 'queries') => 
        `px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === tabName 
            ? 'text-red-600 border-b-2 border-red-600' 
            : 'text-gray-500 hover:bg-gray-200'
        }`;
    
    const statusBadge = (status: SubmissionStatus) => {
        switch(status) {
            case 'pending': return <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">Pending</span>;
            case 'approved': return <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Approved</span>;
            case 'rejected': return <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">Rejected</span>;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                         <div className="flex items-center gap-2 text-gray-900">
                            <ShieldExclamationIcon className="h-8 w-8 text-red-500" />
                            <span className="font-bold text-xl">Global Scam Alerts - Admin Panel</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm">Welcome, {user.email}</span>
                            <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Logout</button>
                        </div>
                    </div>
                </div>
            </header>
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="border-b border-gray-300">
                    <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                        <button onClick={() => setActiveTab('submissions')} className={tabClasses('submissions')}>
                            User Submissions ({pendingSubmissions.length})
                        </button>
                        <button onClick={() => setActiveTab('queries')} className={tabClasses('queries')}>
                            Company Queries ({pendingQueries.length})
                        </button>
                    </nav>
                </div>

                <div className="mt-8">
                    {activeTab === 'submissions' && (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classification</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {pendingSubmissions.map(sub => (
                                        <tr key={sub.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sub.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${sub.status === 'Scammer / Money Looter' ? 'text-red-600' : 'text-green-600'}`}>{sub.status}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sub.submittedBy}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{statusBadge(sub.submissionStatus)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button onClick={() => setSelectedSubmission(sub)} className="text-red-600 hover:text-red-500 font-medium">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                     {activeTab === 'queries' && (
                         <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {pendingQueries.map(q => (
                                        <tr key={q.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{q.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{q.companyName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{q.companyEmail}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{statusBadge(q.status)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button onClick={() => setSelectedQuery(q)} className="text-red-600 hover:text-red-500 font-medium">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
            {selectedSubmission && (
                <AdminSubmissionDetailModal 
                    submission={selectedSubmission}
                    onClose={() => setSelectedSubmission(null)}
                    onApprove={() => handleUpdateStatus(selectedSubmission.id, 'approved')}
                    onReject={() => handleUpdateStatus(selectedSubmission.id, 'rejected')}
                />
            )}
             {selectedQuery && (
                <AdminCompanyQueryDetailModal
                    query={selectedQuery}
                    onClose={() => setSelectedQuery(null)}
                    onResolve={() => handleResolveQuery(selectedQuery.id)}
                />
            )}
        </div>
    );
};

export default AdminDashboardPage;