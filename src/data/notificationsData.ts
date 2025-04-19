
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'system' | 'message' | 'editor' | 'version' | 'trend';
}

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'New edit suggestion received',
    message: 'Sarah Johnson suggested edits to "The Impact of Climate Change"',
    time: '10 minutes ago',
    read: false,
    type: 'editor'
  },
  {
    id: '2',
    title: 'Version control update',
    message: 'Mark Chen merged changes to "Economic Policy Analysis"',
    time: '25 minutes ago',
    read: false,
    type: 'version'
  },
  {
    id: '3',
    title: 'Trending topic alert',
    message: '"Renewable Energy Solutions" is trending in your region',
    time: '1 hour ago',
    read: false,
    type: 'trend'
  },
  {
    id: '4',
    title: 'New message from James Wilson',
    message: 'Can we discuss the draft before publishing?',
    time: '2 hours ago',
    read: true,
    type: 'message'
  },
  {
    id: '5',
    title: 'System maintenance',
    message: 'Veritas will be undergoing maintenance on Friday',
    time: '5 hours ago',
    read: true,
    type: 'system'
  },
  {
    id: '6',
    title: 'Article suggestion',
    message: 'Based on your interests: "Tech Giants and Privacy Concerns"',
    time: '8 hours ago',
    read: true,
    type: 'trend'
  },
  {
    id: '7',
    title: 'Editing collaboration invite',
    message: 'Emily Davis invited you to collaborate on "Healthcare Reform"',
    time: 'Yesterday',
    read: true,
    type: 'editor'
  },
  {
    id: '8',
    title: 'Version history updated',
    message: 'Your changes to "Global Market Analysis" were saved',
    time: 'Yesterday',
    read: true,
    type: 'version'
  },
  {
    id: '9',
    title: 'New research data available',
    message: 'Public opinion data updated for your demographic interests',
    time: '2 days ago',
    read: true,
    type: 'system'
  },
  {
    id: '10',
    title: 'Weekly summary',
    message: 'Your articles received 2.5K views this week (↑15%)',
    time: '3 days ago',
    read: true,
    type: 'system'
  }
];
