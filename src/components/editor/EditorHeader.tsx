import { Title, Text, Group, Button, Select, Menu } from '@mantine/core';
import { ChevronDown, UserPlus, Eye, Share2, Save } from 'lucide-react';

interface EditorHeaderProps {
  status: string;
  setStatus: (status: string) => void;
}

export function EditorHeader({ status, setStatus }: EditorHeaderProps) {
  return (
    <Group justify="space-between" mb="md">
      <div>
        <Title order={2} mb="xs">Article Editor</Title>
        <Text c="dimmed">Create and edit articles with collaboration features</Text>
      </div>
      
      <Group>
        <Select
          value={status}
          onChange={(value) => setStatus(value as any)}
          data={[
            { value: 'draft', label: 'Draft' },
            { value: 'review', label: 'In Review' },
            { value: 'published', label: 'Published' },
          ]}
          style={{ width: 150 }}
        />
        
        <Menu position="bottom-end" shadow="md">
          <Menu.Target>
            <Button variant="default" rightSection={<ChevronDown size={14} />}>
              Share
            </Button>
          </Menu.Target>
          
          <Menu.Dropdown>
            <Menu.Item leftSection={<UserPlus size={14} />}>
              Invite Collaborator
            </Menu.Item>
            <Menu.Item leftSection={<Eye size={14} />}>
              Get Shareable Link
            </Menu.Item>
            <Menu.Item leftSection={<Share2 size={14} />}>
              Share to Social Media
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        
        <Button leftSection={<Save size={16} />}>Save</Button>
      </Group>
    </Group>
  );
}
