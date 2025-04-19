
export interface TrendingTopic {
  id: string;
  title: string;
  category: string;
  momentum: number; // 0-100
  sources: number;
  relevanceScore: number; // 0-100
  relatedTopics: string[];
  recentArticles: {
    title: string;
    source: string;
    url: string;
  }[];
}

export const trendingTopics: TrendingTopic[] = [
  {
    id: '1',
    title: 'Artificial Intelligence in Healthcare',
    category: 'Technology',
    momentum: 87,
    sources: 156,
    relevanceScore: 92,
    relatedTopics: ['Machine Learning', 'Healthcare Innovation', 'Medical Diagnosis', 'Predictive Analytics'],
    recentArticles: [
      {
        title: 'AI Algorithms Show Promise in Early Cancer Detection',
        source: 'Medical Journal',
        url: '#'
      },
      {
        title: 'Hospitals Adopt AI Systems for Patient Care Optimization',
        source: 'Healthcare Today',
        url: '#'
      },
      {
        title: 'Ethical Concerns Rise with AI Implementation in Clinical Settings',
        source: 'Ethics Review',
        url: '#'
      }
    ]
  },
  {
    id: '2',
    title: 'Climate Policy Developments',
    category: 'Environment',
    momentum: 92,
    sources: 230,
    relevanceScore: 95,
    relatedTopics: ['Carbon Emissions', 'Renewable Energy', 'International Agreements', 'Corporate Sustainability'],
    recentArticles: [
      {
        title: 'Nations Pledge New Carbon Reduction Targets',
        source: 'Global Affairs',
        url: '#'
      },
      {
        title: 'Corporate Giants Announce Climate Initiatives',
        source: 'Business Weekly',
        url: '#'
      },
      {
        title: 'Analysis: The Economic Impact of Climate Legislation',
        source: 'Economic Times',
        url: '#'
      }
    ]
  },
  {
    id: '3',
    title: 'Cryptocurrency Regulation',
    category: 'Finance',
    momentum: 78,
    sources: 189,
    relevanceScore: 88,
    relatedTopics: ['Digital Currency', 'Blockchain', 'Financial Regulation', 'Central Bank Digital Currencies'],
    recentArticles: [
      {
        title: 'SEC Announces New Framework for Crypto Asset Classification',
        source: 'Financial Review',
        url: '#'
      },
      {
        title: 'Global Banks Develop Standards for Crypto Integration',
        source: 'Banking Journal',
        url: '#'
      },
      {
        title: 'Legislators Debate Cross-Border Crypto Transaction Oversight',
        source: 'Policy Digest',
        url: '#'
      }
    ]
  },
  {
    id: '4',
    title: 'Supply Chain Resilience',
    category: 'Business',
    momentum: 72,
    sources: 143,
    relevanceScore: 85,
    relatedTopics: ['Global Trade', 'Manufacturing', 'Logistics', 'Risk Management'],
    recentArticles: [
      {
        title: 'Companies Invest Billions in Supply Chain Diversification',
        source: 'Business Strategy',
        url: '#'
      },
      {
        title: 'Technology Solutions for Supply Chain Transparency',
        source: 'Tech Innovate',
        url: '#'
      },
      {
        title: 'Regional Manufacturing Hubs Gain Momentum',
        source: 'Industry Report',
        url: '#'
      }
    ]
  },
  {
    id: '5',
    title: 'Urban Housing Crisis',
    category: 'Social Issues',
    momentum: 83,
    sources: 167,
    relevanceScore: 90,
    relatedTopics: ['Affordable Housing', 'Urban Planning', 'Homelessness', 'Real Estate'],
    recentArticles: [
      {
        title: 'Major Cities Approve New Housing Affordability Measures',
        source: 'Urban Affairs',
        url: '#'
      },
      {
        title: 'Analysis: The Impact of Remote Work on Housing Markets',
        source: 'Economic Perspectives',
        url: '#'
      },
      {
        title: 'Community-Led Housing Solutions Gain Traction',
        source: 'Social Innovation',
        url: '#'
      }
    ]
  },
  {
    id: '6',
    title: 'Digital Privacy Legislation',
    category: 'Technology',
    momentum: 81,
    sources: 178,
    relevanceScore: 89,
    relatedTopics: ['Data Protection', 'Surveillance', 'Tech Regulation', 'Consumer Rights'],
    recentArticles: [
      {
        title: 'New Comprehensive Privacy Bill Advances in Senate',
        source: 'Policy Watch',
        url: '#'
      },
      {
        title: 'Tech Companies Respond to Changing Privacy Landscape',
        source: 'Tech Daily',
        url: '#'
      },
      {
        title: 'International Privacy Standards: A Comparative Analysis',
        source: 'Global Tech Review',
        url: '#'
      }
    ]
  },
  {
    id: '7',
    title: 'Mental Health in the Workplace',
    category: 'Health',
    momentum: 76,
    sources: 152,
    relevanceScore: 87,
    relatedTopics: ['Employee Wellbeing', 'Corporate Culture', 'Burnout', 'Healthcare Benefits'],
    recentArticles: [
      {
        title: 'Major Employers Expand Mental Health Benefits',
        source: 'Workplace Today',
        url: '#'
      },
      {
        title: 'Study Reveals Rising Workplace Stress Epidemic',
        source: 'Health Research Quarterly',
        url: '#'
      },
      {
        title: 'New Approaches to Mental Health Support in Remote Work Era',
        source: 'Future of Work',
        url: '#'
      }
    ]
  },
  {
    id: '8',
    title: 'Autonomous Vehicle Safety',
    category: 'Technology',
    momentum: 68,
    sources: 132,
    relevanceScore: 83,
    relatedTopics: ['Transportation', 'AI Ethics', 'Road Safety', 'Urban Planning'],
    recentArticles: [
      {
        title: 'Regulators Propose New Safety Standards for Self-Driving Cars',
        source: 'Transport Review',
        url: '#'
      },
      {
        title: 'Accident Data Reveals Mixed Results for Autonomous Systems',
        source: 'Safety Journal',
        url: '#'
      },
      {
        title: 'Public Trust in Self-Driving Technology Remains Divided',
        source: 'Consumer Reports',
        url: '#'
      }
    ]
  }
];

export interface IdeaSuggestion {
  id: string;
  title: string;
  description: string;
  relevantTopics: string[];
  dataPoints: string[];
  angles: string[];
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  category: string;
}

export const ideaSuggestions: IdeaSuggestion[] = [
  {
    id: '1',
    title: 'The Accessibility Gap in AI Healthcare Solutions',
    description: 'Explore how AI healthcare innovations are distributed across different socioeconomic demographics and geographic regions.',
    relevantTopics: ['Healthcare Equity', 'AI Ethics', 'Medical Technology', 'Rural Healthcare'],
    dataPoints: [
      'AI implementation rates in hospitals by geographic location',
      'Patient demographics with access to AI-enhanced care',
      'Cost barriers to healthcare institutions adopting AI',
      'Regulatory frameworks affecting distribution'
    ],
    angles: [
      'Economic analysis of healthcare AI distribution',
      'Patient perspectives from underserved areas',
      'Policy recommendations for equitable AI deployment',
      'Case studies of successful rural AI healthcare implementations'
    ],
    effort: 'high',
    impact: 'high',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Corporate Climate Pledges: Analyzing Implementation and Impact',
    description: 'Investigate the gap between corporate climate commitments and actual implementation, measuring real-world impact.',
    relevantTopics: ['Corporate Sustainability', 'Greenwashing', 'Emissions Reporting', 'Climate Finance'],
    dataPoints: [
      'Emissions data before and after climate pledges',
      'Financial investments in climate initiatives vs. public commitments',
      'Third-party verification of climate claims',
      'Timeline analysis of pledge implementation'
    ],
    angles: [
      'Corporate accountability mechanisms',
      'Investor responses to climate performance',
      'Regulatory approaches to emissions reporting',
      'Consumer awareness and market responses'
    ],
    effort: 'medium',
    impact: 'high',
    category: 'Environment'
  },
  {
    id: '3',
    title: 'Cryptocurrency\'s Energy Paradox',
    description: 'Examine the tension between crypto\'s promise of financial democratization and its environmental impact through energy consumption.',
    relevantTopics: ['Blockchain Energy Use', 'Proof of Stake vs. Proof of Work', 'Green Crypto Initiatives', 'Environmental Policy'],
    dataPoints: [
      'Energy consumption data by cryptocurrency',
      'Carbon footprint comparisons with traditional financial systems',
      'Adoption rates of energy-efficient consensus mechanisms',
      'Geographic distribution of mining operations'
    ],
    angles: [
      'Technical solutions to reduce energy consumption',
      'Policy approaches to sustainable cryptocurrency',
      'Financial inclusion benefits vs. environmental costs',
      'Market responses to green cryptocurrency initiatives'
    ],
    effort: 'medium',
    impact: 'medium',
    category: 'Finance'
  },
  {
    id: '4',
    title: 'Local Solutions to the Housing Affordability Crisis',
    description: 'Showcase innovative community-based and municipal approaches to addressing housing shortages and affordability.',
    relevantTopics: ['Community Land Trusts', 'Zoning Reform', 'Public-Private Housing Partnerships', 'Housing First Policies'],
    dataPoints: [
      'Housing cost to income ratios across different cities',
      'Impact data from zoning reform initiatives',
      'Success metrics from community land trust programs',
      'Housing unit production rates from different policy approaches'
    ],
    angles: [
      'Case studies of successful local initiatives',
      'Analysis of policy transferability across regions',
      'Community perspectives on housing solutions',
      'Economic impact of housing affordability interventions'
    ],
    effort: 'medium',
    impact: 'high',
    category: 'Social Issues'
  },
  {
    id: '5',
    title: 'Digital Privacy Rights: Comparing Global Approaches',
    description: 'Analyze how different regions and countries are approaching digital privacy legislation and the impact on citizens and businesses.',
    relevantTopics: ['GDPR', 'Data Sovereignty', 'Privacy by Design', 'Surveillance Capitalism'],
    dataPoints: [
      'Compliance costs for different regulatory frameworks',
      'Enforcement actions and penalties by jurisdiction',
      'Public opinion data on privacy regulations',
      'Corporate adaptation to varied privacy regimes'
    ],
    angles: [
      'Comparative policy analysis across regions',
      'Economic impact of privacy regulations',
      'Consumer rights and empowerment',
      'Future harmonization potential for global standards'
    ],
    effort: 'high',
    impact: 'medium',
    category: 'Technology'
  },
  {
    id: '6',
    title: 'The Measurable Business Case for Workplace Mental Health',
    description: 'Explore the ROI and business impact of comprehensive mental health support programs in the workplace.',
    relevantTopics: ['Productivity Metrics', 'Employee Retention', 'Healthcare Costs', 'Organizational Culture'],
    dataPoints: [
      'Absenteeism and presenteeism rates before and after program implementation',
      'Healthcare utilization and cost comparisons',
      'Employee retention metrics',
      'Productivity and performance indicators'
    ],
    angles: [
      'Case studies of successful corporate programs',
      'Financial analysis of mental health investment returns',
      'Employee experience perspectives',
      'Implementation frameworks for different company sizes'
    ],
    effort: 'medium',
    impact: 'medium',
    category: 'Health'
  },
  {
    id: '7',
    title: 'Reshoring: The New Manufacturing Landscape',
    description: 'Investigate the economic and strategic factors driving manufacturing reshoring trends and their implications.',
    relevantTopics: ['Supply Chain Security', 'Economic Nationalism', 'Advanced Manufacturing', 'Labor Markets'],
    dataPoints: [
      'Capital investment in domestic manufacturing facilities',
      'Job creation data from reshoring initiatives',
      'Comparative cost analysis of offshored vs. reshored production',
      'Industry sector patterns in reshoring decisions'
    ],
    angles: [
      'Economic impact on communities receiving new manufacturing',
      'Technology\'s role in enabling cost-competitive reshoring',
      'Policy frameworks supporting manufacturing repatriation',
      'Global trade relationship implications'
    ],
    effort: 'high',
    impact: 'high',
    category: 'Business'
  },
  {
    id: '8',
    title: 'Autonomous Vehicle Ethics: Programming Moral Decisions',
    description: 'Examine how autonomous vehicle systems are being programmed to make ethical decisions in unavoidable accident scenarios.',
    relevantTopics: ['AI Ethics', 'Trolley Problem', 'Liability Frameworks', 'Public Trust'],
    dataPoints: [
      'Survey data on public preferences for ethical outcomes',
      'Actual programming approaches by major manufacturers',
      'Regulatory guidance across different jurisdictions',
      'Simulated scenario outcome analysis'
    ],
    angles: [
      'Philosophical frameworks for machine ethics',
      'Legal liability implications of programmed decisions',
      'Cross-cultural variations in ethical priorities',
      'Transparency requirements in autonomous systems'
    ],
    effort: 'medium',
    impact: 'medium',
    category: 'Technology'
  }
];
