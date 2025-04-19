
import { useState } from 'react';
import { 
  Title, 
  Text, 
  Card, 
  Group, 
  Button, 
  Tabs, 
  Badge, 
  Avatar, 
  Select,
  ActionIcon,
  Menu,
  Divider,
  Timeline,
  List,
  Grid,
  Box,
  Modal,
  TextInput,
  Textarea,
  Switch
} from '@mantine/core';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  ChevronDown, 
  Link, 
  FileText, 
  MoreVertical,
  Clock,
  GitMerge,
  Plus,
  Code,
  MessageSquare,
  Check,
  X
} from 'lucide-react';
import { repositories, pullRequests } from '../data/versionControlData';

export default function VersionControl() {
  const [activeTab, setActiveTab] = useState<string | null>('repositories');
  const [selectedRepo, setSelectedRepo] = useState(repositories[0].id);
  const [selectedBranch, setSelectedBranch] = useState(repositories[0].currentBranch);
  const [createBranchModal, setCreateBranchModal] = useState(false);
  const [createPRModal, setCreatePRModal] = useState(false);
  
  const repo = repositories.find(r => r.id === selectedRepo) || repositories[0];
  const branch = repo.branches.find(b => b.name === selectedBranch) || repo.branches[0];
  
  // Filter PRs for the current repository
  const repoPRs = pullRequests.filter(pr => 
    pr.targetBranch === repo.currentBranch || 
    repo.branches.some(b => b.name === pr.sourceBranch)
  );
  
  return (
    <div className="p-6">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} mb="xs">Version Control</Title>
          <Text c="dimmed">Manage article versions, branches, and collaborations</Text>
        </div>
        
        <Group>
          <Select
            value={selectedRepo}
            onChange={(value) => {
              if (value) {
                setSelectedRepo(value);
                const newRepo = repositories.find(r => r.id === value);
                if (newRepo) {
                  setSelectedBranch(newRepo.currentBranch);
                }
              }
            }}
            data={repositories.map(repo => ({ value: repo.id, label: repo.name }))}
            style={{ width: 250 }}
            rightSection={<ChevronDown size={14} />}
          />
          
          <Menu position="bottom-end">
            <Menu.Target>
              <Button rightSection={<ChevronDown size={14} />}>Actions</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<GitBranch size={14} />} onClick={() => setCreateBranchModal(true)}>
                Create Branch
              </Menu.Item>
              <Menu.Item leftSection={<GitPullRequest size={14} />} onClick={() => setCreatePRModal(true)}>
                Create Pull Request
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item leftSection={<Link size={14} />}>
                Share Repository
              </Menu.Item>
              <Menu.Item leftSection={<Plus size={14} />}>
                Add Collaborator
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
      
      <Card withBorder padding="md" mb="lg">
        <Group>
          <div>
            <Text fw={500}>{repo.name}</Text>
            <Text size="sm" c="dimmed">{repo.description}</Text>
          </div>
          
          <Badge ml="auto">
            <Group gap={6}>
              <GitBranch size={14} />
              <span>{repo.branches.length} branches</span>
            </Group>
          </Badge>
          
          <Group gap={8}>
            {repo.collaborators.slice(0, 3).map(collab => (
              <Avatar key={collab.id} src={collab.avatar} radius="xl" size="sm" />
            ))}
            {repo.collaborators.length > 3 && (
              <Avatar radius="xl" size="sm">
                +{repo.collaborators.length - 3}
              </Avatar>
            )}
          </Group>
        </Group>
      </Card>
      
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List mb="md">
              <Tabs.Tab 
                value="repositories" 
                leftSection={<GitBranch size={16} />}
              >
                Branches
              </Tabs.Tab>
              <Tabs.Tab 
                value="commits" 
                leftSection={<GitCommit size={16} />}
              >
                Commits
              </Tabs.Tab>
              <Tabs.Tab 
                value="pullRequests" 
                leftSection={<GitPullRequest size={16} />}
                rightSection={
                  repoPRs.filter(pr => pr.status === 'open').length > 0 && (
                    <Badge size="xs" variant="filled" circle>
                      {repoPRs.filter(pr => pr.status === 'open').length}
                    </Badge>
                  )
                }
              >
                Pull Requests
              </Tabs.Tab>
            </Tabs.List>
            
            <Tabs.Panel value="repositories">
              <Group mb="md">
                <Select
                  value={selectedBranch}
                  onChange={(value) => value && setSelectedBranch(value)}
                  data={repo.branches.map(branch => ({ value: branch.name, label: branch.name }))}
                  label="Current Branch"
                  style={{ width: 200 }}
                />
                
                <Button 
                  variant="outline" 
                  leftSection={<GitBranch size={16} />}
                  ml="auto"
                  onClick={() => setCreateBranchModal(true)}
                >
                  New Branch
                </Button>
              </Group>
              
              {repo.branches.map((branch) => (
                <Card key={branch.id} withBorder mb="md" padding="md">
                  <Group>
                    <div style={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '50%',
                      backgroundColor: branch.name === repo.currentBranch ? 'var(--primary)' : 'var(--muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: branch.name === repo.currentBranch ? 'white' : 'inherit'
                    }}>
                      <GitBranch size={20} />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <Group>
                        <Text fw={500}>{branch.name}</Text>
                        {branch.name === repo.currentBranch && (
                          <Badge color="primary">current</Badge>
                        )}
                      </Group>
                      <Text size="sm" c="dimmed">
                        Created {new Date(branch.createdAt).toLocaleDateString()} by {branch.createdBy.name}
                      </Text>
                    </div>
                    
                    <Group>
                      <Badge variant="outline">
                        <Group gap={6}>
                          <GitCommit size={14} />
                          <span>{branch.commits.length} commits</span>
                        </Group>
                      </Badge>
                      
                      <Menu position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="subtle">
                            <MoreVertical size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<FileText size={14} />}>
                            View Article
                          </Menu.Item>
                          {branch.name !== repo.currentBranch && (
                            <>
                              <Menu.Item leftSection={<GitMerge size={14} />}>
                                Merge to main
                              </Menu.Item>
                              <Menu.Item leftSection={<GitPullRequest size={14} />}>
                                Create Pull Request
                              </Menu.Item>
                            </>
                          )}
                          <Menu.Divider />
                          <Menu.Item leftSection={<Code size={14} />}>
                            Compare Branches
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Group>
                  
                  <Divider my="md" />
                  
                  <Group>
                    <div>
                      <Text size="sm" fw={500}>Latest Commit</Text>
                      <Text size="xs" c="dimmed">
                        {branch.lastCommit.message}
                      </Text>
                    </div>
                    
                    <Group ml="auto" gap={8}>
                      <Avatar 
                        src={branch.lastCommit.author.avatar} 
                        radius="xl" 
                        size="sm" 
                      />
                      <div>
                        <Text size="xs">{branch.lastCommit.author.name}</Text>
                        <Text size="xs" c="dimmed">
                          {new Date(branch.lastCommit.createdAt).toLocaleDateString()}
                        </Text>
                      </div>
                    </Group>
                  </Group>
                </Card>
              ))}
            </Tabs.Panel>
            
            <Tabs.Panel value="commits">
              <Card withBorder padding="md" mb="md">
                <Group mb="md">
                  <Text fw={500}>Commit History</Text>
                  <Badge ml="auto">
                    <Group gap={6}>
                      <GitBranch size={14} />
                      <span>{selectedBranch}</span>
                    </Group>
                  </Badge>
                </Group>
                
                <Timeline active={branch.commits.length - 1} bulletSize={24} lineWidth={2}>
                  {branch.commits.map((commit, index) => (
                    <Timeline.Item 
                      key={commit.id}
                      bullet={<GitCommit size={16} />}
                      title={
                        <Group gap={8}>
                          <Text size="sm" fw={500}>{commit.message}</Text>
                          <Badge size="xs" variant="outline">
                            {commit.id.substring(0, 7)}
                          </Badge>
                        </Group>
                      }
                    >
                      <Group gap={8}>
                        <Avatar src={commit.author.avatar} radius="xl" size="sm" />
                        <Text size="xs">{commit.author.name}</Text>
                        <Text size="xs" c="dimmed">
                          {new Date(commit.createdAt).toLocaleDateString()}
                        </Text>
                      </Group>
                      
                      <Group mt="xs">
                        {commit.changes.added > 0 && (
                          <Badge color="green" variant="light" size="xs">
                            +{commit.changes.added} added
                          </Badge>
                        )}
                        {commit.changes.modified > 0 && (
                          <Badge color="blue" variant="light" size="xs">
                            {commit.changes.modified} modified
                          </Badge>
                        )}
                        {commit.changes.deleted > 0 && (
                          <Badge color="red" variant="light" size="xs">
                            {commit.changes.deleted} deleted
                          </Badge>
                        )}
                      </Group>
                      
                      <Group mt="xs">
                        <Button variant="subtle" size="xs" compact>View Changes</Button>
                        <Button variant="outline" size="xs" compact>Restore This Version</Button>
                      </Group>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Tabs.Panel>
            
            <Tabs.Panel value="pullRequests">
              <Group mb="md">
                <Select
                  data={[
                    { value: 'all', label: 'All Pull Requests' },
                    { value: 'open', label: 'Open' },
                    { value: 'merged', label: 'Merged' },
                    { value: 'closed', label: 'Closed' },
                  ]}
                  defaultValue="all"
                  style={{ width: 200 }}
                />
                
                <Button 
                  variant="outline" 
                  leftSection={<GitPullRequest size={16} />}
                  ml="auto"
                  onClick={() => setCreatePRModal(true)}
                >
                  New Pull Request
                </Button>
              </Group>
              
              {repoPRs.length === 0 ? (
                <Card withBorder padding="xl" style={{ textAlign: 'center' }}>
                  <GitPullRequest size={48} style={{ margin: '0 auto 20px' }} />
                  <Title order={3} mb="xs">No Pull Requests</Title>
                  <Text c="dimmed" mb="lg">There are no pull requests for this repository</Text>
                  <Button 
                    leftSection={<GitPullRequest size={16} />}
                    onClick={() => setCreatePRModal(true)}
                  >
                    Create Pull Request
                  </Button>
                </Card>
              ) : (
                repoPRs.map((pr) => (
                  <Card key={pr.id} withBorder mb="md" padding="md">
                    <Group mb="xs">
                      <div style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%',
                        backgroundColor: 
                          pr.status === 'open' ? 'var(--primary)' : 
                          pr.status === 'merged' ? 'var(--secondary)' : 'var(--muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: pr.status !== 'closed' ? 'white' : 'inherit'
                      }}>
                        {pr.status === 'merged' ? <GitMerge size={20} /> : <GitPullRequest size={20} />}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <Group>
                          <Text fw={500}>{pr.title}</Text>
                          <Badge 
                            color={
                              pr.status === 'open' ? 'blue' : 
                              pr.status === 'merged' ? 'green' : 'gray'
                            }
                          >
                            {pr.status}
                          </Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                          #{pr.id.replace('pr', '')} opened {new Date(pr.createdAt).toLocaleDateString()} by {pr.author.name}
                        </Text>
                      </div>
                      
                      <Menu position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="subtle">
                            <MoreVertical size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<FileText size={14} />}>
                            View Details
                          </Menu.Item>
                          {pr.status === 'open' && (
                            <>
                              <Menu.Item leftSection={<GitMerge size={14} />}>
                                Merge Pull Request
                              </Menu.Item>
                              <Menu.Item leftSection={<X size={14} />} color="red">
                                Close Pull Request
                              </Menu.Item>
                            </>
                          )}
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                    
                    <Text size="sm" mb="md">{pr.description}</Text>
                    
                    <Group gap={8} mb="xs">
                      <Badge variant="outline" size="sm">
                        <Group gap={6}>
                          <GitBranch size={14} />
                          <span>{pr.sourceBranch}</span>
                        </Group>
                      </Badge>
                      <span>→</span>
                      <Badge variant="outline" size="sm">
                        <Group gap={6}>
                          <GitBranch size={14} />
                          <span>{pr.targetBranch}</span>
                        </Group>
                      </Badge>
                    </Group>
                    
                    <Group mt="md">
                      <Group gap={6}>
                        <GitCommit size={14} />
                        <Text size="sm">{pr.commits.length} commits</Text>
                      </Group>
                      
                      <Group gap={6}>
                        <MessageSquare size={14} />
                        <Text size="sm">{pr.comments.length} comments</Text>
                      </Group>
                      
                      <Box ml="auto">
                        <Text size="xs" c="dimmed">Reviewers</Text>
                        <Group gap={8} mt={4}>
                          {pr.reviewers.map(reviewer => (
                            <div 
                              key={reviewer.id} 
                              title={`${reviewer.name}: ${
                                reviewer.status === 'approved' ? 'Approved' : 
                                reviewer.status === 'rejected' ? 'Requested Changes' : 
                                'Pending Review'
                              }`}
                            >
                              <Avatar 
                                src={reviewer.avatar} 
                                radius="xl" 
                                size="sm" 
                                style={{
                                  border: `2px solid ${
                                    reviewer.status === 'approved' ? 'green' : 
                                    reviewer.status === 'rejected' ? 'red' : 
                                    'var(--border)'
                                  }`
                                }}
                              />
                            </div>
                          ))}
                        </Group>
                      </Box>
                    </Group>
                  </Card>
                ))
              )}
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder padding="md" mb="lg">
            <Group mb="xs">
              <Clock size={18} />
              <Title order={4}>Recent Activity</Title>
            </Group>
            
            <Timeline active={5} bulletSize={24} lineWidth={2}>
              <Timeline.Item 
                bullet={<GitCommit size={14} />}
                title="New commit to main"
              >
                <Text size="sm">
                  Alex updated policy implications section
                </Text>
                <Text size="xs" c="dimmed">20 minutes ago</Text>
              </Timeline.Item>
              
              <Timeline.Item 
                bullet={<GitPullRequest size={14} />}
                title="Pull request opened"
              >
                <Text size="sm">
                  Samantha opened PR for regional analysis
                </Text>
                <Text size="xs" c="dimmed">2 hours ago</Text>
              </Timeline.Item>
              
              <Timeline.Item 
                bullet={<MessageSquare size={14} />}
                title="PR comment added"
              >
                <Text size="sm">
                  Marcus commented on regional analysis PR
                </Text>
                <Text size="xs" c="dimmed">Yesterday at 3:45 PM</Text>
              </Timeline.Item>
              
              <Timeline.Item 
                bullet={<GitMerge size={14} />}
                title="Branch merged"
              >
                <Text size="sm">
                  US state privacy laws merged to main
                </Text>
                <Text size="xs" c="dimmed">Oct 5, 2023</Text>
              </Timeline.Item>
              
              <Timeline.Item 
                bullet={<GitBranch size={14} />}
                title="New branch created"
              >
                <Text size="sm">
                  Marcus created policy-proposals branch
                </Text>
                <Text size="xs" c="dimmed">Oct 2, 2023</Text>
              </Timeline.Item>
            </Timeline>
          </Card>
          
          <Card withBorder padding="md" mb="lg">
            <Title order={4} mb="md">Collaborators</Title>
            
            {repo.collaborators.map((collab) => (
              <Group key={collab.id} mb="sm">
                <Avatar src={collab.avatar} radius="xl" />
                <div style={{ flex: 1 }}>
                  <Text size="sm">{collab.name}</Text>
                  <Text size="xs" c="dimmed" tt="capitalize">{collab.role}</Text>
                </div>
                <Badge variant={collab.role === 'admin' ? 'filled' : 'outline'}>
                  {collab.role}
                </Badge>
              </Group>
            ))}
            
            <Button 
              variant="outline" 
              leftSection={<Plus size={16} />}
              fullWidth 
              mt="sm"
            >
              Add Collaborator
            </Button>
          </Card>
          
          <Card withBorder padding="md">
            <Title order={4} mb="md">Repository Details</Title>
            
            <List spacing="sm" size="sm">
              <List.Item>
                <Group>
                  <Text fw={500}>Created:</Text>
                  <Text>{new Date(repo.createdAt).toLocaleDateString()}</Text>
                </Group>
              </List.Item>
              <List.Item>
                <Group>
                  <Text fw={500}>Updated:</Text>
                  <Text>{new Date(repo.updatedAt).toLocaleDateString()}</Text>
                </Group>
              </List.Item>
              <List.Item>
                <Group>
                  <Text fw={500}>Default Branch:</Text>
                  <Badge variant="outline">{repo.currentBranch}</Badge>
                </Group>
              </List.Item>
              <List.Item>
                <Group>
                  <Text fw={500}>Total Branches:</Text>
                  <Text>{repo.branches.length}</Text>
                </Group>
              </List.Item>
              <List.Item>
                <Group>
                  <Text fw={500}>Active PRs:</Text>
                  <Text>{repoPRs.filter(pr => pr.status === 'open').length}</Text>
                </Group>
              </List.Item>
              <List.Item>
                <Group>
                  <Text fw={500}>LinkedArticle:</Text>
                  <Button variant="subtle" compact leftSection={<FileText size={14} />}>
                    View Article
                  </Button>
                </Group>
              </List.Item>
            </List>
          </Card>
        </Grid.Col>
      </Grid>
      
      {/* Create Branch Modal */}
      <Modal 
        opened={createBranchModal} 
        onClose={() => setCreateBranchModal(false)}
        title="Create New Branch"
      >
        <TextInput
          label="Branch Name"
          placeholder="e.g., feature/regional-analysis"
          mb="md"
          required
        />
        
        <Select
          label="Branch From"
          data={repo.branches.map(branch => ({ value: branch.name, label: branch.name }))}
          defaultValue={repo.currentBranch}
          mb="md"
          required
        />
        
        <Textarea
          label="Description"
          placeholder="Describe the purpose of this branch..."
          mb="md"
        />
        
        <Divider my="md" />
        
        <Group justify="flex-end">
          <Button variant="outline" onClick={() => setCreateBranchModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => setCreateBranchModal(false)}>
            Create Branch
          </Button>
        </Group>
      </Modal>
      
      {/* Create PR Modal */}
      <Modal 
        opened={createPRModal} 
        onClose={() => setCreatePRModal(false)}
        title="Create Pull Request"
        size="lg"
      >
        <TextInput
          label="Title"
          placeholder="e.g., Add regional analysis section"
          mb="md"
          required
        />
        
        <Group grow mb="md">
          <Select
            label="Source Branch"
            data={repo.branches
              .filter(branch => branch.name !== repo.currentBranch)
              .map(branch => ({ value: branch.name, label: branch.name }))}
            placeholder="Select branch"
            required
          />
          
          <Select
            label="Target Branch"
            data={[{ value: repo.currentBranch, label: repo.currentBranch }]}
            defaultValue={repo.currentBranch}
            disabled
          />
        </Group>
        
        <Textarea
          label="Description"
          placeholder="Describe the changes and why they should be merged..."
          minRows={4}
          mb="md"
          required
        />
        
        <Text fw={500} mb="xs">Reviewers</Text>
        <Group mb="md">
          {repo.collaborators
            .filter(collab => collab.id !== currentUser.id)
            .map(collab => (
              <Badge 
                key={collab.id} 
                leftSection={
                  <Avatar 
                    src={collab.avatar} 
                    radius="xl" 
                    size="xs" 
                    mr={-6}
                  />
                }
                rightSection={
                  <ActionIcon variant="transparent" size="xs" ml={-6}>
                    <X size={12} />
                  </ActionIcon>
                }
                size="lg"
              >
                {collab.name}
              </Badge>
            ))}
          <ActionIcon variant="light" size="lg">
            <Plus size={18} />
          </ActionIcon>
        </Group>
        
        <Switch label="Create as draft pull request" mb="lg" />
        
        <Divider my="md" />
        
        <Group justify="flex-end">
          <Button variant="outline" onClick={() => setCreatePRModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => setCreatePRModal(false)}>
            Create Pull Request
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
