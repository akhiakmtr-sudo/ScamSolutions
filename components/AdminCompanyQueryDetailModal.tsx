import React from 'react';
import { CompanyQuery } from '../types';
import { XIcon } from './icons/XIcon';

interface AdminCompanyQueryDetailModalProps {
    query: CompanyQuery;
    onClose: () => void;
    onResolve: () => void;
}

const AdminCompanyQueryDetailModal: React.FC<AdminCompanyQueryDetailModalProps> = ({ query, onClose, onResolve }) => {

    const DetailRow = ({ label, value, className = '' }) => (
        <div className="py-2">
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-gray-800 ${className}`}>{value || 'N/A'}</p>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-xl relative max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Company Query Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><XIcon className="w-6 h-6" /></button>
                </header>
                
                <main className="p-6 overflow-y-auto space-y-6">
                    <section>
                        <h3 className="text-red-600 font-semibold mb-2">Contact Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 bg-gray-50/50 p-4 rounded-md">
                            <DetailRow label="Company Name" value={query.companyName} className="font-bold" />
                            <DetailRow label="Company Email" value={query.companyEmail} />
                            <DetailRow label="Firm Type" value={query.firmType} />
                            <DetailRow label="Query Date" value={query.date} />
                        </div>
                    </section>
                    <section>
                         <h3 className="text-red-600 font-semibold mb-2">Query</h3>
                         <div className="bg-gray-50/50 p-4 rounded-md">
                            <p className="text-gray-700 whitespace-pre-wrap">{query.query}</p>
                         </div>
                    </section>
                </main>

                <footer className="flex justify-end items-center p-4 border-t border-gray-200 bg-gray-50/50 mt-auto">
                    <div className="flex gap-4">
                        <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Close</button>
                        <button onClick={onResolve} className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">Mark as Resolved</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminCompanyQueryDetailModal;