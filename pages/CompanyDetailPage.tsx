import React from 'react';
import { Consultancy, ConsultancyStatus } from '../types';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { ShieldExclamationIcon } from '../components/icons/ShieldExclamationIcon';
import { GlobeAltIcon } from '../components/icons/GlobeAltIcon';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { AtSymbolIcon } from '../components/icons/AtSymbolIcon';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { LinkedinIcon } from '../components/icons/LinkedinIcon';
import { YoutubeIcon } from '../components/icons/YoutubeIcon';

interface CompanyDetailPageProps {
    consultancy: Consultancy;
    onBack: () => void;
}

const CompanyDetailPage: React.FC<CompanyDetailPageProps> = ({ consultancy, onBack }) => {
    const isScammer = consultancy.status === ConsultancyStatus.Scammer;
    const statusText = isScammer ? 'SCAM' : 'TRUSTED';
    const statusColor = isScammer ? 'red' : 'green';

    const AdminSuggestion = () => (
        <div className={`p-4 rounded-lg border border-${statusColor}-200 ${isScammer ? 'bg-red-50/80' : 'bg-green-50/80'} backdrop-blur-md mb-8`}>
            <p className={`font-bold text-${statusColor}-700`}>Our Suggestion</p>
            <p className="text-gray-600 text-sm mt-1">
                {isScammer 
                    ? "As per our users' published data, we suggest you NEVER APPLY with this firm. We recommend you double-check for extra security."
                    : "As per our users' published data, you can SAFELY APPLY with this firm. We recommend you double-check for extra security."
                }
            </p>
        </div>
    );

    const DetailItem = ({ icon, label, value, href }: { icon: React.ReactNode; label: string; value?: string; href?: string; }) => {
        if (!value) return null;
        const content = href ? <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 break-all">{value}</a> : <span className="break-all">{value}</span>;
        return (
            <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">{icon}</span>
                <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-gray-700 font-medium">{content}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <button onClick={onBack} className="text-sm text-red-600 hover:text-red-500 mb-6">&larr; Back to list</button>
                    
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg mb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                           <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{consultancy.name}</h1>
                           <div className={`text-center px-4 py-2 rounded-lg border-2 border-${statusColor}-500 bg-${statusColor}-500/10`}>
                              <p className={`text-2xl font-bold text-${statusColor}-600`}>{statusText}</p>
                           </div>
                      </div>
                    </div>
                   
                    <AdminSuggestion />

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Left Column: Details */}
                        <div className="md:col-span-1 bg-white/80 backdrop-blur-md p-6 rounded-lg border border-gray-200 h-fit">
                             <h2 className="text-xl font-bold text-gray-900 mb-6">Company Details</h2>
                             <div className="space-y-4">
                                <DetailItem icon={<GlobeAltIcon className="w-5 h-5"/>} label="Address" value={consultancy.address} />
                                <DetailItem icon={<PhoneIcon className="w-5 h-5"/>} label="Contact" value={consultancy.contactNumbers?.join(', ')} />
                                <DetailItem icon={<AtSymbolIcon className="w-5 h-5"/>} label="Email" value={consultancy.email} href={`mailto:${consultancy.email}`} />
                                <DetailItem icon={<GlobeAltIcon className="w-5 h-5"/>} label="Website" value={consultancy.website} href={consultancy.website} />
                                
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-200/50">
                                    {consultancy.socialMedia?.instagram && <a href={`https://instagram.com/${consultancy.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110"><InstagramIcon className="w-6 h-6"/></a>}
                                    {consultancy.socialMedia?.facebook && <a href={`https://facebook.com/${consultancy.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110"><FacebookIcon className="w-6 h-6"/></a>}
                                    {consultancy.socialMedia?.linkedin && <a href={`https://linkedin.com/company/${consultancy.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110"><LinkedinIcon className="w-6 h-6"/></a>}
                                    {consultancy.socialMedia?.youtube && <a href={`https://youtube.com/${consultancy.socialMedia.youtube}`} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110"><YoutubeIcon className="w-6 h-6"/></a>}
                                </div>
                             </div>
                        </div>

                        {/* Right Column: User Experiences */}
                        <div className="md:col-span-2">
                             <h2 className="text-2xl font-bold text-gray-100 mb-6">User Reports (1 Report)</h2>
                             <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200/50">
                                    <p className="font-bold text-gray-700">Submitted by: {consultancy.submittedBy}</p>
                                    <p className="text-sm text-gray-500">{consultancy.date}</p>
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{consultancy.story}"</p>
                                {consultancy.proofUrl && (
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-2">Submitted Proof:</h3>
                                        <img src={consultancy.proofUrl} alt={`Proof for ${consultancy.name}`} className="rounded-lg max-w-full h-auto border border-gray-200" />
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetailPage;