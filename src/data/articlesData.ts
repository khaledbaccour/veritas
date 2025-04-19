
export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'review' | 'published';
  collaborators: {
    id: string;
    name: string;
    avatar: string;
    role: 'owner' | 'editor' | 'viewer';
  }[];
  comments: {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    createdAt: string;
    resolved: boolean;
  }[];
  versions: {
    id: string;
    number: number;
    createdAt: string;
    createdBy: {
      id: string;
      name: string;
    };
    changes: string;
  }[];
  tags: string[];
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Impact of Climate Change on Global Agriculture',
    content: `<h1>The Impact of Climate Change on Global Agriculture</h1>
    <p>Climate change represents one of the most significant challenges to global food security in the 21st century. Rising temperatures, changing precipitation patterns, and increasing frequency of extreme weather events are already affecting crop yields and livestock production worldwide.</p>
    <h2>Key Impacts</h2>
    <p>Research indicates that for every 1°C rise in global temperature, there is an estimated 5-10% decrease in major crop yields. This affects not only food availability but also price stability and farmer livelihoods.</p>
    <p>Regions already struggling with food insecurity, particularly in sub-Saharan Africa and South Asia, are expected to be disproportionately affected by these changes. Models suggest that without significant adaptation measures, climate change could push an additional 100 million people into extreme poverty by 2030.</p>
    <h2>Adaptation Strategies</h2>
    <p>Agricultural systems worldwide are implementing various adaptation strategies:</p>
    <ul>
      <li>Development of drought and heat-resistant crop varieties</li>
      <li>Implementation of improved irrigation techniques and water management</li>
      <li>Diversification of crop rotations and farming systems</li>
      <li>Adoption of precision agriculture technologies</li>
      <li>Expansion of crop insurance and other financial protection mechanisms</li>
    </ul>
    <h2>Policy Implications</h2>
    <p>Effective response to climate change impacts on agriculture requires coordinated policy action at multiple levels. International agricultural research funding, technology transfer mechanisms, and supportive trade policies all play crucial roles in building resilience.</p>
    <p>Additionally, reducing food waste—which accounts for approximately 8% of global greenhouse gas emissions—represents a critical opportunity to mitigate climate change while improving food security.</p>
    <h2>Conclusion</h2>
    <p>As climate change accelerates, agricultural adaptation must be prioritized in both research funding and policy development. The capacity to maintain and improve global food production under changing climatic conditions will be one of the defining challenges of this century, with profound implications for human welfare and geopolitical stability.</p>`,
    createdAt: '2023-09-15T10:30:00Z',
    updatedAt: '2023-10-12T14:45:00Z',
    status: 'draft',
    collaborators: [
      {
        id: '101',
        name: 'Alex Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=32',
        role: 'owner'
      },
      {
        id: '102',
        name: 'Samantha Chen',
        avatar: 'https://i.pravatar.cc/150?img=25',
        role: 'editor'
      },
      {
        id: '103',
        name: 'Marcus Johnson',
        avatar: 'https://i.pravatar.cc/150?img=68',
        role: 'viewer'
      }
    ],
    comments: [
      {
        id: 'c1',
        userId: '102',
        userName: 'Samantha Chen',
        userAvatar: 'https://i.pravatar.cc/150?img=25',
        content: 'We should include more specific data on regional impacts, particularly in South Asia.',
        createdAt: '2023-10-05T09:12:00Z',
        resolved: false
      },
      {
        id: 'c2',
        userId: '103',
        userName: 'Marcus Johnson',
        userAvatar: 'https://i.pravatar.cc/150?img=68',
        content: 'The adaptation strategies section is strong, but consider adding something about carbon sequestration in agricultural soils.',
        createdAt: '2023-10-08T16:45:00Z',
        resolved: true
      }
    ],
    versions: [
      {
        id: 'v1',
        number: 1,
        createdAt: '2023-09-15T10:30:00Z',
        createdBy: {
          id: '101',
          name: 'Alex Rodriguez'
        },
        changes: 'Initial draft with basic structure and key points.'
      },
      {
        id: 'v2',
        number: 2,
        createdAt: '2023-09-28T13:15:00Z',
        createdBy: {
          id: '101',
          name: 'Alex Rodriguez'
        },
        changes: 'Expanded sections on key impacts and added policy implications.'
      },
      {
        id: 'v3',
        number: 3,
        createdAt: '2023-10-12T14:45:00Z',
        createdBy: {
          id: '102',
          name: 'Samantha Chen'
        },
        changes: 'Added adaptation strategies section and refined conclusion.'
      }
    ],
    tags: ['Climate Change', 'Agriculture', 'Food Security', 'Adaptation', 'Policy']
  },
  {
    id: '2',
    title: 'Digital Privacy Legislation: A Global Comparison',
    content: `<h1>Digital Privacy Legislation: A Global Comparison</h1>
    <p>As digital technologies become increasingly embedded in everyday life, governments worldwide are developing regulatory frameworks to protect citizen privacy. These frameworks reflect different cultural, political, and legal approaches to balancing privacy with innovation and security concerns.</p>
    <h2>European Union: GDPR</h2>
    <p>The General Data Protection Regulation (GDPR), implemented in 2018, represents one of the most comprehensive privacy frameworks globally. Key provisions include:</p>
    <ul>
      <li>Explicit consent requirements for data collection</li>
      <li>Right to access personal data held by companies</li>
      <li>Right to be forgotten (data erasure)</li>
      <li>Mandatory data breach notifications</li>
      <li>Significant penalties for non-compliance (up to 4% of global revenue)</li>
    </ul>
    <p>The GDPR has influenced privacy legislation worldwide, creating a "Brussels Effect" where many multinational corporations adopt GDPR standards globally for operational simplicity.</p>
    <h2>United States: Sectoral Approach</h2>
    <p>Unlike the EU's comprehensive framework, the United States has traditionally relied on a sectoral approach with different rules for different industries:</p>
    <ul>
      <li>HIPAA for healthcare information</li>
      <li>FERPA for educational records</li>
      <li>GLBA for financial data</li>
      <li>COPPA for children's online privacy</li>
    </ul>
    <p>This patchwork approach has led to significant variance in protection levels across sectors and states. California's Consumer Privacy Act (CCPA) and Virginia's Consumer Data Protection Act represent state-level attempts to create more comprehensive frameworks.</p>
    <h2>China: Data Security Focus</h2>
    <p>China's approach emphasizes national security and data sovereignty, with the Personal Information Protection Law (PIPL) and Data Security Law creating a comprehensive framework that:</p>
    <ul>
      <li>Restricts cross-border data transfers</li>
      <li>Requires data localization for critical information</li>
      <li>Implements consent requirements similar to GDPR</li>
      <li>Establishes government authority over data for national security</li>
    </ul>
    <p>This framework reflects China's prioritization of data as a national strategic resource while still providing individual protections.</p>
    <h2>Global Convergence and Divergence</h2>
    <p>While certain elements are becoming standard across jurisdictions (consent requirements, breach notifications), significant differences remain in implementation, enforcement, and underlying philosophy. These differences create compliance challenges for global organizations and raise questions about the possibility of international standards.</p>
    <h2>Future Directions</h2>
    <p>Emerging technologies such as artificial intelligence, biometrics, and the Internet of Things are creating new privacy challenges that current frameworks may struggle to address. Future legislation will likely need to balance innovation enablement with enhanced protections for increasingly sophisticated data collection and processing capabilities.</p>`,
    createdAt: '2023-08-20T09:15:00Z',
    updatedAt: '2023-10-18T16:30:00Z',
    status: 'review',
    collaborators: [
      {
        id: '104',
        name: 'Elena Petrov',
        avatar: 'https://i.pravatar.cc/150?img=16',
        role: 'owner'
      },
      {
        id: '105',
        name: 'David Wong',
        avatar: 'https://i.pravatar.cc/150?img=11',
        role: 'editor'
      },
      {
        id: '106',
        name: 'Rebecca Jones',
        avatar: 'https://i.pravatar.cc/150?img=5',
        role: 'editor'
      }
    ],
    comments: [
      {
        id: 'c1',
        userId: '105',
        userName: 'David Wong',
        userAvatar: 'https://i.pravatar.cc/150?img=11',
        content: 'We should update this to include the recent federal privacy bill proposal.',
        createdAt: '2023-10-01T11:23:00Z',
        resolved: true
      },
      {
        id: 'c2',
        userId: '106',
        userName: 'Rebecca Jones',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        content: 'The section on China could benefit from more specific examples of how PIPL has been enforced since implementation.',
        createdAt: '2023-10-15T14:07:00Z',
        resolved: false
      },
      {
        id: 'c3',
        userId: '104',
        userName: 'Elena Petrov',
        userAvatar: 'https://i.pravatar.cc/150?img=16',
        content: 'I\'ve added material on emerging technologies. Please review the final section.',
        createdAt: '2023-10-18T15:55:00Z',
        resolved: false
      }
    ],
    versions: [
      {
        id: 'v1',
        number: 1,
        createdAt: '2023-08-20T09:15:00Z',
        createdBy: {
          id: '104',
          name: 'Elena Petrov'
        },
        changes: 'Initial draft focusing on EU and US frameworks.'
      },
      {
        id: 'v2',
        number: 2,
        createdAt: '2023-09-05T10:45:00Z',
        createdBy: {
          id: '105',
          name: 'David Wong'
        },
        changes: 'Added section on China and expanded US state-level developments.'
      },
      {
        id: 'v3',
        number: 3,
        createdAt: '2023-10-02T13:30:00Z',
        createdBy: {
          id: '106',
          name: 'Rebecca Jones'
        },
        changes: 'Added global convergence section and refined GDPR impact analysis.'
      },
      {
        id: 'v4',
        number: 4,
        createdAt: '2023-10-18T16:30:00Z',
        createdBy: {
          id: '104',
          name: 'Elena Petrov'
        },
        changes: 'Added future directions section focused on emerging technologies.'
      }
    ],
    tags: ['Digital Privacy', 'Legislation', 'GDPR', 'Data Protection', 'Cybersecurity', 'Policy']
  },
  {
    id: '3',
    title: 'Artificial Intelligence in Healthcare: Promise and Ethical Considerations',
    content: `<h1>Artificial Intelligence in Healthcare: Promise and Ethical Considerations</h1>
    <p>The integration of artificial intelligence into healthcare systems promises to transform diagnosis, treatment planning, drug discovery, and administrative processes. While these advances offer tremendous potential benefits, they also raise significant ethical questions that must be addressed to ensure AI enhances rather than undermines healthcare quality and equity.</p>
    <h2>Current Applications</h2>
    <p>AI is already being deployed across multiple domains in healthcare:</p>
    <ul>
      <li><strong>Medical Imaging:</strong> AI systems can identify patterns in radiological images, often detecting subtle abnormalities that human radiologists might miss or identifying them earlier in disease progression.</li>
      <li><strong>Clinical Decision Support:</strong> Algorithms can analyze patient data to suggest diagnosis possibilities, treatment options, or flag potential complications before they become severe.</li>
      <li><strong>Drug Discovery:</strong> AI significantly accelerates the identification and validation of potential therapeutic compounds, potentially reducing development timelines and costs.</li>
      <li><strong>Administrative Efficiency:</strong> Natural language processing and automation streamline documentation, coding, and other administrative tasks that currently consume significant clinician time.</li>
    </ul>
    <h2>Ethical Challenges</h2>
    <p>The implementation of AI in healthcare raises several critical ethical concerns:</p>
    <h3>Bias and Health Disparities</h3>
    <p>AI systems trained on existing healthcare data may perpetuate or amplify historical biases in medical care. Research has already identified concerning examples where algorithms showed racial or socioeconomic bias in treatment recommendations or resource allocation.</p>
    <h3>Privacy and Consent</h3>
    <p>The development of effective AI requires access to vast quantities of sensitive health data. This raises questions about appropriate consent models, data governance, and the balance between individual privacy and collective benefits from AI advancement.</p>
    <h3>Transparency and Explainability</h3>
    <p>Many advanced AI systems operate as "black boxes," making decisions through processes that cannot be easily explained or reviewed. This lack of transparency raises concerns about accountability, especially when these systems influence critical care decisions.</p>
    <h3>Clinician-Patient Relationship</h3>
    <p>As AI systems take on more diagnostic and treatment planning functions, the traditional clinician-patient relationship may change fundamentally. This raises questions about responsibility, the role of human judgment, and the potential erosion of compassion in care delivery.</p>
    <h2>Governance Frameworks</h2>
    <p>Addressing these ethical challenges requires developing robust governance frameworks that:</p>
    <ul>
      <li>Mandate rigorous testing for bias before clinical deployment</li>
      <li>Require appropriate levels of algorithm transparency and explainability</li>
      <li>Establish clear accountability for AI-informed decisions</li>
      <li>Protect patient privacy while enabling beneficial innovation</li>
      <li>Ensure equitable access to AI-enhanced healthcare</li>
    </ul>
    <h2>Future Directions</h2>
    <p>The integration of AI into healthcare will likely continue to accelerate. Ensuring this integration enhances rather than compromises care quality and equity requires ongoing collaboration between technologists, healthcare providers, ethicists, policymakers, and patient advocates.</p>
    <p>With appropriate oversight and governance, AI has the potential to significantly improve global health outcomes. However, realizing this potential requires careful attention to the ethical dimensions of implementation from the earliest stages of development through clinical deployment and ongoing monitoring.</p>`,
    createdAt: '2023-10-05T15:45:00Z',
    updatedAt: '2023-10-20T11:30:00Z',
    status: 'draft',
    collaborators: [
      {
        id: '107',
        name: 'James Wilson',
        avatar: 'https://i.pravatar.cc/150?img=12',
        role: 'owner'
      },
      {
        id: '108',
        name: 'Aisha Patel',
        avatar: 'https://i.pravatar.cc/150?img=9',
        role: 'editor'
      }
    ],
    comments: [
      {
        id: 'c1',
        userId: '108',
        userName: 'Aisha Patel',
        userAvatar: 'https://i.pravatar.cc/150?img=9',
        content: 'The bias section should include some specific examples from recent research. I can suggest a few key studies to reference.',
        createdAt: '2023-10-10T13:22:00Z',
        resolved: true
      },
      {
        id: 'c2',
        userId: '108',
        userName: 'Aisha Patel',
        userAvatar: 'https://i.pravatar.cc/150?img=9',
        content: 'We should consider adding a section on regulatory approaches across different jurisdictions, as there are interesting differences in how the FDA, EMA, and others are approaching AI in healthcare.',
        createdAt: '2023-10-18T09:45:00Z',
        resolved: false
      }
    ],
    versions: [
      {
        id: 'v1',
        number: 1,
        createdAt: '2023-10-05T15:45:00Z',
        createdBy: {
          id: '107',
          name: 'James Wilson'
        },
        changes: 'Initial draft focusing on current applications and ethical considerations.'
      },
      {
        id: 'v2',
        number: 2,
        createdAt: '2023-10-12T10:15:00Z',
        createdBy: {
          id: '108',
          name: 'Aisha Patel'
        },
        changes: 'Expanded section on bias and added specific examples of AI applications in different medical specialties.'
      },
      {
        id: 'v3',
        number: 3,
        createdAt: '2023-10-20T11:30:00Z',
        createdBy: {
          id: '107',
          name: 'James Wilson'
        },
        changes: 'Added governance frameworks section and refined the discussion of clinician-patient relationships.'
      }
    ],
    tags: ['Artificial Intelligence', 'Healthcare', 'Ethics', 'Medical Technology', 'Bias', 'Privacy']
  }
];
