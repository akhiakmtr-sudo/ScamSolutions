import React, { useState } from 'react';
import { IdentificationIcon } from './icons/IdentificationIcon';
import { AtSymbolIcon } from './icons/AtSymbolIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { Page } from '../types';

interface ForCompaniesFormProps {
    isAuthenticated: boolean;
    onRequestAuthentication: (page: Page) => void;
    currentPage: Page;
}

const ForCompaniesForm: React.FC<ForCompaniesFormProps> = ({ isAuthenticated, onRequestAuthentication, currentPage }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        companyEmail: '',
        firmType: '',
        query: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Company Form Submitted:', formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="text-center max-w-2xl mx-auto bg-green-50 p-8 rounded-lg border border-green-200">
                <h2 className="text-2xl font-bold text-green-700">Query Submitted!</h2>
                <p className="mt-4 text-gray-600">Thank you for contacting us. Our team will review your query and get back to you shortly.</p>
            </div>
        );
    }
    
    const handleLoginClick = () => {
        if (onRequestAuthentication && currentPage) {
            onRequestAuthentication(currentPage);
        }
    };

    return (
        <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">For Companies: Apply for Trusted Status or Report False Allegations</h2>
            <div className="max-w-2xl mx-auto relative">
                {!isAuthenticated && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4">
                        <p className="font-bold text-gray-800 text-lg mb-4 text-center">Please log in to submit a query.</p>
                        <button 
                            onClick={handleLoginClick}
                            className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md"
                        >
                            Login / Sign Up
                        </button>
                    </div>
                )}
                <form onSubmit={handleSubmit} className={`space-y-6 bg-white p-8 rounded-lg border border-gray-200 ${!isAuthenticated ? 'blur-sm' : ''}`}>
                    <fieldset disabled={!isAuthenticated} className="space-y-6">
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"><IdentificationIcon className="w-5 h-5"/></span>
                                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"><AtSymbolIcon className="w-5 h-5"/></span>
                                <input type="email" id="companyEmail" name="companyEmail" value={formData.companyEmail} onChange={handleChange} required className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="firmType" className="block text-sm font-medium text-gray-700 mb-1">Type of Firm</label>
                            <select id="firmType" name="firmType" value={formData.firmType} onChange={handleChange} required className="block w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500">
                                <option value="" disabled>Select type...</option>
                                <option>Career Consultancy</option>
                                <option>Employment Agency</option>
                                <option>Study Abroad</option>
                                <option>Freelancer</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">Query</label>
                            <div className="relative">
                                <span className="absolute top-3.5 left-0 flex items-center pl-3 text-gray-500"><DocumentTextIcon className="w-5 h-5"/></span>
                                <textarea id="query" name="query" rows={4} value={formData.query} onChange={handleChange} required className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500" />
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit" disabled={!isAuthenticated} className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};
export default ForCompaniesForm;