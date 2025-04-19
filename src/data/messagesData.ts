
export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'online' | 'offline' | 'away';
  lastActive?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string | null; // null for group messages
  groupId?: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: {
    id: string;
    fileName: string;
    fileType: string;
    fileSize: string;
    url: string;
  }[];
}

export interface ChatGroup {
  id: string;
  name: string;
  members: User[];
  avatar?: string;
  lastMessage?: {
    content: string;
    timestamp: string;
    senderId: string;
  };
}

export const users: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Senior Editor',
    status: 'online'
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'Data Journalist',
    status: 'online'
  },
  {
    id: '3',
    name: 'Jessica Miller',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'Investigative Reporter',
    status: 'away',
    lastActive: '10 minutes ago'
  },
  {
    id: '4',
    name: 'David Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=7',
    role: 'Political Analyst',
    status: 'offline',
    lastActive: '2 hours ago'
  },
  {
    id: '5',
    name: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'Science Correspondent',
    status: 'online'
  },
  {
    id: '6',
    name: 'James Taylor',
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'Editor-in-Chief',
    status: 'offline',
    lastActive: 'Yesterday'
  },
  {
    id: '7',
    name: 'Sophia Nguyen',
    avatar: 'https://i.pravatar.cc/150?img=13',
    role: 'Feature Writer',
    status: 'online'
  },
  {
    id: '8',
    name: 'Ethan Park',
    avatar: 'https://i.pravatar.cc/150?img=15',
    role: 'Photojournalist',
    status: 'away',
    lastActive: '30 minutes ago'
  }
];

// Current user
export const currentUser: User = {
  id: '0',
  name: 'Alex Morgan',
  avatar: 'https://i.pravatar.cc/150?img=33',
  role: 'Investigative Journalist',
  status: 'online'
};

export const chatGroups: ChatGroup[] = [
  {
    id: 'g1',
    name: 'Climate Investigation Team',
    members: [users[0], users[1], users[4], currentUser],
    lastMessage: {
      content: 'Let\'s review the latest data from the EPA report',
      timestamp: '2023-10-20T14:35:00Z',
      senderId: '1'
    }
  },
  {
    id: 'g2',
    name: 'Tech Policy Coverage',
    members: [users[1], users[2], users[6], currentUser],
    lastMessage: {
      content: 'I\'ve shared the interview transcript in the team folder',
      timestamp: '2023-10-19T09:12:00Z',
      senderId: '7'
    }
  },
  {
    id: 'g3',
    name: 'Editorial Staff',
    members: [users[0], users[5], users[6], currentUser],
    lastMessage: {
      content: 'Weekly planning meeting is moved to 2pm tomorrow',
      timestamp: '2023-10-20T11:08:00Z',
      senderId: '6'
    }
  }
];

// Generate one-to-one messages
function generateDirectMessages(user1Id: string, user2Id: string, count: number): Message[] {
  const messages: Message[] = [];
  const startDate = new Date('2023-10-18T09:00:00Z');
  
  for (let i = 0; i < count; i++) {
    const sender = i % 2 === 0 ? user1Id : user2Id;
    const receiver = i % 2 === 0 ? user2Id : user1Id;
    const timestamp = new Date(startDate.getTime() + i * 30 * 60000).toISOString();
    
    let content = '';
    if (i % 5 === 0) {
      content = 'Could you review the latest draft when you have a moment?';
    } else if (i % 5 === 1) {
      content = 'I\'ve found some interesting data for our story on renewable energy adoption.';
    } else if (i % 5 === 2) {
      content = 'The interview with the senator is confirmed for Thursday.';
    } else if (i % 5 === 3) {
      content = 'Thanks for your edits, I\'ve incorporated the changes.';
    } else {
      content = 'Let me know if you need anything else for the article.';
    }
    
    messages.push({
      id: `dm-${user1Id}-${user2Id}-${i}`,
      senderId: sender,
      receiverId: receiver,
      content,
      timestamp,
      read: i < count - 2 // Mark the last two messages as unread
    });
  }
  
  return messages;
}

// Generate group messages
function generateGroupMessages(groupId: string, members: User[], count: number): Message[] {
  const messages: Message[] = [];
  const startDate = new Date('2023-10-19T10:00:00Z');
  
  for (let i = 0; i < count; i++) {
    const senderIndex = i % members.length;
    const timestamp = new Date(startDate.getTime() + i * 45 * 60000).toISOString();
    
    let content = '';
    if (i % 7 === 0) {
      content = 'I\'ve uploaded the latest research findings to our shared folder.';
    } else if (i % 7 === 1) {
      content = 'When is our next team meeting scheduled?';
    } else if (i % 7 === 2) {
      content = 'Has anyone contacted the press office about the statement?';
    } else if (i % 7 === 3) {
      content = 'The new data visualization looks great, nice work everyone.';
    } else if (i % 7 === 4) {
      content = 'We should consider including more perspectives in the next article.';
    } else if (i % 7 === 5) {
      content = 'Deadline reminder: all drafts due by Friday 5pm.';
    } else {
      content = 'I\'ll be working remotely tomorrow if anyone needs to reach me.';
    }
    
    messages.push({
      id: `gm-${groupId}-${i}`,
      senderId: members[senderIndex].id,
      receiverId: null,
      groupId,
      content,
      timestamp,
      read: i < count - 3 // Mark the last three messages as unread
    });
  }
  
  return messages;
}

// Generate all messages
export const messages: Message[] = [
  ...generateDirectMessages('0', '1', 12), // Current user and Sarah Johnson
  ...generateDirectMessages('0', '2', 8),  // Current user and Michael Chen
  ...generateDirectMessages('0', '4', 10), // Current user and David Rodriguez
  ...generateGroupMessages('g1', [...chatGroups[0].members], 15),
  ...generateGroupMessages('g2', [...chatGroups[1].members], 10),
  ...generateGroupMessages('g3', [...chatGroups[2].members], 12)
];

// Add some attachments to selected messages
messages[5].attachments = [
  {
    id: 'a1',
    fileName: 'climate_data_analysis.xlsx',
    fileType: 'spreadsheet',
    fileSize: '2.4 MB',
    url: '#'
  }
];

messages[9].attachments = [
  {
    id: 'a2',
    fileName: 'interview_transcript.docx',
    fileType: 'document',
    fileSize: '1.1 MB',
    url: '#'
  }
];

messages[20].attachments = [
  {
    id: 'a3',
    fileName: 'research_methodology.pdf',
    fileType: 'pdf',
    fileSize: '3.7 MB',
    url: '#'
  },
  {
    id: 'a4',
    fileName: 'data_visualization.png',
    fileType: 'image',
    fileSize: '1.5 MB',
    url: '#'
  }
];
