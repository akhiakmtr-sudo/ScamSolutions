import React from 'react';
import { Consultancy } from '../types';
import { XIcon } from './icons/XIcon';

interface AdminSubmissionDetailModalProps {
    submission: Consultancy;
    onClose: () => void;
    onApprove: () => void;
    onReject: () => void;
}

const AdminSubmissionDetailModal: React.FC<AdminSubmissionDetailModalProps> = ({ submission, onClose, onApprove, onReject }) => {

    const DetailRow = ({ label, value, className = '' }) => (
        <div className="py-2">
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-gray-800 ${className}`}>{value || 'N/A'}</p>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl shadow-2xl w-full max-w-2xl relative max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Submission Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><XIcon className="w-6 h-6" /></button>
                </header>
                
                <main className="p-6 overflow-y-auto space-y-6">
                    {/* Company Details */}
                    <section>
                        <h3 className="text-red-600 font-semibold mb-2">Company Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 bg-gray-50/50 backdrop-blur-sm p-4 rounded-md">
                            <DetailRow label="Company Name" value={submission.name} className="font-bold text-lg" />
                            <DetailRow label="Classification" value={submission.status} className={`font-semibold ${submission.status === 'Scammer / Money Looter' ? 'text-red-600' : 'text-green-600'}`} />
                            <DetailRow label="Address" value={submission.address} />
                            <DetailRow label="Contact" value={submission.contactNumbers?.join(', ')} />
                            <DetailRow label="Email" value={submission.email} />
                            <DetailRow label="Website" value={submission.website} />
                        </div>
                    </section>

                    {/* Submitter Details */}
                    <section>
                        <h3 className="text-red-600 font-semibold mb-2">Submitter Info (Admin View)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 bg-gray-50/50 backdrop-blur-sm p-4 rounded-md">
                             <DetailRow label="Full Name" value={submission.submitterFullName} />
                             <DetailRow label="Email" value={submission.submitterEmail} />
                             <DetailRow label="Public Username" value={submission.submittedBy} />
                             <DetailRow label="Submission Date" value={submission.date} />
                        </div>
                    </section>

                    {/* Experience Details */}
                    <section>
                         <h3 className="text-red-600 font-semibold mb-2">User Experience</h3>
                         <div className="bg-gray-50/50 backdrop-blur-sm p-4 rounded-md">
                            <p className="text-gray-700 whitespace-pre-wrap">{submission.story}</p>
                         </div>
                    </section>
                    
                    {/* Proof */}
                    {submission.proofUrl && (
                        <section>
                             <h3 className="text-red-600 font-semibold mb-2">Uploaded Proof</h3>
                             <div className="bg-gray-50/50 backdrop-blur-sm p-4 rounded-md">
                                <img src={submission.proofUrl} alt="Proof" className="max-w-full h-auto rounded-lg border border-gray-200"/>
                             </div>
                        </section>
                    )}
                </main>

                <footer className="flex justify-end items-center p-4 border-t border-gray-200 bg-gray-50/50 mt-auto">
                    <div className="flex gap-4">
                        <button onClick={onReject} className="px-6 py-2 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700">Reject</button>
                        <button onClick={onApprove} className="px-6 py-2 text-sm font-bold text-white bg-green-600 rounded-md hover:bg-green-700">Approve</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminSubmissionDetailModal;