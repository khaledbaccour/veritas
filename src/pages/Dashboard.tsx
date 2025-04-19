
import { useState } from 'react';
import { 
  Title, 
  Text, 
  Card, 
  Grid, 
  Badge, 
  Tabs, 
  Progress, 
  Group, 
  Button, 
  Box,
  SimpleGrid,
  List
} from '@mantine/core';
import { 
  TrendingUp, 
  Lightbulb, 
  BarChart3, 
  FileText, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  CheckCircle2,
  Timer
} from 'lucide-react';
import { trendingTopics, ideaSuggestions } from '../data/trendsData';
import { articles } from '../data/articlesData';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string | null>('trending');
  const recentTopics = trendingTopics.slice(0, 5);
  const recentArticles = articles.slice(0, 3);
  
  return (
    <div className="p-6">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} mb="xs">Dashboard</Title>
          <Text c="dimmed">Overview of trending topics, ideas, and your recent work</Text>
        </div>
        <Button>Create New Article</Button>
      </Group>

      <Grid gutter="lg">
        {/* Main content column */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Tabs value={activeTab} onChange={setActiveTab} mb="xl">
            <Tabs.List>
              <Tabs.Tab value="trending" leftSection={<TrendingUp size={16} />}>
                Trending Topics
              </Tabs.Tab>
              <Tabs.Tab value="ideas" leftSection={<Lightbulb size={16} />}>
                Story Ideas
              </Tabs.Tab>
              <Tabs.Tab value="analytics" leftSection={<BarChart3 size={16} />}>
                Your Analytics
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="trending" pt="md">
              {recentTopics.map((topic) => (
                <Card key={topic.id} withBorder mb="md" padding="lg">
                  <Group justify="space-between" mb="xs">
                    <div>
                      <Title order={3} size="h4">{topic.title}</Title>
                      <Badge color={topic.momentum > 80 ? "red" : topic.momentum > 60 ? "orange" : "blue"} my="xs">
                        {topic.category}
                      </Badge>
                    </div>
                    <div>
                      <Text fw={500} size="sm">Momentum Score</Text>
                      <Group gap="xs">
                        <Progress 
                          value={topic.momentum} 
                          color={topic.momentum > 80 ? "red" : topic.momentum > 60 ? "orange" : "blue"}
                          size="lg"
                          w={100}
                        />
                        <Text fw={700}>{topic.momentum}%</Text>
                      </Group>
                    </div>
                  </Group>
                  
                  <Text size="sm" c="dimmed" mb="md">
                    Based on {topic.sources} sources with a relevance score of {topic.relevanceScore}/100
                  </Text>
                  
                  <Text size="sm" fw={500} mb="xs">Related Topics:</Text>
                  <Group mb="md">
                    {topic.relatedTopics.map((relTopic, idx) => (
                      <Badge key={idx} variant="outline" color="gray">
                        {relTopic}
                      </Badge>
                    ))}
                  </Group>
                  
                  <Text size="sm" fw={500} mb="xs">Recent Coverage:</Text>
                  <List size="sm" spacing="xs" mb="md">
                    {topic.recentArticles.map((article, idx) => (
                      <List.Item key={idx}>
                        <Text component="a" href={article.url} fw={500} size="sm">
                          {article.title}
                        </Text>
                        <Text size="xs" c="dimmed">{article.source}</Text>
                      </List.Item>
                    ))}
                  </List>
                  
                  <Group mt="md">
                    <Button variant="light" size="sm">Explore Data</Button>
                    <Button variant="outline" size="sm">Create Article</Button>
                  </Group>
                </Card>
              ))}
            </Tabs.Panel>

            <Tabs.Panel value="ideas" pt="md">
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                {ideaSuggestions.slice(0, 4).map((idea) => (
                  <Card key={idea.id} withBorder padding="lg">
                    <Badge color={idea.impact === 'high' ? "red" : idea.impact === 'medium' ? "orange" : "blue"} mb="sm">
                      {idea.category}
                    </Badge>
                    <Title order={3} size="h4" mb="xs">{idea.title}</Title>
                    <Text size="sm" lineClamp={3} mb="md">{idea.description}</Text>
                    
                    <Group align="center" mb="xs">
                      <Text size="sm" fw={500}>Effort:</Text>
                      <Badge 
                        color={idea.effort === 'high' ? "red" : idea.effort === 'medium' ? "orange" : "green"}
                        variant="light"
                      >
                        {idea.effort}
                      </Badge>
                      
                      <Text size="sm" fw={500} ml="md">Impact:</Text>
                      <Badge 
                        color={idea.impact === 'high' ? "green" : idea.impact === 'medium' ? "orange" : "red"}
                        variant="light"
                      >
                        {idea.impact}
                      </Badge>
                    </Group>
                    
                    <Text size="sm" fw={500} mb="xs">Suggested Angles:</Text>
                    <List size="xs" withPadding spacing="xs" mb="md">
                      {idea.angles.slice(0, 2).map((angle, idx) => (
                        <List.Item key={idx}>{angle}</List.Item>
                      ))}
                    </List>
                    
                    <Button variant="light" fullWidth>Explore This Idea</Button>
                  </Card>
                ))}
              </SimpleGrid>
            </Tabs.Panel>

            <Tabs.Panel value="analytics" pt="md">
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
                <Card withBorder padding="md">
                  <Group>
                    <ArrowUpRight size={20} color="green" />
                    <div>
                      <Text size="xs" c="dimmed">Article Views</Text>
                      <Text fw={700} size="xl">4,256</Text>
                    </div>
                  </Group>
                  <Text size="xs" c="green" fw={500} mt="xs">+12.5% from last week</Text>
                </Card>
                
                <Card withBorder padding="md">
                  <Group>
                    <ArrowDownRight size={20} color="red" />
                    <div>
                      <Text size="xs" c="dimmed">Average Time on Page</Text>
                      <Text fw={700} size="xl">3:42</Text>
                    </div>
                  </Group>
                  <Text size="xs" c="red" fw={500} mt="xs">-0:15 from last week</Text>
                </Card>
                
                <Card withBorder padding="md">
                  <Group>
                    <ArrowUpRight size={20} color="green" />
                    <div>
                      <Text size="xs" c="dimmed">Social Shares</Text>
                      <Text fw={700} size="xl">128</Text>
                    </div>
                  </Group>
                  <Text size="xs" c="green" fw={500} mt="xs">+23.8% from last week</Text>
                </Card>
              </SimpleGrid>
              
              <Card withBorder padding="lg" mb="lg">
                <Title order={4} mb="md">Top Performing Articles</Title>
                <List spacing="lg">
                  {articles.slice(0, 3).map((article, idx) => (
                    <List.Item key={article.id}>
                      <Group justify="space-between">
                        <div>
                          <Text fw={500}>{article.title}</Text>
                          <Text size="xs" c="dimmed">Published on {new Date(article.updatedAt).toLocaleDateString()}</Text>
                        </div>
                        <Badge variant="light">{1400 - (idx * 350)} views</Badge>
                      </Group>
                    </List.Item>
                  ))}
                </List>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>

        {/* Sidebar column */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder padding="lg" mb="lg">
            <Group mb="xs">
              <FileText size={18} />
              <Title order={4}>Your Recent Articles</Title>
            </Group>
            
            {recentArticles.map((article) => (
              <Card key={article.id} withBorder mb="sm" padding="sm">
                <Text fw={500} lineClamp={1}>{article.title}</Text>
                <Group justify="space-between" mt="xs">
                  <Badge size="sm" variant={article.status === 'published' ? 'filled' : 'light'}>
                    {article.status}
                  </Badge>
                  <Group gap="xs">
                    <Clock size={14} />
                    <Text size="xs">{new Date(article.updatedAt).toLocaleDateString()}</Text>
                  </Group>
                </Group>
              </Card>
            ))}
            
            <Button variant="outline" fullWidth mt="md">View All Articles</Button>
          </Card>
          
          <Card withBorder padding="lg" mb="lg">
            <Group mb="xs">
              <Timer size={18} />
              <Title order={4}>Upcoming Deadlines</Title>
            </Group>
            
            <Box mb="xs">
              <Group justify="space-between">
                <Text fw={500}>Climate Policy Analysis</Text>
                <Badge color="red">Tomorrow</Badge>
              </Group>
              <Text size="xs" c="dimmed">Final draft for editor review</Text>
            </Box>
            
            <Box mb="xs">
              <Group justify="space-between">
                <Text fw={500}>Interview: Senator Richards</Text>
                <Badge color="orange">3 days</Badge>
              </Group>
              <Text size="xs" c="dimmed">Prepare questions and research</Text>
            </Box>
            
            <Box mb="xs">
              <Group justify="space-between">
                <Text fw={500}>Urban Housing Series</Text>
                <Badge color="blue">1 week</Badge>
              </Group>
              <Text size="xs" c="dimmed">Outline and source list</Text>
            </Box>
          </Card>
          
          <Card withBorder padding="lg">
            <Group mb="xs">
              <CheckCircle2 size={18} />
              <Title order={4}>Tasks</Title>
            </Group>
            
            <List spacing="sm" size="sm" center icon={
              <Box w={18} h={18} style={{ borderRadius: '50%', border: '1px solid #ddd' }} />
            }>
              <List.Item>Review edits from Sarah on climate article</List.Item>
              <List.Item>Research background on tech lobbying story</List.Item>
              <List.Item>Schedule interview with Professor Lee</List.Item>
              <List.Item>Update fact-checking on healthcare piece</List.Item>
            </List>
            
            <Button variant="subtle" fullWidth mt="lg">View All Tasks</Button>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
