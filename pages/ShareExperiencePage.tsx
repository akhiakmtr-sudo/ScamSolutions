import React, { useState, useRef } from 'react';
// import { API } from 'aws-amplify';
// import { createConsultancy } from '../graphql/mutations';
import { ConsultancyStatus, Page } from '../types';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { LinkedinIcon } from '../components/icons/LinkedinIcon';
import { YoutubeIcon } from '../components/icons/YoutubeIcon';
import { AtSymbolIcon } from '../components/icons/AtSymbolIcon';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { GlobeAltIcon } from '../components/icons/GlobeAltIcon';
import { IdentificationIcon } from '../components/icons/IdentificationIcon';
import { UserIcon } from '../components/icons/UserIcon';
import { DocumentTextIcon } from '../components/icons/DocumentTextIcon';
import { CurrencyDollarIcon } from '../components/icons/CurrencyDollarIcon';
import { ThreadsIcon } from '../components/icons/ThreadsIcon';
import { IndeedIcon } from '../components/icons/IndeedIcon';

interface ShareExperiencePageProps {
  onFormSubmit: () => void;
  onNavigate: (page: Page) => void;
}

const ShareExperiencePage: React.FC<ShareExperiencePageProps> = ({ onFormSubmit, onNavigate }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    contactNumbers: '',
    email: '',
    website: '',
    social_instagram: '',
    social_facebook: '',
    social_threads: '',
    social_youtube: '',
    social_indeed: '',
    social_linkedin: '',
    classification: '',
    fullName: '',
    publicUsername: '',
    userEmail: '',
    otherContact: '',
    description: '',
    financialFraud: '',
    amountLost: '',
  });

  const [proofs, setProofs] = useState<File[]>([]);
  const [isTrueInfo, setIsTrueInfo] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProofs(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTrueInfo || !acceptTerms) {
        setError("You must agree to the terms to submit.");
        return;
    }
    setIsLoading(true);
    setError(null);
    
    // In a real app, you would upload files to S3 here and get the URLs.
    // For now, we'll just log the file names.
    const proofUrls = proofs.map(p => `s3-placeholder/${p.name}`);

    const input = {
        name: formData.companyName,
        status: formData.classification,
        story: formData.description,
        address: formData.address,
        contactNumbers: formData.contactNumbers.split(',').map(s => s.trim()),
        email: formData.email,
        website: formData.website,
        submittedBy: formData.publicUsername,
        submitterFullName: formData.fullName,
        submitterEmail: formData.userEmail,
        submissionStatus: 'pending',
        proofUrl: proofUrls[0], // Assuming one proof for now
        // date will be set on the backend
    };
    
    try {
        // --- Backend Integration Placeholder ---
        // await API.graphql({ query: createConsultancy, variables: { input: input } });

        console.log('Submitting to backend:', input);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSubmitted(true);

    } catch (err) {
        console.error("Error submitting experience:", err);
        setError("There was an error submitting your report. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };
  
  if (submitted) {
    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl bg-white/80 backdrop-blur-md p-8 rounded-lg">
                <h1 className="text-4xl font-extrabold text-green-600">Successfully Submitted!</h1>
                <p className="mt-4 text-lg text-gray-700">
                    Your submission will be published after Admin validation.
                </p>
                <p className="mt-2 text-gray-500">Thank you for sharing your experience.</p>
                <button onClick={onFormSubmit} className="mt-6 bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700">Back to Home</button>
            </div>
        </div>
    )
  }

  const InputField = ({ name, label, placeholder, icon, type = 'text', required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                {icon}
            </span>
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500"
            />
        </div>
    </div>
  );

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => onNavigate('Home')} className="text-sm text-red-600 hover:text-red-500 mb-6">&larr; Back to Home</button>
          <div className="text-center mb-12 bg-white/80 backdrop-blur-md p-8 rounded-lg">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Help Others By Sharing Your Experience</h1>
            <p className="mt-4 text-lg text-gray-600">Your story is a powerful tool. All submissions are reviewed by our team before publishing.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Section 1: Company Details */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="companyName" label="Company / Consultancy Full Name" placeholder="e.g., Global Dream Careers" icon={<IdentificationIcon className="w-5 h-5"/>} required />
                <InputField name="address" label="Address" placeholder="Full address if known" icon={<GlobeAltIcon className="w-5 h-5"/>} required />
                <InputField name="contactNumbers" label="Contact Numbers (comma-separated)" placeholder="+1-123-456-7890" icon={<PhoneIcon className="w-5 h-5"/>} required />
                <InputField name="email" label="Email ID" placeholder="contact@example.com" type="email" icon={<AtSymbolIcon className="w-5 h-5"/>} required />
                <InputField name="website" label="Website" placeholder="https://example.com" type="url" icon={<GlobeAltIcon className="w-5 h-5"/>} />
              </div>
               <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Social Media Usernames (Optional)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <InputField name="social_instagram" label="Instagram" placeholder="@username" icon={<InstagramIcon className="w-5 h-5"/>}/>
                      <InputField name="social_facebook" label="Facebook" placeholder="@username" icon={<FacebookIcon className="w-5 h-5"/>}/>
                      <InputField name="social_youtube" label="YouTube" placeholder="@channel" icon={<YoutubeIcon className="w-5 h-5"/>}/>
                      <InputField name="social_linkedin" label="LinkedIn" placeholder="/company/name" icon={<LinkedinIcon className="w-5 h-5"/>}/>
                      <InputField name="social_threads" label="Threads" placeholder="@username" icon={<ThreadsIcon className="w-5 h-5"/>}/>
                      <InputField name="social_indeed" label="Indeed" placeholder="Company Name" icon={<IndeedIcon className="w-5 h-5"/>}/>
                  </div>
              </div>
            </div>

            {/* Section 2: Classification */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Classification</h2>
                <div>
                    <label htmlFor="classification" className="block text-sm font-medium text-gray-700 mb-1">Select Status</label>
                    <select
                        id="classification"
                        name="classification"
                        value={formData.classification}
                        onChange={handleChange}
                        required
                        className="block w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500"
                    >
                        <option value="" disabled>-- Please choose an option --</option>
                        <option value={ConsultancyStatus.Scammer}>{ConsultancyStatus.Scammer}</option>
                        <option value={ConsultancyStatus.Trusted}>{ConsultancyStatus.Trusted}</option>
                    </select>
                </div>
            </div>
            
            {/* Section 3: Your Details */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Details (Secure & Anonymous)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputField name="fullName" label="Your Full Name (Admin Only)" placeholder="Your legal name" icon={<UserIcon className="w-5 h-5"/>} required />
                        <p className="text-xs text-gray-500 mt-1">Your identity is safe with us. This will not be public.</p>
                    </div>
                     <div>
                        <InputField name="publicUsername" label="Public Username" placeholder="e.g., JohnD" icon={<UserIcon className="w-5 h-5"/>} required />
                        <p className="text-xs text-gray-500 mt-1">This name will be public. Use a pseudonym for safety.</p>
                    </div>
                     <div>
                        <InputField name="userEmail" label="Your Email ID" placeholder="your.email@example.com" type="email" icon={<AtSymbolIcon className="w-5 h-5"/>} required />
                        <p className="text-xs text-gray-500 mt-1">Required for verification. Will be hidden from the public.</p>
                    </div>
                    <InputField name="otherContact" label="Other Contact Options (Optional)" placeholder="WhatsApp, Telegram..." icon={<PhoneIcon className="w-5 h-5"/>} />
                </div>
            </div>
            
            {/* Section 4: Your Experience & Proof */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Experience</h2>
                 <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Describe your Experience with {formData.companyName || 'this company'}</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={8}
                        value={formData.description}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500"
                        placeholder="Please provide as much detail as possible. What did they promise? How much money was involved? What happened in the end?"
                        required
                    ></textarea>
                </div>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Proofs (Optional)</label>
                    <div 
                        className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-red-500"
                        onClick={() => fileInputRef.current?.click()}
                    >
                         <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">
                            <span className="font-semibold text-red-600">Click to upload files</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">You can select multiple files.</p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                            className="hidden"
                        />
                    </div>
                     {proofs.length > 0 && (
                        <div className="mt-4 text-sm text-gray-500">
                            <strong>Selected files:</strong> {proofs.map(f => f.name).join(', ')}
                        </div>
                    )}
                </div>
            </div>

            {/* Section 5: Financial Fraud */}
             <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Fraud</h2>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Did you face any financial fraud by this firm?</label>
                    <div className="flex gap-x-6">
                         <label className="flex items-center gap-2 text-gray-700"><input type="radio" name="financialFraud" value="Yes" onChange={handleChange} className="form-radio bg-gray-100 text-red-600"/> Yes</label>
                         <label className="flex items-center gap-2 text-gray-700"><input type="radio" name="financialFraud" value="No" onChange={handleChange} className="form-radio bg-gray-100 text-red-600"/> No</label>
                    </div>
                </div>
                {formData.financialFraud === 'Yes' && (
                    <div className="mt-6">
                        <InputField name="amountLost" label="Amount Lost" placeholder="e.g., 5000 USD" icon={<CurrencyDollarIcon className="w-5 h-5"/>} required />
                    </div>
                )}
            </div>

             {/* Section 6: Submission */}
             <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg border border-gray-200">
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <div className="p-4 border border-gray-200 bg-gray-50/50 rounded-md text-sm text-gray-500 mb-6">
                    <strong>Legal Disclaimer:</strong> You are solely responsible for the content you submit. By submitting, you grant Global Scam Alerts a license to display this content. Ensure that your submission does not violate any laws or third-party rights. We reserve the right to remove any content at our discretion.
                </div>
                <div className="space-y-4">
                     <label className="flex items-start gap-3 text-gray-700">
                        <input type="checkbox" checked={isTrueInfo} onChange={() => setIsTrueInfo(!isTrueInfo)} className="mt-1 form-checkbox bg-gray-100 text-red-600" />
                        <span>I confirm that all the information provided is true to the best of my knowledge.</span>
                    </label>
                     <label className="flex items-start gap-3 text-gray-700">
                        <input type="checkbox" checked={acceptTerms} onChange={() => setAcceptTerms(!acceptTerms)} className="mt-1 form-checkbox bg-gray-100 text-red-600"/>
                        <span>I accept the Terms and Conditions.</span>
                    </label>
                </div>
                 <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={!isTrueInfo || !acceptTerms || isLoading}
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Submit Report'}
                    </button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareExperiencePage;
