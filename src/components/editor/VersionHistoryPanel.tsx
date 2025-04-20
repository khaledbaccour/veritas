import { Text, Group, Badge, Accordion, Avatar, Button } from '@mantine/core';
import { GitBranch } from 'lucide-react';

interface Version {
  id: string;
  number: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  changes: string;
}

interface VersionHistoryPanelProps {
  versions: Version[];
}

export function VersionHistoryPanel({ versions }: VersionHistoryPanelProps) {
  return (
    <>
      <Group justify="space-between" mb="md">
        <Text fw={500}>Version History</Text>
        <Badge>{versions.length} Versions</Badge>
      </Group>
      
      <Accordion>
        {versions.map((version) => (
          <Accordion.Item key={version.id} value={version.id}>
            <Accordion.Control>
              <Group>
                <div>
                  <Text size="sm" fw={500}>Version {version.number}</Text>
                  <Text size="xs" c="dimmed">
                    {new Date(version.createdAt).toLocaleDateString()}
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Group mb="xs">
                <Avatar 
                  src={`https://i.pravatar.cc/150?img=${parseInt(version.createdBy.id)}`} 
                  radius="xl" 
                  size="sm" 
                />
                <Text size="sm">{version.createdBy.name}</Text>
              </Group>
              
              <Text size="sm">{version.changes}</Text>
              
              <Group mt="md">
                <Button variant="light" size="xs">View</Button>
                <Button variant="outline" size="xs">Restore</Button>
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      
      <Button 
        variant="light" 
        fullWidth 
        mt="md" 
        leftSection={<GitBranch size={16} />}
      >
        Create Branch
      </Button>
    </>
  );
}
