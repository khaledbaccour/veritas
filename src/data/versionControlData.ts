
export interface Repository {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  collaborators: {
    id: string;
    name: string;
    avatar: string;
    role: 'admin' | 'editor' | 'viewer';
  }[];
  branches: Branch[];
  currentBranch: string;
  mainArticleId: string;
}

export interface Branch {
  id: string;
  name: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  lastCommit: Commit;
  commits: Commit[];
  isActive: boolean;
}

export interface Commit {
  id: string;
  message: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  changes: {
    added: number;
    modified: number;
    deleted: number;
  };
  parents: string[];
}

export interface PullRequest {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'merged' | 'closed';
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  sourceBranch: string;
  targetBranch: string;
  reviewers: {
    id: string;
    name: string;
    avatar: string;
    status: 'pending' | 'approved' | 'rejected';
    comments?: string;
  }[];
  commits: Commit[];
  comments: {
    id: string;
    content: string;
    createdAt: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    lineNumber?: number;
    filePath?: string;
  }[];
}

export const repositories: Repository[] = [
  {
    id: 'repo1',
    name: 'Climate Change Impact Analysis',
    description: 'Comprehensive investigation into climate change effects on global agriculture and economic systems',
    createdAt: '2023-09-01T08:25:43Z',
    updatedAt: '2023-10-19T15:42:12Z',
    owner: {
      id: '101',
      name: 'Alex Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=32'
    },
    collaborators: [
      {
        id: '101',
        name: 'Alex Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=32',
        role: 'admin'
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
        role: 'editor'
      },
      {
        id: '104',
        name: 'Elena Petrov',
        avatar: 'https://i.pravatar.cc/150?img=16',
        role: 'viewer'
      }
    ],
    currentBranch: 'main',
    mainArticleId: '1',
    branches: [
      {
        id: 'branch1',
        name: 'main',
        createdAt: '2023-09-01T08:25:43Z',
        createdBy: {
          id: '101',
          name: 'Alex Rodriguez'
        },
        isActive: true,
        lastCommit: {
          id: 'commit8',
          message: 'Updated policy implications with recent congressional hearings',
          createdAt: '2023-10-19T15:42:12Z',
          author: {
            id: '101',
            name: 'Alex Rodriguez',
            avatar: 'https://i.pravatar.cc/150?img=32'
          },
          changes: {
            added: 0,
            modified: 1,
            deleted: 0
          },
          parents: ['commit7']
        },
        commits: [
          {
            id: 'commit1',
            message: 'Initial draft with outline and key points',
            createdAt: '2023-09-01T10:12:33Z',
            author: {
              id: '101',
              name: 'Alex Rodriguez',
              avatar: 'https://i.pravatar.cc/150?img=32'
            },
            changes: {
              added: 1,
              modified: 0,
              deleted: 0
            },
            parents: []
          },
          {
            id: 'commit2',
            message: 'Added introduction and methodology sections',
            createdAt: '2023-09-05T14:28:57Z',
            author: {
              id: '101',
              name: 'Alex Rodriguez',
              avatar: 'https://i.pravatar.cc/150?img=32'
            },
            changes: {
              added: 0,
              modified: 1,
              deleted: 0
            },
            parents: ['commit1']
          },
          {
            id: 'commit3',
            message: 'Expanded key impacts section with recent data',
            createdAt: '2023-09-12T09:45:21Z',
            author: {
              id: '102',
              name: 'Samantha Chen',
              avatar: 'https://i.pravatar.cc/150?img=25'
            },
            changes: {
              added: 0,
              modified: 1,
              deleted: 0
            },
            parents: ['commit2']
          },
          {
            id: 'commit7',
            message: 'Added adaptation strategies section with case studies',
            createdAt: '2023-10-05T11:33:48Z',
            author: {
              id: '103',
              name: 'Marcus Johnson',
              avatar: 'https://i.pravatar.cc/150?img=68'
            },
            changes: {
              added: 0,
              modified: 1,
              deleted: 0
            },
            parents: ['commit6']
          },
          {
            id: 'commit8',
            message: 'Updated policy implications with recent congressional hearings',
            createdAt: '2023-10-19T15:42:12Z',
            author: {
              id: '101',
              name: 'Alex Rodriguez',
              avatar: 'https://i.pravatar.cc/150?img=32'
            },
            changes: {
              added: 0,
              modified: 1,
              deleted: 0
            },
            parents: ['commit7']
          }
        ]
      },
      {
        id: 'branch2',
        name: 'regional-analysis',
        createdAt: '2023-09-20T08:17:39Z',
        createdBy: {
          id: '102',
          name: 'Samantha Chen'
        },
        isActive: false,
        lastCommit: {
          id: 'commit6',
          message: 'Added South Asia regional impact analysis',
          createdAt: '2023-10-02T13:28:45Z',
          author: {
            id: '102',
            name: 'Samantha Chen',
            avatar: 'https://i.pravatar.cc/150?img=25'
          },
          changes: {
            added: 1,
            modified: 1,
            deleted: 0
          },
          parents: ['commit5']
        },
        commits: [
          {
            id: 'commit4',
            message: 'Created regional analysis branch',
            createdAt: '2023-09-20T08:17:39Z',
            author: {
              id: '102',
              name: 'Samantha Chen',
              avatar: 'https://i.pravatar.cc/150?img=25'
            },
            changes: {
              added: 0,
              modified: 0,
              deleted: 0
            },
            parents: ['commit3']
          },
          {
            id: 'commit5',
            message: 'Added North America regional impact analysis',
            createdAt: '2023-09-25T16:42:18Z',
            author: {
              id: '102',
              name: 'Samantha Chen',
              avatar: 'https://i.pravatar.cc/150?img=25'
            },
            changes: {
              added: 1,
              modified: 0,
              deleted: 0
            },
            parents: ['commit4']
          },
          {
            id: 'commit6',
            message: 'Added South Asia regional impact analysis',
            createdAt: '2023-10-02T13:28:45Z',
            author: {
              id: '102',
              name: 'Samantha Chen',
              avatar: 'https://i.pravatar.cc/150?img=25'
            },
            changes: {
              added: 1,
              modified: 1,
              deleted: 0
            },
            parents: ['commit5']
          }
        ]
      },
      {
        id: 'branch3',
        name: 'policy-proposals',
        createdAt: '2023-10-10T09:05:22Z',
        createdBy: {
          id: '103',
          name: 'Marcus Johnson'
        },
        isActive: false,
        lastCommit: {
          id: 'commit10',
          message: 'Added international policy framework recommendations',
          createdAt: '2023-10-18T14:37:09Z',
          author: {
            id: '103',
            name: 'Marcus Johnson',
            avatar: 'https://i.pravatar.cc/150?img=68'
          },
          changes: {
            added: 0,
            modified: 1,
            deleted: 0
          },
          parents: ['commit9']
        },
        commits: [
          {
            id: 'commit9',
            message: 'Created policy proposals branch with outline',
            createdAt: '2023-10-10T09:05:22Z',
            author: {
              id: '103',
              name: 'Marcus Johnson',
              avatar: 'https://i.pravatar.cc/150?img=68'
            },
            changes: {
              added: 1,
              modified: 0,
              deleted: 0
            },
            parents: ['commit7']
          },
          {
            id: 'commit10',
            message: 'Added international policy framework recommendations',
            createdAt: '2023-10-18T14:37:09Z',
            author: {
              id: '103',
              name: 'Marcus Johnson',
              avatar: 'https://i.pravatar.cc/150?img=68'
            },
            changes: {
              added: 0,
              modified: 1,
              deleted: 0
            },
            parents: ['commit9']
          }
        ]
      }
    ]
  },
  {
    id: 'repo2',
    name: 'Digital Privacy Legislation Analysis',
    description: 'Comparative analysis of privacy regulations across global jurisdictions',
    createdAt: '2023-08-15T11:20:33Z',
    updatedAt: '2023-10-17T09:14:27Z',
    owner: {
      id: '104',
      name: 'Elena Petrov',
      avatar: 'https://i.pravatar.cc/150?img=16'
    },
    collaborators: [
      {
        id: '104',
        name: 'Elena Petrov',
        avatar: 'https://i.pravatar.cc/150?img=16',
        role: 'admin'
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
      },
      {
        id: '101',
        name: 'Alex Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=32',
        role: 'viewer'
      }
    ],
    currentBranch: 'main',
    mainArticleId: '2',
    branches: [
      {
        id: 'branch4',
        name: 'main',
        createdAt: '2023-08-15T11:20:33Z',
        createdBy: {
          id: '104',
          name: 'Elena Petrov'
        },
        isActive: true,
        lastCommit: {
          id: 'commit15',
          message: 'Added analysis of emerging technologies impact on privacy frameworks',
          createdAt: '2023-10-17T09:14:27Z',
          author: {
            id: '104',
            name: 'Elena Petrov',
            avatar: 'https://i.pravatar.cc/150?img=16'
          },
          changes: {
            added: 0,
            modified: 1,
            deleted: 0
          },
          parents: ['commit14']
        },
        commits: [
          {
            id: 'commit11',
            message: 'Initial structure with GDPR section outline',
            createdAt: '2023-08-15T11:20:33Z',
            author: {
              id: '104',
              name: 'Elena Petrov',
              avatar: 'https://i.pravatar.cc/150?img=16'
            },
            changes: {
              added: 1,
              modified: 0,
              deleted: 0
            },
            parents: []
          },
          {
            id: 'commit12',
            message: 'Expanded GDPR analysis with enforcement examples',
            createdAt: '2023-08-22T15:47:19Z',
            author: {
              id: '104',
              name: 'Elena Petrov',
              avatar: 'https://i.pravatar.cc/150?img=16'
            },
            changes: {
              added: 0,
              modified: 1,
              deleted: 0
            },
            parents: ['commit11']
          },
          {
            id: 'commit13',
            message: 'Added US privacy framework analysis',
            createdAt: '2023-09-05T10:33:54Z',
            author: {
              id: '105',
              name: 'David Wong',
              avatar: 'https://i.pravatar.cc/150?img=11'
            },
            changes: {
              added: 1,
              modified: 0,
              deleted: 0
            },
            parents: ['commit12']
          },
          {
            id: 'commit14',
            message: 'Added China privacy law section and comparative analysis',
            createdAt: '2023-10-02T13:22:40Z',
            author: {
              id: '106',
              name: 'Rebecca Jones',
              avatar: 'https://i.pravatar.cc/150?img=5'
            },
            changes: {
              added: 1,
              modified: 1,
              deleted: 0
            },
            parents: ['commit13']
          },
          {
            id: 'commit15',
            message: 'Added analysis of emerging technologies impact on privacy frameworks',
            createdAt: '2023-10-17T09:14:27Z',
            author: {
              id: '104',
              name: 'Elena Petrov',
              avatar: 'https://i.pravatar.cc/150?img=16'
            },
            changes: {
              added: 0,
              modified: 1,
              deleted: 0
            },
            parents: ['commit14']
          }
        ]
      },
      {
        id: 'branch5',
        name: 'us-state-laws',
        createdAt: '2023-09-12T08:35:27Z',
        createdBy: {
          id: '105',
          name: 'David Wong'
        },
        isActive: false,
        lastCommit: {
          id: 'commit17',
          message: 'Added California, Virginia, and Colorado privacy law comparison',
          createdAt: '2023-09-25T14:52:33Z',
          author: {
            id: '105',
            name: 'David Wong',
            avatar: 'https://i.pravatar.cc/150?img=11'
          },
          changes: {
            added: 1,
            modified: 0,
            deleted: 0
          },
          parents: ['commit16']
        },
        commits: [
          {
            id: 'commit16',
            message: 'Created branch for US state-level privacy laws',
            createdAt: '2023-09-12T08:35:27Z',
            author: {
              id: '105',
              name: 'David Wong',
              avatar: 'https://i.pravatar.cc/150?img=11'
            },
            changes: {
              added: 1,
              modified: 0,
              deleted: 0
            },
            parents: ['commit13']
          },
          {
            id: 'commit17',
            message: 'Added California, Virginia, and Colorado privacy law comparison',
            createdAt: '2023-09-25T14:52:33Z',
            author: {
              id: '105',
              name: 'David Wong',
              avatar: 'https://i.pravatar.cc/150?img=11'
            },
            changes: {
              added: 1,
              modified: 0,
              deleted: 0
            },
            parents: ['commit16']
          }
        ]
      }
    ]
  }
];

export const pullRequests: PullRequest[] = [
  {
    id: 'pr1',
    title: 'Merge regional climate impact analysis',
    description: 'This pull request adds detailed regional impact analyses for North America and South Asia.',
    status: 'open',
    createdAt: '2023-10-03T09:15:27Z',
    updatedAt: '2023-10-19T11:42:18Z',
    author: {
      id: '102',
      name: 'Samantha Chen',
      avatar: 'https://i.pravatar.cc/150?img=25'
    },
    sourceBranch: 'regional-analysis',
    targetBranch: 'main',
    reviewers: [
      {
        id: '101',
        name: 'Alex Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=32',
        status: 'approved',
        comments: 'Excellent regional breakdown. Ready to merge after addressing Marcus\'s comments.'
      },
      {
        id: '103',
        name: 'Marcus Johnson',
        avatar: 'https://i.pravatar.cc/150?img=68',
        status: 'pending',
        comments: 'Could we expand the South Asia section with more economic impact data?'
      }
    ],
    commits: [
      {
        id: 'commit5',
        message: 'Added North America regional impact analysis',
        createdAt: '2023-09-25T16:42:18Z',
        author: {
          id: '102',
          name: 'Samantha Chen',
          avatar: 'https://i.pravatar.cc/150?img=25'
        },
        changes: {
          added: 1,
          modified: 0,
          deleted: 0
        },
        parents: ['commit4']
      },
      {
        id: 'commit6',
        message: 'Added South Asia regional impact analysis',
        createdAt: '2023-10-02T13:28:45Z',
        author: {
          id: '102',
          name: 'Samantha Chen',
          avatar: 'https://i.pravatar.cc/150?img=25'
        },
        changes: {
          added: 1,
          modified: 1,
          deleted: 0
        },
        parents: ['commit5']
      }
    ],
    comments: [
      {
        id: 'prcomment1',
        content: 'The North America section provides excellent analysis of agricultural impacts, but could we include more on coastal infrastructure?',
        createdAt: '2023-10-10T14:35:22Z',
        author: {
          id: '101',
          name: 'Alex Rodriguez',
          avatar: 'https://i.pravatar.cc/150?img=32'
        },
        filePath: 'regional_analysis/north_america.md',
        lineNumber: 78
      },
      {
        id: 'prcomment2',
        content: 'I\'ve added additional data on coastal infrastructure impacts. Please review the latest commit.',
        createdAt: '2023-10-15T09:22:17Z',
        author: {
          id: '102',
          name: 'Samantha Chen',
          avatar: 'https://i.pravatar.cc/150?img=25'
        },
        filePath: 'regional_analysis/north_america.md',
        lineNumber: 78
      },
      {
        id: 'prcomment3',
        content: 'The South Asia section would benefit from more economic data, particularly on agricultural productivity changes.',
        createdAt: '2023-10-18T16:45:33Z',
        author: {
          id: '103',
          name: 'Marcus Johnson',
          avatar: 'https://i.pravatar.cc/150?img=68'
        },
        filePath: 'regional_analysis/south_asia.md',
        lineNumber: 42
      }
    ]
  },
  {
    id: 'pr2',
    title: 'Add state-level privacy law analysis',
    description: 'This PR adds detailed analysis of California (CCPA/CPRA), Virginia (CDPA), and Colorado privacy laws.',
    status: 'merged',
    createdAt: '2023-09-28T13:25:42Z',
    updatedAt: '2023-10-05T11:17:33Z',
    author: {
      id: '105',
      name: 'David Wong',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    sourceBranch: 'us-state-laws',
    targetBranch: 'main',
    reviewers: [
      {
        id: '104',
        name: 'Elena Petrov',
        avatar: 'https://i.pravatar.cc/150?img=16',
        status: 'approved',
        comments: 'Comprehensive analysis of state differences. Approved for merge.'
      },
      {
        id: '106',
        name: 'Rebecca Jones',
        avatar: 'https://i.pravatar.cc/150?img=5',
        status: 'approved',
        comments: 'Well-structured comparison of requirements across states.'
      }
    ],
    commits: [
      {
        id: 'commit16',
        message: 'Created branch for US state-level privacy laws',
        createdAt: '2023-09-12T08:35:27Z',
        author: {
          id: '105',
          name: 'David Wong',
          avatar: 'https://i.pravatar.cc/150?img=11'
        },
        changes: {
          added: 1,
          modified: 0,
          deleted: 0
        },
        parents: ['commit13']
      },
      {
        id: 'commit17',
        message: 'Added California, Virginia, and Colorado privacy law comparison',
        createdAt: '2023-09-25T14:52:33Z',
        author: {
          id: '105',
          name: 'David Wong',
          avatar: 'https://i.pravatar.cc/150?img=11'
        },
        changes: {
          added: 1,
          modified: 0,
          deleted: 0
        },
        parents: ['commit16']
      }
    ],
    comments: [
      {
        id: 'prcomment4',
        content: 'The CCPA section should note recent amendments from September.',
        createdAt: '2023-10-02T10:15:22Z',
        author: {
          id: '104',
          name: 'Elena Petrov',
          avatar: 'https://i.pravatar.cc/150?img=16'
        },
        filePath: 'us_privacy/california_ccpa.md',
        lineNumber: 53
      },
      {
        id: 'prcomment5',
        content: 'Updated with September amendments and enforcement examples.',
        createdAt: '2023-10-03T15:28:41Z',
        author: {
          id: '105',
          name: 'David Wong',
          avatar: 'https://i.pravatar.cc/150?img=11'
        },
        filePath: 'us_privacy/california_ccpa.md',
        lineNumber: 53
      },
      {
        id: 'prcomment6',
        content: 'Excellent comparison table of requirements across states.',
        createdAt: '2023-10-04T09:17:32Z',
        author: {
          id: '106',
          name: 'Rebecca Jones',
          avatar: 'https://i.pravatar.cc/150?img=5'
        }
      }
    ]
  }
];
