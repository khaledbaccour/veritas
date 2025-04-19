
export interface SearchResult {
  id: string;
  title: string;
  source: string;
  date: string;
  snippet: string;
  url: string;
  biasRating: {
    value: number; // -100 to 100, with negative being left-leaning
    label: 'Left' | 'Center-Left' | 'Center' | 'Center-Right' | 'Right';
  };
  trustScore: number; // 0-100
  topics: string[];
  factCheck?: {
    claim: string;
    rating: 'True' | 'Mostly True' | 'Mixed' | 'Mostly False' | 'False';
    explanation: string;
  };
  type: 'article' | 'study' | 'data' | 'opinion' | 'press-release';
}

// Helper function to assign a bias label based on value
function getBiasLabel(value: number): 'Left' | 'Center-Left' | 'Center' | 'Center-Right' | 'Right' {
  if (value <= -60) return 'Left';
  if (value <= -20) return 'Center-Left';
  if (value < 20) return 'Center';
  if (value < 60) return 'Center-Right';
  return 'Right';
}

export const searchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Climate Policy Impact on Rural Economic Development',
    source: 'Journal of Environmental Economics',
    date: '2023-09-15',
    snippet: 'Comprehensive analysis of how climate policies affect rural communities, with particular focus on job creation, economic transition, and sustainability metrics.',
    url: '#',
    biasRating: {
      value: 5,
      label: getBiasLabel(5)
    },
    trustScore: 92,
    topics: ['Climate Change', 'Rural Economics', 'Policy Analysis', 'Sustainability'],
    factCheck: {
      claim: 'Climate policies create more jobs than they eliminate in rural areas',
      rating: 'Mostly True',
      explanation: 'Data shows net job creation in most rural communities, though effects vary by region and economic sector.'
    },
    type: 'study'
  },
  {
    id: '2',
    title: 'The False Promise of Green Energy Transitions',
    source: 'Energy Policy Review',
    date: '2023-08-22',
    snippet: 'Critical examination of green energy implementation challenges, questioning the timeline and economic viability of rapid transitions away from fossil fuels.',
    url: '#',
    biasRating: {
      value: 58,
      label: getBiasLabel(58)
    },
    trustScore: 76,
    topics: ['Energy Policy', 'Fossil Fuels', 'Renewable Energy', 'Economic Impact'],
    factCheck: {
      claim: 'Renewable energy cannot meet baseload power demands without fossil fuel backup',
      rating: 'Mixed',
      explanation: 'While current technology has limitations, the claim ignores recent advances in storage and grid management.'
    },
    type: 'opinion'
  },
  {
    id: '3',
    title: 'Digital Surveillance Expansion Under New Security Framework',
    source: 'Technology Policy Institute',
    date: '2023-10-01',
    snippet: 'Analysis of expanded digital surveillance authorities under recently passed security legislation, including constitutional implications and privacy concerns.',
    url: '#',
    biasRating: {
      value: -42,
      label: getBiasLabel(-42)
    },
    trustScore: 89,
    topics: ['Digital Privacy', 'Surveillance', 'Civil Liberties', 'National Security'],
    factCheck: {
      claim: 'New framework allows warrantless access to digital communications',
      rating: 'Mostly True',
      explanation: 'The legislation does expand warrantless access in specific circumstances, though judicial oversight mechanisms exist.'
    },
    type: 'article'
  },
  {
    id: '4',
    title: 'Universal Healthcare Implementation Cost Analysis',
    source: 'Health Policy Research',
    date: '2023-07-30',
    snippet: 'Detailed economic analysis of implementation costs and projected savings from a universal healthcare system over a 10-year period.',
    url: '#',
    biasRating: {
      value: -10,
      label: getBiasLabel(-10)
    },
    trustScore: 94,
    topics: ['Healthcare Policy', 'Economic Analysis', 'Public Health', 'Government Programs'],
    factCheck: {
      claim: 'Universal healthcare would reduce total national health expenditure',
      rating: 'Mostly True',
      explanation: 'Most economic models show long-term cost reduction, though transition costs are significant.'
    },
    type: 'study'
  },
  {
    id: '5',
    title: 'Corporate Tax Policy Reform Impact on Investment',
    source: 'Economic Research Institute',
    date: '2023-09-05',
    snippet: 'Research on how proposed corporate tax changes would affect domestic investment, job creation, and international competitiveness.',
    url: '#',
    biasRating: {
      value: 22,
      label: getBiasLabel(22)
    },
    trustScore: 85,
    topics: ['Taxation', 'Corporate Policy', 'Economic Growth', 'Investment'],
    factCheck: {
      claim: 'Lower corporate taxes directly correlate with higher domestic investment',
      rating: 'Mixed',
      explanation: 'Data shows correlation in some sectors, but many factors influence investment decisions beyond tax rates.'
    },
    type: 'study'
  },
  {
    id: '6',
    title: 'Administration Announces Major Climate Initiative',
    source: 'Federal Press Office',
    date: '2023-10-10',
    snippet: 'Official announcement of new executive actions on climate change, including emissions targets, regulatory changes, and international commitments.',
    url: '#',
    biasRating: {
      value: 0,
      label: getBiasLabel(0)
    },
    trustScore: 98,
    topics: ['Climate Policy', 'Government', 'Regulation', 'International Relations'],
    type: 'press-release'
  },
  {
    id: '7',
    title: 'Immigration Reform Fails to Address Root Causes',
    source: 'Global Policy Journal',
    date: '2023-08-15',
    snippet: 'Critical analysis of recent immigration policy changes, arguing they focus on symptoms rather than addressing underlying migration drivers.',
    url: '#',
    biasRating: {
      value: -35,
      label: getBiasLabel(-35)
    },
    trustScore: 82,
    topics: ['Immigration', 'Foreign Policy', 'Human Rights', 'Economic Development'],
    factCheck: {
      claim: 'Border security measures have minimal impact on migration flows',
      rating: 'Mostly False',
      explanation: 'Data shows significant, though temporary, effects from enhanced security measures on irregular crossings.'
    },
    type: 'opinion'
  },
  {
    id: '8',
    title: 'Pharmaceutical Pricing Transparency Data',
    source: 'Healthcare Cost Institute',
    date: '2023-09-22',
    snippet: 'Comprehensive dataset on pharmaceutical pricing across markets, including development costs, marketing expenditures, and profit margins.',
    url: '#',
    biasRating: {
      value: -5,
      label: getBiasLabel(-5)
    },
    trustScore: 96,
    topics: ['Healthcare', 'Pharmaceuticals', 'Pricing', 'Transparency'],
    type: 'data'
  },
  {
    id: '9',
    title: 'The Economic Case for Stricter Immigration Controls',
    source: 'National Economic Review',
    date: '2023-07-12',
    snippet: 'Analysis arguing that tighter immigration controls benefit domestic workers through wage protection and reduced competition for low-skill positions.',
    url: '#',
    biasRating: {
      value: 65,
      label: getBiasLabel(65)
    },
    trustScore: 78,
    topics: ['Immigration', 'Labor Economics', 'Wages', 'Employment'],
    factCheck: {
      claim: 'Immigration significantly depresses wages for native-born workers',
      rating: 'Mostly False',
      explanation: 'Most economic research shows minimal wage impact, with some sectors showing positive effects.'
    },
    type: 'opinion'
  },
  {
    id: '10',
    title: 'Election Security Systems Analysis',
    source: 'Electoral Integrity Project',
    date: '2023-10-05',
    snippet: 'Technical assessment of current election security measures, vulnerabilities, and recommended improvements based on global best practices.',
    url: '#',
    biasRating: {
      value: 2,
      label: getBiasLabel(2)
    },
    trustScore: 95,
    topics: ['Election Security', 'Voting Systems', 'Cybersecurity', 'Democratic Institutions'],
    factCheck: {
      claim: 'Current electronic voting systems are vulnerable to large-scale manipulation',
      rating: 'Mostly False',
      explanation: 'While vulnerabilities exist, multiple security layers make large-scale manipulation extremely difficult without detection.'
    },
    type: 'study'
  },
  {
    id: '11',
    title: 'Racial Disparities in Criminal Justice Outcomes',
    source: 'Justice Research Center',
    date: '2023-08-28',
    snippet: 'Statistical analysis of sentencing disparities, pretrial detention rates, and other criminal justice outcomes across demographic groups.',
    url: '#',
    biasRating: {
      value: -45,
      label: getBiasLabel(-45)
    },
    trustScore: 91,
    topics: ['Criminal Justice', 'Racial Equity', 'Law Enforcement', 'Social Justice'],
    factCheck: {
      claim: 'Black defendants receive longer sentences than white defendants for similar crimes',
      rating: 'True',
      explanation: 'Consistent statistical evidence shows sentencing disparities even when controlling for relevant variables.'
    },
    type: 'study'
  },
  {
    id: '12',
    title: 'Market-Based Solutions to Climate Change',
    source: 'Economic Policy Institute',
    date: '2023-09-10',
    snippet: 'Proposal for using market mechanisms, carbon pricing, and industry innovation to address climate change without extensive regulation.',
    url: '#',
    biasRating: {
      value: 38,
      label: getBiasLabel(38)
    },
    trustScore: 84,
    topics: ['Climate Change', 'Market Economics', 'Carbon Pricing', 'Innovation Policy'],
    factCheck: {
      claim: 'Carbon taxes are more efficient than regulations at reducing emissions',
      rating: 'Mostly True',
      explanation: 'Economic models generally support this claim, though optimal approaches often combine multiple policy tools.'
    },
    type: 'article'
  }
];
