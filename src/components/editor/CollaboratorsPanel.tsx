import { Text, Group, Avatar, ActionIcon, Button } from '@mantine/core';
import { Settings, UserPlus } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface CollaboratorsPanelProps {
  collaborators: Collaborator[];
}

export function CollaboratorsPanel({ collaborators }: CollaboratorsPanelProps) {
  return (
    <>
      <Text fw={500} mb="sm">Current Collaborators</Text>
      {collaborators.map((collaborator) => (
        <Group key={collaborator.id} mb="sm">
          <Avatar src={collaborator.avatar} radius="xl" size="sm" />
          <div style={{ flex: 1 }}>
            <Text size="sm">{collaborator.name}</Text>
            <Text size="xs" c="dimmed">
              {collaborator.role === 'owner' ? 'Owner' : 
               collaborator.role === 'editor' ? 'Can Edit' : 'Viewer'}
            </Text>
          </div>
          <ActionIcon variant="subtle" size="sm">
            <Settings size={14} />
          </ActionIcon>
        </Group>
      ))}
      
      <Button variant="light" fullWidth mt="md" leftSection={<UserPlus size={16} />}>
        Add Collaborator
      </Button>
    </>
  );
}
