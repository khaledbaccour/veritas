
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Title, 
  Text, 
  Grid, 
  Card, 
  Group, 
  Button, 
  TextInput, 
  Select,
  Tooltip,
  ActionIcon,
  Badge,
  Avatar,
  Divider,
  Tabs,
  Menu,
  Box,
  Accordion
} from '@mantine/core';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { RichTextEditor } from '@mantine/tiptap';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Link as LinkIcon,
  CornerDownLeft,
  MessageSquare,
  Save,
  GitBranch,
  Share2,
  Settings,
  ChevronDown,
  UserPlus,
  History,
  Eye
} from 'lucide-react';

import { articles } from '../data/articlesData';

export default function Editor() {
  const { id } = useParams();
  const articleId = id || '1'; // Default to the first article if no ID
  const article = articles.find(a => a.id === articleId) || articles[0];
  
  const [title, setTitle] = useState(article.title);
  const [status, setStatus] = useState(article.status);
  
  // Setup TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Start writing your article...' }),
      Highlight,
      Link
    ],
    content: article.content,
  });
  
  return (
    <div className="p-6">
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
      
      <Grid gutter="lg">
        {/* Main editor column */}
        <Grid.Col span={{ base: 12, md: 9 }}>
          <Card withBorder mb="md" padding="lg">
            <TextInput
              placeholder="Article Title"
              size="xl"
              variant="unstyled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              styles={{ input: { fontSize: '28px', fontWeight: 700 } }}
              mb="lg"
            />
            
            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar sticky>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Highlight />
                </RichTextEditor.ControlsGroup>
                
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>
                
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>
                
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
                
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>
              
              <RichTextEditor.Content 
                style={{ minHeight: 'calc(100vh - 340px)' }} 
              />
            </RichTextEditor>
          </Card>
        </Grid.Col>
        
        {/* Sidebar column */}
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Tabs defaultValue="collaborators">
            <Tabs.List grow>
              <Tabs.Tab value="collaborators" leftSection={<UserPlus size={16} />}>
                Team
              </Tabs.Tab>
              <Tabs.Tab value="comments" leftSection={<MessageSquare size={16} />}>
                Comments
              </Tabs.Tab>
              <Tabs.Tab value="versions" leftSection={<History size={16} />}>
                History
              </Tabs.Tab>
            </Tabs.List>
            
            <Tabs.Panel value="collaborators" pt="md">
              <Text fw={500} mb="sm">Current Collaborators</Text>
              {article.collaborators.map((collaborator) => (
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
            </Tabs.Panel>
            
            <Tabs.Panel value="comments" pt="md">
              <Group justify="space-between" mb="md">
                <Text fw={500}>Comments ({article.comments.length})</Text>
                <Badge>{article.comments.filter(c => !c.resolved).length} Open</Badge>
              </Group>
              
              {article.comments.map((comment) => (
                <Card key={comment.id} withBorder mb="sm" padding="sm">
                  <Group mb="xs">
                    <Avatar src={comment.userAvatar} radius="xl" size="sm" />
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={500}>{comment.userName}</Text>
                      <Text size="xs" c="dimmed">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </Text>
                    </div>
                    {comment.resolved && (
                      <Badge color="teal" size="sm">Resolved</Badge>
                    )}
                  </Group>
                  
                  <Text size="sm">{comment.content}</Text>
                  
                  {!comment.resolved && (
                    <Group mt="xs">
                      <Button variant="subtle" size="xs">Reply</Button>
                      <Button variant="outline" size="xs">Resolve</Button>
                    </Group>
                  )}
                </Card>
              ))}
              
              <TextInput
                placeholder="Add a comment..."
                rightSection={
                  <ActionIcon>
                    <CornerDownLeft size={16} />
                  </ActionIcon>
                }
                mt="md"
              />
            </Tabs.Panel>
            
            <Tabs.Panel value="versions" pt="md">
              <Group justify="space-between" mb="md">
                <Text fw={500}>Version History</Text>
                <Badge>{article.versions.length} Versions</Badge>
              </Group>
              
              <Accordion>
                {article.versions.map((version) => (
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
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </div>
  );
}
