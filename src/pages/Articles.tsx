
import { 
  Title, 
  Text, 
  Group,
  Container,
  Grid,
  Card,
  Badge,
  Button,
  Avatar
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { FileText, Edit } from 'lucide-react';
import { articles } from '../data/articlesData';

export default function Articles() {
  return (
    <div className="p-6">
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2} mb="xs">My Articles</Title>
          <Text c="dimmed">Manage and edit your articles</Text>
        </div>
        
        <Button 
          component={Link} 
          to="/editor"
          leftSection={<FileText size={16} />}
        >
          New Article
        </Button>
      </Group>

      <Grid>
        {articles.map((article) => (
          <Grid.Col key={article.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card withBorder shadow="sm">
              <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                  <Badge>{article.status}</Badge>
                  <Text size="sm" c="dimmed">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </Text>
                </Group>
              </Card.Section>

              <Text fw={500} mt="md" mb="xs">
                {article.title}
              </Text>
              
              <Text lineClamp={2} size="sm" c="dimmed" mb="md">
                {article.content}
              </Text>

              <Card.Section withBorder inheritPadding py="xs">
                <Group>
                  <Avatar src={article.author.avatar} size="sm" radius="xl" />
                  <div style={{ flex: 1 }}>
                    <Text size="sm">{article.author.name}</Text>
                    <Text size="xs" c="dimmed">{article.author.role}</Text>
                  </div>
                  <Button 
                    variant="light"
                    component={Link}
                    to={`/editor/${article.id}`}
                    leftSection={<Edit size={14} />}
                    size="xs"
                  >
                    Edit
                  </Button>
                </Group>
              </Card.Section>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
