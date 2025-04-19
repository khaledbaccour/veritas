
import { useState } from 'react';
import { 
  Grid, 
  Card, 
  Title, 
  Text, 
  Group, 
  Badge, 
  Avatar, 
  TextInput, 
  ActionIcon, 
  Divider, 
  Button,
  Tabs,
  Box,
  Tooltip,
  Menu
} from '@mantine/core';
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical, 
  Search as SearchIcon,
  Circle,
  Plus,
  UserPlus,
  Users,
  File,
  Image,
  FileText,
  X
} from 'lucide-react';
import { messages, users, chatGroups, currentUser, Message } from '../data/messagesData';

export default function Messages() {
  const [activeChat, setActiveChat] = useState(users[0].id);
  const [activeChatType, setActiveChatType] = useState<'user' | 'group'>('user');
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>('direct');
  
  // Filter messages based on active chat
  const filteredMessages = messages.filter(message => 
    activeChatType === 'user' 
      ? (message.senderId === activeChat && message.receiverId === currentUser.id) || 
        (message.senderId === currentUser.id && message.receiverId === activeChat)
      : message.groupId === activeChat
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
  const activeChatDetails = activeChatType === 'user' 
    ? users.find(user => user.id === activeChat) 
    : chatGroups.find(group => group.id === activeChat);
  
  // Function to handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would call an API to save the message
    console.log('Sending message:', newMessage);
    // Clear the input
    setNewMessage('');
  };
  
  // Helper function to format messages by date
  const getMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  };
  
  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  filteredMessages.forEach(message => {
    const date = getMessageDate(message.timestamp);
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  return (
    <div className="p-6">
      <Title order={2} mb="xs">Messages</Title>
      <Text c="dimmed" mb="lg">Communicate with your colleagues in real-time</Text>
      
      <Grid gutter="lg">
        {/* Contacts/chats sidebar */}
        <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
          <Card withBorder padding="md" h="calc(100vh - 200px)" style={{ display: 'flex', flexDirection: 'column' }}>
            <Group justify="space-between" mb="md">
              <TextInput
                placeholder="Search messages..."
                leftSection={<SearchIcon size={16} />}
                size="sm"
                style={{ flex: 1 }}
              />
              <ActionIcon>
                <Plus size={20} />
              </ActionIcon>
            </Group>
            
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List grow mb="md">
                <Tabs.Tab value="direct" leftSection={<UserPlus size={16} />}>
                  Direct
                </Tabs.Tab>
                <Tabs.Tab value="groups" leftSection={<Users size={16} />}>
                  Groups
                </Tabs.Tab>
              </Tabs.List>
              
              <Tabs.Panel value="direct" style={{ overflow: 'auto', flex: 1 }}>
                {users.map((user) => (
                  <div 
                    key={user.id}
                    onClick={() => {
                      setActiveChat(user.id);
                      setActiveChatType('user');
                    }}
                    style={{ 
                      padding: '10px', 
                      cursor: 'pointer',
                      backgroundColor: activeChat === user.id && activeChatType === 'user' ? 'var(--muted)' : 'transparent',
                      borderRadius: '8px',
                      marginBottom: '4px'
                    }}
                  >
                    <Group>
                      <div style={{ position: 'relative' }}>
                        <Avatar src={user.avatar} radius="xl" />
                        {user.status === 'online' && (
                          <Box
                            style={{
                              position: 'absolute',
                              bottom: 2,
                              right: 2,
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              backgroundColor: 'green',
                              border: '2px solid white'
                            }}
                          />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>{user.name}</Text>
                        <Text size="xs" c="dimmed">{user.role}</Text>
                      </div>
                      <div>
                        {user.status === 'online' ? (
                          <Badge size="xs" color="green">Online</Badge>
                        ) : (
                          <Text size="xs" c="dimmed">
                            {user.lastActive}
                          </Text>
                        )}
                      </div>
                    </Group>
                  </div>
                ))}
              </Tabs.Panel>
              
              <Tabs.Panel value="groups" style={{ overflow: 'auto', flex: 1 }}>
                {chatGroups.map((group) => (
                  <div 
                    key={group.id}
                    onClick={() => {
                      setActiveChat(group.id);
                      setActiveChatType('group');
                    }}
                    style={{ 
                      padding: '10px', 
                      cursor: 'pointer',
                      backgroundColor: activeChat === group.id && activeChatType === 'group' ? 'var(--muted)' : 'transparent',
                      borderRadius: '8px',
                      marginBottom: '4px'
                    }}
                  >
                    <Group>
                      <Avatar radius="xl">
                        {group.name.substring(0, 2)}
                      </Avatar>
                      <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>{group.name}</Text>
                        <Text size="xs" c="dimmed" truncate>
                          {group.lastMessage?.content}
                        </Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed">
                          {group.lastMessage && new Date(group.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                      </div>
                    </Group>
                  </div>
                ))}
                
                <Button variant="outline" leftSection={<Plus size={16} />} fullWidth mt="md">
                  Create New Group
                </Button>
              </Tabs.Panel>
            </Tabs>
          </Card>
        </Grid.Col>
        
        {/* Chat area */}
        <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
          <Card withBorder padding={0} h="calc(100vh - 200px)" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Chat header */}
            <Box p="md" style={{ borderBottom: '1px solid var(--border)' }}>
              <Group position="apart">
                <Group>
                  {activeChatType === 'user' ? (
                    <>
                      <div style={{ position: 'relative' }}>
                        <Avatar src={(activeChatDetails as any)?.avatar} radius="xl" />
                        {(activeChatDetails as any)?.status === 'online' && (
                          <Box
                            style={{
                              position: 'absolute',
                              bottom: 2,
                              right: 2,
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              backgroundColor: 'green',
                              border: '2px solid white'
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <Text fw={500}>{(activeChatDetails as any)?.name}</Text>
                        <Text size="xs" c="dimmed">{(activeChatDetails as any)?.role}</Text>
                      </div>
                    </>
                  ) : (
                    <>
                      <Avatar radius="xl">
                        {(activeChatDetails as any)?.name.substring(0, 2)}
                      </Avatar>
                      <div>
                        <Text fw={500}>{(activeChatDetails as any)?.name}</Text>
                        <Text size="xs" c="dimmed">
                          {(activeChatDetails as any)?.members.length} members
                        </Text>
                      </div>
                    </>
                  )}
                </Group>
                
                <Group>
                  <Tooltip label="Call">
                    <ActionIcon variant="light" size="lg">
                      <Phone size={20} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Video Call">
                    <ActionIcon variant="light" size="lg">
                      <Video size={20} />
                    </ActionIcon>
                  </Tooltip>
                  <Menu position="bottom-end">
                    <Menu.Target>
                      <ActionIcon variant="subtle">
                        <MoreVertical size={20} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item>Search in Conversation</Menu.Item>
                      <Menu.Item>Notification Settings</Menu.Item>
                      <Menu.Divider />
                      {activeChatType === 'group' && (
                        <Menu.Item>Add Members</Menu.Item>
                      )}
                      <Menu.Item color="red">Block</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
            </Box>
            
            {/* Messages area */}
            <Box p="md" style={{ flex: 1, overflowY: 'auto' }}>
              {Object.keys(groupedMessages).map(date => (
                <div key={date}>
                  <Divider 
                    label={date} 
                    labelPosition="center"
                    mt="md"
                    mb="md"
                  />
                  
                  {groupedMessages[date].map((message) => {
                    const isCurrentUser = message.senderId === currentUser.id;
                    const sender = isCurrentUser 
                      ? currentUser 
                      : users.find(user => user.id === message.senderId);
                    
                    return (
                      <div
                        key={message.id}
                        style={{
                          display: 'flex',
                          justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                          marginBottom: '16px'
                        }}
                      >
                        {!isCurrentUser && (
                          <Avatar 
                            src={sender?.avatar} 
                            radius="xl" 
                            size="sm"
                            mr="sm"
                            mt="xs"
                          />
                        )}
                        
                        <div style={{ maxWidth: '70%' }}>
                          {!isCurrentUser && (
                            <Text size="xs" fw={500} mb="xs">
                              {sender?.name}
                            </Text>
                          )}
                          
                          <div
                            style={{
                              backgroundColor: isCurrentUser ? 'var(--primary)' : 'var(--muted)',
                              color: isCurrentUser ? 'white' : 'inherit',
                              padding: '10px 14px',
                              borderRadius: '12px',
                              borderTopLeftRadius: !isCurrentUser ? '4px' : '12px',
                              borderTopRightRadius: isCurrentUser ? '4px' : '12px',
                            }}
                          >
                            <Text size="sm">{message.content}</Text>
                          </div>
                          
                          {message.attachments && message.attachments.length > 0 && (
                            <div style={{ marginTop: '8px' }}>
                              {message.attachments.map(attachment => (
                                <div
                                  key={attachment.id}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px 12px',
                                    backgroundColor: 'var(--card)',
                                    borderRadius: '8px',
                                    marginBottom: '4px'
                                  }}
                                >
                                  {attachment.fileType === 'image' ? (
                                    <Image size={16} />
                                  ) : attachment.fileType === 'document' ? (
                                    <FileText size={16} />
                                  ) : attachment.fileType === 'pdf' ? (
                                    <File size={16} />
                                  ) : (
                                    <File size={16} />
                                  )}
                                  <div style={{ marginLeft: '8px', flex: 1 }}>
                                    <Text size="sm">{attachment.fileName}</Text>
                                    <Text size="xs" c="dimmed">{attachment.fileSize}</Text>
                                  </div>
                                  <Button variant="subtle" compact size="xs">
                                    Download
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <Text 
                            size="xs" 
                            c="dimmed" 
                            mt="xs"
                            style={{ textAlign: isCurrentUser ? 'right' : 'left' }}
                          >
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Text>
                        </div>
                        
                        {isCurrentUser && (
                          <Avatar 
                            src={sender?.avatar} 
                            radius="xl" 
                            size="sm"
                            ml="sm"
                            mt="xs"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </Box>
            
            {/* Message input */}
            <Box p="md" style={{ borderTop: '1px solid var(--border)' }}>
              <Group>
                <Menu position="top-start">
                  <Menu.Target>
                    <ActionIcon size="lg" variant="subtle">
                      <Paperclip size={20} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<Image size={14} />}>
                      Upload Image
                    </Menu.Item>
                    <Menu.Item leftSection={<FileText size={14} />}>
                      Upload Document
                    </Menu.Item>
                    <Menu.Item leftSection={<File size={14} />}>
                      Upload File
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                
                <TextInput
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  style={{ flex: 1 }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                
                <ActionIcon 
                  size="lg" 
                  variant={newMessage.trim() ? "filled" : "subtle"}
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={20} />
                </ActionIcon>
              </Group>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
