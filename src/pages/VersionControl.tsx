import { 
  Title, 
  Text, 
  Button, 
  Group, 
  Container,
  Card,
  Avatar,
  Accordion,
  Badge
} from '@mantine/core';
import { History } from 'lucide-react';

interface Version {
  id: string;
  number: number;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
  };
  changes: string;
}

interface Article {
  versions: Version[];
}

export default function VersionControl() {
  const article: Article = {
    versions: [
      {
        id: '1',
        number: 1,
        createdAt: new Date(),
        createdBy: {
          id: '1',
          name: 'John Doe',
        },
        changes: 'Initial version',
      },
      {
        id: '2',
        number: 2,
        createdAt: new Date(),
        createdBy: {
          id: '2',
          name: 'Jane Smith',
        },
        changes: 'Added introduction',
      },
      {
        id: '3',
        number: 3,
        createdAt: new Date(),
        createdBy: {
          id: '1',
          name: 'John Doe',
        },
        changes: 'Fixed grammar errors',
      },
    ],
  };

  return (
    <div className="p-6">
      <Container size="md" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <History size={80} strokeWidth={1.5} style={{ marginBottom: '2rem', opacity: 0.6 }} />
        
        <Title order={1} size="2.5rem" mb="md">Version Control</Title>
        
        <Text c="dimmed" size="lg" mb="xl" maw={500}>
          Track and manage changes to your articles.
        </Text>
        
        <Card withBorder padding="lg" mb="lg">
          <Group position="apart" mb="md">
            <Title order={4}>Version History</Title>
            <Badge>{article.versions.length} Versions</Badge>
          </Group>
          
          <Accordion>
            {article.versions.map((version) => (
              <Accordion.Item key={version.id} value={version.id}>
                <Accordion.Control>
                  <Group>
                    <Avatar 
                      src={`https://i.pravatar.cc/150?img=1`}
                      radius="xl" 
                      size="sm" 
                    />
                    <div>
                      <Text size="sm" fw={500}>Version {version.number}</Text>
                      <Text size="xs" c="dimmed">
                        {new Date(version.createdAt).toLocaleDateString()}
                      </Text>
                    </div>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text size="sm">{version.changes}</Text>
                  
                  <Group mt="md">
                    <Button variant="light" size="xs">View</Button>
                    <Button variant="outline" size="xs">Restore</Button>
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>
      </Container>
    </div>
  );
}
