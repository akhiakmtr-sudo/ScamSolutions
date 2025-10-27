import React, { useState } from 'react';
import { XIcon } from './icons/XIcon';
import { AtSymbolIcon } from './icons/AtSymbolIcon';
import { GoogleIcon } from './icons/GoogleIcon';
import { MOCK_USERS } from '../constants';
import { User } from '../types';


interface AuthModalProps {
    onClose: () => void;
    onLoginSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        // Simulate API call
        setTimeout(() => {
            if (isLoginView) {
                const user = MOCK_USERS.find(u => u.email === email && u.password === password);
                if (user) {
                    onLoginSuccess(user);
                } else {
                    setError('Invalid email or password.');
                }
            } else {
                // Sign up logic
                 const newUser: User = { id: Date.now(), email, password, role: 'user' };
                 MOCK_USERS.push(newUser); // In real app, this would be an API call
                 onLoginSuccess(newUser);
            }

            setIsLoading(false);
        }, 1000);
    };
    
    const handleGoogleSignIn = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Signing in with Google...');
            // Simulate finding or creating a user
            const googleUser: User = { id: Date.now(), email: 'google.user@example.com', password: '', role: 'user' };
            setIsLoading(false);
            onLoginSuccess(googleUser);
        }, 1000);
    }

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
            aria-labelledby="auth-modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-md relative animate-fade-in-up">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                    aria-label="Close"
                >
                    <XIcon className="w-6 h-6" />
                </button>

                <div className="p-8">
                    <h2 id="auth-modal-title" className="text-2xl font-bold text-gray-900 text-center mb-2">
                        {isLoginView ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-500 text-center mb-6">to share your experience</p>
                    
                    <div className="flex border-b border-gray-200 mb-6">
                        <button 
                            className={`flex-1 py-2 text-sm font-medium transition-colors ${isLoginView ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-800'}`}
                            onClick={() => { setIsLoginView(true); setError(''); }}
                        >
                            Log In
                        </button>
                        <button 
                            className={`flex-1 py-2 text-sm font-medium transition-colors ${!isLoginView ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-800'}`}
                            onClick={() => { setIsLoginView(false); setError(''); }}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                             <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <AtSymbolIcon className="w-5 h-5"/>
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    required
                                    className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="password"className="sr-only">Password</label>
                            <div className="relative">
                               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                    className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (isLoginView ? 'Log In' : 'Create Account')}
                        </button>
                    </form>
                    
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full bg-white text-gray-700 font-medium py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 border border-gray-300 flex items-center justify-center gap-3 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    >
                       <GoogleIcon className="w-5 h-5" />
                       Sign in with Google
                    </button>
                </div>
            </div>
             <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AuthModal;