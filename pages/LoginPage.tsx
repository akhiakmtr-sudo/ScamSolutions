import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { AtSymbolIcon } from '../components/icons/AtSymbolIcon';
import { LockClosedIcon } from '../components/icons/LockClosedIcon';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { type User, type Page } from '../types';

interface LoginPageProps {
    onLoginSuccess: (user: User) => void;
    onNavigate: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [resetSent, setResetSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            if (isLoginView) {
                const user = await Auth.signIn(email, password);
                onLoginSuccess(user);
            } else {
                const { user } = await Auth.signUp({
                    username: email,
                    password,
                    attributes: { email }
                });
                // After sign up, you might want to redirect to a confirmation page
                // or automatically sign them in. For simplicity, we'll sign them in.
                const cognitoUser = await Auth.signIn(email, password);
                onLoginSuccess(cognitoUser);
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await Auth.forgotPassword(email);
            setResetSent(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleGoogleSignIn = () => {
        // This will redirect the user to the Google sign-in page
        Auth.federatedSignIn({ provider: 'Google' as any });
    }
    
    const renderForgotPassword = () => (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Reset Password</h2>
            <p className="text-gray-500 text-center mb-6">Enter your email to receive a reset link.</p>
            {resetSent ? (
                <div className="text-center">
                    <p className="text-green-600">A password reset link has been sent to your email.</p>
                    <button onClick={() => { setForgotPassword(false); setResetSent(false); }} className="mt-4 text-sm text-red-600 hover:text-red-500">
                        &larr; Back to Login
                    </button>
                </div>
            ) : (
                <form onSubmit={handlePasswordReset} className="space-y-4">
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500" />
                    <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-400">
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    <button type="button" onClick={() => setForgotPassword(false)} className="w-full text-center text-sm text-gray-600 hover:text-gray-900 mt-2">
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );

    const renderAuthForm = () => (
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
                            autoComplete="email"
                            className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                </div>
                 <div>
                    <label htmlFor="password"className="sr-only">Password</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <LockClosedIcon className="h-5 w-5" />
                        </span>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            autoComplete={isLoginView ? 'current-password' : 'new-password'}
                            className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                </div>
                {isLoginView && (
                    <div className="text-right">
                        <button type="button" onClick={() => setForgotPassword(true)} className="text-sm text-red-600 hover:underline">
                            Forgot password?
                        </button>
                    </div>
                )}
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
    );

    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg relative">
                    <button onClick={() => onNavigate('Home')} className="text-sm text-red-600 hover:text-red-500 absolute top-4 left-4 z-10 p-2">&larr; Back to Home</button>
                    {forgotPassword ? renderForgotPassword() : renderAuthForm()}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
