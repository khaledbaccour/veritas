import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Title, Text, Button, Group, ActionIcon, Menu, Box, Stack } from '@mantine/core';
import { 
  Tldraw, 
  useEditor,
  createTLStore,
  defaultShapeUtils,
  TLStore
} from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { useToast } from '@/hooks/use-toast';
import { Share2, Download, Save, Users } from 'lucide-react';

export default function Whiteboard() {
  const { id } = useParams();
  const { toast } = useToast();
  const [boardName, setBoardName] = useState('Untitled Whiteboard');
  const [activeUsers] = useState([
    { id: '101', name: 'Alex Rodriguez', avatar: 'https://i.pravatar.cc/150?img=32' },
    { id: '102', name: 'Samantha Chen', avatar: 'https://i.pravatar.cc/150?img=25' },
  ]);
  
  const [store, setStore] = useState<TLStore | null>(null);
  
  useEffect(() => {
    if (id) {
      setBoardName(`Whiteboard #${id}`);
    }
    
    const newStore = createTLStore({ shapeUtils: defaultShapeUtils });
    setStore(newStore);
    
    return () => {};
  }, [id]);

  const shareWhiteboard = () => {
    const dummyLink = `https://nexus-scribe.veritas/whiteboard/${id || '123'}`;
    navigator.clipboard.writeText(dummyLink);
    
    toast({
      title: "Link copied to clipboard",
      description: "Share this link with your collaborators.",
      duration: 3000,
    });
  };

  const handleSave = () => {
    toast({
      title: "Whiteboard saved",
      description: "Your whiteboard has been saved successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="whiteboard-container" style={{ height: 'calc(100vh - 80px)' }}>
      <Group justify="space-between" p="md" pb="xs">
        <Stack gap="xs">
          <Title order={3}>{boardName}</Title>
          <Group gap="xs">
            {activeUsers.map((user) => (
              <ActionIcon
                key={user.id}
                variant="subtle"
                title={user.name}
                radius="xl"
                size="md"
                style={{
                  backgroundImage: `url(${user.avatar})`,
                  backgroundSize: 'cover',
                  border: '2px solid white',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                }}
              />
            ))}
            <ActionIcon variant="light" color="blue" title="Invite collaborators" radius="xl">
              <Users size={16} />
            </ActionIcon>
          </Group>
        </Stack>
        
        <Group>
          <Button 
            variant="light" 
            leftSection={<Save size={16} />}
            onClick={handleSave}
          >
            Save
          </Button>
          
          <Menu position="bottom-end" shadow="md">
            <Menu.Target>
              <Button variant="light" leftSection={<Share2 size={16} />}>Share</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<Users size={16} />} onClick={shareWhiteboard}>
                Get Shareable Link
              </Menu.Item>
              <Menu.Item leftSection={<Download size={16} />}>
                Export as PNG
              </Menu.Item>
              <Menu.Item leftSection={<Download size={16} />}>
                Export as SVG
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
      
      <Box style={{ height: 'calc(100% - 60px)' }}>
        {store && (
          <Tldraw
            store={store}
            autoFocus
          />
        )}
      </Box>
    </div>
  );
}
