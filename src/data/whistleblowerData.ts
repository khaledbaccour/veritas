export interface JournalistSpecialty {
  id: string;
  name: string;
  expertise: string[];
  avatar: string;
  bio: string;
  publishedInvestigations: number;
}

export interface WhistleblowerCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredDocumentTypes?: string[];
  journalistIds: string[];
}

export interface WhistleblowerSubmission {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  attachmentNames?: string[];
  submittedAt: string;
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  status: 'pending' | 'reviewing' | 'verified' | 'published' | 'rejected';
}

export const journalistsBySpecialty: JournalistSpecialty[] = [
  {
    id: 'j1',
    name: 'Sophia Reynolds',
    expertise: ['Corporate Fraud', 'Financial Crimes', 'Tax Evasion'],
    avatar: 'https://i.pravatar.cc/150?img=34',
    bio: 'Pulitzer prize-winning investigative journalist with 15 years experience uncovering financial misconduct.',
    publishedInvestigations: 47
  },
  {
    id: 'j2',
    name: 'Michael Torres',
    expertise: ['Government Corruption', 'Election Fraud', 'Political Scandals'],
    avatar: 'https://i.pravatar.cc/150?img=69',
    bio: 'Former government ethics officer turned journalist, specializing in exposing abuses of power.',
    publishedInvestigations: 31
  },
  {
    id: 'j3',
    name: 'Amara Khan',
    expertise: ['Healthcare Fraud', 'Pharmaceutical Industry', 'Medical Malpractice'],
    avatar: 'https://i.pravatar.cc/150?img=45',
    bio: 'Medical doctor and journalist focusing on healthcare system accountability and patient advocacy.',
    publishedInvestigations: 24
  },
  {
    id: 'j4',
    name: 'Daniel Wright',
    expertise: ['Environmental Crimes', 'Corporate Pollution', 'Regulatory Capture'],
    avatar: 'https://i.pravatar.cc/150?img=53',
    bio: 'Environmental scientist and investigative reporter with a focus on corporate environmental violations.',
    publishedInvestigations: 38
  },
  {
    id: 'j5',
    name: 'Elena Vasquez',
    expertise: ['Tech Industry', 'Data Privacy', 'Surveillance', 'Algorithmic Bias'],
    avatar: 'https://i.pravatar.cc/150?img=23',
    bio: 'Former software engineer specializing in exposing unethical practices in technology companies.',
    publishedInvestigations: 19
  }
];

export const whistleblowerCategories: WhistleblowerCategory[] = [
  {
    id: 'cat1',
    name: 'Corporate Misconduct',
    description: 'Fraud, corruption, workplace harassment, or other illegal activities within companies',
    icon: 'Building',
    requiredDocumentTypes: ['Financial Records', 'Internal Communications', 'Meeting Minutes'],
    journalistIds: ['j1', 'j4', 'j5']
  },
  {
    id: 'cat2',
    name: 'Government Corruption',
    description: 'Abuse of power, bribery, misuse of public funds, or other misconduct by government officials',
    icon: 'Landmark',
    requiredDocumentTypes: ['Internal Memos', 'Financial Records', 'Communications'],
    journalistIds: ['j2', 'j4']
  },
  {
    id: 'cat3',
    name: 'Healthcare & Pharmaceutical',
    description: 'Patient safety issues, pharmaceutical research misconduct, insurance fraud, or other healthcare-related wrongdoing',
    icon: 'Stethoscope',
    requiredDocumentTypes: ['Medical Records', 'Research Data', 'Internal Communications'],
    journalistIds: ['j3', 'j1']
  },
  {
    id: 'cat4',
    name: 'Environmental Violations',
    description: 'Pollution, illegal disposal of waste, falsification of environmental impact studies, or other environmental crimes',
    icon: 'Leaf',
    requiredDocumentTypes: ['Testing Results', 'Internal Memos', 'Compliance Documents'],
    journalistIds: ['j4', 'j2']
  },
  {
    id: 'cat5',
    name: 'Technology & Data Privacy',
    description: 'Unethical data collection, privacy violations, algorithm manipulation, or other technology misuse',
    icon: 'Shield',
    requiredDocumentTypes: ['Source Code', 'Internal Documentation', 'User Data Handling Records'],
    journalistIds: ['j5', 'j1']
  }
];

