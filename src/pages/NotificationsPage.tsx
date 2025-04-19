
import { useState } from 'react';
import { 
  Title, 
  Text, 
  Card, 
  Tabs, 
  Group, 
  Badge, 
  ActionIcon, 
  Menu, 
  Divider,
  Checkbox,
  Button
} from '@mantine/core';
import { 
  Bell, 
  MessageSquare, 
  FileText, 
  GitBranch, 
  TrendingUp,
  Settings, 
  MoreVertical,
  Check,
  Trash2,
  BellOff
} from 'lucide-react';
import { notifications, Notification } from '../data/notificationsData';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [viewedNotifications, setViewedNotifications] = useState<string[]>([]);
  
  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    let filtered = [...notifications];
    
    if (activeTab === 'unread') {
      filtered = filtered.filter(n => !n.read && !viewedNotifications.includes(n.id));
    } else if (activeTab !== 'all') {
      filtered = filtered.filter(n => n.type === activeTab);
    }
    
    return filtered;
  };
  
  const filteredNotifications = getFilteredNotifications();
  
  // Mark a notification as viewed in our local state
  const markAsViewed = (id: string) => {
    if (!viewedNotifications.includes(id)) {
      setViewedNotifications([...viewedNotifications, id]);
    }
  };
  
  // Check if all notifications are selected
  const allSelected = filteredNotifications.length > 0 && 
    filteredNotifications.every(n => selectedNotifications.includes(n.id));
  
  // Toggle select all
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };
  
  // Get the icon for a notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={18} />;
      case 'editor':
        return <FileText size={18} />;
      case 'version':
        return <GitBranch size={18} />;
      case 'trend':
        return <TrendingUp size={18} />;
      default:
        return <Bell size={18} />;
    }
  };
  
  // Get the color for a notification type
  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return 'blue';
      case 'editor':
        return 'green';
      case 'version':
        return 'purple';
      case 'trend':
        return 'orange';
      default:
        return 'gray';
    }
  };
  
  return (
    <div className="p-6">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} mb="xs">Notifications</Title>
          <Text c="dimmed">Stay updated with important alerts and messages</Text>
        </div>
        
        <Group>
          <Button variant="subtle" leftSection={<Check size={16} />}>
            Mark All as Read
          </Button>
          <ActionIcon variant="light" size="lg">
            <Settings size={18} />
          </ActionIcon>
        </Group>
      </Group>
      
      <Card withBorder padding="lg">
        <Tabs value={activeTab} onChange={setActiveTab} mb="md">
          <Tabs.List>
            <Tabs.Tab 
              value="all" 
              leftSection={<Bell size={16} />}
              rightSection={
                <Badge size="xs" variant="filled" circle>
                  {notifications.length}
                </Badge>
              }
            >
              All
            </Tabs.Tab>
            <Tabs.Tab 
              value="unread" 
              leftSection={<BellOff size={16} />}
              rightSection={
                <Badge size="xs" variant="filled" circle>
                  {notifications.filter(n => !n.read).length}
                </Badge>
              }
            >
              Unread
            </Tabs.Tab>
            <Tabs.Tab 
              value="message" 
              leftSection={<MessageSquare size={16} />}
            >
              Messages
            </Tabs.Tab>
            <Tabs.Tab 
              value="editor" 
              leftSection={<FileText size={16} />}
            >
              Articles
            </Tabs.Tab>
            <Tabs.Tab 
              value="version" 
              leftSection={<GitBranch size={16} />}
            >
              Version Control
            </Tabs.Tab>
            <Tabs.Tab 
              value="trend" 
              leftSection={<TrendingUp size={16} />}
            >
              Trends
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        
        <Group mb="md">
          <Checkbox 
            checked={allSelected} 
            onChange={toggleSelectAll}
            label="Select All"
          />
          
          {selectedNotifications.length > 0 && (
            <Group ml="auto">
              <Button 
                variant="subtle" 
                leftSection={<Check size={16} />}
                size="sm"
              >
                Mark as Read
              </Button>
              <Button 
                variant="outline" 
                color="red"
                leftSection={<Trash2 size={16} />}
                size="sm"
              >
                Delete
              </Button>
            </Group>
          )}
        </Group>
        
        <Divider mb="md" />
        
        {filteredNotifications.length === 0 ? (
          <Text ta="center" py="xl" c="dimmed">
            No notifications in this category
          </Text>
        ) : (
          filteredNotifications.map((notification) => {
            const isRead = notification.read || viewedNotifications.includes(notification.id);
            const isSelected = selectedNotifications.includes(notification.id);
            
            return (
              <Card 
                key={notification.id} 
                withBorder 
                mb="sm" 
                padding="md"
                style={{ 
                  backgroundColor: isRead ? 'transparent' : 'var(--muted)',
                  opacity: isRead ? 0.8 : 1
                }}
                onClick={() => markAsViewed(notification.id)}
              >
                <Group align="flex-start">
                  <Checkbox 
                    checked={isSelected}
                    onChange={(event) => {
                      if (event.currentTarget.checked) {
                        setSelectedNotifications([...selectedNotifications, notification.id]);
                      } else {
                        setSelectedNotifications(
                          selectedNotifications.filter(id => id !== notification.id)
                        );
                      }
                      // Stop propagation to prevent the card click handler from firing
                      event.stopPropagation();
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  
                  <div style={{ 
                    backgroundColor: `var(--${getNotificationColor(notification.type)})`,
                    color: 'white',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <Text fw={isRead ? 400 : 700}>{notification.title}</Text>
                    <Text size="sm" c="dimmed">{notification.message}</Text>
                    <Text size="xs" c="dimmed" mt="xs">{notification.time}</Text>
                  </div>
                  
                  <Menu position="bottom-end">
                    <Menu.Target>
                      <ActionIcon 
                        variant="subtle"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item leftSection={<Check size={14} />}>
                        {isRead ? 'Mark as Unread' : 'Mark as Read'}
                      </Menu.Item>
                      <Menu.Item leftSection={<BellOff size={14} />}>
                        Mute This Type
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item leftSection={<Trash2 size={14} />} color="red">
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Card>
            );
          })
        )}
        
        <Button variant="outline" fullWidth mt="md">
          Load More
        </Button>
      </Card>
    </div>
  );
}
