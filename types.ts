export enum ConsultancyStatus {
  Scammer = "Scammer / Money Looter",
  Trusted = "Registered Trustworthy Company",
}

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

// Represents a Cognito User object after authentication
export interface User {
  username: string;
  attributes: {
    email: string;
    // other attributes can be added here
  };
}

export interface Consultancy {
  id: string;
  name: string;
  status: ConsultancyStatus;
  submissionStatus: SubmissionStatus;
  story: string;
  submittedBy: string; // Public username
  submitterFullName: string; // Real name for admin
  submitterEmail: string; // Real email for admin
  date: string;
  proofUrl?: string;
  address?: string;
  contactNumbers?: string[];
  email?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface CompanyQuery {
    id: string;
    companyName: string;
    companyEmail: string;
    firmType: string;
    query: string;
    date: string;
    status: SubmissionStatus;
}


export type Page = 'Home' | 'About Us' | 'Scammers List' | 'Trusted Firms' | 'I Need Help' | 'Share Experience' | 'All Reports' | 'Login';