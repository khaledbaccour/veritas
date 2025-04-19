
import { useState } from 'react';
import { 
  Group, 
  ActionIcon, 
  Title, 
  TextInput, 
  Badge, 
  Menu, 
  Avatar, 
  Button,
  Popover,
  Text,
  List
} from '@mantine/core';
import { 
  Search, 
  Menu, 
  Bell, 
  Mail, 
  User, 
  Settings,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../../data/notificationsData';

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export default function Header({ collapsed, setCollapsed }: HeaderProps) {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Group justify="space-between" style={{ height: '100%', padding: '0 16px' }}>
      <Group>
        <ActionIcon 
          variant="subtle" 
          onClick={() => setCollapsed(!collapsed)}
          size="lg"
        >
          <Menu size={20} />
        </ActionIcon>
        <Title order={3} fw={600} c="primary" size="h4">
          Veritas
        </Title>
      </Group>

      <TextInput
        placeholder="Search..."
        leftSection={<Search size={16} />}
        styles={{ root: { width: '300px' } }}
        onClick={() => navigate('/search')}
      />

      <Group>
        <Popover 
          width={320} 
          position="bottom-end" 
          shadow="md"
          opened={notificationOpen}
          onChange={setNotificationOpen}
        >
          <Popover.Target>
            <Button variant="subtle" px={10} onClick={() => setNotificationOpen(!notificationOpen)}>
              <Bell size={20} />
              {unreadCount > 0 && (
                <Badge color="accent" size="sm" variant="filled" style={{ position: 'absolute', top: 5, right: 5 }}>
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Text fw={500} mb="sm">Notifications</Text>
            <List spacing="xs" size="sm" mb="md" style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {notifications.slice(0, 5).map((notification) => (
                <List.Item key={notification.id}>
                  <Group wrap="nowrap" gap="xs">
                    <div>
                      <Text size="sm" fw={notification.read ? 400 : 500}>{notification.title}</Text>
                      <Text size="xs" c="dimmed">{notification.time}</Text>
                    </div>
                  </Group>
                </List.Item>
              ))}
            </List>
            <Button variant="light" fullWidth onClick={() => navigate('/notifications')}>
              View all notifications
            </Button>
          </Popover.Dropdown>
        </Popover>

        <ActionIcon variant="subtle" onClick={() => navigate('/messages')}>
          <Mail size={20} />
        </ActionIcon>

        <Menu position="bottom-end" shadow="md">
          <Menu.Target>
            <Avatar 
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61" 
              radius="xl" 
              size="sm"
              style={{ cursor: 'pointer' }}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<User size={14} />}>Profile</Menu.Item>
            <Menu.Item leftSection={<Settings size={14} />}>Settings</Menu.Item>
            <Menu.Divider />
            <Menu.Item leftSection={<LogOut size={14} />} color="red">Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
