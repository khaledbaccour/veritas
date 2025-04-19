import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Title, 
  Text, 
  Grid, 
  Card, 
  Group, 
  Button, 
  TextInput,
  Badge, 
  Avatar,
  Container,
  ActionIcon,
  Menu,
  Modal
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  PenTool, 
  FileBarChart, 
  Plus, 
  Search, 
  MoreHorizontal,
  Share2, 
  Copy, 
  Trash, 
  FolderOpen,
  Clock,
  Users
} from 'lucide-react';

const whiteboards = [
  {
    id: '1',
    title: 'Climate Change Article Planning',
    createdAt: '2023-10-25T14:30:00Z',
    updatedAt: '2023-10-28T09:15:00Z',
    collaborators: [
      { id: '101', name: 'Alex Rodriguez', avatar: 'https://i.pravatar.cc/150?img=32' },
      { id: '102', name: 'Samantha Chen', avatar: 'https://i.pravatar.cc/150?img=25' },
      { id: '103', name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/150?img=68' },
    ],
    thumbnail: 'https://via.placeholder.com/300x200?text=Climate+Planning',
  },
  {
    id: '2',
    title: 'Tech Policy Research Map',
    createdAt: '2023-10-20T11:45:00Z',
    updatedAt: '2023-10-27T16:20:00Z',
    collaborators: [
      { id: '102', name: 'Samantha Chen', avatar: 'https://i.pravatar.cc/150?img=25' },
      { id: '104', name: 'Elena Petrov', avatar: 'https://i.pravatar.cc/150?img=16' },
    ],
    thumbnail: 'https://via.placeholder.com/300x200?text=Tech+Policy+Map',
  },
  {
    id: '3',
    title: 'Healthcare Ethics Story Ideas',
    createdAt: '2023-10-15T09:30:00Z',
    updatedAt: '2023-10-15T09:30:00Z',
    collaborators: [
      { id: '101', name: 'Alex Rodriguez', avatar: 'https://i.pravatar.cc/150?img=32' },
      { id: '105', name: 'David Wong', avatar: 'https://i.pravatar.cc/150?img=11' },
    ],
    thumbnail: 'https://via.placeholder.com/300x200?text=Healthcare+Ethics',
  },
  {
    id: '4',
    title: 'Q4 Content Strategy',
    createdAt: '2023-10-10T13:15:00Z',
    updatedAt: '2023-10-26T10:45:00Z',
    collaborators: [
      { id: '103', name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/150?img=68' },
      { id: '106', name: 'Rebecca Jones', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: '101', name: 'Alex Rodriguez', avatar: 'https://i.pravatar.cc/150?img=32' },
    ],
    thumbnail: 'https://via.placeholder.com/300x200?text=Q4+Strategy',
  },
];

export default function Whiteboards() {
  const [search, setSearch] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  
  const filteredWhiteboards = whiteboards.filter(
    board => board.title.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="p-6">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} mb="xs">Planning Whiteboards</Title>
          <Text c="dimmed">Collaborate on ideas, mind maps, and visual planning</Text>
        </div>
        <Button leftSection={<Plus size={16} />} onClick={open}>New Whiteboard</Button>
      </Group>
      
      <Group mb="lg">
        <TextInput
          placeholder="Search whiteboards..."
          leftSection={<Search size={16} />}
          style={{ flexGrow: 1 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Group>
      
      <Grid>
        {filteredWhiteboards.map((board) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={board.id}>
            <Card withBorder padding="lg" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Card.Section style={{ position: 'relative' }}>
                <Link to={`/whiteboard/${board.id}`}>
                  <div 
                    style={{ 
                      height: 180, 
                      background: `center / cover no-repeat url(${board.thumbnail})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f0f0f0',
                    }} 
                  >
                    {!board.thumbnail && (
                      <PenTool size={48} color="#aaa" />
                    )}
                  </div>
                </Link>
                <Menu position="bottom-end" withinPortal>
                  <Menu.Target>
                    <ActionIcon 
                      variant="filled" 
                      color="gray" 
                      style={{ position: 'absolute', top: 10, right: 10 }}
                    >
                      <MoreHorizontal size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<Share2 size={16} />}>
                      Share
                    </Menu.Item>
                    <Menu.Item leftSection={<Copy size={16} />}>
                      Duplicate
                    </Menu.Item>
                    <Menu.Item leftSection={<FileBarChart size={16} />}>
                      Export
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item color="red" leftSection={<Trash size={16} />}>
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Card.Section>
              
              <Title order={4} mt="md">
                <Link to={`/whiteboard/${board.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {board.title}
                </Link>
              </Title>
              
              <Group mt="xs">
                <Clock size={14} />
                <Text size="xs" c="dimmed">
                  Last edited {new Date(board.updatedAt).toLocaleDateString()}
                </Text>
              </Group>
              
              <Group mt="auto" pt="md">
                <Avatar.Group spacing="sm">
                  {board.collaborators.slice(0, 3).map((user) => (
                    <Avatar 
                      key={user.id} 
                      src={user.avatar} 
                      radius="xl" 
                      size="sm" 
                      title={user.name} 
                    />
                  ))}
                  {board.collaborators.length > 3 && (
                    <Avatar radius="xl" size="sm">+{board.collaborators.length - 3}</Avatar>
                  )}
                </Avatar.Group>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      
      <Modal opened={opened} onClose={close} title="Create New Whiteboard" centered>
        <TextInput
          label="Whiteboard Title"
          placeholder="Enter a title for your whiteboard"
          required
          mb="md"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>Cancel</Button>
          <Button onClick={() => {
            // In a real app, we'd create the whiteboard via an API
            console.log(`Creating new whiteboard: ${newBoardTitle}`);
            close();
            setNewBoardTitle('');
          }}>
            Create Whiteboard
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
